const prisma = require("../config/prisma");

const generateColor = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 50%)`;
};

exports.getSalesByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    // Convert startDate and endDate to proper Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Ensure endDate includes the entire last day

    // Fetch sales data with branch & product details
    const salesData = await prisma.trackingsell.findMany({
      where: {
        sellAt: {
          gte: start,
          lte: end,
        },
      },
      include: {
        brach: true, // Get branch details
        product: true, // Get product details
      },
    });

    // Transform data into Nivo format
    const transformedData = {};

    salesData.forEach(({ brach, product, sellCount }) => {
      const branchName = brach.name;
      const productName = product.name;

      // Initialize branch if not exists
      if (!transformedData[branchName]) {
        transformedData[branchName] = { country: branchName };
      }

      // Sum up the sell count for the same product in the same branch
      if (!transformedData[branchName][productName]) {
        transformedData[branchName][productName] = 0;
      }
      transformedData[branchName][productName] += sellCount;

      // Assign a consistent color based on product name
      if (!transformedData[branchName][`${productName}Color`]) {
        transformedData[branchName][`${productName}Color`] =
          generateColor(productName);
      }
    });

    // Convert the transformed object into an array for Nivo
    res.json(Object.values(transformedData));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong." });
  }
};

exports.getTotalSell = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    // Convert startDate and endDate to proper Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Validate the start and end dates
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).send("Invalid startDate or endDate");
    }

    end.setHours(23, 59, 59, 999); // Ensure endDate includes the entire last day

    // Calculate the number of days between the start and end dates
    const timeDiff = end - start;
    const shiftDays = Math.floor(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days

    // Calculate the previous date range (shifted by shiftDays)
    const prevStart = new Date(start);
    const prevEnd = new Date(end);

    // Shift the previous period (subtracting the number of days from the current range)
    prevStart.setDate(prevStart.getDate() - shiftDays - 1); // Shift startDate by the number of days between start and end
    prevEnd.setDate(prevEnd.getDate() - shiftDays - 1); // Shift endDate by the same number of days minus 1 day for the previous period

    // Log to see the calculated previous range
    console.log("prevStart in UTC:", prevStart.toISOString());
    console.log("prevEnd in UTC:", prevEnd.toISOString());

    // Use aggregate to sum the sellCount for the current period
    const totalSell = await prisma.trackingsell.aggregate({
      where: {
        sellAt: {
          gte: start,
          lte: end,
        },
      },
      _sum: {
        sellCount: true,
      },
    });

    // Use aggregate to sum the sellCount for the previous period (shifted backward)
    const totalSellBackward = await prisma.trackingsell.aggregate({
      where: {
        sellAt: {
          gte: prevStart,
          lte: prevEnd,
        },
      },
      _sum: {
        sellCount: true,
      },
    });

    // Log to check the result of the previous period query
    console.log("Total Sell Backward:", totalSellBackward);

    const totalSend = await prisma.trackingsend.aggregate({
      where: {
        sendAt: {
          gte: start,
          lte: end,
        },
      },
      _sum: {
        sendCount: true,
      },
    });

    const totalExp = await prisma.trackingexp.aggregate({
      where: {
        expAt: {
          gte: start,
          lte: end,
        },
      },
      _sum: {
        expCount: true,
      },
    });

    // Calculate the sell percentage based on totalSellCount and totalSendCount
    let totalSellCountPercent = 0;
    if (totalSend._sum.sendCount > 0) {
      totalSellCountPercent =
        totalSell._sum.sellCount / totalSend._sum.sendCount;
    }

    // Calculate the percentage change between the current and previous period
    let compareSellfromPast = 0;
    if (totalSellBackward._sum.sellCount > 0) {
      compareSellfromPast =
        (totalSell._sum.sellCount - totalSellBackward._sum.sellCount) /
        totalSellBackward._sum.sellCount;
    }

    // Send the total sum of sellCount and calculated percentages
    res.json({
      totalSellCount: totalSell._sum.sellCount,
      totalSellCountPercent: totalSellCountPercent.toFixed(2), // Round to 2 decimal places
      totalSellCountBackward: totalSellBackward._sum.sellCount,
      compareSellfromPast: compareSellfromPast.toFixed(2), // Percentage change from the previous period
      totalSendCount: totalSend._sum.sendCount,
      totalExpCount: totalExp._sum.expCount,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

exports.getSellLineChart = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    // Convert startDate and endDate to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Ensure the full day is included

    // Fetch total sales grouped by branch and sellDay
    const salesData = await prisma.trackingsell.groupBy({
      by: ["sellDay", "brachId"],
      where: {
        sellAt: {
          gte: start,
          lte: end,
        },
      },
      _sum: {
        sellCount: true,
      },
    });

    // Fetch branch names for each brachId
    const branches = await prisma.brach.findMany({
      where: {
        id: { in: salesData.map((sale) => sale.brachId) },
      },
      select: {
        id: true,
        name: true,
      },
    });

    // Convert branches array to a map for quick lookup
    const branchMap = {};
    branches.forEach((branch) => {
      branchMap[branch.id] = branch.name;
    });

    // Define days of the week in correct order
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    // Organize data by branch
    const branchSalesMap = {};

    salesData.forEach(({ sellDay, brachId, _sum }) => {
      if (!branchSalesMap[brachId]) {
        branchSalesMap[brachId] = {
          id: branchMap[brachId] || `Branch ${brachId}`, // Default if no branch name found
          color: "tokens('dark').greenAccent[500]",
          data: daysOfWeek.map((day) => ({ x: day, y: 0 })), // Initialize all days with 0
        };
      }

      // Find the corresponding day in the dataset and update the y value
      const dayIndex = daysOfWeek.findIndex(
        (day) => day.toLowerCase() === sellDay.toLowerCase()
      );
      if (dayIndex !== -1) {
        branchSalesMap[brachId].data[dayIndex].y = _sum.sellCount || 0;
      }
    });

    // Convert branchSalesMap to an array
    const responseData = Object.values(branchSalesMap);

    res.json(responseData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

exports.getDataPieChart = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    // Convert startDate and endDate to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Ensure the full day is included

    const ress = await prisma.trackingsell.findMany({
      where: {
        sellAt: {
          gte: start,
          lte: end,
        },
      },
      include: {
        product: true,
      },
    });

    // Group by product name and sum the sellCount
    const groupedData = ress.reduce((acc, curr) => {
      const productName = curr.product.name;
      if (!acc[productName]) {
        acc[productName] = { label: productName, value: 0 };
      }
      acc[productName].value += curr.sellCount;
      return acc;
    }, {});

    // Convert the grouped data into the desired format
    const result = Object.keys(groupedData).map((productName, index) => {
      const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`; // Random color
      return {
        id: productName, // id as product name
        label: productName, // label as product name
        value: groupedData[productName].value, // sum of sellCount for this product
        color: randomColor, // random color
      };
    });

    res.send(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Something went wrong.` });
  }
};

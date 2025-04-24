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

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

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

    // Fetch branch names
    const branches = await prisma.brach.findMany({
      where: {
        id: { in: salesData.map((sale) => sale.brachId) },
      },
      select: {
        id: true,
        name: true,
      },
    });

    // Map for quick branch name lookup
    const branchMap = {};
    branches.forEach(branch => {
      branchMap[branch.id] = branch.name;
    });

    const daysOfWeek = [
      "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ];

    // Initialize result
    const branchSalesMap = {};

    // Initialize structure for each branch
    branches.forEach(branch => {
      branchSalesMap[branch.id] = {
        id: branch.name,
        data: daysOfWeek.map(day => ({ x: day, y: 0 })),
      };
    });

    // Populate sales count into correct day
    salesData.forEach(({ sellDay, brachId, _sum }) => {
      const branch = branchSalesMap[brachId];
      if (!branch) return;

      const dayIndex = daysOfWeek.findIndex(
        day => day.toLowerCase() === sellDay.toLowerCase()
      );

      if (dayIndex !== -1) {
        branch.data[dayIndex].y += _sum.sellCount || 0;
      }
    });

    // Convert to array format
    const responseData = Object.values(branchSalesMap);


    res.json(responseData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};


// Function to generate unique HSL colors
const generateUniqueColorsLine = (count) => {
  const colors = [];
  const step = 360 / count; // Evenly distribute colors around the HSL wheel
  for (let i = 0; i < count; i++) {
    const hue = Math.floor(i * step); // Spread hues evenly
    colors.push(`hsl(${hue}, 70%, 50%)`);
  }
  return colors;
};

exports.getDataPieChart = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const ress = await prisma.trackingsell.findMany({
      where: { sellAt: { gte: start, lte: end } },
      include: { product: true },
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

    // Generate unique colors
    const uniqueColors = generateUniqueColors(Object.keys(groupedData).length);

    // Convert the grouped data into the desired format
    const result = Object.keys(groupedData).map((productName, index) => ({
      id: productName,
      label: productName,
      value: groupedData[productName].value,
      color: uniqueColors[index],
    }));

    res.send(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Something went wrong.` });
  }
};

// Function to generate unique HSL colors
const generateUniqueColors = (count) => {
  const colors = [];
  const step = 360 / count; // Evenly distribute colors around the HSL wheel
  for (let i = 0; i < count; i++) {
    const hue = Math.floor(i * step); // Spread hues evenly
    colors.push(`hsl(${hue}, 70%, 50%)`);
  }
  return colors;
};

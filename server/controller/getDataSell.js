const prisma = require("../config/prisma");

const generateColor = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 50%)`;
};

{
  /** BAR CHART  */
}

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

exports.barChartSend = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    // Convert startDate and endDate to proper Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Ensure endDate includes the entire last day

    // Fetch sales data with branch & product details
    const salesData = await prisma.trackingsend.findMany({
      where: {
        sendAt: {
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

    salesData.forEach(({ brach, product, sendCount }) => {
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
      transformedData[branchName][productName] += sendCount;

      // Assign a consistent color based on product name
      if (!transformedData[branchName][`${productName}Color`]) {
        transformedData[branchName][`${productName}Color`] =
          generateColor(productName);
      }
    });

    // Convert the transformed object into an array for Nivo
    res.json(Object.values(transformedData));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `server error` });
  }
};
exports.barChartExp = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    // Convert startDate and endDate to proper Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Ensure endDate includes the entire last day

    // Fetch sales data with branch & product details
    const salesData = await prisma.trackingexp.findMany({
      where: {
        expAt: {
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

    salesData.forEach(({ brach, product, expCount }) => {
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
      transformedData[branchName][productName] += expCount;

      // Assign a consistent color based on product name
      if (!transformedData[branchName][`${productName}Color`]) {
        transformedData[branchName][`${productName}Color`] =
          generateColor(productName);
      }
    });

    // Convert the transformed object into an array for Nivo
    res.json(Object.values(transformedData));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `server error` });
  }
};

exports.getTotalSell = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).send("Invalid startDate or endDate");
    }

    end.setHours(23, 59, 59, 999);

    const sendTrack = await prisma.trackingsend.findMany({
      where: {
        sendAt: {
          gte: start,
          lte: end,
        },
      },
      include: {
        product: true,
      },
    });

    const expTrack = await prisma.trackingexp.findMany({
      where: {
        expAt: {
          gte: start,
          lte: end,
        },
      },
      include: {
        product: true,
      },
    });

    const sellTrack = await prisma.trackingsell.findMany({
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

    // Calculate total send and expired prices
    const totalSendPrice = sendTrack.reduce((sum, record) => {
      const price = record.product?.price || 0;
      return sum + record.sendCount * price;
    }, 0);

    const totalSellPrice = sellTrack.reduce((sum, record) => {
      const price = record.product?.price || 0;
      return sum + record.sellCount * price;
    }, 0);

    const totalExpPrice = expTrack.reduce((sum, record) => {
      const price = record.product?.price || 0;
      return sum + record.expCount * price;
    }, 0);

    const percentageOfPricetotalExp =
      totalSendPrice > 0
        ? parseFloat(((totalExpPrice / totalSendPrice) * 100).toFixed(2))
        : 0;

    res.json({
      totalSendPrice,
      totalExpPrice,
      totalSellPrice,
      percentageOfPricetotalExp,
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
    branches.forEach((branch) => {
      branchMap[branch.id] = branch.name;
    });

    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    // Initialize result
    const branchSalesMap = {};

    // Initialize structure for each branch
    branches.forEach((branch) => {
      branchSalesMap[branch.id] = {
        id: branch.name,
        data: daysOfWeek.map((day) => ({ x: day, y: 0 })),
      };
    });

    // Populate sales count into correct day
    salesData.forEach(({ sellDay, brachId, _sum }) => {
      const branch = branchSalesMap[brachId];
      if (!branch) return;

      const dayIndex = daysOfWeek.findIndex(
        (day) => day.toLowerCase() === sellDay.toLowerCase()
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

exports.dataTrack = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    // Fetch all products with their available products (for all branches)
    const fecthProducts = await prisma.product.findMany({
      include: {
        avilableproduct: true,
      },
    });

    // Fetch all branches with tracking info within the date range
    const fecthBrach = await prisma.brach.findMany({
      include: {
        tracsell: {
          where: {
            sellAt: {
              gte: start,
              lte: end,
            },
          },
        },
        tracksend: {
          where: {
            sendAt: {
              gte: start,
              lte: end,
            },
          },
        },
        trackexp: {
          where: {
            expAt: {
              gte: start,
              lte: end,
            },
          },
        },
      },
    });

    // Generate result per branch
    const result = fecthBrach.map((brach) => {
      const detail = fecthProducts.map((product) => {
        const totalSell = brach.tracsell
          .filter((s) => s.productId === product.id)
          .reduce((sum, s) => sum + s.sellCount, 0);

        const totalSend = brach.tracksend
          .filter((s) => s.productId === product.id)
          .reduce((sum, s) => sum + s.sendCount, 0);

        const totalExp = brach.trackexp
          .filter((s) => s.productId === product.id)
          .reduce((sum, s) => sum + s.expCount, 0);

        // Find avilableproduct specific to this product and this branch
        const availableProduct = product.avilableproduct.find(
          (ap) => ap.brachId === brach.id
        );

        return {
          id: product.id,
          name: product.name,
          price: product.price,
          sellPrice: product.sellprice,
          image: product.image,
          totalSell,
          totalSend,
          totalExp,
          totalPriceSend: product.price * totalSend,
          totalPriceSell: product.sellprice * totalSell,
          totalPriceExp: product.price * totalExp,
          availableProductCount: availableProduct?.aviableStatus
            ? availableProduct.count
            : 0, // Optional chaining in case it's undefined
        };
      });

      return {
        id: brach.id,
        name: brach.name,
        detail,
      };
    });

    res.send(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: `Something went wrong 500.` });
  }
};

exports.TotalData = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const fecthProducts = await prisma.product.findMany();

    const fecthBrach = await prisma.brach.findMany({
      include: {
        tracsell: {
          where: {
            sellAt: {
              gte: start,
              lte: end,
            },
          },
        },
        tracksend: {
          where: {
            sendAt: {
              gte: start,
              lte: end,
            },
          },
        },
        trackexp: {
          where: {
            expAt: {
              gte: start,
              lte: end,
            },
          },
        },
      },
    });

    // 🧠 Aggregate by product across all branches
    const totalDetail = fecthProducts.map((product) => {
      let totalSell = 0;
      let totalSend = 0;
      let totalExp = 0;

      fecthBrach.forEach((branch) => {
        totalSell += branch.tracsell
          .filter((s) => s.productId === product.id)
          .reduce((sum, s) => sum + s.sellCount, 0);

        totalSend += branch.tracksend
          .filter((s) => s.productId === product.id)
          .reduce((sum, s) => sum + s.sendCount, 0);

        totalExp += branch.trackexp
          .filter((s) => s.productId === product.id)
          .reduce((sum, s) => sum + s.expCount, 0);
      });

      return {
        id: product.id,
        name: product.name,
        price: product.price,
        sellPrice: product.sellprice,
        image: product.image,
        totalSell,
        totalSend,
        totalExp,
        totalPriceSend: product.price * totalSend,
        totalPriceSell: product.sellprice * totalSell,
        totalPriceEXP: product.price * totalExp,
      };
    });

    res.send({ totalDetail });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Something went wrong 500.` });
  }
};

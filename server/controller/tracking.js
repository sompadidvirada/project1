const prisma = require("../config/prisma");
const { parseISO, format } = require("date-fns");

exports.tracksell = async (req, res) => {
  try {
    const { sellCount, sellAt, userId, productId, brachId } = req.body;

    if (!sellCount || !sellAt || !brachId || !userId || !productId) {
      return res.status(400).json({ message: "something went wrong." });
    }

    // Date part .......
    const formattedsellAt = parseISO(sellAt); // already in UTC
    const sellDay = format(formattedsellAt, "EEEE");

    const start = new Date(formattedsellAt);
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date(formattedsellAt);
    end.setUTCHours(23, 59, 59, 999);

    const check = await prisma.trackingsell.findFirst({
      where: {
        sellAt: {
          gte: start,
          lte: end,
        },
        brachId: Number(brachId),
        productId: Number(productId),
      },
    });

    if (check) {
      return res.status(400).json({ message: `This item's already updated.` });
    }

    await prisma.$transaction(async (tx) => {
      await prisma.trackingsell.create({
        data: {
          sellCount: Number(sellCount),
          sellAt: formattedsellAt,
          sellDay: sellDay,
          productId: productId,
          userId: userId,
          brachId: brachId,
        },
      });
    });
    res.send(`Insert tracking sell success.`);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Something went wrong11.` });
  }
};
exports.tracksend = async (req, res) => {
  try {
    const { sendCount, sendAt, userId, productId, brachId } = req.body;
    if (!sendCount || !sendAt || !brachId || !userId || !productId) {
      return res.status(400).json({ message: "something went wrong11." });
    }

    // Date part .......

    const formattedsendAt = parseISO(sendAt); // already in UTC
    const sendDay = format(formattedsendAt, "EEEE");

    const start = new Date(formattedsendAt);
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date(formattedsendAt);
    end.setUTCHours(23, 59, 59, 999);

    const check = await prisma.trackingsend.findFirst({
      where: {
        sendAt: {
          gte: start,
          lte: end,
        },
        brachId: Number(brachId),
        productId: Number(productId),
      },
    });
    if (check) {
      return res.status(400).json({ message: `This item's already updated.` });
    }

    await prisma.$transaction(async (tx) => {
      await prisma.trackingsend.create({
        data: {
          sendCount: Number(sendCount),
          sendAt: formattedsendAt,
          sendDay: sendDay,
          productId: productId,
          userId: userId,
          brachId: brachId,
        },
      });
    });
    res.send(`Insert tracking send success.`);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Something went wrong.` });
  }
};
exports.trackexp = async (req, res) => {
  try {
    const { expCount, expAt, userId, productId, brachId } = req.body;

    if (!expCount || !expAt || !brachId || !userId || !productId) {
      return res.status(400).json({ message: "something went wrong." });
    }

    // Date part .......

    const formattedexpAt = parseISO(expAt); // already in UTC
    const expDay = format(formattedexpAt, "EEEE");

    const start = new Date(formattedexpAt);
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date(formattedexpAt);
    end.setUTCHours(23, 59, 59, 999);

    const check = await prisma.trackingexp.findFirst({
      where: {
        expAt: {
          gte: start,
          lte: end,
        },
        brachId: Number(brachId),
        productId: Number(productId),
      },
    });
    if (check) {
      return res.status(400).json({ message: `This item's already updated.` });
    }

    await prisma.$transaction(async (tx) => {
      await prisma.trackingexp.create({
        data: {
          expCount: Number(expCount),
          expAt: formattedexpAt,
          expDay: expDay,
          productId: productId,
          userId: userId,
          brachId: brachId,
        },
      });
    });
    res.send(`Insert tracking exp success.`);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Something went wrong.` });
  }
};
exports.checkTrackSell = async (req, res) => {
  try {
    const { sellDate, brachId } = req.body;

    if (!sellDate || !brachId) {
      return res
        .status(500)
        .json({ message: `Something went wrong. No Data.` });
    }

    const startofDay = new Date(sellDate);
    const endofDay = new Date(sellDate);
    startofDay.setUTCHours(0, 0, 0, 0);
    endofDay.setUTCHours(23, 59, 59, 999);

    const checkDate = await prisma.trackingsell.findMany({
      where: {
        sellAt: {
          gte: startofDay,
          lt: endofDay,
        },
        brachId: Number(brachId),
      },
    });

    res.json(checkDate);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: `Something went wrong111.` });
  }
};
exports.checkTrackSend = async (req, res) => {
  const { sendDate, brachId } = req.body;

  if (!sendDate || !brachId) {
    return res.status(500).json({ message: `Something went wrong. No Data.` });
  }
  try {
    const startofDay = new Date(sendDate);
    startofDay.setUTCHours(0, 0, 0, 0);

    const endofDay = new Date(sendDate);
    endofDay.setUTCHours(23, 59, 59, 999);

    const checkDate = await prisma.trackingsend.findMany({
      where: {
        sendAt: {
          gte: startofDay,
          lt: endofDay,
        },
        brachId: Number(brachId),
      },
    });

    res.json(checkDate);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: `Something went wrong.` });
  }
};
exports.checkTrackExp = async (req, res) => {
  const { expDate, brachId } = req.body;

  if (!expDate || !brachId) {
    return res.status(500).json({ message: `Something went wrong. No Data.` });
  }
  try {
    const startofDay = new Date(expDate);
    startofDay.setUTCHours(0, 0, 0, 0);

    const endofDay = new Date(expDate);
    endofDay.setUTCHours(23, 59, 59, 999);

    const checkDate = await prisma.trackingexp.findMany({
      where: {
        expAt: {
          gte: startofDay,
          lt: endofDay,
        },
        brachId: Number(brachId),
      },
    });

    res.json(checkDate);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: `Something went wrong.` });
  }
};

exports.updateTrackSell = async (req, res) => {
  try {
    const { sellAt, productId, brachId, sellCount } = req.body;

    // Set range for the whole day
    const startOfDay = new Date(sellAt);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(sellAt);
    endOfDay.setHours(23, 59, 59, 999);

    const ress = await prisma.trackingsell.updateMany({
      where: {
        productId: Number(productId),
        brachId: Number(brachId),
        sellAt: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
      data: {
        sellCount: Number(sellCount),
      },
    });
    res.send(ress);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Something went wrong 500.` });
  }
};

exports.updateTrackSend = async (req, res) => {
  try {
    const { sendAt, productId, brachId, sendCount } = req.body;
    console.log(sendAt, productId, brachId, sendCount);

    // Set range for the whole day
    const startOfDay = new Date(sendAt);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(sendAt);
    endOfDay.setHours(23, 59, 59, 999);

    const ress = await prisma.trackingsend.updateMany({
      where: {
        productId: Number(productId),
        brachId: Number(brachId),
        sendAt: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
      data: {
        sendCount: Number(sendCount),
      },
    });
    res.send(ress);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Something went wrong 500.` });
  }
};
exports.updateTrackExp = async (req, res) => {
  try {
    const { expAt, productId, brachId, expCount } = req.body;

    // Set range for the whole day
    const startOfDay = new Date(expAt);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(expAt);
    endOfDay.setHours(23, 59, 59, 999);

    const ress = await prisma.trackingexp.updateMany({
      where: {
        productId: Number(productId),
        brachId: Number(brachId),
        expAt: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
      data: {
        expCount: Number(expCount),
      },
    });
    res.send(ress);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Something went wrong 500.` });
  }
};

exports.deleteTrackSell = async (req, res) => {
  try {
    const { sellDate, brachId } = req.body;

    if (!sellDate || !brachId) {
      return res.status(400).json({ message: `Missing Data.` });
    }

    const startOfDay = new Date(sellDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(sellDate);
    endOfDay.setHours(23, 59, 59, 999);

    await prisma.trackingsell.deleteMany({
      where: {
        brachId: Number(brachId),
        sellAt: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
    });
    res.send(`Delete The Tracking Success.`);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Something went wrong 500.` });
  }
};

exports.deleteTrackSend = async (req, res) => {
  try {
    const { sendDate, brachId } = req.body;

    if (!sendDate || !brachId) {
      return res.status(400).json({ message: `Missing Data.` });
    }

    const startOfDay = new Date(sendDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(sendDate);
    endOfDay.setHours(23, 59, 59, 999);

    await prisma.trackingsend.deleteMany({
      where: {
        brachId: Number(brachId),
        sendAt: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
    });
    res.send(`Delete The Tracking Success.`);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Something went wrong 500.` });
  }
};

exports.deleteTrackEXP = async (req, res) => {
  try {
    const { expDate, brachId } = req.body;

    if (!expDate || !brachId) {
      return res.status(400).json({ message: `Missing Data.` });
    }

    const startOfDay = new Date(expDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(expDate);
    endOfDay.setHours(23, 59, 59, 999);

    await prisma.trackingexp.deleteMany({
      where: {
        brachId: Number(brachId),
        expAt: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
    });
    res.send(`Delete The Tracking Success.`);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Something went wrong 500.` });
  }
};

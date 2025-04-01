const prisma = require("../config/prisma");
const { parseISO, format } = require("date-fns");

exports.tracksell = async (req, res) => {
  try {
    const { sellCount, sellAt, userId, productId, brachId } = req.body;

    if (!sellCount || !sellAt || !brachId || !userId || !productId) {
      return res.status(400).json({ message: "something went wrong." });
    }

    // Date part .......

    const formattedsellAt = parseISO(sellAt);
    const sellDay = format(formattedsellAt, "EEEE");

    // check part ......

    const check = await prisma.trackingsell.findFirst({
      where: {
        AND: [
          {
            sellAt: formattedsellAt,
          },
          {
            brachId: Number(brachId),
          },
          {
            productId: Number(productId),
          },
        ],
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
    console.log(req.body);
    if (!sendCount || !sendAt || !brachId || !userId || !productId) {
      return res.status(400).json({ message: "something went wrong11." });
    }

    // Date part .......

    const formattedsendAt = parseISO(sendAt);
    const sendDay = format(formattedsendAt, "EEEE");

    // check part ......

    const check = await prisma.trackingsend.findFirst({
      where: {
        AND: [
          {
            sendAt: formattedsendAt,
          },
          {
            brachId: Number(brachId),
          },
          {
            productId: Number(productId),
          },
        ],
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
    console.log(req.body)

    if (!expCount || !expAt || !brachId || !userId || !productId) {
      return res.status(400).json({ message: "something went wrong." });
    }

    // Date part .......

    const formattedexpAt = parseISO(expAt);
    const expDay = format(formattedexpAt, "EEEE");

    // check part ......

    const check = await prisma.trackingexp.findFirst({
      where: {
        AND: [
          {
            expAt: formattedexpAt,
          },
          {
            brachId: Number(brachId),
          },
          {
            productId: Number(productId),
          },
        ],
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
    console.log(req.body);

    if (!sellDate || !brachId) {
      return res
        .status(500)
        .json({ message: `Something went wrong. No Data.` });
    }

    const startofDay = new Date(sellDate);
    startofDay.setUTCHours(0, 0, 0, 0);

    const endofDay = new Date(sellDate);
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
    const { id } = req.params;
    const { sellAt, productId, brachId, sellCount } = req.body;

    const formattedsellAt = parseISO(sellAt);

    const ress = await prisma.trackingsell.update({
      where: {
        id: Number(id),
        productId: Number(productId),
        sellAt: formattedsellAt,
        brachId: Number(brachId),
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
    const { id } = req.params;
    const { sendAt, productId, brachId, sendCount } = req.body;

    const formattedsendAt = parseISO(sendAt);

    const ress = await prisma.trackingsend.update({
      where: {
        id: Number(id),
        productId: Number(productId),
        sendAt: formattedsendAt,
        brachId: Number(brachId),
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
    const { id } = req.params;
    const { expAt, productId, brachId, expCount } = req.body;

    const formattedExpAt = parseISO(expAt);

    const ress = await prisma.trackingexp.update({
      where: {
        id: Number(id),
        productId: Number(productId),
        expAt: formattedExpAt,
        brachId: Number(brachId),
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


const prisma = require("../config/prisma");

exports.createBrach = async (req, res) => {
  try {
    const { brachName } = req.body;

    if (!brachName || brachName === "") {
      return res.status(400).json({ message: `Emty feild.` });
    }

    const ress = await prisma.brach.create({
      data: {
        name: brachName,
      },
    });

    const getProduct = await prisma.product.findMany();

    //PREPARE DATA FOR INSERT
    const dataToInsert = getProduct.map((item) => ({
      productId: item.id,
      brachId: ress.id,
      aviableStatus: true,
    }));

    // CREATE AVIABLE STATUS FOR THE BRANCH

    await prisma.avilableproduct.createMany({
      data: dataToInsert,
      skipDuplicates: true,
    });

    res.send(`Create ${ress.name} Sucess.`);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Soemthing went wrong.` });
  }
};

exports.getBrach = async (req, res) => {
  try {
    const brachs = await prisma.brach.findMany();
    res.send(brachs);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Something went wrong.` });
  }
};

exports.updateBrach = async (req, res) => {
  try {
    const { id } = req.params;
    const { brachName } = req.body;
    const update = await prisma.brach.update({
      where: {
        id: Number(id),
      },
      data: {
        name: brachName,
      },
    });
    res.send(`Update ${update.name} Success.`);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Soemthing went wrong.` });
  }
};

exports.deleteBrach = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBrach = await prisma.brach.delete({
      where: {
        id: Number(id),
      },
    });
    res.send(`Delete ${deleteBrach.name} Success.`);
  } catch (err) {
    return res.status(500).json({ message: `Soemthing went wrong.` });
  }
};

const prisma = require("../config/prisma");

exports.createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;

    //Check if categorys name's emty or undefine.

    if (!categoryName || categoryName === "") {
      return res.status(401).json({ message: `Something went wrong11.` });
    }

    // Start process create category into database and send back to client.

    const ress = await prisma.category.create({
      data: {
        name: categoryName,
      },
    });

    res.send(`Create ${ress.name} Success.`);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Something went wrong.` });
  }
};

exports.getCategorys = async (req, res) => {
  try {
    const categorys = await prisma.category.findMany();
    res.send(categorys);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Something went wrong 500.` });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteCategory = await prisma.category.delete({
      where: {
        id: Number(id),
      },
    });

    res.send(`Delte ${deleteCategory.name} Success.`);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Something went wrong 500.` });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName } = req.body;

    const updateCate = await prisma.category.update({
      where: {
        id: Number(id),
      },
      data: {
        name: categoryName,
      },
    });

    res.send(`Update ${updateCate.name} Sucess.`);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Soemthing went wrong 500.` });
  }
};

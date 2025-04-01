const prisma = require("../config/prisma");

exports.createProduct = async (req, res) => {
  try {
    const { name, price, sellprice, category, lifetime } = req.body;
    console.log(req.file)

    if (!name || !price || !sellprice || !category) {
      return res.status(400).json({ message: `Can't create with emty value.` });
    }
    if (!req.file || !req.file.filename) {
      newProduct = await prisma.product.create({
        data: {
          name: name,
          price: Number(price),
          sellprice: Number(sellprice),
          lifetime: Number(lifetime),
          categoryId: Number(category),
        },
      });
      return res.status(201).json({
        message: "Product created successfully!",
        user: newProduct,
      });
    }
    newProduct = await prisma.product.create({
      data: {
        name: name,
        price: Number(price),
        sellprice: Number(sellprice),
        categoryId: Number(category),
        lifetime: Number(lifetime),
        image: req.file.filename,
      },
    });
    res.status(201).json({
      message: "Product created successfully!",
      user: newProduct,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Soemthing went wrong.` });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const Products = await prisma.product.findMany({
        include:{
            category:true
        }
    });
    res.send(Products);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Something went wrong.` });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, sellprice, categoryId, lifetime } = req.body;
    console.log(req.body)
    if (!name || !price || !sellprice || !categoryId || !lifetime) {
      return res.status(400).json({ message: `Can't update with emty value.` });
    }
    if (!req.file || !req.file.filename) {
      const updateProduct = await prisma.product.update({
        where: {
          id: Number(id),
        },
        data: {
          name: name,
          price: Number(price),
          sellprice: Number(sellprice),
          lifetime: Number(lifetime),
          categoryId: Number(categoryId),
        },
      });
      return res.status(201).json({
        message: "Product update successfully!",
        user: updateProduct,
      });
    }
    const updateProduct = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name,
        price: Number(price),
        sellprice: Number(sellprice),
        lifetime:Number(lifetime),
        categoryId: Number(categoryId),
        image: req.file.filename,
      },
    });
    res.status(201).json({
      message: "Product update successfully!",
      user: updateProduct,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Somthing went wrong.` });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteProduct = await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });
    res.send(`Delete ${deleteProduct.name} Success.`);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Something went wrong.` });
  }
};

const prisma = require("../config/prisma");

exports.createProduct = async (req, res) => {
  try {
    const { name, price, sellprice, category, lifetime } = req.body;

    if (!name || !price || !sellprice || !category) {
      return res.status(400).json({ message: `Can't create with empty value.` });
    }

    // Get all branches first
    const allBranches = await prisma.brach.findMany();

    // Start transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create product
      const product = await tx.product.create({
        data: {
          name,
          price: Number(price),
          sellprice: Number(sellprice),
          lifetime: Number(lifetime),
          categoryId: Number(category),
          image: req.file?.filename || null,
        },
      });

      // Prepare available products data
      const availableProductsData = allBranches.map(branch => ({
        productId: product.id,
        brachId: branch.id,
      }));

      // Create available products in bulk
      await tx.avilableproduct.createMany({
        data: availableProductsData,
        skipDuplicates: true,
      });

      return product;
    });

    res.status(201).json({
      message: "Product created and available in all branches!",
      product: result,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: `Something went wrong.` });
  }
};


exports.getProduct = async (req, res) => {
  try {
    const Products = await prisma.product.findMany({
      include: {
        category: true,
        avilableproduct: true,
      },
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
        lifetime: Number(lifetime),
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

exports.suspendProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const { updateStatus } = req.body;
    if (!id) {
      return res.send(`Product ID requie !!`);
    }
    const suspenProudct = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        avilable: updateStatus,
      },
    });
    res.send(suspenProudct);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `server error` });
  }
};

exports.insertStatusProducts = async (req, res) => {
  try {
    const statusData = req.body;

    // Optional: Validate incoming data format
    if (!Array.isArray(statusData) || statusData.length === 0) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // Map to Prisma-friendly format (aviableStatus defaults to true)
    const dataToInsert = statusData.map((item) => ({
      productId: item.productId,
      brachId: item.brachId,
      aviableStatus: true,
    }));

    // Bulk insert with skipDuplicates (because of @@unique constraint)
    await prisma.avilableproduct.createMany({
      data: dataToInsert,
      skipDuplicates: true,
    });

    return res
      .status(201)
      .json({ message: "Insert successful", count: dataToInsert.length });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};


exports.updatePerBrach = async (req, res) => {
  try {
    const productId = req.params.id
    const { branch, status } = req.body;

    console.log(productId,branch,status)

    if (!branch) {
      // Update all branches for a product
      const response = await prisma.avilableproduct.updateMany({
        where: {
          productId: Number(productId),
        },
        data: {
          aviableStatus: status,
        },
      });
      return res.send(
        `Updated ${response.count} branches for product ${productId}.`
      );
    } else {
      // Update a specific product-branch pair
      await prisma.avilableproduct.update({
        where: {
          productId_brachId: {
            productId: Number(productId),
            brachId: Number(branch),
          },
        },
        data: {
          aviableStatus: status,
        },
      });
      return res.send(`Updated branch ${branch} for product ${productId}.`);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Server error` });
  }
};

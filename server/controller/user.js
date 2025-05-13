const prisma = require("../config/prisma");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    const phoneCheck = await prisma.user.findFirst({
      where: {
        phonenumber: req.body.phonenumber,
      },
    });

    if (phoneCheck) {
      return res.status(400).json({ message: `This number already exists.` });
    }

    // Check if there is no file uploaded
    if (!req.file || !req.file.filename) {
      const newUser = await prisma.user.create({
        data: {
          firstname: req.body.firstName,
          lastname: req.body.lastName,
          phonenumber: req.body.phonenumber,
          password: req.body.password,
          birstDate: new Date(req.body.birthDate),
        },
      });
      return res.status(201).json({
        message: "User created successfully!",
        user: newUser,
      });
    }

    // Create user with image
    const newUser = await prisma.user.create({
      data: {
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        phonenumber: req.body.phonenumber,
        password: req.body.password,
        birstDate: new Date(req.body.birthDate),
        image: req.file.filename,
      },
    });

    res.status(201).json({
      message: "User created successfully!",
      user: newUser,
    });
  } catch (error) {
    console.log("Error creating user:", error);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstname: true,
        lastname: true,
        phonenumber: true,
        role: true,
        status: true,
      },
    });
    res.send(users);
  } catch (err) {
    console.log(err)
    return res.status(400).json(`Something went wrong.`);
  }
};

exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { newRole } = req.body;
    await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        role: newRole,
      },
    });
    res.send(`Update User Sueccess.`);
  } catch (err) {
    console.log(err)
    return res.status(400).json({ message: `Something went wrong.` });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { newStatus } = req.body;
    await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        status: newStatus,
      },
    });
    res.send(`Update User Sueccess.`);
  } catch (err) {
    return res.status(400).json({ message: `Something went wrong.` });
  }
};

exports.updateBasicUser = async (req, res) => {
  try {
    const { firstname, lastname, phonenumber } = req.body;
    const { id } = req.params;


    // Find the existing user
    const existingUser = await prisma.user.findUnique({
      where: { id: Number(id) }
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the new phone number is already used by another user
    // Check if the new phone number is already used by another user (exclude current user)
    const phoneCheck = await prisma.user.findFirst({
      where: {
        phonenumber: phonenumber,
        id: { not: Number(id) } // Exclude the current user
      }
    });

    if (phoneCheck) {
      return res.status(400).json({ message: `This phone number (${phonenumber}) is already used by another user.` });
    }

    // Proceed with the rest of the update if phone number check passed
    const updateData = {
      firstname,
      lastname,
    };

    // If the phone number is the same as the existing one, we don't need to change it
    if (existingUser.phonenumber !== phonenumber) {
      updateData.phonenumber = phonenumber; // If it's different, update phone number
    }

    // If there's an image uploaded, include it in the update
    if (req.file && req.file.filename) {
      updateData.image = req.file.filename;
    }

    // Perform the update
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: updateData,
    });


    // Payload for JWT
    const payload = {
      id: updatedUser.id,
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
      phonenumber: updatedUser.phonenumber,
      role: updatedUser.role,
      status: updatedUser.status,
      image: updatedUser.image,
    };

    // Generate and send JWT token
    jwt.sign(payload, process.env.SECRET, { expiresIn: "1d" }, (err, token) => {
      if (err) {
        return res.status(500).json({ message: "Token error." });
      }
      res.send({ payload, token });
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong." });
  }
};
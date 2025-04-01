const prisma = require("../config/prisma");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { phonenumber, password } = req.body;

    if (!phonenumber || !password) {
      return res.status(400).json({ message: `Fill all the field first.` });
    }
    const checkUser = await prisma.user.findFirst({
      where: {
        phonenumber: phonenumber,
      },
    });
    if (!checkUser) {
      return res.status(404).json({ message: `There's no phonenumber.` });
    }
    if (checkUser.status !== true) {
      return res.status(400).json({ message: `This User is not available` });
    }
    if (checkUser.password !== password) {
      return res.status(400).json({ message: `The Password is not currect.` });
    }
    const payload = {
      id: checkUser.id,
      firstname: checkUser.firstname,
      lastname: checkUser.lastname,
      phonenumber: checkUser.phonenumber,
      role: checkUser.role,
      status: checkUser.status,
      image: checkUser.image
    };

    jwt.sign(payload, process.env.SECRET, { expiresIn: "1d" }, (err, token) => {
      if (err) {
        return res.status(500).json({ message: `Token error.` });
      }
      res.send({ payload, token });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Server error.` });
  }
};

exports.currentUser = async (req, res) => {
    try {
        //code
        const user = await prisma.user.findFirst({
            where: { phonenumber: req.user.phonenumber },
            select: {
                id: true,
                firstname: true,
                lastname: true,
                role: true
            }
        })
        res.json({ user })
    } catch (err) {
        //err
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

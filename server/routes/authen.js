const express = require("express");
const multer = require("multer");
const { login, currentUser } = require("../controller/authen");
const { authCheck, adminCheck } = require("../middleware/authCheck");

const router = express.Router();

router.post("/login", login);
router.post("/current-user", authCheck, currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser);

module.exports = router;

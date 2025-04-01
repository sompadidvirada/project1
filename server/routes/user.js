const express = require("express");
const multer = require("multer");
const path = require("path");
const { createUser, getAllUser, updateRole, updateStatus, updateBasicUser } = require("../controller/user");
const { authCheck, adminCheck } = require("../middleware/authCheck");

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads"); // Store files in 'public/uploads'
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Apply Multer to handle single file upload
router.post("/createuser", upload.single("profileImage"),authCheck,adminCheck, createUser);
router.get("/getalluser", authCheck, adminCheck, getAllUser);
router.put("/updaterole:id", authCheck, adminCheck, updateRole)
router.put("/updatestatus:id", authCheck, adminCheck, updateStatus)
router.put("/updatefromuser/:id",upload.single("image"), updateBasicUser )

module.exports = router;

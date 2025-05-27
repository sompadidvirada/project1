const { createProduct, getProduct, updateProduct, deleteProduct, suspendProduct } = require("../controller/product");
const { authCheck, adminCheck } = require("../middleware/authCheck");
const express = require("express");
const multer = require("multer");
const path = require("path");

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

router.post('/createproduct', upload.single("image"), createProduct)
router.get('/getproducts', getProduct)
router.put('/updateproduct/:id', upload.single("image"), updateProduct)
router.delete('/deleteproduct/:id', deleteProduct)
router.put('/updateavilable/:id', suspendProduct)



module.exports = router;
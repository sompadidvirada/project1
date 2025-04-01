const express = require("express");
const {
  createCategory,
  getCategorys,
  deleteCategory,
  updateCategory,
} = require("../controller/category");
const { authCheck, adminCheck } = require("../middleware/authCheck");
const router = express.Router();

router.post("/createcategory", authCheck, createCategory);
router.get("/getcategorys",authCheck, getCategorys);
router.delete("/deletecategory/:id", authCheck, adminCheck, deleteCategory);
router.put('/updatecategory/:id',authCheck, updateCategory)

module.exports = router;

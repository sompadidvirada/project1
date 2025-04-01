const express = require("express");
const {
  createBrach,
  getBrach,
  updateBrach,
  deleteBrach,
} = require("../controller/brach");
const { authCheck, adminCheck } = require("../middleware/authCheck");
const router = express.Router();

router.post("/createbrach", authCheck, createBrach);
router.get("/getbrachs", authCheck, getBrach);
router.put("/updatebrach/:id", authCheck, adminCheck, updateBrach);
router.delete("/deletebrach/:id", authCheck, adminCheck, deleteBrach);

module.exports = router;

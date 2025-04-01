const express = require("express");
const router = express.Router();
const { authCheck, adminCheck } = require("../middleware/authCheck");
const { getSalesByDateRange, getTotalSell, getSellLineChart } = require("../controller/getDataSell");


router.post('/getDatesell', getSalesByDateRange)
router.post('/totalsell', getTotalSell)
router.post('/getdataline', getSellLineChart)



module.exports = router;

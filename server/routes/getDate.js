const express = require("express");
const router = express.Router();
const { authCheck, adminCheck } = require("../middleware/authCheck");
const { getSalesByDateRange, getTotalSell, getSellLineChart, getDataPieChart, dataTrack, TotalData } = require("../controller/getDataSell");


router.post('/getDatesell',authCheck, getSalesByDateRange)
router.post('/totalsell',authCheck, getTotalSell)
router.post('/getdataline',authCheck, getSellLineChart)
router.post('/getdatapiechart',authCheck, getDataPieChart)
router.post('/datatrack',authCheck, dataTrack)
router.post('/totaldata',authCheck, TotalData)


module.exports = router;

const express = require("express");
const router = express.Router();
const { createCalendar, getCalendar } = require("../controller/calendar");

router.post('/createcalendar', createCalendar)
router.get('/getcalendar/:id', getCalendar)

module.exports = router;
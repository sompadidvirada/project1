const express = require("express");
const router = express.Router();
const { createCalendar, getCalendar, updateCalendar, deleteCalendar } = require("../controller/calendar");

router.post('/createcalendar', createCalendar)
router.get('/getcalendar/:id', getCalendar)
router.put('/updatecalendar/:id', updateCalendar)
router.delete('/deletecalendar/:id', deleteCalendar)

module.exports = router;
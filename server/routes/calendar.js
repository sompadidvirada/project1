const express = require("express");
const router = express.Router();
const { createCalendar, getCalendar, updateCalendar, deleteCalendar, getCalendarAdmin } = require("../controller/calendar");

router.post('/createcalendar', createCalendar)
router.get('/getcalendar/:id', getCalendar)
router.put('/updatecalendar/:id', updateCalendar)
router.delete('/deletecalendar/:id', deleteCalendar)
router.get('/getcalendaradmin', getCalendarAdmin)

module.exports = router;
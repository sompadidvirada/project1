const express = require("express");
const router = express.Router();
const { createCalendar, getCalendar, updateCalendar, deleteCalendar, getCalendarAdmin, updateSuccessPo } = require("../controller/calendar");

router.post('/createcalendar', createCalendar)
router.get('/getcalendar/:id', getCalendar)
router.put('/updatecalendar/:id', updateCalendar)
router.delete('/deletecalendar/:id', deleteCalendar)
router.get('/getcalendaradmin', getCalendarAdmin)
router.put('/updatesuccesspo/:id', updateSuccessPo)

module.exports = router;
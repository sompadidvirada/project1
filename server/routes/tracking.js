const express = require("express");
const {
  tracksell,
  tracksend,
  trackexp,
  checkTrackSell,
  checkTrackSend,
  checkTrackExp,
  updateTrackSell,
  updateTrackSend,
  updateTrackExp,
} = require("../controller/tracking");
const router = express.Router();
const { authCheck, adminCheck } = require("../middleware/authCheck");

router.post("/tracksell", authCheck, tracksell);
router.post("/tracksend", authCheck, tracksend);
router.post("/trackexp", authCheck, trackexp);
router.post("/checktracksell", authCheck, checkTrackSell);
router.post("/checktracksend", authCheck, checkTrackSend);
router.post("/checktrackexp", authCheck, checkTrackExp);
router.put("/updatetracksell/:id", authCheck, updateTrackSell);
router.put("/updatetracksend/:id", authCheck, updateTrackSend);
router.put("/updatetrackexp/:id", authCheck, updateTrackExp);

module.exports = router;

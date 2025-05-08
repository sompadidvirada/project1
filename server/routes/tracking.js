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
  deleteTrackSell,
  deleteTrackSend,
  deleteTrackEXP,
} = require("../controller/tracking");
const router = express.Router();
const { authCheck, adminCheck } = require("../middleware/authCheck");
const { dataTrack } = require("../controller/getDataSell");

router.post("/tracksell", authCheck, tracksell);
router.post("/tracksend", authCheck, tracksend);
router.post("/trackexp", authCheck, trackexp);
router.post("/checktracksell", authCheck, checkTrackSell);
router.post("/checktracksend", authCheck, checkTrackSend);
router.post("/checktrackexp", authCheck, checkTrackExp);
router.post("/updatetracksell", authCheck, updateTrackSell);
router.post("/updatetracksend", authCheck, updateTrackSend);
router.post("/updatetrackexp", authCheck, updateTrackExp);
router.post("/deletealltracksell", authCheck, deleteTrackSell);
router.post("/deletealltracksend", authCheck, deleteTrackSend);
router.post("/deletealltrackexp", authCheck, deleteTrackEXP);

module.exports = router;

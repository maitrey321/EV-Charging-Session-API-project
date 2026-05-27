const express = require("express");
const router = express.Router();

const {
startSession,
updateReading,
stopSession,
getSession
} = require("../controllers/sessionController");

router.post("/start",startSession);
router.put("/update",updateReading);
router.put("/stop",stopSession);
router.get("/:id",getSession);
module.exports = router;
const express = require("express");
const physicianRouter = require("./physicianRouter");
const patientRouter = require("./patientRouter");
const appointmentRouter = require("./appointmentRouter");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Its working!");
});

router.use("/physician", physicianRouter);
router.use("/patient", patientRouter);
router.use("/appointment", appointmentRouter);

module.exports = router;
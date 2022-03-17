const express = require("express");
const appointmentRouter = express.Router();
const appointmentController = require("../controllers/appointmentController");
const auth = require("../middlewares/auth");


appointmentRouter.post("/newAppointment",
    auth,
    appointmentController.newAppointment);

appointmentRouter.post("/searchAppointmentByPatientId",
    auth,
    appointmentController.searchAppointmentByPatientId);

appointmentRouter.post("/searchAppointmentByPhysicianId",
    auth,
    appointmentController.searchAppointmentByPhysicianId);

appointmentRouter.delete("/deleteAppointment/:id",
    auth,
    appointmentController.deleteAppointment);


module.exports = appointmentRouter
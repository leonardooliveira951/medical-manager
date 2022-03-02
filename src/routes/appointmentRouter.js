const express = require("express");
const appointmentRouter = express.Router();
const appointmentController =
    require("../controllers/appointmentController");

appointmentRouter.post("/newAppointment",
    appointmentController.newAppointment);

appointmentRouter.post("/searchAppointmentByPatientId",
    appointmentController.searchAppointmentByPatientId);

appointmentRouter.post("/searchAppointmentByPhysicianId",
    appointmentController.searchAppointmentByPhysicianId);

appointmentRouter.delete("/deleteAppointment/:id",
    appointmentController.deleteAppointment);


module.exports = appointmentRouter
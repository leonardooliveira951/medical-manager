const express = require("express");
const patientRouter = express.Router();
const patientController =
    require("../controllers/patientController");

patientRouter.get("/searchPatientByPhysicianId/:physicianId",
    patientController.searchPatientByPhysicianId);

patientRouter.post("/searchPatientByName",
    patientController.searchPatientByName);

patientRouter.post("/newPatient",
    patientController.newPatient);

patientRouter.put("/updatePatient",
    patientController.updatePatient);

module.exports = patientRouter
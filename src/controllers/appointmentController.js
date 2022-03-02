const { redirect } = require("express/lib/response");
const Patient = require("../models/Appointment");
const Appointment = require("../models/Appointment");
const Sequelize = require("sequelize");

module.exports = {
    async newAppointment(req, res) {
        const { physicianId, patientId, appointmentDate, description } = req.body;
        if (!physicianId || !patientId || !appointmentDate || !description) {
            res.status(400).json({ msg: "Dados obrigatórios não foram preenchidos."
            });
        }

        const isAppointmentValid = await Appointment.findOne({
            where: {
              physicianId,
              appointmentDate
            },
        }).catch((error) => {
            throw new Error(error);
        });

        if (isAppointmentValid)
            res.status(403).json({ msg: "Horário não disponível para o médico selecionado." });
        else {
            const appointment = await Appointment.create({
                physicianId,
                patientId,
                appointmentDate,
                description,
            }).catch((error) => {
                res.status(500).json({ msg: "Não foi possível inserir os dados." });
            });
            if (appointment)
                res.status(201).json({ msg: "Nova consulta foi marcada." });
            else
                res.status(404).json({ msg: "Não foi possível marcar nova consulta." });
        }
    },    

    async searchAppointmentByPatientId(req, res) {
        const  patientId  = req.body.patientId;
        if (!patientId) {
            res.status(400).json({ msg: "ID do paciente está vazio."
            });
        }
        const Op = Sequelize.Op;
        const appointment = await Appointment.findAll({
            where: { patientId },
        });

        if (appointment) {
            if (appointment == "")
                res.status(404).json({ msg: "Consulta não encontrada." });
            else res.status(200).json({ appointment });
        } else
            res.status(404).json({
                msg: "Consulta não encontada."
            });
    },

    async searchAppointmentByPhysicianId(req, res) {
        const  physicianId  = req.body.physicianId;
        if (!physicianId) {
            res.status(400).json({ msg: "ID do médico está vazio."
            });
        }
        const Op = Sequelize.Op;
        const appointment = await Appointment.findAll({
            where: { physicianId },
        });

        if (appointment) {
            if (appointment == "")
                res.status(404).json({ msg: "Consulta não encontrada." });
            else res.status(200).json({ appointment });
        } else
            res.status(404).json({
                msg: "Consulta não encontada."
            });
    },

    async deleteAppointment(req, res) {
        const id = req.params.id;

        const deletedAppointment = await Appointment.destroy({
            where: { id },
        }).catch(async (error) => {
                res.status(500).json({ msg: "Falha na conexão." });
            });
            
        if (deletedAppointment != 0)
            res.status(200).json({ msg: "Consulta excluída com sucesso." });
        else res.status(404).json({ msg: "Consulta não encontrada." });
    },
}
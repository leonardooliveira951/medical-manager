const { redirect } = require("express/lib/response");
const Patient = require("../models/Patient");
const Appointment = require("../models/Appointment");
const Sequelize = require("sequelize");

module.exports = {
    async newPatient(req, res) {
        const { name, email, phone } = req.body;
        if (!name || !email || !phone) {
            res.status(400).json({ msg: "Dados obrigatórios não foram preenchidos."
            });
        }

        const isPatientNew = await Patient.findOne({
            where: { email },
        });

        if (isPatientNew)
            res.status(403).json({ msg: "Médico já cadastrado." });
        else {
            const patient = await Patient.create({
                name,
                email,
                phone,
            }).catch((error) => {
                res.status(500).json({ msg: "Não foi possível inserir os dados." });
            });
            if (patient)
                res.status(201).json({ msg: "Novo paciente foi adicionado." });
            else
                res.status(404).json({ msg: "Não foi possível cadastrar novo paciente." });
        }
    },

    async searchPatientByName(req, res) {
        const  name  = req.body.name;
        if (!name) {
            res.status(400).json({ msg: "Parâmetro nome está vazio."
            });
        }
        const Op = Sequelize.Op;
        const patient = await Patient.findAll({
            where: { name: { [Op.like]: "%" + name + "%" } },
        });

        if (patient) {
            if (patient == "")
                res.status(404).json({ msg: "Paciente não encontrado." });
            else res.status(200).json({ patient });
        } else
            res.status(404).json({
                msg: "Paciente não encontado."
            });
    },

    async updatePatient(req, res) {
        const patientId = req.body.id;
        const patient = req.body;
        if (!patientId)
            res.status(400).json({ msg: "ID do Paciente vazio." });
        else {
            const patientExists = await Patient.findByPk(patientId);
            if (!patientExists)
                res.status(404).json({ msg: "Paciente não encontrado." });
            else {
                if (patient.name || patient.email || patient.phone) {
                    await Patient.update(patient, {
                        where:  { id: patientId },
                    });
                    return res.status(200).json({ msg: "Paciente atualizado com sucesso." });
                } else
                    return res.status(400).json({ msg: "Campos obrigatórios não preenchidos." });
            }
        }
    },

    //TODO implementar a buscar pelo ID do médico
    async searchPatientByPhysicianId(req, res) {
        const  physicianId  = req.params.physicianId;
        if (!physicianId) {
            res.status(400).json({ msg: "ID do médico está vazio."
            });
        }
        const Op = Sequelize.Op;
        const patient = await Patient.findAll({
            where: { physicianId },
        });

        if (patient) {
            if (patient == "")
                res.status(404).json({ msg: "Paciente não encontrado." });
            else res.status(200).json({ patient });
        } else
            res.status(404).json({
                msg: "Paciente não encontado."
            });
    },
}
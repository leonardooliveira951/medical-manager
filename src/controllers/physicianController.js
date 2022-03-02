const { redirect } = require("express/lib/response");
const Physician = require("../models/Physician");
const Sale = require("../models/Appointment");
const Sequelize = require("sequelize");

module.exports = {
    async listAllPhysicians(req, res) {
        const physicians = await Physician.findAll({
            order: [["name", "ASC" ]],
        }).catch((error) => {
            redirect.status(500).json({ msg: "Falha na conexão." });
        });
        if (physicians) res.status(200).json({ physicians });
        else
            res.status(404).json(
                { msgm: "Não foi possível encontrar médicos." });
    },

    async newPhysician(req, res) {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ msg: "Dados obrigatórios não foram preenchidos."
            });
        }

        const isPhysicianNew = await Physician.findOne({
            where: { email },
        });

        if (isPhysicianNew)
            res.status(403).json({ msg: "Médico já cadastrado." });
        else {
            const physician = await Physician.create({
                name,
                email,
                password,
            }).catch((error) => {
                res.status(500).json({ msg: "Não foi possível inserir os dados." });
            });
            if (physician)
                res.status(201).json({ msg: "Novo médico foi adicionado." });
            else
                res.status(404).json({ msg: "Não foi possível cadastrar novo médico." });
        }
    },

    async updatePhysician(req, res) {
        const physicianId = req.body.id;
        const physician = req.body;
        if (!physicianId)
            res.status(400).json({ msg: "ID do Médico vazio." });
        else {
            const physicianExists = await Physician.findByPk(physicianId);
            if (!physicianExists)
                res.status(404).json({ msg: "Médico não encontrado." });
            else {
                if (physician.name || physician.email) {
                    await Physician.update(physician, {
                        where:  { id: physicianId },
                    });
                    return res.status(200).json({ msg: "Médico atualizado com sucesso." });
                } else
                    return res.status(400).json({ msg: "Campos obrigatórios não preenchidos." });
            }
        }
    },

    async deletePhysician(req, res) {
        const physicianId = req.params.id;
        const deletedPhysician = await Physician.destroy({
            where: {id: physicianId },
        }).catch(async (error) => {
            const physicianHasRef = await Appointment.findOne({
                where: { physicianId },
            }).catch((error) => {
                res.status(500).json({ msg: "Falha na conexão." });
            });
            if (physicianHasRef)
                return res.status(403).json({ msg: "Médico possui consultas em seu nome." });
        });
        if (deletedPhysician != 0)
            res.status(200).json({ msg: "Médico excluído com sucesso." });
        else res.status(404).json({ msg: "Médico não encontrado." });
    },
}
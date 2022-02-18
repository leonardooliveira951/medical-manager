'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Appointments",
      [
        {
          physicianId: 1,
          patientId: 2,
          appointmentDate: "2022-02-20",
          description: "Sintomas de virose",
        },
        {
          physicianId: 1,
          patientId: 3,
          appointmentDate: "2022-03-15",
          description: "Checkup",
        },
        {
          physicianId: 2,
          patientId: 5,
          appointmentDate: "2022-02-27",
          description: "Sintomas de gripe",
        },
        {
          physicianId: 2,
          patientId: 2,
          appointmentDate: "2022-03-01",
          description: "Avaliação",
        },
        {
          physicianId: 3,
          patientId: 2,
          appointmentDate: "2022-04-03",
          description: "Encaminhamento",
        },
        {
          physicianId: 3,
          patientId: 4,
          appointmentDate: "2022-02-21",
          description: "Primeira consulta para acompanhamento",
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Appointments", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      physicianId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: "Physicians", key: "id" },
        onUpdate: "RESTRICT",
        onDelete: "RESTRICT",
      },
      patientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: "Patients", key: "id" },
        onUpdate: "RESTRICT",
        onDelete: "RESTRICT",
      },
      appointmentDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("Appointments");
  },
};

'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Patients",
      [
      {
        name: "Oswaldo Queiroz",
        email: "oswaldo.q@gmail.com",
        phone: "(41)99877-9527",
      },
      {
        name: "Lucinda Câmara",
        email: "lucinda.c@gmail.com",
        phone: "(41)99744-6666",
      },
      {
        name: "Diego Liberto",
        email: "diego.l@gmail.com",
        phone: "(41)99934-4521",
      },
      {
        name: "Roberto Carlos",
        email: "roberto.c@gmail.com",
        phone: "(41)99534-3578",
      },
      {
        name: "Juca Balolo",
        email: "juca.b@gmail.com",
        phone: "(42)99788-4567",
      },
      {
        name: "Jurema Semblante",
        email: "jurema.s@gmail.com",
        phone: "(41)99451-3874",
      },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete
      ("Patients", null, {});
  }
};

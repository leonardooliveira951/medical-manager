'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Physicians",
      [
      {
        name: "Glória Esteves",
        email: "g.esteves@gmail.com",
        password: "12345",
      },
      {
        name: "Glauco Rocha",
        email: "g.rocha@gmail.com",
        password: "54321",
      },
      {
        name: "Fabia Krum",
        email: "f.krum@gmail.com",
        password: "15243",
      },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete
      ("Physicians", null, {});
  }
};

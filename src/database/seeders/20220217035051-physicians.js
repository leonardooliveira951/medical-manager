'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Physicians",
      [
      {
        name: "Glória Esteves",
        email: "g.esteves@gmail.com",
        password: "$2a$12$cNikdLRaHqtWduj.9qpIkOU0RY/vJCogtC2pXM5xixNIg4CJYxr2y",
      },
      {
        name: "Glauco Rocha",
        email: "g.rocha@gmail.com",
        password: "$2a$12$cNikdLRaHqtWduj.9qpIkOU0RY/vJCogtC2pXM5xixNIg4CJYxr2y",
      },
      {
        name: "Fabia Krum",
        email: "f.krum@gmail.com",
        password: "$2a$12$cNikdLRaHqtWduj.9qpIkOU0RY/vJCogtC2pXM5xixNIg4CJYxr2y",
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

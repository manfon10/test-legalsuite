"use strict";
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    const lawyers = [
      {
        id: uuidv4(),
        name: "Juan Pérez",
        email: "juan.perez@example.com",
        phone: "3001234567",
        specialization: "Civil",
        status: "active",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "María Gómez",
        email: "maria.gomez@example.com",
        phone: "3017654321",
        specialization: "Labor",
        status: "active",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert("lawyers", lawyers, {});
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("lawyers", null, {});
  },
};

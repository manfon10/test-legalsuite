"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const passwordHash = await bcrypt.hash("Admin123", 10);

    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: Sequelize.Utils.toDefaultValue(Sequelize.UUIDV4()),
          username: "admin",
          password: passwordHash,
          role: "admin",
          refresh_token: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: Sequelize.Utils.toDefaultValue(Sequelize.UUIDV4()),
          username: "operator1",
          password: await bcrypt.hash("Operator123", 10),
          role: "operator",
          refresh_token: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};

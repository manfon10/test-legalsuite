"use strict";
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [lawyers] = await queryInterface.sequelize.query(`SELECT id FROM "lawyers" LIMIT 2;`);

    const lawsuits = [
      {
        id: Sequelize.Utils.toDefaultValue(Sequelize.UUIDV4()),
        case_number: "CIV-2025-001",
        plaintiff: "Carlos Ramírez",
        defendant: "Empresa XYZ",
        status: "civil",
        case_type: "Demanda de daños",
        lawyer_id: lawyers[0].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: Sequelize.Utils.toDefaultValue(Sequelize.UUIDV4()),
        case_number: "LAB-2025-002",
        plaintiff: "Ana Torres",
        defendant: "Empresa ABC",
        status: "labor",
        case_type: "Despido injustificado",
        lawyer_id: lawyers[1].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert("lawsuits", lawsuits, {});
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("lawsuits", null, {});
  },
};

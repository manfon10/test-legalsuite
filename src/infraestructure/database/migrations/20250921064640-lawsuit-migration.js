"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("lawsuits", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      case_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      plaintiff: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      defendant: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("civil", "criminal", "labor", "commercial"),
        allowNull: false,
      },
      case_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lawyer_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "lawyers",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("lawsuits");
  },
};

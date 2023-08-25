'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable('patients', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: { 
        type: Sequelize.STRING,
        allowNull: false
      },
      dataNasc: {
        type:Sequelize.DATE,
      },
      CPF: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        defaultValue: 1
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * 
     */
    await queryInterface.dropTable('patients');
  }
};

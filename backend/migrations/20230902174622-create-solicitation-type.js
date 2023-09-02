"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("solicitation_type", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },

            description: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            status: {
                type: Sequelize.SMALLINT,
                allowNull: false,
                defaultValue: 1,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("solicitation_type");
    },
};

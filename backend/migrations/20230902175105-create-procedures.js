"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("procedures", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },

            description: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            type_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "solicitation_type",
                    key: "id",
                },
            },

            status: {
                type: Sequelize.SMALLINT,
                allowNull: false,
                defaultValue: 1,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("procedures");
    },
};

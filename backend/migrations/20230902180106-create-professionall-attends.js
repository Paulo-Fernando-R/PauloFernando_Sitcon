"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("professional_attends", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            procedure_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "procedures",
                    key: "id",
                },
            },

            professional_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "professionals",
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
        await queryInterface.dropTable("professional_attends");
    },
};

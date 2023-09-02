const connection = require("../database/connection");

const responseModel = {
    sucess: false,
    data: [],
    error: [],
};

module.exports = {
    async create(req, res) {
        const response = { ...responseModel };
        try {
            const { name, dataNasc, CPF } = req.body;
            const [, affectedRows] = await connection.query(
                `insert into patients (name, dataNasc, CPF) values ('${name}','${dataNasc}', '${CPF}');`
            );
            response.sucess = affectedRows > 0;
            response.data = {};
            response.error = {};
            res.statusCode = 204;
            return res.json(response);
        } catch (error) {
            response.error = error.original;
            response.data = {};
            response.sucess = false;
            res.statusCode = 400;
            res.json(response);
            return res;
        }
    },

    async read(req, res) {
        const response = { ...responseModel };

        try {
            const [, data] = await connection.query(`SELECT * FROM patients`);
            res.statusCode = 200;
            response.data = data;
            response.sucess = true;
            response.error = {};
            return res.json(response);
        } catch (error) {
            response.error = error.original;
            response.data = {};
            response.sucess = false;
            res.statusCode = 400;
            res.json(response);
            return res;
        }
    },
};

const connection = require("../database/connection");
const responseModel = require("./responseModels");

module.exports = {
    async read(req, res) {
        const response = {...responseModel};

        try {
            const [, data] = await connection.query(`SELECT * FROM procedures`);
            res.statusCode = 200;
            response.data = data;
            response.success = true;
            response.error = {};
            return res.json(response);
        } catch (error) {
            response.error = error.original;
            response.data = {};
            response.success = false;
            res.statusCode = 400;
            res.json(response);
            return res;
        }
    },
    
};

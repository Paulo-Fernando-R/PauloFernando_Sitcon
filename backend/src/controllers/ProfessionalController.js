const connection = require("../database/connection");
const responseModel = require("./responseModels");

module.exports = {
    async read(req, res) {
        const response = { ...responseModel };

        try {
            const [, data] = await connection.query(`SELECT * FROM professionals`);
            res.statusCode = 200;
            response.data = data;
            response.sucess = true;
            response.error = {};
            return res.json(response);
        } catch (error) {
            response.error = error.original;
            response.data = {};
            response.sucess = false;
            res.json(response);
            return res;
        }
    },

    async getProfessionalProcedures(req, res) {
        const response = { ...responseModel };
        console.log("reqid", req.params.id)
        try {
            const [, data] =
                await connection.query(`select p.id, p.description, p.type_id as procedure_type 
                from procedures as p  
                inner join professional_attends as pa on p.id = pa.procedure_id 
                inner join professionals as pf on pf.id = pa.professional_id
                where pf.id = ${req.params.id} and pf.status != 0;`);
            res.statusCode = 200;
            response.data = data;
            response.sucess = true;
            response.error = {};
            return res.json(response);
        } catch (error) {
            response.error = error.original;
            response.data = {};
            response.sucess = false;
            res.json(response);
            return res;
        }
    },
};

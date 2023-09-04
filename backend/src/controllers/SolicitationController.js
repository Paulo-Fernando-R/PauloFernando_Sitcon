const connection = require("../database/connection");
const responseModel = require("./responseModels");

module.exports = {
    async read(req, res) {
        const response = { ...responseModel };

        try {
            const [, data] =
                await connection.query(`select solicitation_id, pa.name, pa.CPF, pr.type_id, pr.description, so.solicitation_datetime from solicitation as so
            inner join solicitation_procedures as sp on sp.solicitation_id = so.id
            inner join procedures as pr on pr.id = sp.procedure_id 
            inner join patients as pa on pa.id = so.patient_id;
            `);

            // const aux = JSON.parse(data);
            // const temp = [];
            // const newList = [];

            // aux.forEach((e) => {
            //     const item = temp.find((el) => el.solicitation_id === e.solicitation_id);
            //     if(item){

            //     }
            // })
            // const 
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

    async create(req, res) {
        const response = { ...responseModel };

        try {
            const { professional_id, patient_id, date_time, procedures } = req.body;

            if (!professional_id) {
                res.statusCode = 400;
                response.sucess = false;
                response.error = "professional_id is required";
                return res.json(response);
            }
            if (!patient_id) {
                res.statusCode = 400;
                response.sucess = false;
                response.error = "patient_id is required";
                return res.json(response);
            }
            if (!date_time) {
                res.statusCode = 400;
                response.sucess = false;
                response.error = "date_time is required";
                return res.json(response);
            }
            if (!procedures) {
                res.statusCode = 400;
                response.sucess = false;
                response.error = "procedures is required";
                return res.json(response);
            }

            if (!parseInt(procedures) && !JSON.parse(procedures)) {
                res.statusCode = 400;
                response.sucess = false;
                response.error = "procedures need is number or array";
                return res.json(response);
            }

            const formatedDate = date_time.replace("T", " ").replace(".000Z", "");

            const data = await connection.query(
                `insert into solicitation (patient_id, professional_id, solicitation_datetime) values 
                (${patient_id}, ${professional_id}, '${formatedDate}');`
            );

            if (!data) {
                res.statusCode = 500;
                response.sucess = false;
                response.error = "internal server error";
                return res.json(response);
            }

            if (parseInt(procedures)) {
                const resp = await connection.query(
                    `insert into solicitation_procedures(solicitation_id, procedure_id) 
                    values (${data[0]}, ${procedures});`
                );

                if (!resp) {
                    await connection.query(
                        `DELETE FROM solicitation where solicitation.id = ${data[0]}`
                    );
                    res.statusCode = 500;
                    response.sucess = false;
                    response.error = "internal server error";
                    return res.json(response);
                }
                res.statusCode = 204;
                response.data = {};
                response.error = {};
                response.sucess = true;

                return res.json(response);
            }

            JSON.parse(procedures).forEach(async (element) => {
                const resp = await connection.query(
                    `insert into solicitation_procedures(solicitation_id, procedure_id) 
                    values (${data[0]}, ${element});`
                );

                if (!resp) {
                    await connection.query(
                        `DELETE FROM solicitation where solicitation.id = ${data[0]}`
                    );
                    res.statusCode = 500;
                    response.sucess = false;
                    response.error = "internal server error";
                    return res.json(response);
                }
            });

            res.statusCode = 204;
            response.data = {};
            response.error = {};
            response.sucess = true;

            return res.json(response);
        } catch (error) {
            console.log(error);
            response.error = error.original;
            response.data = {};
            response.sucess = false;
            res.statusCode = 400;
            res.json(response);
            return res;
        }
    },
};

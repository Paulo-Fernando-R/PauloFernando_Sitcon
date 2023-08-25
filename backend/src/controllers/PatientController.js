const connection = require("../database/connection");

const responseModel = {
  sucess: false,
  data: [],
  error: [],
};

module.exports = {
  async create(req, res) {
    const response = { ...responseModel };
    const { name, dataNasc, CPF, status } = req.body;
    const [, affectedRows] = await connection.query(
      `insert into pacientes (nome, dataNasc, CPF, status) values ('${name}','${dataNasc}', '${CPF}', ${status});`
    );

    response.sucess = affectedRows > 0;
    return res.json(response);
  },

  async read(req, res){
    const response = { ...responseModel };
    const [, data] = await connection.query(`SELECT * FROM patients`)
  }
};

// nome, dataNasc, CPF, status

import { request } from "../services/rest-client/rest-interceptor";

import { BadRequestError, UnknowmError } from "../exceptions/custom-exceptions";

async function getAllProcedures() {
    try {
        const response = await request.get("/patients");

        if (response.status === 400) {
            throw new BadRequestError("Não foi possível carregar");
        }
        return response.data;
    } catch (error) {
        console.log(error);
        throw new UnknowmError();
    }
}
async function getProcedureTypes() {
    try {
        const response = await request.get("/solicitation/type");

        if (response.status === 400) {
            throw new BadRequestError("Não foi possível carregar");
        }
        return response.data;
    } catch (error) {
        console.log(error);
        throw new UnknowmError();
    }
}

async function getProceduresByProfessional(id) {
    try {
        const response = await request.get(`/professionals/procedures/${id}`);

        if (response.status === 400) {
            throw new BadRequestError("Não foi possível carregar");
        }
        return response.data;
    } catch (error) {
        console.log(error);
        throw new UnknowmError();
    }
}

export const procedureRepository = {
    getAll: getAllProcedures,
    getByProfessional: getProceduresByProfessional,
    getProcedureTypes: getProcedureTypes,
};

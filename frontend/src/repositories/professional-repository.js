import { request } from "../services/rest-client/rest-interceptor";

import { BadRequestError, UnknowmError } from "../exceptions/custom-exceptions";

async function getAllProfessionals() {
    try {
        const response = await request.get("/professionals");

        if (response.status === 400) {
            throw new BadRequestError("Não foi possível carregar");
        }
        return response.data;
    } catch (error) {
        console.log(error);
        throw new UnknowmError();
    }
}

export const professionalRepository = {
    getAll: getAllProfessionals,
};

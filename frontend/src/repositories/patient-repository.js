import { request } from "../services/rest-client/rest-interceptor";

import { BadRequestError, NotFoundError, UnknowmError } from "../exceptions/custom-exceptions";

async function getAllPatients() {
    try {
        const response = await request.get("/patients");
        
        if (response.status === 400) {
            throw new BadRequestError("Não foi possível carregar");
        }
        return response.data;
    } catch (error) {
        console.log(error)
        throw new UnknowmError();
    }
}

export const patientRepository = {
    getAll: getAllPatients,
};

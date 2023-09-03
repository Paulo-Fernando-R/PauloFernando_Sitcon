import { request } from "../services/rest-client/rest-interceptor";

import { BadRequestError, UnknowmError } from "../exceptions/custom-exceptions";

async function createSolicitation(professionalId, patientId, dateTime, procedures) {
    const body = {
        professional_id: professionalId,
        patient_id: patientId,
        date_time: dateTime,
        procedures: procedures,
    };

    try {
        const response = await request.post("/solicitation", body);
        if (response.status === 400) {
            throw new BadRequestError("Não foi possível carregar");
        }

        return response.data;
    } catch (error) {
        console.log(error);
        throw new UnknowmError();
    }
}

export const solicitationRepository = {
    create: createSolicitation,
};

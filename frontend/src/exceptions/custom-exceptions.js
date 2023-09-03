export class CustomError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}

export class BadRequestError extends CustomError {
    constructor(message, code = 400) {
        super(message, code);
        this.code = code;
    }
}

export class NotFoundError extends CustomError {
    constructor(message, code = 404) {
        super(message, code);
        this.code = code;
    }
}

export class UnknowmError extends CustomError {
    constructor(message = "Erro Desconhecido", code = 500) {
        super(message, code);
        this.code = code;
    }
}

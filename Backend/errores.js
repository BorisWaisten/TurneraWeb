// creamos un error personalizado para cuando una credencial es inválida en el login o en el update
export  class InvalidCredentialsError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidCredentialsError";
    }
}

export  class DatabaseError extends Error {
    constructor(message) {
        super(message);
        this.name = "DatabaseError";
    }
}
export  class ValidateError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidateError";
    }
}

export class ServicioError extends Error{
    constructor(message) {
        super(message);
        this.name = "ServicioError";
    }
}

module.exports = class ApiError extends Error{
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status
        this.errors = errors
    }

    static badRequest (message, errors = []) {
        return new ApiError(400, message, errors)
    }

    static unAuthorization () {
        return new ApiError(401, 'Пользователь не авторизован')
    }

    static internal (message){
        return new ApiError(500, message)
    }
}


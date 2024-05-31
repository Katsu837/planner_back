const ApiError = require('../error/ApiError')

function errorMiddleware(err, req, res, next) {
    console.error(err)
    if(err instanceof ApiError)
        return res.status(err.status).json({message: err.message, errors: err.errors})

    return res.status(500).json({message: "Непредвиденная ошибка"})
}

module.exports = errorMiddleware
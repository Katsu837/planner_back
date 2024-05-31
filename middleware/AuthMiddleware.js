const ApiError = require('../error/ApiError')
const {validateAccessToken} = require("../service/tokenService");
module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization
        if(!authorizationHeader)
            return next(ApiError.unAuthorization())

        const accessToken = authorizationHeader.split(' ')[1]
        if(!accessToken)
            return next(ApiError.unAuthorization())

        const userData = validateAccessToken(accessToken)
        if(!userData)
            return next(ApiError.unAuthorization())

        req.user = userData
        next();
    } catch (e) {
       return next(ApiError.unAuthorization())
    }
}
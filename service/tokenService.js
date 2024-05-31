const jwt = require('jsonwebtoken')
const {Token} = require('../models/models')

function generateToken (payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
    return {
        accessToken,
        refreshToken
    }
}
async function saveToken (userId, refreshToken) {
    const tokenData = await Token.findOne({ where: userId})
    if(tokenData) {
        tokenData.refreshToken = refreshToken
        return tokenData.save()
    }
    return await Token.create({refreshToken, userId})
}

async function removeToken (refreshToken) {
    const tokenData = await Token.destroy({where: {refreshToken}})
    return tokenData
}
function validateAccessToken (accessToken) {
    try {
        const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
        return userData
    } catch (e) {
        return null
    }
}

function validateRefreshToken (accessToken) {
    try {
        const userData = jwt.verify(accessToken, process.env.JWT_REFRESH_SECRET)
        return userData
    } catch (e) {
        return null
    }
}
async function findToken (token) {
    const tokenData = await Token.findOne({where: {token}})
    return tokenData
}

module.exports = {
    generateToken,
    saveToken,
    removeToken,
    validateRefreshToken,
    validateAccessToken,
    findToken,
}
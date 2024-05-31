const uuid = require('uuid')
const path = require('path')
const {User} = require("../models/models");
const ApiError = require("../error/ApiError");
async function editProfilePhoto (req, res, next) {
    try {
        const {userId} = req.params
        const {img} = req.files
        let fileName = uuid.v4() + ".jpg"
        await img.mv(path.resolve(__dirname, '..', 'static', fileName))

        const user = await User.update({photo: fileName}, {where: userId})
        return res.json(user)
    } catch (e) {
        next(ApiError.badRequest(e.message))
    }
}

async function editProfileInfo (req, res, next) {
    try {
        const userId = req.params.id
        const {firstName, secondName} = req.body
        await User.update({firstName: firstName, secondName: secondName}, {where: {id: userId}})
        const user = await User.findOne({where: {id: userId}})
        return res.json(user)
    } catch (e) {
        next(ApiError.badRequest(e.message))
    }
}

async function getProfileInfo (req, res, next) {
    try {
        const userId = req.params.id
        const user = await User.findByPk(userId)
        return res.json(user)
    } catch (e) {
        next(ApiError.badRequest(e.message))
    }
}

module.exports = {
    editProfileInfo,
    editProfilePhoto,
    getProfileInfo
}
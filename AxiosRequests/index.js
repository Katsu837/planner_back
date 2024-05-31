const axios = require('axios')

async function postQuery (req, route) {
    try {
        console.log(route)
        const response = await axios.post(route, req)
        return response.data
    } catch (e) {
        console.error(e.toJSON())
    }
}

async function getQuery (req, route) {
    try {
        const response = await axios.get(route + req)
        return response.data
    } catch (e) {
        console.error(e.toJSON())
    }
}

async function deleteQuery (route) {
    try {
        const response = await axios.delete(route)
        return response.data
    } catch (e) {
        console.error(err.toJSON())
    }
}


module.exports = {
    postQuery,
    getQuery,
    deleteQuery

}
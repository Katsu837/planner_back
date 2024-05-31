require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const sequelize = require('./db')
const router = require('./routes/index')
const errorMiddleware = require('./middleware/ErrorMidleware')

const PORT = process.env.PORT || 5100
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors( {
    "Access-Control-Allow-Origin": "http://localhost:5173",
}))
app.use('/', router)
app.use(errorMiddleware)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server start on PORT = ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()


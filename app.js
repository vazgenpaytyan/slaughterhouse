global.Sequelize = require('sequelize')
const express = require('express')
const app = express()

app.use(express.json())

global.sequelize = new Sequelize(
    "SlaughterhouseDB", "vazgen1077", "1234",
    {
        dialect: "mssql",
        host: "localhost",
        port: "1433",
    define: {
        freezeTableName: true,
        timestamps: false
        }
    }
)

app.use('/api', require('./Controllers'))
app.use('/auth', require('./Auth'))

app.listen(8080, () => {
    console.log('Server running')
})
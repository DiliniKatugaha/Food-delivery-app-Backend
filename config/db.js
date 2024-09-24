const sql = require('mysql2')
require ('dotenv').config()
const pool = sql.createPool({

    host:'localhost',
    user:process.env.USER,
    password:'',
    database:process.env.DATABASE,
    port:process.env.DBPORT,
    dateStrings:true
})

module.exports = pool.promise();
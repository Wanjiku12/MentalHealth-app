const mysql2 = require('mysql2');
require('dotenv/config');

const con = mysql2.createPool({
    host: 'localhost',
    database: 'tulia_wellness',
    user: 'root',
    password: 'TuliaW'
})

con.getConnection(e=>{ 
    if(e)console.error(e)
    console.log("connected !")
})

module.exports = con;
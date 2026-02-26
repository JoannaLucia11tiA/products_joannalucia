const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    host: 'benserverplex.ddns.net',
    user: 'alunos',
    password: 'senhaAlunos',
    database: 'web_03ma',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

module.exports = pool

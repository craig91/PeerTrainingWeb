const mysql = require('mysql2/promise');


const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const filePool = mysql.createPool({
    host: process.env.FILE_DB_HOST,
    user: process.env.FILE_DB_USER,
    password: process.env.FILE_DB_PASSWORD,
    database: process.env.FILE_DB_NAME,
});

pool.getConnection()
    .then(() => console.log('Database connected successfully!'))
    .catch((err) => console.error('Database connection failed:', err.message));


filePool.getConnection()
    .then(() => console.log('File database connected successfully!'))
    .catch((err) => console.error('File database connection failed:', err.message));

module.exports = { pool, filePool };

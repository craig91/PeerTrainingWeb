const mysql = require('mysql2/promise');
require('dotenv').config({ path: '../.env' });
// require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);


pool.getConnection()
    .then(() => console.log('Database connected successfully!'))
    .catch((err) => console.error('Database connection failed:', err.message));

module.exports = pool;

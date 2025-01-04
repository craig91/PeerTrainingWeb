const express = require('express');
const pool = require('./config/db');
require('dotenv').config({ path: '../.env' });

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());


// app.get('/', (req, res)=> {
//     res.send("API is running");
// });

app.get('/db-test', async (req, res) => {
    try {
        const[rows] = await pool.query('SELECT 1 + 1 AS solution');
        console.log('Query Result: ', rows);
        res.json({ result: rows[0].result });
    } catch (error) {
        console.error(error);
        res.status(500).send("Database connection failed");
    }
})

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);


app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
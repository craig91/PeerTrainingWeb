const express = require('express');
const pool = require('./config/db');
require('dotenv').config({ path: '../.env' });

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());


// app.get('/', (req, res)=> {
//     res.send("API is running");
// });


app.get('/users', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        try {
            const [results] = await connection.query('SELECT * FROM users');
            res.json(results);
        } catch (queryError) {
            console.error('Query Error: ', queryError);
            res.status(500).send('Internal Server Error');
        } finally {
            connection.release();
        }
    } catch (connectionError) {
        console.error('Connection Error:', connectionError);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/new', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        try {
            const { first_name, last_name, email, username } = req.body;
            const query = 'INSERT INTO users (first_name, last_name, email, username) VALUES (?, ?, ?, ?)';
            const [result] = await connection.query(query, [first_name, last_name, email, username]);
            res.status(201).json({ id: result.insertId, first_name, last_name, email, username });
        } catch (queryError) {
            console.error('Query Error:', queryError);
            res.status(500).send('Internal Server Error');
        } finally {
            connection.release();
        }
    } catch (connectionError) {
        console.error('Connection Error:', connectionError);
        res.status(500).send('Internal Server Error');
    }
});



console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);


app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
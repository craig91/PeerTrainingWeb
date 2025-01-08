const express = require('express');
require('dotenv').config();
const pool = require('./config/db');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

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
            console.log(req.query)
            const { first_name, last_name, email, username, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const query = 'INSERT INTO users (first_name, last_name, email, username, password) VALUES (?, ?, ?, ?, ?)';
            const [result] = await connection.query(query, [first_name, last_name, email, username, hashedPassword]);
            res.status(201).json({ id: result.insertId, first_name, last_name, email, username, password });
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


app.post('/login', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        try {
            const { username, password } = req.body;
            const query = 'SELECT * FROM users WHERE username = ?';
            const [results] = await connection.query(query, [username]);
            if (results.length === 0) {
                console.log(results);
                return res.status(401).send('Invalid username or password');
            }
            const users = results[0];
            const isPasswordValid = await bcrypt.compare(password, users.password);
            if (!isPasswordValid) {
                return res.status(401).send('Invalid username or password');
            }
            const token = jwt.sign({ id: users.id, username: users.username }, process.env.JWT_SECRET);   
            res.json({ token });
        } catch(queryError) {
            console.error('Query Error:', queryError);
            res.status(500).send('Internal Server Error');
        } finally {
            connection.release()
        }
    } catch (connectionError) {
        console.error('Connection Error:', connectionError);
        res.status(500).send('Internal Server Error');
    }
});



app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { pool, filePool } = require('./config/db');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 8080;


app.use(express.json());
app.use(cors());


const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
  
  const upload = multer({ storage });
  

  app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
  
    const userId = req.body.userId; 
    const filePath = req.file.path;
    const fileName = req.file.originalname;
  
    try {
      const connection = await filePool.getConnection();
      try {
        const query = 'INSERT INTO user_files (user_id, file_path, file_name) VALUES (?, ?, ?)';
        const [result] = await connection.query(query, [userId, filePath, fileName]);
        res.send({ id: result.insertId, userId, filePath, fileName });
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


app.post('/signup', async (req, res) => {
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
        console.log('Login request received:', req.body);
        const connection = await pool.getConnection();
        try {
            const { username, password } = req.body;
            const query = 'SELECT * FROM users WHERE username = ?';
            const [results] = await connection.query(query, [username]);
            if (results.length === 0) {
                console.log('No user found with username:', username);
                return res.status(401).json({error: 'Invalid username or password'});
            }
            const user = results[0];
            console.log('User found:', user);
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                console.log('Invalid password for user:', username);
                return res.status(401).json({error: 'Invalid username or password' });
            }
            const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });   
            res.json({ token, user: { id: user.id, username: user.username } });
        } catch(queryError) {
            console.error('Query Error:', queryError);
            res.status(500).json({error: 'Internal Server Error'});
        } finally {
            connection.release();
        }
    } catch (connectionError) {
        console.error('Connection Error:', connectionError);
        res.status(500).json({error: 'Internal Server Error'});
    }
});



app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});

module.exports = app;
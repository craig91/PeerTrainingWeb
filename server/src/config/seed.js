const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

async function seedDatabase() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'craig',
        password: 'password123',
        database: 'Training'
    });

    const hashedPassword = await bcrypt.hash('testPassword', 10);

    await connection.query(
        'INSERT INTO users (first_name, last_name, email, username, password) VALUES (?, ?, ?, ?, ?)',
        ['Test', 'User', 'testuser@example.com', 'testuser', hashedPassword]
    );

    await connection.end();
}

seedDatabase().catch(console.error);
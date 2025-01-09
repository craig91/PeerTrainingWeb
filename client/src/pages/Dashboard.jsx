import React from 'react';

function Dashboard() {
    return (
        <div className="dashboard">
            <header>
                <h1>Dashboard</h1>
                {/* {user && <p>Welcome, {user.username}!</p>} */}
            </header>
            <main>
                <section>
                    <h2>Welcome to the Dashboard</h2>
                    <p>This is the main page that everyone sees when first visiting the site</p>
                </section>
                <section>
                <h2>Users</h2>
                <ul>
                    <li>User 1</li>
                    <li>User 2</li>
                    <li>User 3</li>
                </ul>
                </section>
            </main>
            <footer>
                <p>&copy; 2025 Your Company</p>
            </footer>
        </div>
    );
}


export default Dashboard;
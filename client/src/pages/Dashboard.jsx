import React from 'react';

function Dashboard({ user }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          {/* {user && <p className="mt-2 text-gray-600">Welcome, {user.username}!</p>} */}
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <section className="bg-white shadow overflow-hidden sm:rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to the Dashboard</h2>
            <p className="text-gray-700">This is the main page that everyone sees when first visiting the site.</p>
          </section>
          <section className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Users</h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>User 1</li>
              <li>User 2</li>
              <li>User 3</li>
            </ul>
          </section>
        </div>
      </main>
      <footer className="bg-white shadow mt-6">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-gray-600">&copy; 2025 Your Company</p>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
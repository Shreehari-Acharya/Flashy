"use client"; // Required for client-side authentication

import { useState, useEffect } from "react";


export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Check if admin is already authenticated
    if (localStorage.getItem("adminAuthenticated") === "true") {
      setIsAuthenticated(true);
      fetchUsers();
    }
  }, []);

    const fetchUsers = async () => {
        try {
          const res = await fetch("/api/users");
          if (!res.ok) throw new Error("Failed to fetch users");
    
          const data = await res.json();
          setUsers(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === process.env.ADMIN_PASS) {
      setIsAuthenticated(true);
      localStorage.setItem("adminAuthenticated", "true"); // Remember authentication
      fetchUsers();
    } else {
      alert("Incorrect password!");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-6 bg-black">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {!isAuthenticated ? (
        // Password Prompt
        <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md">
          <label className="block text-lg font-semibold mb-2 text-blue-500">Enter Admin Password:</label>
          <input
            type="password"
            className="border p-2 rounded w-full mb-4 text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Login
          </button>
        </form>
      ) : (
        // User Table
        <>
          {loading ? (
            <p className="text-gray-600">Loading users...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="overflow-x-auto w-full max-w-7xl">
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="py-3 px-6 text-left">ID</th>
                    <th className="py-3 px-6 text-left">Username</th>
                    <th className="py-3 px-6 text-left">Password</th>
                    <th className="py-3 px-6 text-left">Full name</th>
                    <th className="py-3 px-6 text-left">Email</th>
                    <th className="py-3 px-6 text-left">UPI ID</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-100">
                      <td className="py-3 px-6 text-black">{user.id}</td>
                      <td className="py-3 px-6 text-black" >{user.username}</td>
                      <td className="py-3 px-6 truncate max-w-xs text-black">{user.password}</td>
                      <td className="py-3 px-6 text-black">{user.name}</td>
                      <td className="py-3 px-6 text-black">{user.email}</td>
                      <td className="py-3 px-6 text-black">{user.upiId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </main>
  );
}

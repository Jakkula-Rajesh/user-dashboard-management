import React, { useState, useEffect } from 'react';
import { getUsers, createUser } from '../api/userService';
import UserCard from '../components/UserCard';

const DashboardPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', street: '', city: '', zipcode: '', lat: '', lng: ''
  });
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data.data);
    } catch {
      setUsers([]);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      setSuccess('Name and email are required.');
      return;
    }
    try {
      await createUser(form);
      setForm({ name: '', email: '', phone: '', company: '', street: '', city: '', zipcode: '', lat: '', lng: '' });
      setSuccess('User added successfully!');
      fetchUsers();
      setTimeout(() => setSuccess(''), 2000);
    } catch {
      setSuccess(''); // Remove failed to add user text
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 max-w-5xl mx-auto min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-xl p-8 flex flex-col gap-4 max-w-lg mx-auto mt-6 border border-blue-100 animate-fade-in">
        <h2 className="text-2xl font-bold mb-2 text-blue-700 tracking-tight">Create New User</h2>
        {success && <p className="text-green-600 text-sm font-medium animate-fade-in">{success}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input className="border p-2 rounded focus:outline-blue-400 transition-all focus:ring-2 focus:ring-blue-200" name="name" value={form.name} onChange={handleChange} placeholder="Name" />
          <input className="border p-2 rounded focus:outline-blue-400 transition-all focus:ring-2 focus:ring-blue-200" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
          <input className="border p-2 rounded focus:outline-blue-400 transition-all focus:ring-2 focus:ring-blue-200" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
          <input className="border p-2 rounded focus:outline-blue-400 transition-all focus:ring-2 focus:ring-blue-200" name="company" value={form.company} onChange={handleChange} placeholder="Company" />
          <input className="border p-2 rounded focus:outline-blue-400 transition-all focus:ring-2 focus:ring-blue-200" name="street" value={form.street} onChange={handleChange} placeholder="Street" />
          <input className="border p-2 rounded focus:outline-blue-400 transition-all focus:ring-2 focus:ring-blue-200" name="city" value={form.city} onChange={handleChange} placeholder="City" />
          <input className="border p-2 rounded focus:outline-blue-400 transition-all focus:ring-2 focus:ring-blue-200" name="zipcode" value={form.zipcode} onChange={handleChange} placeholder="Zipcode" />
          <input className="border p-2 rounded focus:outline-blue-400 transition-all focus:ring-2 focus:ring-blue-200" name="lat" value={form.lat} onChange={handleChange} placeholder="Latitude" />
          <input className="border p-2 rounded focus:outline-blue-400 transition-all focus:ring-2 focus:ring-blue-200" name="lng" value={form.lng} onChange={handleChange} placeholder="Longitude" />
        </div>
        <button type="submit" className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white p-2 rounded mt-2 font-semibold shadow transition-all duration-200 transform hover:scale-105">Add User</button>
        {/* Show the newly added user details below the Add User button */}
        {success && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded shadow animate-fade-in">
            <h3 className="font-semibold text-green-700 mb-2">New User Details</h3>
            <div className="text-gray-700 text-sm">
              <div><span className="font-medium">Name:</span> {form.name}</div>
              <div><span className="font-medium">Email:</span> {form.email}</div>
              {form.phone && <div><span className="font-medium">Phone:</span> {form.phone}</div>}
              {form.company && <div><span className="font-medium">Company:</span> {form.company}</div>}
              {form.street && <div><span className="font-medium">Street:</span> {form.street}</div>}
              {form.city && <div><span className="font-medium">City:</span> {form.city}</div>}
              {form.zipcode && <div><span className="font-medium">Zipcode:</span> {form.zipcode}</div>}
              {form.lat && <div><span className="font-medium">Latitude:</span> {form.lat}</div>}
              {form.lng && <div><span className="font-medium">Longitude:</span> {form.lng}</div>}
            </div>
          </div>
        )}
        <input
          className="border p-2 rounded w-full mt-4 focus:outline-blue-400 transition-all focus:ring-2 focus:ring-blue-200"
          placeholder="Search users by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredUsers.length === 0 ? (
          <p className="text-gray-500 col-span-full">No users found.</p>
        ) : (
          filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardPage;

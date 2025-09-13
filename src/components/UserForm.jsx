import React, { useState } from 'react';
import { createUser, getUsers } from '../api/userService';

const UserForm = ({ onSearch, searchResults }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    street: '',
    city: '',
    zipcode: '',
    lat: '',
    lng: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [search, setSearch] = useState('');
  const [addedUser, setAddedUser] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      setError('Name and email are required.');
      setSuccess('');
      setAddedUser(null);
      return;
    }
    try {
      const response = await createUser(form);
      setForm({ name: '', email: '', phone: '', company: '', street: '', city: '', zipcode: '', lat: '', lng: '' });
      setError('');
      setSuccess('User added successfully!');
      setAddedUser({ ...form, id: response.data.id });
      // Show the added user in the list below
      onSearch([{ ...form, id: response.data.id }]);
      setTimeout(() => setSuccess(''), 2000);
    } catch (err) {
      setError('Failed to add user.');
      setSuccess('');
      setAddedUser(null);
    }
  };

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    setAddedUser(null); // Hide added user when searching
    if (!e.target.value) {
      onSearch([]);
      return;
    }
    try {
      const response = await getUsers();
      const filtered = response.data.data.filter((user) =>
        user.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      onSearch(filtered);
    } catch {
      onSearch([]);
    }
  };

  return (
    <div className="bg-white shadow-2xl rounded-xl p-8 flex flex-col gap-4 max-w-lg mx-auto mt-6 border border-blue-100 animate-fade-in">
      <h2 className="text-2xl font-bold mb-2 text-blue-700 tracking-tight">Create New User</h2>
      {error && <p className="text-red-500 text-sm font-medium animate-shake">{error}</p>}
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
      <input
        className="border p-2 rounded w-full mt-4 focus:outline-blue-400 transition-all focus:ring-2 focus:ring-blue-200"
        placeholder="Search users by name..."
        value={search}
        onChange={handleSearch}
      />
      {search && searchResults && (
        <div className="bg-blue-50 rounded mt-2 p-2 shadow-inner">
          {searchResults.length === 0 ? (
            <p className="text-gray-500">No users found.</p>
          ) : (
            searchResults.map((user) => (
              <div key={user.id} className="p-2 border-b border-blue-100 last:border-b-0 text-gray-800">
                {user.name} <span className="text-xs text-gray-400">({user.email})</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default UserForm;

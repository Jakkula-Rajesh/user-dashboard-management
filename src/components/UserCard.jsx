import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({ user, onDelete }) => (
  <div className="bg-white shadow rounded p-4 flex flex-col gap-2">
    <h2 className="text-lg font-semibold">{user.name}</h2>
    <p className="text-sm text-gray-600">Email: {user.email}</p>
    <p className="text-sm text-gray-600">Phone: {user.phone}</p>
    <p className="text-sm text-gray-600">Company: {user.company}</p>
    <div className="flex gap-2 mt-2">
      <Link to={`/user/${user.id}`} className="text-blue-500 hover:underline">View Details</Link>
      <button
        onClick={() => onDelete(user.id)}
        className="ml-auto bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition"
      >
        Delete
      </button>
    </div>
  </div>
);

export default UserCard;

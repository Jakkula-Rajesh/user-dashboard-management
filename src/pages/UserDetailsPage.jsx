import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUserById } from '../api/userService';

const UserDetailsPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await getUserById(id);
        setUser(response.data.data);
        setError('');
      } catch (err) {
        setError('User not found');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) return <p>Loading user details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return null;

  return (
    <div className="p-4 max-w-xl mx-auto bg-white shadow rounded mt-6">
      <Link to="/" className="text-blue-500 hover:underline">&larr; Back to Dashboard</Link>
      <h2 className="text-2xl font-bold mt-2 mb-4">{user.name}</h2>
      <p><span className="font-semibold">Email:</span> {user.email}</p>
      <p><span className="font-semibold">Phone:</span> {user.phone}</p>
      <p><span className="font-semibold">Company:</span> {user.company}</p>
      <p><span className="font-semibold">Address:</span> {user.street}, {user.city}, {user.zipcode}</p>
      <p><span className="font-semibold">Geo:</span> Lat: {user.lat}, Lng: {user.lng}</p>
    </div>
  );
};

export default UserDetailsPage;

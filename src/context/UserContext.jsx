import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUsers } from '../api/userService';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers();
      setUsers(response.data.data);
      setError(null);
    } catch (err) {
      setError(null); // Remove error message from UI
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ users, setUsers, loading, error, fetchUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

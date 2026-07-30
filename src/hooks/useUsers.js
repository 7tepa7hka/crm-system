import { useCallback, useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
} from "../services/usersService";

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const addUser = async (newUser) => {
    const created = await createUser({ ...newUser, paid: false });
    setUsers((prev) => [...prev, created]);
    return created;
  };

  const removeUser = async (id) => {
    await deleteUser(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const togglePaid = async (id, currentPaid) => {
    const updated = await updateUser(id, { paid: !currentPaid });
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...updated } : u)),
    );
    return updated;
  };

  const editUser = async (id, data) => {
    const updated = await updateUser(id, data);
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...updated } : u)),
    );
    return updated;
  };

  return {
    users,
    loading,
    error,
    addUser,
    removeUser,
    togglePaid,
    editUser,
    reload: loadUsers,
  };
}

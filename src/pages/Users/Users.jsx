import { useState } from "react";
import { toast } from "react-toastify";
import { useUsers } from "../../hooks/useUsers";
import { Badge } from "../../components/Badge/Badge";
import { Modal } from "../../components/Modal/Modal";
import { AddUserForm } from "../../components/AddUserForm/AddUserForm";
import "./Users.css";

export function Users() {
  const { users, loading, error, addUser, removeUser, togglePaid } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddUser = async (formData) => {
    try {
      await addUser(formData);
      toast.success("Пользователь добавлен");
      setIsModalOpen(false);
    } catch {
      toast.error("Не удалось добавить пользователя");
    }
  };

  const handleDelete = async (id, name) => {
    try {
      await removeUser(id);
      toast.success(`${name} удалён`);
    } catch {
      toast.error("Не удалось удалить пользователя");
    }
  };

  const handleTogglePaid = async (user) => {
    try {
      await togglePaid(user.id, user.paid);
      toast.success(
        user.paid
          ? `${user.firstName} теперь не оплатил`
          : `${user.firstName} оплатил`,
      );
    } catch {
      toast.error("Не удалось изменить статус оплаты");
    }
  };

  return (
    <div className="users-page">
      <div className="users-header">
        <div>
          <h1 className="page-title">Users</h1>
          <p className="page-subtitle">Список учеников учебного центра</p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          + Add User
        </button>
      </div>

      {loading && <p className="loading-text">Загрузка...</p>}
      {error && <p className="error-text">Ошибка загрузки: {error}</p>}

      {!loading && !error && (
        <div className="users-table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Телефон</th>
                <th>Группа</th>
                <th>Оплачено</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.phone}</td>
                  <td>{user.group}</td>
                  <td>
                    <Badge
                      paid={user.paid}
                      onClick={() => handleTogglePaid(user)}
                    />
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(
                          user.id,
                          `${user.firstName} ${user.lastName}`,
                        )
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <p className="empty-text">Пользователей пока нет</p>
          )}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Добавить пользователя"
      >
        <AddUserForm
          onSubmit={handleAddUser}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

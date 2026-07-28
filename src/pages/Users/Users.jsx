import { useState } from "react";
import { toast } from "react-toastify";
import { useUsers } from "../../hooks/useUsers";
import { useLanguage } from "../../context/LanguageContext";
import { Badge } from "../../components/Badge/Badge";
import { Modal } from "../../components/Modal/Modal";
import { AddUserForm } from "../../components/AddUserForm/AddUserForm";
import "./Users.css";

export function Users() {
  const { users, loading, error, addUser, removeUser, togglePaid } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();

  const handleAddUser = async (formData) => {
    try {
      await addUser(formData);
      toast.success(t.users.addedToast);
      setIsModalOpen(false);
    } catch {
      toast.error(t.users.addErrorToast);
    }
  };

  const handleDelete = async (id, name) => {
    try {
      await removeUser(id);
      toast.success(t.users.deletedToast(name));
    } catch {
      toast.error(t.users.deleteErrorToast);
    }
  };

  const handleTogglePaid = async (user) => {
    try {
      await togglePaid(user.id, user.paid);
      toast.success(
        user.paid
          ? t.users.unpaidToast(user.firstName)
          : t.users.paidToast(user.firstName),
      );
    } catch {
      toast.error(t.users.paidToggleError);
    }
  };

  return (
    <div className="users-page">
      <div className="users-header">
        <div>
          <h1 className="page-title">{t.users.title}</h1>
          <p className="page-subtitle">{t.users.subtitle}</p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          + {t.users.addUser}
        </button>
      </div>

      {loading && <p className="loading-text">{t.common.loading}</p>}
      {error && <p className="error-text">{t.common.error}</p>}

      {!loading && !error && (
        <div className="users-table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>{t.users.firstName}</th>
                <th>{t.users.lastName}</th>
                <th>{t.users.phone}</th>
                <th>{t.users.group}</th>
                <th>{t.users.paid}</th>
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
                      paidLabel={t.users.paidStatus}
                      unpaidLabel={t.users.unpaidStatus}
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
                      {t.common.delete}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && <p className="empty-text">{t.users.empty}</p>}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t.users.modalTitle}
      >
        <AddUserForm
          onSubmit={handleAddUser}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

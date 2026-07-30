import { useState } from "react";
import { toast } from "react-toastify";
import { Pencil, Trash2 } from "lucide-react";
import { useUsers } from "../../hooks/useUsers";
import { useLanguage } from "../../context/LanguageContext";
import { Badge } from "../../components/Badge/Badge";
import { Modal } from "../../components/Modal/Modal";
import { AddUserForm } from "../../components/AddUserForm/AddUserForm";
import { EditUserForm } from "../../components/EditUserForm/EditUserForm";
import "./Users.css";

export function Users() {
  const { users, loading, error, addUser, removeUser, togglePaid, editUser } =
    useUsers();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [filter, setFilter] = useState("all");
  const { t } = useLanguage();

  const handleAddUser = async (formData) => {
    try {
      await addUser(formData);
      toast.success(t.users.addedToast);
      setIsAddModalOpen(false);
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

  const handleEditSubmit = async (formData) => {
    try {
      await editUser(editingUser.id, formData);
      toast.success(t.users.updatedToast);
      setEditingUser(null);
    } catch {
      toast.error(t.users.updateErrorToast);
    }
  };

  const filteredUsers = users.filter((user) => {
    if (filter === "paid") return user.paid;
    if (filter === "unpaid") return !user.paid;
    return true;
  });

  return (
    <div className="users-page">
      <div className="users-header">
        <div>
          <h1 className="page-title">{t.users.title}</h1>
          <p className="page-subtitle">{t.users.subtitle}</p>
        </div>
        <button className="btn-primary" onClick={() => setIsAddModalOpen(true)}>
          + {t.users.addUser}
        </button>
      </div>

      <div className="users-filter-tabs">
        <button
          className={`filter-tab ${filter === "all" ? "filter-tab-active" : ""}`}
          onClick={() => setFilter("all")}
        >
          {t.users.filterAll} ({users.length})
        </button>
        <button
          className={`filter-tab ${filter === "paid" ? "filter-tab-active" : ""}`}
          onClick={() => setFilter("paid")}
        >
          {t.users.filterPaid} ({users.filter((u) => u.paid).length})
        </button>
        <button
          className={`filter-tab ${filter === "unpaid" ? "filter-tab-active" : ""}`}
          onClick={() => setFilter("unpaid")}
        >
          {t.users.filterUnpaid} ({users.filter((u) => !u.paid).length})
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
                <th>{t.users.actions}</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
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
                    <div className="row-actions">
                      <button
                        className="edit-btn"
                        onClick={() => setEditingUser(user)}
                        title={t.users.edit}
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(
                            user.id,
                            `${user.firstName} ${user.lastName}`,
                          )
                        }
                        title={t.common.delete}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <p className="empty-text">{t.users.empty}</p>
          )}
        </div>
      )}

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={t.users.modalTitle}
      >
        <AddUserForm
          onSubmit={handleAddUser}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={!!editingUser}
        onClose={() => setEditingUser(null)}
        title={t.users.editModalTitle}
      >
        {editingUser && (
          <EditUserForm
            user={editingUser}
            onSubmit={handleEditSubmit}
            onCancel={() => setEditingUser(null)}
          />
        )}
      </Modal>
    </div>
  );
}

import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { User, UserRole, StaffType } from '../types';

const UserManagement: React.FC = () => {
  const { users, addUser, updateUser, deleteUser } = useData();
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'trainee' as UserRole,
    department: '',
    position: '',
    staffType: 'medical' as StaffType,
  });

  const handleAddUser = () => {
    setIsAddingUser(true);
    setFormData({
      name: '',
      email: '',
      role: 'trainee',
      department: '',
      position: '',
      staffType: 'medical',
    });
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      position: user.position,
      staffType: user.staffType || 'medical',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingUser) {
      updateUser(editingUser.id, formData);
      setEditingUser(null);
    } else {
      const newUser: User = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date(),
      };
      addUser(newUser);
    }

    setIsAddingUser(false);
    setFormData({
      name: '',
      email: '',
      role: 'trainee',
      department: '',
      position: '',
      staffType: 'medical',
    });
  };

  const handleCancel = () => {
    setIsAddingUser(false);
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      role: 'trainee',
      department: '',
      position: '',
      staffType: 'medical',
    });
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      deleteUser(userId);
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'Администратор';
      case 'mentor': return 'Наставник';
      case 'trainee': return 'Стажер';
      default: return role;
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'mentor': return 'bg-blue-100 text-blue-800';
      case 'trainee': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Управление пользователями
        </h2>
        <button
          onClick={handleAddUser}
          className="btn-primary"
        >
          Добавить пользователя
        </button>
      </div>

      {/* Add/Edit Form */}
      {(isAddingUser || editingUser) && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingUser ? 'Редактировать пользователя' : 'Добавить пользователя'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Имя
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Роль
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                  className="select-field"
                  required
                >
                  <option value="trainee">Стажер</option>
                  <option value="mentor">Наставник</option>
                  <option value="admin">Администратор</option>
                </select>
              </div>

              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                  Отделение
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                  Должность
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label htmlFor="staffType" className="block text-sm font-medium text-gray-700">
                  Тип персонала
                </label>
                <select
                  id="staffType"
                  name="staffType"
                  value={formData.staffType}
                  onChange={(e) => setFormData({ ...formData, staffType: e.target.value as StaffType })}
                  className="select-field"
                  required
                >
                  <option value="medical">🏥 Медицинский персонал</option>
                  <option value="non-medical">👔 Немедицинский персонал</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="btn-secondary"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                {editingUser ? 'Сохранить изменения' : 'Добавить пользователя'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users List */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Пользователь
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Роль
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Отделение
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Должность
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Тип персонала
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дата создания
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                      {getRoleLabel(user.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.staffType === 'medical' ? '🏥 Медицинский' : user.staffType === 'non-medical' ? '👔 Немедицинский' : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString('ru-RU')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="text-medical-primary hover:text-medical-secondary"
                      >
                        Редактировать
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Удалить
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;


import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { BonusRecord, StaffType } from '../types';
import {
  getBonusCriteriaByStaffType,
  MEDICAL_STAFF_BONUS_CRITERIA,
  NON_MEDICAL_STAFF_BONUS_CRITERIA,
} from '../constants/bonusCriteria';

const BonusManagement: React.FC = () => {
  const { users, getUserById, bonusRecords, addBonusRecord, deleteBonusRecord } = useData();
  const { user: currentUser } = useAuth();
  const [selectedStaffType, setSelectedStaffType] = useState<StaffType>('medical');
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [selectedCriteriaId, setSelectedCriteriaId] = useState<number | null>(null);
  const [comments, setComments] = useState<string>('');
  const [filterUserId, setFilterUserId] = useState<string>('');

  // Получить критерии для выбранного типа персонала
  const criteria = useMemo(() => {
    return getBonusCriteriaByStaffType(selectedStaffType);
  }, [selectedStaffType]);

  // Фильтровать пользователей по типу персонала
  const filteredUsers = useMemo(() => {
    return users.filter(u => u.staffType === selectedStaffType);
  }, [users, selectedStaffType]);

  // Фильтровать записи бонусов
  const filteredBonusRecords = useMemo(() => {
    let filtered = bonusRecords;
    if (filterUserId) {
      filtered = filtered.filter(record => record.userId === filterUserId);
    }
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [bonusRecords, filterUserId]);

  // Получить пользователя по ID
  const getSelectedUser = () => {
    return selectedUserId ? getUserById(selectedUserId) : null;
  };

  // Начислить бонус
  const awardBonus = () => {
    if (!selectedUserId || selectedCriteriaId === null || !currentUser) {
      window.alert('Пожалуйста, выберите пользователя и критерий бонуса');
      return;
    }

    const selectedUser = getUserById(selectedUserId);
    if (!selectedUser) {
      window.alert('Пользователь не найден');
      return;
    }

    // Проверить, не был ли уже начислен этот бонус
    const existingRecord = bonusRecords.find(
      record =>
        record.userId === selectedUserId &&
        record.criteriaId === selectedCriteriaId &&
        record.verified
    );

    if (existingRecord) {
      if (!window.confirm('Этот бонус уже был начислен. Начислить повторно?')) {
        return;
      }
    }

    const newRecord: BonusRecord = {
      id: `bonus-${Date.now()}-${Math.random()}`,
      userId: selectedUserId,
      criteriaId: selectedCriteriaId,
      date: new Date(),
      awardedBy: currentUser.id,
      comments: comments.trim() || undefined,
      verified: true,
    };

    addBonusRecord(newRecord);
    setSelectedCriteriaId(null);
    setComments('');
    window.alert('Бонус успешно начислен!');
  };

  // Удалить запись бонуса
  const handleDeleteBonusRecord = (recordId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить эту запись о бонусе?')) {
      deleteBonusRecord(recordId);
    }
  };

  // Получить описание критерия
  const getCriteriaDescription = (criteriaId: number): string => {
    const allCriteria = selectedStaffType === 'medical' ? MEDICAL_STAFF_BONUS_CRITERIA : NON_MEDICAL_STAFF_BONUS_CRITERIA;
    const criteria = allCriteria.find(c => c.id === criteriaId);
    return criteria?.description || 'Неизвестный критерий';
  };

  // Статистика бонусов
  const bonusStats = useMemo(() => {
    const totalBonuses = bonusRecords.length;
    const uniqueUsers = new Set(bonusRecords.map(r => r.userId)).size;
    const verifiedBonuses = bonusRecords.filter(r => r.verified).length;
    return { totalBonuses, uniqueUsers, verifiedBonuses };
  }, [bonusRecords]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">💰 Система бонусов</h1>
        <p className="mt-1 text-sm text-gray-600">
          Начисление и управление бонусами для медицинского и немедицинского персонала
        </p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-medical-primary">{bonusStats.totalBonuses}</div>
          <div className="text-sm text-gray-600">Всего начислено бонусов</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600">{bonusStats.uniqueUsers}</div>
          <div className="text-sm text-gray-600">Пользователей получили бонусы</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">{bonusStats.verifiedBonuses}</div>
          <div className="text-sm text-gray-600">Подтвержденных бонусов</div>
        </div>
      </div>

      {/* Выбор типа персонала */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Выберите тип персонала</h2>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setSelectedStaffType('medical');
              setSelectedUserId('');
              setSelectedCriteriaId(null);
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedStaffType === 'medical'
                ? 'bg-medical-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🏥 Медицинский персонал
          </button>
          <button
            onClick={() => {
              setSelectedStaffType('non-medical');
              setSelectedUserId('');
              setSelectedCriteriaId(null);
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedStaffType === 'non-medical'
                ? 'bg-medical-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            👔 Немедицинский персонал
          </button>
        </div>
      </div>

      {/* Форма начисления бонуса */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Начислить бонус</h2>
        <div className="space-y-4">
          {/* Выбор пользователя */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Выберите сотрудника
            </label>
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-primary focus:border-transparent"
            >
              <option value="">-- Выберите сотрудника --</option>
              {filteredUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} - {user.position} ({user.department})
                </option>
              ))}
            </select>
          </div>

          {/* Выбор критерия */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Выберите критерий бонуса
            </label>
            <select
              value={selectedCriteriaId ?? ''}
              onChange={(e) => setSelectedCriteriaId(e.target.value ? Number(e.target.value) : null)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-primary focus:border-transparent"
            >
              <option value="">-- Выберите критерий --</option>
              {criteria.map((criterion) => (
                <option key={criterion.id} value={criterion.id}>
                  {criterion.id}. {criterion.description}
                </option>
              ))}
            </select>
          </div>

          {/* Комментарий */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Комментарий (необязательно)
            </label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-primary focus:border-transparent"
              placeholder="Добавьте комментарий к бонусу..."
            />
          </div>

          {/* Кнопка начисления */}
          <button
            onClick={awardBonus}
            disabled={!selectedUserId || selectedCriteriaId === null}
            className="w-full px-4 py-2 bg-medical-primary text-white rounded-lg font-medium hover:bg-medical-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            ✅ Начислить бонус
          </button>
        </div>
      </div>

      {/* История бонусов */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">История начисленных бонусов</h2>
          <select
            value={filterUserId}
            onChange={(e) => setFilterUserId(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-medical-primary focus:border-transparent"
          >
            <option value="">Все сотрудники</option>
            {filteredUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        {filteredBonusRecords.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Бонусы еще не начислялись
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Дата
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Сотрудник
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Критерий
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Комментарий
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Начислил
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBonusRecords.map((record) => {
                  const user = getUserById(record.userId);
                  const awardedByUser = getUserById(record.awardedBy);
                  return (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {new Date(record.date).toLocaleDateString('ru-RU', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {user?.name || 'Неизвестный пользователь'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        <div className="max-w-md">
                          {record.criteriaId}. {getCriteriaDescription(record.criteriaId)}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {record.comments || '-'}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {awardedByUser?.name || 'Неизвестный'}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleDeleteBonusRecord(record.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          🗑️ Удалить
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BonusManagement;


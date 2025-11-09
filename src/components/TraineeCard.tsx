import React from 'react';
import { Trainee, User } from '../types';

interface TraineeCardProps {
  trainee: Trainee;
  user: User;
  onClick: () => void;
}

const TraineeCard: React.FC<TraineeCardProps> = ({ trainee, user, onClick }) => {
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'critical':
        return {
          label: 'Критично',
          className: 'status-critical',
          icon: '🔴',
        };
      case 'needs_improvement':
        return {
          label: 'Требует улучшения',
          className: 'status-needs-improvement',
          icon: '🟡',
        };
      case 'good_progress':
        return {
          label: 'Хороший прогресс',
          className: 'status-good-progress',
          icon: '🟢',
        };
      case 'completed':
        return {
          label: 'Завершено',
          className: 'status-completed',
          icon: '🔵',
        };
      default:
        return {
          label: 'Неизвестно',
          className: 'bg-gray-100 text-gray-800',
          icon: '⚪',
        };
    }
  };

  const statusInfo = getStatusInfo(trainee.status);
  const progressPercentage = Math.min((trainee.developmentScore / 1000) * 100, 100);

  // Calculate days remaining in probation
  const now = new Date();
  const probationEnd = new Date(trainee.probationEnd);
  const daysRemaining = Math.ceil((probationEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div
      className="card hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {user.name}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            {user.position}
          </p>
          <p className="text-xs text-gray-500">
            {user.department}
          </p>
        </div>
        <div className="text-2xl">
          {statusInfo.icon}
        </div>
      </div>

      <div className="space-y-3">
        {/* Status Badge */}
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusInfo.className}`}>
          {statusInfo.label}
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Прогресс</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                trainee.status === 'critical' ? 'bg-red-500' :
                trainee.status === 'needs_improvement' ? 'bg-yellow-500' :
                trainee.status === 'good_progress' ? 'bg-green-500' :
                'bg-blue-500'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Development Score */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Балл развития:</span>
          <span className="font-medium">{trainee.developmentScore}/1000</span>
        </div>

        {/* Probation Period */}
        <div className="text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Испытательный период:</span>
            <span className={daysRemaining < 30 ? 'text-red-600 font-medium' : ''}>
              {daysRemaining > 0 ? `${daysRemaining} дн.` : 'Завершен'}
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {new Date(trainee.probationStart).toLocaleDateString('ru-RU')} - {new Date(trainee.probationEnd).toLocaleDateString('ru-RU')}
          </div>
        </div>

        {/* Weekly Reports Count */}
        <div className="flex justify-between text-sm text-gray-600">
          <span>Отчеты:</span>
          <span>{trainee.weeklyReports.length} недель</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="w-full btn-primary text-sm">
          Подробнее
        </button>
      </div>
    </div>
  );
};

export default TraineeCard;


import React from 'react';
import { DashboardStats as Stats } from '../types';

interface DashboardStatsProps {
  stats: Stats;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  const statCards = [
    {
      title: 'Всего стажеров',
      value: stats.totalTrainees,
      icon: '👥',
      color: 'text-gray-600',
      bgColor: 'bg-gray-100',
    },
    {
      title: 'Критично',
      value: stats.criticalCount,
      icon: '🔴',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      title: 'Требует улучшения',
      value: stats.needsImprovementCount,
      icon: '🟡',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Хороший прогресс',
      value: stats.goodProgressCount,
      icon: '🟢',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Завершено',
      value: stats.completedCount,
      icon: '🔵',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {statCards.map((stat, index) => (
        <div key={index} className="card">
          <div className="flex items-center">
            <div className={`flex-shrink-0 p-3 rounded-lg ${stat.bgColor}`}>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;


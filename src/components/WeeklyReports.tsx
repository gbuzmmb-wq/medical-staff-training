import React from 'react';
import { WeeklyReport } from '../types';

interface WeeklyReportsProps {
  reports: WeeklyReport[];
}

const WeeklyReports: React.FC<WeeklyReportsProps> = ({ reports }) => {
  if (reports.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📋</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Отчеты не найдены
        </h3>
        <p className="text-gray-600">
          Пока нет недельных отчетов для этого стажера
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Недельные отчеты
        </h2>
        <span className="text-sm text-gray-600">
          Всего отчетов: {reports.length}
        </span>
      </div>

      <div className="space-y-6">
        {reports
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .map((report) => (
            <div key={report.id} className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Неделя {report.weekNumber}
                </h3>
                <span className="text-sm text-gray-500">
                  {new Date(report.date).toLocaleDateString('ru-RU')}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Achievements */}
                <div>
                  <h4 className="text-sm font-medium text-green-700 mb-2 flex items-center">
                    <span className="mr-2">✅</span>
                    Достижения
                  </h4>
                  {report.achievements.length > 0 ? (
                    <ul className="space-y-1">
                      {report.achievements.map((achievement, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="mr-2 text-green-500">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 italic">Достижения не указаны</p>
                  )}
                </div>

                {/* Challenges */}
                <div>
                  <h4 className="text-sm font-medium text-yellow-700 mb-2 flex items-center">
                    <span className="mr-2">⚠️</span>
                    Сложности
                  </h4>
                  {report.challenges.length > 0 ? (
                    <ul className="space-y-1">
                      {report.challenges.map((challenge, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="mr-2 text-yellow-500">•</span>
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 italic">Сложности не указаны</p>
                  )}
                </div>
              </div>

              {/* Next Week Goals */}
              <div className="mt-6">
                <h4 className="text-sm font-medium text-blue-700 mb-2 flex items-center">
                  <span className="mr-2">🎯</span>
                  Цели на следующую неделю
                </h4>
                {report.nextWeekGoals.length > 0 ? (
                  <ul className="space-y-1">
                    {report.nextWeekGoals.map((goal, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="mr-2 text-blue-500">•</span>
                        {goal}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 italic">Цели не указаны</p>
                )}
              </div>

              {/* Mentor Comments */}
              {report.mentorComments && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="text-sm font-medium text-blue-800 mb-2 flex items-center">
                    <span className="mr-2">💬</span>
                    Комментарии наставника
                  </h4>
                  <p className="text-sm text-blue-700">{report.mentorComments}</p>
                </div>
              )}
            </div>
          ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-gray-900">
            {reports.reduce((sum, r) => sum + r.achievements.length, 0)}
          </div>
          <div className="text-sm text-gray-600">Всего достижений</div>
        </div>

        <div className="card text-center">
          <div className="text-2xl font-bold text-gray-900">
            {reports.reduce((sum, r) => sum + r.challenges.length, 0)}
          </div>
          <div className="text-sm text-gray-600">Выявленных сложностей</div>
        </div>

        <div className="card text-center">
          <div className="text-2xl font-bold text-gray-900">
            {reports.filter(r => r.mentorComments).length}
          </div>
          <div className="text-sm text-gray-600">Отчетов с комментариями</div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyReports;


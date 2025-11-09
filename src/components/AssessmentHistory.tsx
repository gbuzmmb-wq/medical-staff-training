import React from 'react';
import { Assessment } from '../types';

interface AssessmentHistoryProps {
  assessments: Assessment[];
}

const AssessmentHistory: React.FC<AssessmentHistoryProps> = ({ assessments }) => {
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'knowledge': return 'Знания';
      case 'skills': return 'Навыки';
      case 'attitude': return 'Отношение';
      case 'performance': return 'Производительность';
      default: return category;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'text-green-600 bg-green-100';
    if (score >= 3.5) return 'text-blue-600 bg-blue-100';
    if (score >= 2.5) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 4.5) return 'Отлично';
    if (score >= 3.5) return 'Хорошо';
    if (score >= 2.5) return 'Удовлетворительно';
    return 'Неудовлетворительно';
  };

  if (assessments.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📝</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Оценки не найдены
        </h3>
        <p className="text-gray-600">
          Пока нет оценок для этого стажера
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          История оценок
        </h2>
        <span className="text-sm text-gray-600">
          Всего оценок: {assessments.length}
        </span>
      </div>

      <div className="space-y-4">
        {assessments
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .map((assessment) => (
            <div key={assessment.id} className="card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      {getCategoryLabel(assessment.category)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(assessment.date).toLocaleDateString('ru-RU')}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${getScoreColor(assessment.score)}`}>
                      {assessment.score}/5 - {getScoreLabel(assessment.score)}
                    </div>
                  </div>
                </div>
              </div>

              {assessment.comments && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Комментарии наставника:</h4>
                  <p className="text-sm text-gray-600">{assessment.comments}</p>
                </div>
              )}
            </div>
          ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-gray-900">
            {assessments.length > 0
              ? (assessments.reduce((sum, a) => sum + a.score, 0) / assessments.length).toFixed(1)
              : '0'
            }
          </div>
          <div className="text-sm text-gray-600">Средняя оценка</div>
        </div>

        <div className="card text-center">
          <div className="text-2xl font-bold text-gray-900">
            {assessments.filter(a => a.score >= 4).length}
          </div>
          <div className="text-sm text-gray-600">Отличных оценок</div>
        </div>

        <div className="card text-center">
          <div className="text-2xl font-bold text-gray-900">
            {assessments.filter(a => a.score < 3).length}
          </div>
          <div className="text-sm text-gray-600">Низких оценок</div>
        </div>

        <div className="card text-center">
          <div className="text-2xl font-bold text-gray-900">
            {new Set(assessments.map(a => a.category)).size}
          </div>
          <div className="text-sm text-gray-600">Категорий оценено</div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentHistory;


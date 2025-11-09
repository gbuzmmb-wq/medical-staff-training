import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Assessment, AssessmentCategory } from '../types';

interface AssessmentFormProps {
  traineeId: string;
  mentorId: string;
  onAssessmentAdded: () => void;
}

const AssessmentForm: React.FC<AssessmentFormProps> = ({
  traineeId,
  mentorId,
  onAssessmentAdded,
}) => {
  const { addAssessment } = useData();
  const [formData, setFormData] = useState({
    score: 3,
    category: 'knowledge' as AssessmentCategory,
    comments: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories: { value: AssessmentCategory; label: string }[] = [
    { value: 'knowledge', label: 'Знания' },
    { value: 'skills', label: 'Навыки' },
    { value: 'attitude', label: 'Отношение' },
    { value: 'performance', label: 'Производительность' },
  ];

  const scoreLabels = [
    { value: 1, label: 'Неудовлетворительно' },
    { value: 2, label: 'Плохо' },
    { value: 3, label: 'Удовлетворительно' },
    { value: 4, label: 'Хорошо' },
    { value: 5, label: 'Отлично' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newAssessment: Assessment = {
        id: Date.now().toString(),
        traineeId,
        mentorId,
        score: formData.score,
        category: formData.category,
        comments: formData.comments,
        date: new Date(),
      };

      addAssessment(newAssessment);
      onAssessmentAdded();
    } catch (error) {
      console.error('Error adding assessment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'score' ? parseInt(value) : value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Новая оценка стажера
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Selection */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Категория оценки
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="select-field"
              required
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Score Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Оценка (1-5 баллов)
            </label>
            <div className="space-y-2">
              {scoreLabels.map((score) => (
                <label key={score.value} className="flex items-center">
                  <input
                    type="radio"
                    name="score"
                    value={score.value}
                    checked={formData.score === score.value}
                    onChange={handleInputChange}
                    className="mr-3 text-medical-primary focus:ring-medical-primary"
                  />
                  <span className="text-sm">
                    {score.value} - {score.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div>
            <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-2">
              Комментарии и рекомендации
            </label>
            <textarea
              id="comments"
              name="comments"
              rows={4}
              value={formData.comments}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Опишите сильные стороны стажера, области для улучшения и дайте рекомендации..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onAssessmentAdded}
              className="btn-secondary"
              disabled={isSubmitting}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Сохранение...' : 'Сохранить оценку'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssessmentForm;


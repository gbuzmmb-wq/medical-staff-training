import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Question, QuestionType, Test } from '../types';

const TestManagement: React.FC = () => {
  const { tests } = useData();
  const [isCreatingTest, setIsCreatingTest] = useState(false);
  const [editingTest, setEditingTest] = useState<Test | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    difficulty: 'easy' as 'easy' | 'medium' | 'hard',
    questions: [] as Question[],
  });

  const handleCreateTest = () => {
    setIsCreatingTest(true);
    setFormData({
      title: '',
      category: '',
      difficulty: 'easy',
      questions: [],
    });
  };

  const handleEditTest = (test: Test) => {
    setEditingTest(test);
    setFormData({
      title: test.title,
      category: test.category,
      difficulty: test.difficulty,
      questions: test.questions,
    });
    setIsCreatingTest(true);
  };

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      text: '',
      type: 'multiple_choice',
      options: ['', '', '', ''],
      correctAnswer: 0,
      points: 1,
    };

    setFormData({
      ...formData,
      questions: [...formData.questions, newQuestion],
    });
  };

  const handleUpdateQuestion = (questionId: string, updates: Partial<Question>) => {
    setFormData({
      ...formData,
      questions: formData.questions.map(q =>
        q.id === questionId ? { ...q, ...updates } : q
      ),
    });
  };

  const handleRemoveQuestion = (questionId: string) => {
    setFormData({
      ...formData,
      questions: formData.questions.filter(q => q.id !== questionId),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to the database
    console.log('Test saved:', formData);
    setIsCreatingTest(false);
    setEditingTest(null);
  };

  const handleCancel = () => {
    setIsCreatingTest(false);
    setEditingTest(null);
    setFormData({
      title: '',
      category: '',
      difficulty: 'easy',
      questions: [],
    });
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Легкий';
      case 'medium': return 'Средний';
      case 'hard': return 'Сложный';
      default: return difficulty;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Управление тестами
        </h2>
        <button
          onClick={handleCreateTest}
          className="btn-primary"
        >
          Создать тест
        </button>
      </div>

      {/* Create/Edit Test Form */}
      {isCreatingTest && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingTest ? 'Редактировать тест' : 'Создать новый тест'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Test Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Название теста
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Категория
                </label>
                <input
                  type="text"
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
                Сложность
              </label>
              <select
                id="difficulty"
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
                className="select-field"
              >
                <option value="easy">Легкий</option>
                <option value="medium">Средний</option>
                <option value="hard">Сложный</option>
              </select>
            </div>

            {/* Questions */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-md font-medium text-gray-900">
                  Вопросы ({formData.questions.length})
                </h4>
                <button
                  type="button"
                  onClick={handleAddQuestion}
                  className="btn-secondary text-sm"
                >
                  Добавить вопрос
                </button>
              </div>

              <div className="space-y-4">
                {formData.questions.map((question, index) => (
                  <div key={question.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <h5 className="font-medium text-gray-900">
                        Вопрос {index + 1}
                      </h5>
                      <button
                        type="button"
                        onClick={() => handleRemoveQuestion(question.id)}
                        className="text-red-600 hover:text-red-900 text-sm"
                      >
                        Удалить
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Текст вопроса
                        </label>
                        <textarea
                          value={question.text}
                          onChange={(e) => handleUpdateQuestion(question.id, { text: e.target.value })}
                          className="input-field"
                          rows={2}
                          placeholder="Введите текст вопроса..."
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Тип вопроса
                          </label>
                          <select
                            value={question.type}
                            onChange={(e) => handleUpdateQuestion(question.id, {
                              type: e.target.value as QuestionType,
                              options: e.target.value === 'multiple_choice' ? ['', '', '', ''] : undefined
                            })}
                            className="select-field"
                          >
                            <option value="multiple_choice">Множественный выбор</option>
                            <option value="true_false">Верно/Неверно</option>
                            <option value="text">Текстовый ответ</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Баллы
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="10"
                            value={question.points}
                            onChange={(e) => handleUpdateQuestion(question.id, { points: parseInt(e.target.value) })}
                            className="input-field"
                          />
                        </div>
                      </div>

                      {question.type === 'multiple_choice' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Варианты ответов
                          </label>
                          <div className="space-y-2">
                            {question.options?.map((option, optionIndex) => (
                              <div key={optionIndex} className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  name={`correct-${question.id}`}
                                  checked={question.correctAnswer === optionIndex}
                                  onChange={() => handleUpdateQuestion(question.id, { correctAnswer: optionIndex })}
                                  className="text-medical-primary"
                                />
                                <input
                                  type="text"
                                  value={option}
                                  onChange={(e) => {
                                    const newOptions = [...(question.options || [])];
                                    newOptions[optionIndex] = e.target.value;
                                    handleUpdateQuestion(question.id, { options: newOptions });
                                  }}
                                  className="input-field flex-1"
                                  placeholder={`Вариант ${optionIndex + 1}`}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {question.type === 'true_false' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Правильный ответ
                          </label>
                          <div className="flex space-x-4">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name={`correct-tf-${question.id}`}
                                checked={question.correctAnswer === 'true'}
                                onChange={() => handleUpdateQuestion(question.id, { correctAnswer: 'true' })}
                                className="mr-2"
                              />
                              Верно
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name={`correct-tf-${question.id}`}
                                checked={question.correctAnswer === 'false'}
                                onChange={() => handleUpdateQuestion(question.id, { correctAnswer: 'false' })}
                                className="mr-2"
                              />
                              Неверно
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
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
                {editingTest ? 'Сохранить изменения' : 'Создать тест'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tests List */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Список тестов
        </h3>

        {tests.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            Нет созданных тестов
          </p>
        ) : (
          <div className="space-y-4">
            {tests.map((test) => (
              <div key={test.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{test.title}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-600">{test.category}</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(test.difficulty)}`}>
                      {getDifficultyLabel(test.difficulty)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {test.questions.length} вопросов
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditTest(test)}
                    className="text-medical-primary hover:text-medical-secondary text-sm font-medium"
                  >
                    Редактировать
                  </button>
                  <button className="text-red-600 hover:text-red-900 text-sm font-medium">
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestManagement;


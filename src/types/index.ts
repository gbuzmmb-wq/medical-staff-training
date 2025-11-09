export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'mentor' | 'trainee';
  department: string;
  position: string;
  mentorId?: string;
  staffType?: 'medical' | 'non-medical'; // Тип персонала: медицинский или немедицинский
  createdAt: Date;
}

export interface Trainee {
  userId: string;
  probationStart: Date;
  probationEnd: Date;
  mentorId: string;
  developmentScore: number; // 0-1000
  status: 'critical' | 'needs_improvement' | 'good_progress' | 'completed';
  weeklyReports: WeeklyReport[];
}

export interface WeeklyReport {
  id: string;
  weekNumber: number;
  date: Date;
  achievements: string[];
  challenges: string[];
  nextWeekGoals: string[];
  mentorComments?: string;
}

export interface Assessment {
  id: string;
  traineeId: string;
  mentorId: string;
  testId?: string;
  score: number; // 1-5
  date: Date;
  comments: string;
  category: 'knowledge' | 'skills' | 'attitude' | 'performance';
}

export interface Test {
  id: string;
  title: string;
  questions: Question[];
  createdBy: string;
  isTemplate: boolean;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple_choice' | 'true_false' | 'text';
  options?: string[];
  correctAnswer: string | number;
  points: number;
}

export interface FilterOptions {
  department?: string;
  position?: string;
  status?: string;
  search?: string;
}

export interface DashboardStats {
  totalTrainees: number;
  criticalCount: number;
  needsImprovementCount: number;
  goodProgressCount: number;
  completedCount: number;
}

export type UserRole = 'admin' | 'mentor' | 'trainee';
export type TraineeStatus = 'critical' | 'needs_improvement' | 'good_progress' | 'completed';
export type AssessmentCategory = 'knowledge' | 'skills' | 'attitude' | 'performance';
export type QuestionType = 'multiple_choice' | 'true_false' | 'text';
export type TestDifficulty = 'easy' | 'medium' | 'hard';
export type StaffType = 'medical' | 'non-medical';

// Система бонусов
export interface BonusCriteria {
  id: number;
  description: string;
  staffType: StaffType; // Для какого типа персонала применим критерий
}

export interface BonusRecord {
  id: string;
  userId: string;
  criteriaId: number;
  date: Date;
  awardedBy: string; // ID пользователя, который начислил бонус
  comments?: string;
  verified: boolean; // Подтвержден ли бонус
}

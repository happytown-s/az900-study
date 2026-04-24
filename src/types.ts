export interface QuestionOption {
  text: string;
  correct: boolean;
}

export interface Question {
  id: number;
  category: string;
  question: string;
  options: QuestionOption[];
  explanation: string;
  hint: string;
}

export interface QuizResult {
  questionId: number;
  correct: boolean;
  category: string;
  timestamp: number;
}

export type QuizMode = 'drill' | 'exam' | 'review';
export type TabName = 'quiz' | 'exam' | 'progress';

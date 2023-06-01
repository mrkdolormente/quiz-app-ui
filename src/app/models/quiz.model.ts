export interface QuizResult {
  correctAnswers: number;
  wrongAnswers: number;
  average: number;
  recommendation: string[];
  totalItems: number;
}

export interface Question {
  key: number;
  text: string;
  options: QuestionOption[];
  answerKey: number;
}

export interface QuestionOption {
  key: number;
  text: string;
}

export interface Answer {
  key: number;
  questionKey: number;
}

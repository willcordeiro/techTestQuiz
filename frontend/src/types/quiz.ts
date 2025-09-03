export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  createdAt: Date;
}

export interface Question {
  text: string;
  id: string;
  type: "BOOLEAN" | "INPUT" | "CHECKBOX";
  question: string;
  options?: string[];
  correctAnswers?: string[];
}

export interface CreateQuizRequest {
  title: string;
  questions: Omit<Question, "id">[];
}

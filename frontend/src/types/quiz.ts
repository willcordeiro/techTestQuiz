export type QuestionType = "BOOLEAN" | "INPUT" | "CHECKBOX";

export interface BaseQuestion {
  id?: string;
  type: QuestionType;
  prompt: string;
}

export interface BooleanQuestion extends BaseQuestion {
  type: "BOOLEAN";
  correct: boolean;
}

export interface InputQuestion extends BaseQuestion {
  type: "INPUT";
  correctAnswer: string;
}

export interface CheckboxQuestion extends BaseQuestion {
  type: "CHECKBOX";
  options: string[];
  correctOptions: number[];
}

export type Question = BooleanQuestion | InputQuestion | CheckboxQuestion;

export interface Quiz {
  id?: string;
  title: string;
  questions: Question[];
}

import type { Quiz, CreateQuizRequest } from "@/types/quiz";

class QuizStore {
  private quizzes: Quiz[] = [];

  getQuizzes(): Quiz[] {
    return this.quizzes.map((quiz) => ({
      ...quiz,
      questions: quiz.questions,
    }));
  }

  getQuiz(id: string): Quiz | undefined {
    return this.quizzes.find((quiz) => quiz.id === id);
  }

  createQuiz(data: CreateQuizRequest): Quiz {
    const quiz: Quiz = {
      id: Math.random().toString(36).substr(2, 9),
      title: data.title,
      questions: data.questions.map((q) => ({
        ...q,
        id: Math.random().toString(36).substr(2, 9),
      })),
      createdAt: new Date(),
    };
    this.quizzes.push(quiz);
    return quiz;
  }

  deleteQuiz(id: string): boolean {
    const index = this.quizzes.findIndex((quiz) => quiz.id === id);
    if (index !== -1) {
      this.quizzes.splice(index, 1);
      return true;
    }
    return false;
  }
}

export const quizStore = new QuizStore();

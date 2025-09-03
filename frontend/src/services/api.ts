import { Quiz } from "@/types/quiz";
import axios from "axios";

type CreateQuizPayload = {
  title: string;
  description?: string;
  questions: Array<{
    text: string;
    type: "BOOLEAN" | "INPUT" | "CHECKBOX";
    options?: string[];
  }>;
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const quizApi = {
  async create(payload: CreateQuizPayload) {
    const { data } = await api.post("/quizzes", payload);
    return data;
  },
  async list() {
    const { data } =
      await api.get<
        Array<{ id: string; title: string; questionCount: number }>
      >("/quizzes");
    return data;
  },
  async get(id: string) {
    const { data } = await api.get<Quiz>(`/quizzes/${id}`);
    return data;
  },
  async remove(id: string) {
    await api.delete(`/quizzes/${id}`);
  },
};

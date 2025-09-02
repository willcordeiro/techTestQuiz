import axios from "axios";
import type { Quiz } from "@/types/quiz";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const quizApi = {
  async create(payload: Omit<Quiz, "id">) {
    const { data } = await api.post<Quiz>("/quizzes", payload);
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

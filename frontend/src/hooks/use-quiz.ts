"use client";

import { useState, useEffect } from "react";
import { quizStore } from "@/lib/quiz-store";
import type { Quiz } from "@/types/quiz";

export function useQuiz(id: string) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundQuiz = quizStore.getQuiz(id);
    setQuiz(foundQuiz || null);
    setLoading(false);
  }, [id]);

  return { quiz, loading };
}

export function useQuizzes() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setQuizzes(quizStore.getQuizzes());
    setLoading(false);
  }, []);

  const refreshQuizzes = () => {
    setQuizzes(quizStore.getQuizzes());
  };

  return { quizzes, loading, refreshQuizzes };
}

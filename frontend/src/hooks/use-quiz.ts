"use client";

import { useState, useEffect } from "react";

import { quizApi } from "@/services/api";
import type { Quiz } from "@/types/quiz";

function parseQuizDates<T extends { createdAt: any; updatedAt?: any }>(
  quiz: T
): T {
  return {
    ...quiz,
    createdAt: new Date(quiz.createdAt),
    ...(quiz.updatedAt ? { updatedAt: new Date(quiz.updatedAt) } : {}),
  };
}

export function useQuiz(id: string) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    quizApi
      .get(id)
      .then((data) => setQuiz(parseQuizDates(data)))
      .catch(() => setQuiz(null))
      .finally(() => setLoading(false));
  }, [id]);

  return { quiz, loading };
}

export function useQuizzes() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQuizzes = () => {
    setLoading(true);
    quizApi
      .list()
      .then((data) => {
        // Defensive: if backend ever returns createdAt, parse it
        setQuizzes(
          (data as any[]).map((quiz) =>
            quiz.createdAt ? parseQuizDates(quiz) : quiz
          ) as Quiz[]
        );
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return { quizzes, loading, refreshQuizzes: fetchQuizzes };
}

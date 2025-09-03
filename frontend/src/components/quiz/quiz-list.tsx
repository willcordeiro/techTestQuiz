"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { quizApi } from "@/services/api";
import { QuizCard } from "./quiz-card";
import { Quiz } from "@/types/quiz";

type QuizListItem = { id: string; title: string; questionCount: number };

export default function QuizList() {
  const [quizzes, setQuizzes] = useState<QuizListItem[]>([]);
  const { toast } = useToast();

  const fetchQuizzes = () => {
    quizApi
      .list()
      .then((data) =>
        setQuizzes(
          (data as unknown as Quiz[]).map((quiz) => ({
            id: quiz.id,
            title: quiz.title,
            questionCount: quiz.questions?.length || 0,
          }))
        )
      )
      .catch(() => setQuizzes([]));
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await quizApi.remove(id);
      fetchQuizzes();
      toast({
        title: "Success",
        description: "Quiz deleted successfully",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete quiz",
        variant: "destructive",
      });
    }
  };

  if (quizzes.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-muted-foreground mb-2">
          No quizzes found
        </h3>
        <p className="text-muted-foreground">
          Create your first quiz to get started
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {quizzes.map((quiz) => (
        <QuizCard key={quiz.id} quiz={quiz} onDelete={handleDelete} />
      ))}
    </div>
  );
}

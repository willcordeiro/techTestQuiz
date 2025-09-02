"use client";

import { useState, useEffect } from "react";
import { quizStore } from "@/lib/quiz-store";
import { useToast } from "@/hooks/use-toast";
import { QuizCard } from "./quiz-card";
import type { Quiz } from "@/types/quiz";

export function QuizList() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setQuizzes(quizStore.getQuizzes());
  }, []);

  const handleDelete = (id: string) => {
    const success = quizStore.deleteQuiz(id);
    if (success) {
      setQuizzes(quizStore.getQuizzes());
      toast({
        title: "Success",
        description: "Quiz deleted successfully",
      });
    } else {
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

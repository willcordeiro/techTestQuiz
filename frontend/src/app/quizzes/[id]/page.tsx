"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useQuiz } from "@/hooks/use-quiz";
import { QuizDetail } from "@/components/quiz/quiz-detail";

export default function QuizDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { quiz, loading } = useQuiz(params.id as string);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Quiz Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The quiz you&apos;re looking for doesn&apos;t exist or has been
              deleted.
            </p>
            <Button onClick={() => router.push("/quizzes")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Quizzes
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => router.push("/quizzes")}
            className="mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Quizzes
          </Button>
          <QuizDetail quiz={quiz} />
        </div>
      </div>
    </div>
  );
}

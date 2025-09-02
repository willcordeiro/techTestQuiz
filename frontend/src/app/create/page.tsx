import { PageHeader } from "@/components/layout/page-header";
import { QuizForm } from "@/components/quiz/quiz-form";

export default function CreateQuizPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <PageHeader
            title="Create New Quiz"
            description="Build a custom quiz with multiple question types"
          />
          <QuizForm />
        </div>
      </div>
    </div>
  );
}

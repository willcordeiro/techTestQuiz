import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import QuizList from "@/components/quiz/quiz-list";

export default function QuizzesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <PageHeader
            title="All Quizzes"
            description="Manage and view your created quizzes"
          >
            <Link href="/create">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Quiz
              </Button>
            </Link>
          </PageHeader>
          <QuizList />
        </div>
      </div>
    </div>
  );
}

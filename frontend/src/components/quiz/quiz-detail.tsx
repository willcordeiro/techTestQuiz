import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Quiz } from "@/types/quiz";

interface QuizDetailProps {
  quiz: Quiz;
}

export function QuizDetail({ quiz }: QuizDetailProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{quiz.title}</h1>
        <p className="text-muted-foreground">
          Created on {quiz.createdAt.toLocaleDateString()} •{" "}
          {quiz.questions.length} question
          {quiz.questions.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="space-y-4">
        {quiz.questions.map((question, index) => (
          <Card key={question.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Question {index + 1}
                  </p>
                  <CardTitle className="text-lg">{question.text}</CardTitle>
                </div>
                <Badge variant="secondary">
                  {mapQuestionType(question.type)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {question.type === "CHECKBOX" && question.options && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    Options:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    {question.options.map((option, optionIndex) => (
                      <li key={optionIndex} className="text-sm">
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function mapQuestionType(type: string) {
  switch (type) {
    case "BOOLEAN":
    case "boolean":
      return "True/False questions";
    case "INPUT":
    case "input":
      return "Short text answers";
    case "CHECKBOX":
    case "checkbox":
      return "Multiple choice";
    default:
      return "Unknown question type";
  }
}

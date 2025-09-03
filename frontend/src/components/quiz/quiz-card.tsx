"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Eye } from "lucide-react";
import type { Quiz } from "@/types/quiz";

interface QuizCardProps {
  quiz: Quiz;
  onDelete: (id: string) => void;
}

export function QuizCard({ quiz, onDelete }: QuizCardProps) {
  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">{quiz.title}</CardTitle>
            <CardDescription>
              Created on {quiz.createdAt.toLocaleDateString()}
            </CardDescription>
          </div>
          <Badge variant="secondary">
            {quiz.questions.length} question
            {quiz.questions.length !== 1 ? "s" : ""}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {quiz.questions.slice(0, 3).map((question) => (
              <Badge key={question.id} variant="outline" className="text-xs">
                {{
                  boolean: "True/False questions",
                  input: "Short text answers",
                  checkbox: "Multiple choice",
                }[question.type] || "Unknown question type"}
              </Badge>
            ))}
            {quiz.questions.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{quiz.questions.length - 3} more
              </Badge>
            )}
          </div>
          <div className="flex gap-2">
            <Link href={`/quizzes/${quiz.id}`}>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View
              </Button>
            </Link>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(quiz.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

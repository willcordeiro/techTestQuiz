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
type QuizListItem = { id: string; title: string; questionCount: number };

interface QuizCardProps {
  quiz: QuizListItem;
  onDelete: (id: string) => void;
}

export const QuizCard = ({ quiz, onDelete }: QuizCardProps) => {
  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">{quiz.title}</CardTitle>
            {/* Não há createdAt na listagem */}
          </div>
          <Badge variant="secondary">
            {quiz.questionCount} question{quiz.questionCount !== 1 ? "s" : ""}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div />
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
};

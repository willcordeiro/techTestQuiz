"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { createQuizSchema, type CreateQuizFormData } from "@/lib/validations";
import { quizApi } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { QuestionForm } from "./question-form";

export function QuizForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateQuizFormData>({
    resolver: zodResolver(createQuizSchema),
    defaultValues: {
      title: "",
      questions: [
        { type: "boolean", question: "", options: [], correctAnswers: [] },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const onSubmit = async (data: CreateQuizFormData) => {
    setIsSubmitting(true);
    const payload = {
      title: data.title,
      description: undefined,
      questions: data.questions.map((q) => ({
        text: q.question,
        type: q.type.toUpperCase() as "BOOLEAN" | "INPUT" | "CHECKBOX",
        options: q.options && q.options.length > 0 ? q.options : undefined,
      })),
    };

    try {
      await quizApi.create(payload);
      toast({
        title: "Success",
        description: "Quiz created successfully!",
      });
      router.push("/quizzes");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create quiz",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addQuestion = () => {
    append({ type: "boolean", question: "", options: [], correctAnswers: [] });
  };

  const removeQuestion = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Quiz Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="title">Quiz Title</Label>
            <Input
              id="title"
              {...form.register("title")}
              placeholder="Enter quiz title"
            />
            {form.formState.errors.title && (
              <p className="text-sm text-destructive">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Questions</h2>
          <Button type="button" onClick={addQuestion} variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Question
          </Button>
        </div>

        {fields.map((field, index) => (
          <QuestionForm
            key={field.id}
            index={index}
            form={form}
            onRemove={() => removeQuestion(index)}
            canRemove={fields.length > 1}
          />
        ))}
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Quiz"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

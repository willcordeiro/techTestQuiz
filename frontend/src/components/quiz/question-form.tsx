"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type { CreateQuizFormData } from "@/lib/validations";
import { CheckboxOptions } from "./checkbox-options";

interface QuestionFormProps {
  index: number;
  form: UseFormReturn<CreateQuizFormData>;
  onRemove: () => void;
  canRemove: boolean;
}

export function QuestionForm({
  index,
  form,
  onRemove,
  canRemove,
}: QuestionFormProps) {
  const questionType = form.watch(`questions.${index}.type`);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Question {index + 1}</CardTitle>
          {canRemove && (
            <Button type="button" variant="ghost" size="sm" onClick={onRemove}>
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Question Type</Label>
          <Select
            value={questionType}
            onValueChange={(value) =>
              form.setValue(
                `questions.${index}.type`,
                value as "boolean" | "input" | "checkbox"
              )
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="boolean">Boolean (True/False)</SelectItem>
              <SelectItem value="input">Input (Text Answer)</SelectItem>
              <SelectItem value="checkbox">
                Checkbox (Multiple Choice)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Question Text</Label>
          <Textarea
            {...form.register(`questions.${index}.question`)}
            placeholder="Enter your question"
            rows={3}
          />
          {form.formState.errors.questions?.[index]?.question && (
            <p className="text-sm text-destructive">
              {form.formState.errors.questions[index].question.message}
            </p>
          )}
        </div>

        {questionType === "checkbox" && (
          <CheckboxOptions index={index} form={form} />
        )}
      </CardContent>
    </Card>
  );
}

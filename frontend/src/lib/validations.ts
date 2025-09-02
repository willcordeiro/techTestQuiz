import { z } from "zod";

export const questionSchema = z.object({
  type: z.enum(["boolean", "input", "checkbox"]),
  question: z.string().min(1, "Question is required"),
  options: z.array(z.string()).optional(),
  correctAnswers: z.array(z.string()).optional(),
});

export const createQuizSchema = z.object({
  title: z.string().min(1, "Title is required"),
  questions: z
    .array(questionSchema)
    .min(1, "At least one question is required"),
});

export type CreateQuizFormData = z.infer<typeof createQuizSchema>;

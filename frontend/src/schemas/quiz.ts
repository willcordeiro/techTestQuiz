import { z } from "zod";

export const QuestionSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("BOOLEAN"),
    prompt: z.string().min(1),
    correct: z.boolean(),
  }),
  z.object({
    type: z.literal("INPUT"),
    prompt: z.string().min(1),
    correctAnswer: z.string().min(1),
  }),
  z.object({
    type: z.literal("CHECKBOX"),
    prompt: z.string().min(1),
    options: z.array(z.string().min(1)).min(2),
    correctOptions: z.array(z.number().int().nonnegative()).min(1),
  }),
]);

export const QuizSchema = z.object({
  title: z.string().min(1),
  questions: z.array(QuestionSchema).min(1),
});

export type QuizForm = z.infer<typeof QuizSchema>;

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type { CreateQuizFormData } from "@/lib/validations";

interface CheckboxOptionsProps {
  index: number;
  form: UseFormReturn<CreateQuizFormData>;
}

export function CheckboxOptions({ index, form }: CheckboxOptionsProps) {
  const [newOption, setNewOption] = useState("");
  const options = form.watch(`questions.${index}.options`) || [];

  const addOption = () => {
    if (newOption.trim()) {
      const currentOptions = form.getValues(`questions.${index}.options`) || [];
      form.setValue(`questions.${index}.options`, [
        ...currentOptions,
        newOption.trim(),
      ]);
      setNewOption("");
    }
  };

  const removeOption = (optionIndex: number) => {
    const currentOptions = form.getValues(`questions.${index}.options`) || [];
    form.setValue(
      `questions.${index}.options`,
      currentOptions.filter((_, i) => i !== optionIndex)
    );
  };

  return (
    <div className="space-y-2">
      <Label>Answer Options</Label>
      <div className="space-y-2">
        {options.map((option: string, optionIndex: number) => (
          <div key={optionIndex} className="flex items-center gap-2">
            <Input value={option} readOnly />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeOption(optionIndex)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <div className="flex gap-2">
          <Input
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            placeholder="Add new option"
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addOption())
            }
          />
          <Button type="button" onClick={addOption} variant="outline">
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}

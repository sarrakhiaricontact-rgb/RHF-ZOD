import React from "react";
import { useFormContext, useController, type Path } from "react-hook-form";
import { SkillSchema, type FormValues } from "../../schema/FormSchema";
import { z } from "zod";
import { Input as ShadcnInput } from "../ui/input";

import { AlertCircle } from "lucide-react";
import { Label } from "../ui/label";

type SkillFieldPath = `skills.${number}.${keyof z.infer<typeof SkillSchema>}`;
type InputFieldPath = Path<FormValues> | SkillFieldPath;

interface InputProps {
  name: InputFieldPath;
  label: string;
  type?: "text" | "email" | "password" | "tel" | "date";
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  type = "text",
  placeholder,
}) => {
  const { control } = useFormContext<FormValues>();

  const {
    field,
    fieldState: { error, isTouched },
  } = useController({ name, control });

  const hasError = error && isTouched;

  return (
    <div className="mb-4 space-y-2">
      <Label htmlFor={name} className={hasError ? "text-red-600" : ""}>
        {label}
      </Label>

      <ShadcnInput
        id={name}
        type={type}
        {...field}
        value={field.value ?? (type === "date" ? "" : undefined)}
        placeholder={placeholder}
        className={hasError ? "border-red-500 focus-visible:ring-red-500" : ""}
      />

      {hasError && (
        <div className="flex items-start gap-2 text-red-600">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <p className="text-sm">{error.message}</p>
        </div>
      )}
    </div>
  );
};

export default Input;

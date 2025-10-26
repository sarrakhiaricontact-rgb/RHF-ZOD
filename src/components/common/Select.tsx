import React from "react";
import { useFormContext, useController } from "react-hook-form";
import { type FormValues, SkillSchema } from "../../schema/FormSchema";
import { z } from "zod";
import {
  Select as ShadSelect,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Label } from "../ui/label";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  name:
    | keyof FormValues
    | `skills.${number}.${keyof z.infer<typeof SkillSchema>}`;
  label: string;
  options: SelectOption[];
}

const Select: React.FC<SelectProps> = ({ name, label, options }) => {
  const { control } = useFormContext<FormValues>();

  const {
    field,
    fieldState: { error },
  } = useController<FormValues>({ name, control });

  return (
    <div className="mb-4">
      <Label htmlFor={name} className="mb-1">
        {label}
      </Label>

      <ShadSelect value={field.value} onValueChange={field.onChange}>
        <SelectTrigger
          className={`w-full border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-lg`}
        >
          <SelectValue placeholder={`Sélectionner ${label}`} />
        </SelectTrigger>

        <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </ShadSelect>

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default Select;

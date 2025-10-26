import { CreditCard, Plus, Trash2 } from "lucide-react";
import { useFormContext, useFieldArray } from "react-hook-form";
import Input from "../common/Input";
import Select from "../common/Select";
import Checkbox from "../common/Checkbox";
import Header from "../common/Header";
import {
  type FormValues,
  SkillLevelOptions,
  type SkillRowProps,
} from "../../schema/FormSchema";
import { memo } from "react";

// Composant memoisé pour chaque ligne de compétence
const SkillRow = memo(({ field, index, remove }: SkillRowProps) => (
  <div
    key={field.id}
    className="flex gap-4 items-center p-4 bg-gray-50 rounded-lg shadow-sm"
  >
    <div className="flex-1 space-y-2">
      <Input
        name={`skills.${index}.name`}
        label="Compétence"
        placeholder="React, Node.js, etc."
      />

      <Select
        name={`skills.${index}.level`}
        label="Niveau"
        options={SkillLevelOptions}
      />
    </div>

    <button
      type="button"
      onClick={() => remove(index)}
      className="p-2 mt-2 text-red-600 hover:bg-red-100 rounded-full transition duration-150 ease-in-out self-start"
      aria-label={`Supprimer la compétence ${index + 1}`}
    >
      <Trash2 className="w-5 h-5" />
    </button>
  </div>
));

const Step3SkillsTerms = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  // Accès aux erreurs pour l'array 'skills'
  const skillsArrayError = errors.skills?.message;

  return (
    <div>
      <Header icon={CreditCard} title="Vos compétences" />

      <div className="space-y-3">
        {fields.map((field, index) => (
          <SkillRow
            key={field.id}
            field={field}
            index={index}
            remove={remove}
          />
        ))}

        {fields.length === 0 && skillsArrayError && (
          <p className="text-red-500 text-sm mt-1">
            {skillsArrayError as string}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => append({ name: "", level: "beginner" })}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium bg-blue-50 p-2 rounded-lg transition duration-150 mt-3"
      >
        <Plus className="w-5 h-5" />
        Ajouter une compétence
      </button>

      <div className="border-t pt-4 mt-6 space-y-3">
        <Checkbox
          name="newsletter"
          label="Je souhaite recevoir la newsletter"
        />
        <Checkbox
          name="terms"
          label="J'accepte les conditions d'utilisation *"
        />
      </div>
    </div>
  );
};

export default Step3SkillsTerms;

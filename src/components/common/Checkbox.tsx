import { Controller, useFormContext } from "react-hook-form";
import { type FormValues } from "../../schema/FormSchema";
import { Checkbox as ShadCheckbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface CheckboxProps {
  name: keyof FormValues;
  label: string;
}

const Checkbox = ({ name, label }: CheckboxProps) => {
  const { control } = useFormContext<FormValues>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="mb-4 flex items-center">
          <ShadCheckbox
            checked={field.value}
            onCheckedChange={(checked) => field.onChange(Boolean(checked))}
            className="mr-2"
          ></ShadCheckbox>
          <Label
            htmlFor={name}
            className="text-sm text-gray-700 cursor-pointer"
          >
            {label}
          </Label>
          {error && (
            <p className="text-red-500 text-sm mt-1 ml-6">{error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default Checkbox;

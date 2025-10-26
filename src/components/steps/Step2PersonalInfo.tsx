import { Building } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import Input from "../common/Input";
import Checkbox from "../common/Checkbox";
import Header from "../common/Header";
import type { FormValues } from "../../schema/FormSchema";

const CompanyFields = () => (
  <div className="mt-4 pl-6 border-l-2 border-blue-500 space-y-4 bg-blue-50 p-4 rounded-lg">
    <Input name="companyName" label="Nom de l'entreprise" />
    <Input name="companyVAT" label="Numéro de TVA" placeholder="FR123456789" />
  </div>
);

const Step2PersonalInfo = () => {
  const { control } = useFormContext<FormValues>();
  // Problème ICI: (watch) déclenche un re-render du composant entier à chaque changement de valeur dans le formulaire
  // const hasCompany = watch("hasCompany");

  // useWatch ne re-render que si "hasCompany" change
  const hasCompany = useWatch({
    control,
    name: "hasCompany",
  });

  return (
    <div>
      <Header icon={Building} title="Informations personnelles" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input name="firstName" label="Prénom" placeholder="Jean" />
        <Input name="lastName" label="Nom" placeholder="Dupont" />
      </div>

      <Input
        name="phone"
        label="Téléphone"
        type="tel"
        placeholder="0612345678"
      />
      <Input name="dateOfBirth" label="Date de naissance" type="date" />

      <div className="border-t pt-4 mt-6">
        <Checkbox name="hasCompany" label="J'ai une entreprise" />
        {hasCompany && <CompanyFields />}
      </div>
    </div>
  );
};

export default Step2PersonalInfo;

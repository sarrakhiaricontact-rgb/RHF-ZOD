import { User } from "lucide-react";
import Input from "../common/Input";
import Header from "../common/Header";

const Step1Auth = () => (
  <div className="space-y-2">
    <Header icon={User} title="Créer votre compte" />
    <Input
      name="email"
      label="Email"
      type="email"
      placeholder="vous@exemple.com"
    />
    <Input name="password" label="Mot de passe" type="password" />
    <Input
      name="confirmPassword"
      label="Confirmer le mot de passe"
      type="password"
    />
  </div>
);

export default Step1Auth;

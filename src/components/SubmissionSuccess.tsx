import {
  Check,
  Mail,
  Phone,
  Briefcase,
  Building2,
  Newspaper,
} from "lucide-react";
import { type FormValues } from "../schema/FormSchema";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";

interface SubmissionSuccessProps {
  data: FormValues;
  onReset: () => void;
}

const SubmissionSuccess = ({ data, onReset }: SubmissionSuccessProps) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-indigo-100 p-6 flex items-center justify-center font-sans">
      <Card className="max-w-2xl w-full shadow-2xl border-none rounded-2xl">
        <CardHeader className="text-center pb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-bold">
            Inscription réussie !
          </CardTitle>
          <CardDescription className="text-gray-700 mt-2">
            Bienvenue{" "}
            <strong>
              {data.firstName} {data.lastName}
            </strong>{" "}
            ! Votre compte a été créé avec succès.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Résumé du profil */}
          <Alert className="bg-green-50 border-green-200">
            <Check className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-700 font-medium">
              Résumé de votre profil
            </AlertTitle>
            <AlertDescription>
              <div className="mt-3 space-y-3">
                {/* Email */}
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Mail className="w-4 h-4 text-gray-500 shrink-0" />
                  {data.email}
                </div>

                {/* Téléphone */}
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Phone className="w-4 h-4 text-gray-500 shrink-0" />
                  {data.phone}
                </div>

                {/* Compétences */}
                <div className="flex flex-col gap-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-gray-500 shrink-0" />
                    <span>
                      {data.skills.length} compétence
                      {data.skills.length > 1 ? "s" : ""}:
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 ml-6">
                    {data.skills.map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {skill.name} ({skill.level})
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Entreprise */}
                {data.hasCompany && (
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Building2 className="w-4 h-4 text-gray-500 shrink-0" />
                    <span>
                      <strong>{data.companyName}</strong> - TVA:{" "}
                      {data.companyVAT}
                    </span>
                  </div>
                )}

                {/* Newsletter */}
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Newspaper className="w-4 h-4 text-gray-500 shrink-0" />
                  <span>
                    Newsletter:
                    <Badge
                      variant={data.newsletter ? "default" : "secondary"}
                      className="ml-2 text-xs"
                    >
                      {data.newsletter ? "Activée" : "Désactivée"}
                    </Badge>
                  </span>
                </div>
              </div>
            </AlertDescription>
          </Alert>

          <Separator />

          {/* Bouton Nouvelle inscription */}
          <div className="flex justify-center">
            <Button
              onClick={onReset}
              size="lg"
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
            >
              Nouvelle inscription
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmissionSuccess;

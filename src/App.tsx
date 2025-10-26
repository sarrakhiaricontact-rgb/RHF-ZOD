import { useState, useCallback } from "react";
import { ChevronRight, ChevronLeft, Check, Bug } from "lucide-react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  FormSchema,
  type FormValues,
  defaultValues,
  STEP_FIELDS,
} from "./schema/FormSchema";
import Step1Auth from "./components/steps/Step1Auth";
import Step2PersonalInfo from "./components/steps/Step2PersonalInfo";
import Step3SkillsTerms from "./components/steps/Step3SkillsTerms";
import ProgressBar from "./components/ProgressBar";
import SubmissionSuccess from "./components/SubmissionSuccess";

import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./components/ui/collapsible";
import { Badge } from "./components/ui/badge";

export default function App() {
  const [step, setStep] = useState(1);
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null);

  // Initialisation du formulaire avec RHF et Zod Resolver
  const methods = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues,
    mode: "onBlur",
  });

  const {
    getValues,
    trigger,
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = methods;
  const values = useWatch({ control });
  const totalSteps = 3;

  const validateStep = useCallback(
    async (stepNum: number): Promise<boolean> => {
      // 1. Récupérer les champs de l'étape
      const fieldsToValidate = STEP_FIELDS[stepNum];

      // 2. Ajouter les champs conditionnels et array
      const currentValues = getValues();
      const finalFields = [...fieldsToValidate];

      if (stepNum === 2 && currentValues.hasCompany) {
        finalFields.push("companyName", "companyVAT");
      }

      // 3. Valider les sous-champs de 'skills' pour l'étape 3
      if (stepNum === 3) {
        currentValues.skills.forEach((_, index) => {
          finalFields.push(`skills.${index}.name`, `skills.${index}.level`);
        });
      }

      // 4. Déclencher la validation RHF uniquement sur ces champs
      const isValid = await trigger(finalFields as (keyof FormValues)[], {
        shouldFocus: true,
      });

      return isValid;
    },
    [trigger, getValues]
  );

  const nextStep = async () => {
    const isValid = await validateStep(step);
    if (isValid) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleReset = () => {
    setSubmittedData(null);
    setStep(1);
    reset(defaultValues);
  };

  const onSubmit = async (data: FormValues) => {
    // Simuler un appel API
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmittedData(data);
  };

  if (submittedData) {
    return <SubmissionSuccess data={submittedData} onReset={handleReset} />;
  }

  const StepComponent = [Step1Auth, Step2PersonalInfo, Step3SkillsTerms][
    step - 1
  ];

  const errorCount = Object.keys(errors).length;

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-indigo-100 p-6 sm:p-10 font-sans">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 items-stretch">
            {/* ---- Formulaire ---- */}
            <Card
              className="flex-1 shadow-xl border-none backdrop-blur-xl bg-white/70 rounded-2xl
             transition-all duration-300 hover:shadow-2xl"
            >
              <CardContent className="flex flex-col h-full">
                <ProgressBar
                  currentStep={step}
                  totalSteps={totalSteps}
                  stepLabels={[
                    "Authentification",
                    "Informations personnelles",
                    "Compétences & Conditions",
                  ]}
                  showStepIndicators={true}
                />

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-2 flex-1 flex flex-col "
                >
                  {StepComponent && (
                    <div className="transition-all duration-500 ease-in-out">
                      <StepComponent />
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    {step > 1 ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        className="gap-2 rounded-xl hover:bg-blue-50 transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Précédent
                      </Button>
                    ) : (
                      <div />
                    )}

                    {step < totalSteps ? (
                      <Button
                        type="button"
                        variant="default"
                        onClick={nextStep}
                        className="gap-2 ml-auto bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition-all"
                      >
                        Suivant
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        variant="default"
                        disabled={isSubmitting}
                        className="gap-2 ml-auto bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md transition-all"
                      >
                        {isSubmitting ? "Envoi..." : "Terminer"}
                        <Check className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* ---- Debug Panel ---- */}
            <Card className="flex-1 border-gray-100 bg-white/70 backdrop-blur-xl rounded-2xl shadow-sm h-full">
              <Collapsible className="h-full flex flex-col">
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="hover:bg-gray-50 transition-colors cursor-pointer rounded-t-2xl">
                    <CardTitle className="flex items-center justify-between text-base">
                      <span className="flex items-center gap-2 text-gray-700">
                        <Bug className="w-5 h-5 text-gray-600" />
                        Debug Panel (RHF Values & Errors)
                      </span>
                      {errorCount > 0 && (
                        <Badge variant="destructive" className="ml-2">
                          {errorCount} erreur{errorCount > 1 ? "s" : ""}
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>

                <CollapsibleContent className="flex-1 overflow-auto">
                  <CardContent className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">
                        Values:
                      </h4>
                      <pre className="text-xs bg-gray-50 p-3 rounded-lg overflow-auto max-h-48 border border-gray-200">
                        {JSON.stringify(values, null, 2)}
                      </pre>
                    </div>

                    {errorCount > 0 && (
                      <div>
                        <h4 className="font-semibold text-red-600 mb-2">
                          Errors:
                        </h4>
                        <pre className="text-xs bg-red-50 p-3 rounded-lg overflow-auto max-h-48 border border-red-200">
                          {JSON.stringify(errors, null, 2)}
                        </pre>
                      </div>
                    )}
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}

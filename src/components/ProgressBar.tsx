import React from "react";
import { Progress } from "./ui/progress";
import { CheckCircle2, Circle } from "lucide-react";
import { Badge } from "./ui/badge";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
  showStepIndicators?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  stepLabels = [],
  showStepIndicators = false,
}) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-4">
      {/* En-tête avec statistiques */}
      {/* <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm">
            Étape {currentStep} / {totalSteps}
          </Badge>
        </div>
        <Badge variant="default" className="text-sm font-semibold">
          {Math.round(progress)}%
        </Badge>
      </div> */}

      {/* Barre de progression shadcn */}
      <Progress value={progress} className="h-3 mb-4" />

      {/* Indicateurs d'étapes optionnels */}
      {showStepIndicators && (
        <div className="flex justify-between mt-6">
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            const label = stepLabels[index] || `Étape ${stepNumber}`;

            return (
              <div
                key={stepNumber}
                className="flex flex-col items-center flex-1"
              >
                <div className="relative flex items-center justify-center mb-2">
                  {isCompleted ? (
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  ) : (
                    <Circle
                      className={`w-8 h-8 ${
                        isCurrent
                          ? "text-blue-600 fill-blue-100"
                          : "text-gray-300"
                      }`}
                    />
                  )}
                  {isCurrent && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3 h-3 bg-blue-600 rounded-full" />
                    </div>
                  )}
                </div>
                <span
                  className={`text-xs text-center ${
                    isCurrent
                      ? "font-semibold text-blue-600"
                      : isCompleted
                      ? "text-gray-700"
                      : "text-gray-400"
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;

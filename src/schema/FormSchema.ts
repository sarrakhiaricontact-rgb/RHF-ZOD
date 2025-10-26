import type { FieldArrayWithId } from "react-hook-form";
import { z } from "zod";

// Schéma pour les objets d'aptitude dans l'array 'skills'
export const SkillSchema = z.object({
  // Utilisation de .trim() pour enlever les espaces inutiles avant/après
  name: z.string().trim().min(1, "La compétence est requise."),
  // Utilisation de z.enum pour une liste de valeurs restreinte
  level: z.enum(["beginner", "intermediate", "expert"], {
    errorMap: () => ({ message: "Niveau invalide" }),
  }),
});

// Schéma principal du formulaire
export const FormSchema = z
  .object({
    // Step 1: Auth
    email: z.string().email("Email invalide").min(1, "Email est requis."),
    password: z.string().min(8, "Minimum 8 caractères"),
    confirmPassword: z.string().min(1, "Confirmer le mot de passe est requis."),

    // Step 2: Personal Info
    firstName: z.string().min(2, "Minimum 2 caractères"),
    lastName: z.string().min(2, "Minimum 2 caractères"),
    phone: z
      .string()
      .min(1, "Téléphone requis")
      .regex(/^(\+33|0)[1-9]\d{8}$/, "Numéro français invalide"),
    dateOfBirth: z.string().min(1, "Date de naissance requise"),

    // Conditional Fields
    hasCompany: z.boolean(),
    companyName: z.string().optional(),
    companyVAT: z.string().optional(),

    // Step 3: Skills & Terms
    skills: z.array(SkillSchema).min(1, "Au moins une compétence est requise."),
    newsletter: z.boolean(),
    terms: z
      .boolean()
      .refine((val) => val === true, "Vous devez accepter les conditions."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  })
  .superRefine((data, ctx) => {
    // Validation conditionnelle pour les champs d'entreprise
    if (data.hasCompany) {
      // 1. Nettoyage et vérification du Nom d'entreprise
      // On récupère la valeur, si elle existe, et on enlève les espaces de début/fin.
      const trimmedCompanyName = data.companyName?.trim();

      if (!trimmedCompanyName || trimmedCompanyName.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Nom d'entreprise requis (min 2 caractères)", // Message légèrement amélioré
          path: ["companyName"],
        });
      }

      // 2. Nettoyage et vérification du N° TVA
      const trimmedCompanyVAT = data.companyVAT?.trim();

      if (!trimmedCompanyVAT || trimmedCompanyVAT.length < 9) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "N° TVA requis (min 9 caractères)", // Message légèrement amélioré
          path: ["companyVAT"],
        });
      }
    }
  });

// Dériver le type TypeScript du schéma Zod
export type FormValues = z.infer<typeof FormSchema>;

// Définitions des champs pour la validation multi-étapes
export const STEP_FIELDS: Record<
  number,
  (keyof FormValues | `skills.${number}.${string}`)[]
> = {
  1: ["email", "password", "confirmPassword"],
  2: [
    "firstName",
    "lastName",
    "phone",
    "dateOfBirth",
    "hasCompany",
    "companyName",
    "companyVAT",
  ],
  3: ["skills", "terms", "newsletter"],
};

export const defaultValues: FormValues = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  phone: "",
  dateOfBirth: "",
  hasCompany: false,
  companyName: undefined,
  companyVAT: undefined,
  skills: [{ name: "", level: "beginner" }],
  newsletter: false,
  terms: false,
};

export const SkillLevelOptions = [
  { value: "beginner", label: "Débutant" },
  { value: "intermediate", label: "Intermédiaire" },
  { value: "expert", label: "Expert" },
];

export interface SkillRowProps {
  field: FieldArrayWithId<FormValues, "skills", "id">;
  index: number;
  remove: (index: number) => void;
}

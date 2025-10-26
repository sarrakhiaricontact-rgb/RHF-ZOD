# React Hook Form + Zod - Guide Complet

## 1. Introduction

**React Hook Form (RHF)** est une bibliothèque de gestion de formulaires performante qui minimise les re-rendus et simplifie la validation. Elle utilise des refs non contrôlées pour optimiser les performances.

**Zod** est une bibliothèque de validation de schémas TypeScript-first qui s'intègre parfaitement avec RHF via `@hookform/resolvers`.

**Avantages clés :**
- Performances optimales (moins de re-rendus)
- API simple et intuitive
- Validation puissante avec Zod
- Support TypeScript natif
- Taille minimale du bundle

## 2. Installation

```bash
npm install react-hook-form zod @hookform/resolvers
```

**Dépendances :**
- `react-hook-form` : le cœur de la bibliothèque
- `zod` : pour la validation par schéma
- `@hookform/resolvers` : adaptateurs pour connecter Zod à RHF

## 3. useForm() - Le Hook Principal

`useForm()` est le hook central qui initialise et gère votre formulaire.

### Configuration de base

```tsx
const { register, handleSubmit, formState } = useForm({
  defaultValues: { email: '', password: '' },
  mode: 'onBlur',
  resolver: zodResolver(schema)
});
```

### Options importantes

**defaultValues** : Valeurs initiales du formulaire (obligatoire pour TypeScript)

**mode** : Quand déclencher la validation
- `onSubmit` (défaut) : à la soumission
- `onBlur` : à la perte de focus
- `onChange` : à chaque changement
- `onTouched` : après le premier blur, puis onChange
- `all` : onChange + onBlur

**resolver** : Fonction de validation (ici avec Zod)

**reValidateMode** : Quand revalider après erreur (`onChange` par défaut)

**shouldFocusError** : Focus automatique sur le premier champ en erreur (true par défaut)

### Objets retournés

**register** : Fonction pour enregistrer les inputs
```tsx
<input {...register('email')} />
```

**handleSubmit** : Wrapper pour gérer la soumission
```tsx
<form onSubmit={handleSubmit(onValid, onInvalid)}>
```

**formState** : État du formulaire
- `errors` : Erreurs de validation
- `isSubmitting` : Formulaire en cours de soumission
- `isValid` : Formulaire valide
- `isDirty` : Formulaire modifié
- `touchedFields` : Champs touchés
- `dirtyFields` : Champs modifiés

**watch** : Observer les valeurs en temps réel

**setValue** : Modifier une valeur programmatiquement

**reset** : Réinitialiser le formulaire

**trigger** : Déclencher la validation manuellement

**getValues** : Récupérer les valeurs actuelles

## 3.1. Méthodes et propriétés retournées par useForm()

### Tableau des méthodes principales

| Méthode | Signature | Description | Retour | Exemple d'utilisation |
|---------|-----------|-------------|--------|----------------------|
| **register** | `(name, options?)` | Enregistre un input dans le formulaire | `{ onChange, onBlur, ref, name }` | `<input {...register('email')} />` |
| **unregister** | `(name, options?)` | Désenregistre un ou plusieurs champs | `void` | `unregister('email')` |
| **handleSubmit** | `(onValid, onInvalid?)` | Wrapper pour la soumission | `(e) => Promise<void>` | `<form onSubmit={handleSubmit(onSubmit)}>` |
| **watch** | `(name?, defaultValue?)` | Observe les valeurs (déclenche re-render) | `any` | `const email = watch('email')` |
| **getValues** | `(name?)` | Récupère valeurs sans re-render | `any` | `const data = getValues()` |
| **setValue** | `(name, value, options?)` | Modifie une valeur programmatiquement | `void` | `setValue('email', 'test@mail.com')` |
| **reset** | `(values?, options?)` | Réinitialise le formulaire | `void` | `reset()` ou `reset(apiData)` |
| **resetField** | `(name, options?)` | Réinitialise un champ spécifique | `void` | `resetField('email')` |
| **setError** | `(name, error, options?)` | Définit manuellement une erreur | `void` | `setError('email', { message: 'Invalide' })` |
| **clearErrors** | `(name?)` | Efface les erreurs | `void` | `clearErrors('email')` |
| **trigger** | `(name?)` | Valide manuellement (async) | `Promise<boolean>` | `await trigger('email')` |
| **setFocus** | `(name, options?)` | Met le focus sur un champ | `void` | `setFocus('email')` |
| **getFieldState** | `(name)` | Récupère l'état d'un champ | `FieldState` | `getFieldState('email')` |

### Options de register()

| Option | Type | Description | Exemple |
|--------|------|-------------|---------|
| **required** | `boolean \| string` | Champ requis | `register('email', { required: 'Obligatoire' })` |
| **min** | `number \| { value, message }` | Valeur minimale | `register('age', { min: 18 })` |
| **max** | `number \| { value, message }` | Valeur maximale | `register('age', { max: 99 })` |
| **minLength** | `number \| { value, message }` | Longueur minimale | `register('password', { minLength: 8 })` |
| **maxLength** | `number \| { value, message }` | Longueur maximale | `register('bio', { maxLength: 500 })` |
| **pattern** | `RegExp \| { value, message }` | Expression régulière | `register('email', { pattern: /^.+@.+$/ })` |
| **validate** | `Function \| Object` | Validation personnalisée | `register('email', { validate: v => v.includes('@') })` |
| **valueAsNumber** | `boolean` | Convertir en nombre | `register('age', { valueAsNumber: true })` |
| **valueAsDate** | `boolean` | Convertir en date | `register('birthday', { valueAsDate: true })` |
| **disabled** | `boolean` | Désactiver le champ | `register('email', { disabled: true })` |
| **onChange** | `Function` | Callback personnalisé | `register('email', { onChange: (e) => console.log(e) })` |
| **onBlur** | `Function` | Callback personnalisé | `register('email', { onBlur: (e) => console.log(e) })` |

### Options de setValue()

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| **shouldValidate** | `boolean` | `false` | Déclencher la validation |
| **shouldDirty** | `boolean` | `false` | Marquer comme modifié |
| **shouldTouch** | `boolean` | `false` | Marquer comme touché |

**Exemple :**
```tsx
setValue('email', 'test@mail.com', {
  shouldValidate: true,
  shouldDirty: true,
  shouldTouch: true
});
```

### Options de reset()

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| **keepErrors** | `boolean` | `false` | Conserver les erreurs |
| **keepDirty** | `boolean` | `false` | Conserver l'état dirty |
| **keepDirtyValues** | `boolean` | `false` | Conserver seulement les valeurs dirty |
| **keepValues** | `boolean` | `false` | Conserver toutes les valeurs |
| **keepDefaultValues** | `boolean` | `false` | Conserver les defaultValues |
| **keepIsSubmitted** | `boolean` | `false` | Conserver isSubmitted |
| **keepTouched** | `boolean` | `false` | Conserver touchedFields |
| **keepIsValid** | `boolean` | `false` | Conserver isValid |
| **keepSubmitCount** | `boolean` | `false` | Conserver submitCount |

### Propriétés retournées

| Propriété | Type | Description |
|-----------|------|-------------|
| **control** | `Control` | Objet de contrôle (pour Controller, useWatch, etc.) |
| **formState** | `FormState` | État complet du formulaire (voir tableau ci-dessous) |

### Propriétés de formState

| Propriété | Type | Description | Exemple d'usage |
|-----------|------|-------------|-----------------|
| **isDirty** | `boolean` | Au moins un champ modifié | Activer bouton "Sauvegarder" |
| **dirtyFields** | `object` | Map des champs modifiés | `dirtyFields.email === true` |
| **touchedFields** | `object` | Map des champs touchés (blur) | Afficher erreur après blur |
| **defaultValues** | `object` | Valeurs par défaut du formulaire | Comparer avec valeurs actuelles |
| **isSubmitted** | `boolean` | Formulaire soumis au moins une fois | Changer comportement validation |
| **isSubmitSuccessful** | `boolean` | Dernière soumission réussie | Afficher message succès |
| **isSubmitting** | `boolean` | Soumission en cours | Désactiver bouton submit |
| **isValidating** | `boolean` | Validation en cours | Afficher spinner |
| **isValid** | `boolean` | Formulaire valide (mode: all/onChange/onBlur) | Activer/désactiver submit |
| **isLoading** | `boolean` | Chargement defaultValues async | Afficher skeleton |
| **submitCount** | `number` | Nombre de tentatives de soumission | Limiter les tentatives |
| **errors** | `FieldErrors` | Objet contenant toutes les erreurs | `errors.email?.message` |
| **validatingFields** | `object` | Champs en cours de validation | Afficher loader sur champ |

### Structure de l'objet errors

```tsx
errors = {
  email: {
    type: 'required',     // Type d'erreur
    message: 'Obligatoire', // Message d'erreur
    ref: HTMLInputElement  // Référence DOM
  },
  root: {
    serverError: {
      type: 'server',
      message: 'Erreur serveur'
    }
  }
}
```

### Objet FieldState (retourné par getFieldState)

| Propriété | Type | Description |
|-----------|------|-------------|
| **invalid** | `boolean` | Le champ a une erreur |
| **isDirty** | `boolean` | Le champ a été modifié |
| **isTouched** | `boolean` | Le champ a été touché (blur) |
| **error** | `FieldError` | Erreur du champ |

## 3.2. Optimisation des performances

### Comparaison : watch vs useWatch vs getValues

| Critère | watch() | useWatch() | getValues() |
|---------|---------|------------|-------------|
| **Re-render** | ✅ Oui (tout le composant) | ✅ Oui (composant local) | ❌ Non |
| **Usage** | Dans le JSX principal | Composant isolé | Fonctions/callbacks |
| **Performance** | ⚠️ Moyenne | ✅ Bonne | ✅ Excellente |
| **Réactivité** | ✅ Temps réel | ✅ Temps réel | ❌ Lecture ponctuelle |
| **Cas d'usage** | Afficher valeur, logique conditionnelle | Observer dans composant enfant | Calculs, debugging, validation |

**Exemple pratique :**

```tsx
// ❌ Mauvais : Re-render à chaque frappe
const FormComponent = () => {
  const { watch } = useForm();
  const email = watch('email'); // Tout le composant re-render
  
  return (
    <div>
      <input {...register('email')} />
      <input {...register('password')} />
      <p>Email: {email}</p> {/* Re-render même si password change */}
    </div>
  );
};

// ✅ Bon : Isoler avec useWatch
const EmailDisplay = ({ control }) => {
  const email = useWatch({ control, name: 'email' });
  return <p>Email: {email}</p>; // Seul ce composant re-render
};

// ✅ Bon : Pas de re-render pour calculs
const FormComponent = () => {
  const { getValues } = useForm();
  
  const calculateTotal = () => {
    const values = getValues(); // Pas de re-render
    return values.price * values.quantity;
  };
};
```

### Optimisation avec React.memo

```tsx
// Composant enfant optimisé
const FormField = React.memo(({ name, label, register }) => {
  console.log(`Render: ${name}`);
  return (
    <div>
      <label>{label}</label>
      <input {...register(name)} />
    </div>
  );
});

// Utilisation
<FormField name="email" label="Email" register={register} />
```

### Mode de validation : Impact performance

| Mode | Quand valider | Performance | UX | Usage recommandé |
|------|---------------|-------------|-----|------------------|
| **onSubmit** | À la soumission | ✅ Excellente | ⚠️ Tardif | Formulaires simples |
| **onBlur** | Perte de focus | ✅ Bonne | ✅ Bon équilibre | **Recommandé** |
| **onChange** | Chaque frappe | ⚠️ Moyenne | ✅ Temps réel | Formulaires critiques |
| **onTouched** | Blur puis onChange | ✅ Bonne | ✅ Progressive | Formulaires complexes |
| **all** | Blur + Change | ❌ Faible | ✅ Maximale | À éviter (sauf besoin) |

### Bonnes pratiques de performance

```tsx
// ✅ 1. Définir defaultValues (évite uncontrolled → controlled)
const methods = useForm({
  defaultValues: { email: '', password: '' }
});

// ✅ 2. Utiliser shouldUnregister pour champs conditionnels
const { register } = useForm({
  shouldUnregister: true // Nettoie les champs démontés
});

// ✅ 3. Désactiver validation inutile
setValue('email', value, { shouldValidate: false });

// ✅ 4. Subscription sélective avec useFormState
const { errors } = useFormState({ control }); // Seulement errors

// ✅ 5. Éviter watch() pour beaucoup de champs
const allValues = watch(); // ❌ Re-render à chaque changement
const email = useWatch({ name: 'email' }); // ✅ Isolé
```

## 4. Tous les Hooks RHF

### useController

Pour créer des composants contrôlés personnalisés (inputs complexes, bibliothèques UI).

```tsx
const { field, fieldState } = useController({
  name: 'username',
  control,
  rules: { required: true }
});

// field contient: value, onChange, onBlur, ref
// fieldState contient: invalid, error, isDirty, isTouched
```

**Utilisation :** Composants tiers (Select, DatePicker, etc.)

### useWatch

Observer des valeurs spécifiques sans re-rendre tout le composant.

```tsx
const password = useWatch({ control, name: 'password' });
```

**Différence avec watch :** Plus performant pour les observations isolées.

### useFormState

Souscrire à des parties spécifiques du formState pour optimiser les rendus.

```tsx
const { errors, isDirty } = useFormState({ control });
```

**Avantage :** Le composant ne re-rend que si ces valeurs changent.

### useFieldArray

Gérer des listes dynamiques de champs (tableaux).

```tsx
const { fields, append, remove, move } = useFieldArray({
  control,
  name: 'items'
});
```

**Méthodes principales :**
- `append(value)` : Ajouter un élément
- `remove(index)` : Supprimer un élément
- `insert(index, value)` : Insérer à une position
- `move(from, to)` : Déplacer un élément
- `swap(indexA, indexB)` : Échanger deux éléments
- `update(index, value)` : Mettre à jour un élément

### useFormContext

Accéder au contexte du formulaire dans des composants enfants profonds.

```tsx
// Parent
<FormProvider {...methods}>
  <form>
    <NestedInput />
  </form>
</FormProvider>

// Enfant
const { register } = useFormContext();
```

**Usage :** Formulaires multi-étapes ou composants réutilisables.

### Controller

Composant wrapper pour les inputs contrôlés (alternative à useController).

```tsx
<Controller
  name="dateOfBirth"
  control={control}
  render={({ field }) => <DatePicker {...field} />}
/>
```

## 5. Intégration avec Zod

### Schéma de base

```tsx
const schema = z.object({
  email: z.string().email('Email invalide'),
  age: z.number().min(18, 'Vous devez avoir 18 ans'),
  password: z.string().min(8, 'Minimum 8 caractères')
});

type FormData = z.infer<typeof schema>;
```

### Validations avancées

**Refine (validation personnalisée) :**
```tsx
z.string().refine(val => val.includes('@'), {
  message: 'Doit contenir @'
})
```

**Transform (transformer les données) :**
```tsx
z.string().transform(val => val.trim().toLowerCase())
```

**Validations conditionnelles :**
```tsx
z.object({
  hasAccount: z.boolean(),
  email: z.string().optional()
}).refine(data => !data.hasAccount || data.email, {
  message: 'Email requis si compte existant',
  path: ['email']
})
```

**Relations entre champs :**
```tsx
z.object({
  password: z.string(),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword']
})
```

### Types Zod utiles

- `z.string()`, `z.number()`, `z.boolean()`, `z.date()`
- `z.array(z.string())` : Tableaux
- `z.enum(['admin', 'user'])` : Énumérations
- `z.union([z.string(), z.number()])` : Types multiples
- `z.optional()`, `z.nullable()` : Valeurs optionnelles/nulles
- `z.default('valeur')` : Valeur par défaut

### Connexion RHF + Zod

```tsx
import { zodResolver } from '@hookform/resolvers/zod';

const methods = useForm<FormData>({
  resolver: zodResolver(schema)
});
```

Le `zodResolver` transforme les erreurs Zod en format RHF compatible.

## 6. Méthodes Asynchrones

### Validation asynchrone avec Zod

Zod supporte les validations asynchrones pour vérifier des données côté serveur.

```tsx
const schema = z.object({
  username: z.string().refine(
    async (val) => {
      const response = await fetch(`/api/check?username=${val}`);
      const data = await response.json();
      return data.available;
    },
    { message: "Ce nom d'utilisateur est déjà pris" }
  )
});
```

**Note :** Le resolver doit être en mode async :
```tsx
resolver: zodResolver(schema, {}, { mode: 'async' })
```

### Soumission asynchrone

`handleSubmit` gère automatiquement les fonctions async.

```tsx
const onSubmit = async (data: FormData) => {
  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Erreur serveur');
    // Succès
  } catch (error) {
    // Gestion d'erreur
  }
};
```

**isSubmitting** passe automatiquement à true pendant l'exécution.

### trigger() - Validation manuelle asynchrone

Déclencher la validation d'un ou plusieurs champs.

```tsx
// Valider un champ spécifique
await trigger('email');

// Valider plusieurs champs
await trigger(['email', 'password']);

// Valider tout le formulaire
await trigger();
```

**Retourne :** `true` si valide, `false` sinon.

**Cas d'usage :** Validation step-by-step, vérification avant passage à l'étape suivante.

### setError() - Erreurs serveur

Définir manuellement des erreurs (souvent depuis des réponses API).

```tsx
const onSubmit = async (data: FormData) => {
  const response = await fetch('/api/login', { ... });
  if (response.status === 401) {
    setError('password', {
      type: 'server',
      message: 'Mot de passe incorrect'
    });
  }
};
```

**Types d'erreurs :**
- Erreur sur un champ : `setError('fieldName', {...})`
- Erreur globale : `setError('root', {...})`

### clearErrors() - Nettoyer les erreurs

```tsx
clearErrors('email'); // Nettoyer un champ
clearErrors(['email', 'password']); // Plusieurs champs
clearErrors(); // Toutes les erreurs
```

### reset() asynchrone

Réinitialiser avec de nouvelles données (ex: après chargement API).

```tsx
const loadData = async () => {
  const user = await fetchUser();
  reset({
    email: user.email,
    name: user.name
  });
};
```

### Gestion des états de chargement

```tsx
const { isSubmitting, isValidating, isLoading } = formState;

// isSubmitting : Soumission en cours
// isValidating : Validation en cours
// isLoading : Chargement des defaultValues async
```

**Pattern courant :**
```tsx
<button disabled={isSubmitting}>
  {isSubmitting ? 'Envoi...' : 'Soumettre'}
</button>
```

### defaultValues asynchrones

Charger les valeurs initiales depuis une API.

```tsx
const { reset } = useForm();

useEffect(() => {
  async function loadData() {
    const data = await fetch('/api/user').then(r => r.json());
    reset(data);
  }
  loadData();
}, [reset]);
```

**Alternative moderne :** Utiliser React Query ou SWR avec suspension.

### Tableau récapitulatif des méthodes asynchrones

| Méthode | Type | Retour | Usage principal | Exemple |
|---------|------|--------|-----------------|---------|
| **handleSubmit** | async | Promise<void> | Soumission du formulaire | `handleSubmit(async (data) => await api.post(data))` |
| **trigger** | async | Promise<boolean> | Validation manuelle | `const isValid = await trigger('email')` |
| **reset** | async | Promise<void> | Réinitialisation avec données API | `await reset(await fetchUser())` |
| **setValue** | sync/async | void | Modifier une valeur (+ trigger optionnel) | `setValue('email', value, { shouldValidate: true })` |
| **refine (Zod)** | async | Promise<boolean> | Validation serveur dans schéma | `z.string().refine(async (v) => checkDB(v))` |

### Options pour les méthodes async

**trigger(name, options)**
```tsx
trigger('email', { shouldFocus: true }) // Focus si erreur
```

**setValue(name, value, options)**
```tsx
setValue('email', value, {
  shouldValidate: true,  // Déclencher validation
  shouldDirty: true,     // Marquer comme modifié
  shouldTouch: true      // Marquer comme touché
})
```

**reset(values, options)**
```tsx
reset(newValues, {
  keepErrors: false,        // Conserver les erreurs
  keepDirty: false,         // Conserver l'état dirty
  keepValues: false,        // Conserver les valeurs actuelles
  keepDefaultValues: false, // Conserver defaultValues
  keepIsSubmitted: false,   // Conserver isSubmitted
  keepTouched: false,       // Conserver touchedFields
  keepIsValid: false,       // Conserver isValid
  keepSubmitCount: false    // Conserver submitCount
})
```

### Gestion des erreurs asynchrones

**Pattern recommandé :**
```tsx
const onSubmit = async (data: FormData) => {
  try {
    await api.post('/endpoint', data);
    // Succès
  } catch (error) {
    if (error.field) {
      // Erreur spécifique à un champ
      setError(error.field, { 
        type: 'server', 
        message: error.message 
      });
    } else {
      // Erreur globale
      setError('root.serverError', { 
        type: 'server', 
        message: error.message 
      });
    }
  }
};

// Afficher l'erreur globale
{errors.root?.serverError && (
  <div>{errors.root.serverError.message}</div>
)}
```

---

## Résumé des Bonnes Pratiques

✅ Toujours typer vos formulaires avec `z.infer<typeof schema>`  
✅ Utiliser `mode: 'onBlur'` pour un bon équilibre UX/performance  
✅ Désactiver les boutons pendant `isSubmitting`  
✅ Gérer les erreurs serveur avec `setError('root')`  
✅ Utiliser `useFormContext` pour les formulaires complexes  
✅ Préférer `useWatch` à `watch` pour les observations isolées  
✅ Valider progressivement avec `trigger()` dans les formulaires multi-étapes

## Ressources

- [Documentation React Hook Form](https://react-hook-form.com/)
- [Documentation Zod](https://zod.dev/)
- [Exemples officiels](https://github.com/react-hook-form/react-hook-form/tree/master/examples)

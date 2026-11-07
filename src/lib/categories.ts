export const CATEGORIES = [
  { value: "dev", label: "Dev" },
  { value: "diario", label: "Diario" },
  { value: "proyectos", label: "Proyectos" },
  { value: "tutoriales", label: "Tutoriales" },
] as const;

export type Category = (typeof CATEGORIES)[number]["value"];

export const CATEGORY_VALUES = CATEGORIES.map((c) => c.value) as unknown as [
  Category,
  ...Category[],
];

export const categoryLabel = (value: string) =>
  CATEGORIES.find((c) => c.value === value)?.label ?? value;
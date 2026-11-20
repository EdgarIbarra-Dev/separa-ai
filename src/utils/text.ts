/** Minúsculas, sin tildes y con espacios simples, para comparar texto de forma flexible */
export const normalizeText = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();

/** Divide un texto ya normalizado en palabras alfanuméricas */
export const splitWords = (normalized: string): string[] => normalized.split(/[^a-z0-9]+/).filter(Boolean);

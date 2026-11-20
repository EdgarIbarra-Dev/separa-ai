import { checkmarkCircleOutline } from 'ionicons/icons';

import { containerInfo } from '../data/containers';
import { recommendationsById } from '../data/recommendations';
import { wasteCatalog } from '../data/wasteCatalog';
import { ALL_CATEGORIES, wasteCategories } from '../data/wasteCategories';
import type { CategoryFilterId } from '../data/wasteCategories';
import type { ClassifiedWaste } from '../types/classification';
import type { Recommendation, WasteCategory, WasteCategoryInfo, WasteItem } from '../types/waste';
import { normalizeText, splitWords } from '../utils/text';

const wasteById: ReadonlyMap<string, WasteItem> = new Map(wasteCatalog.map((item) => [item.id, item]));
const categoryById: ReadonlyMap<WasteCategory, WasteCategoryInfo> = new Map(
  wasteCategories.map((category) => [category.id, category]),
);

export const getWasteById = (id: string): WasteItem | undefined => wasteById.get(id);

/** Devuelve los residuos para los ids dados, en el mismo orden y sin ids desconocidos */
export const getWasteByIds = (ids: string[]): WasteItem[] =>
  ids.map((id) => wasteById.get(id)).filter((item): item is WasteItem => item !== undefined);

export const getCategoryInfo = (id: WasteCategory): WasteCategoryInfo => {
  const category = categoryById.get(id);
  if (!category) throw new Error(`Categoría desconocida: ${id}`);
  return category;
};

export const getRecommendations = (item: Pick<WasteItem, 'recommendations'>): Recommendation[] =>
  item.recommendations
    .map((id) => recommendationsById.get(id))
    .filter((recommendation): recommendation is Recommendation => recommendation !== undefined);

/** Recomendaciones de un residuo ya clasificado: usa el texto guardado y recupera el icono del catálogo */
export const resolveRecommendations = (waste: ClassifiedWaste): Recommendation[] => {
  const item = wasteById.get(waste.wasteId);
  const known = item ? getRecommendations(item) : [];
  return waste.recommendations.map(
    (text) =>
      known.find((recommendation) => recommendation.text === text) ?? { id: text, icon: checkmarkCircleOutline, text },
  );
};

/** Texto de badge, ej. "Plástico aprovechable" */
export const getItemBadge = (item: WasteItem): string => {
  const subject = getCategoryInfo(item.category).singularLabel;
  return item.container === 'black' ? `${subject} no aprovechable` : `${subject} aprovechable`;
};

// ---------- Búsqueda local ----------

interface SearchEntry {
  item: WasteItem;
  words: string[];
}

/** Índice con las palabras normalizadas de cada residuo (nombre, categoría, material, descripción, sinónimos y recipiente) */
const searchIndex: SearchEntry[] = wasteCatalog.map((item) => {
  const category = getCategoryInfo(item.category);
  const container = containerInfo[item.container];
  const text = [
    item.name,
    item.description,
    item.material ?? '',
    category.label,
    category.filterLabel,
    category.singularLabel,
    container.label,
    container.kind,
    ...item.searchTerms,
  ].join(' ');
  return { item, words: splitWords(normalizeText(text)) };
});

/** Variantes de una palabra buscada para tolerar plurales simples ("cáscaras" ↔ "cáscara") */
const tokenVariants = (token: string): string[] => {
  const variants = [token];
  if (token.length > 3 && token.endsWith('s')) variants.push(token.slice(0, -1));
  if (token.length > 4 && token.endsWith('es')) variants.push(token.slice(0, -2));
  return variants;
};

const matchesToken = (words: string[], token: string): boolean => {
  const variants = tokenVariants(token);
  return words.some((word) => variants.some((variant) => word.startsWith(variant)));
};

/** Busca residuos por texto y categoría a la vez. Es local, sin conexión y sin distinguir tildes ni mayúsculas. */
export const searchWaste = (query: string, categoryId: CategoryFilterId = ALL_CATEGORIES): WasteItem[] => {
  const tokens = splitWords(normalizeText(query));
  return searchIndex
    .filter(({ item }) => categoryId === ALL_CATEGORIES || item.category === categoryId)
    .filter(({ words }) => tokens.every((token) => matchesToken(words, token)))
    .map(({ item }) => item);
};

export interface CategoryGroup {
  category: WasteCategoryInfo;
  items: WasteItem[];
}

/** Agrupa residuos por categoría en el orden del catálogo, omitiendo categorías vacías */
export const groupByCategory = (items: WasteItem[]): CategoryGroup[] =>
  wasteCategories
    .map((category) => ({ category, items: items.filter((item) => item.category === category.id) }))
    .filter((group) => group.items.length > 0);

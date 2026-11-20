import { containerOrder } from '../data/containers';
import { wasteCategories } from '../data/wasteCategories';
import type { ClassificationSession, ClassifiedWaste } from '../types/classification';

import { readJson, removeKey, writeJson } from './preferencesStorage';

export const HISTORY_STORAGE_KEY = 'separa.history.v1';

const sources = ['manual', 'camera', 'gallery'];

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;

const isClassifiedWaste = (value: unknown): value is ClassifiedWaste =>
  isRecord(value) &&
  typeof value.id === 'string' &&
  typeof value.wasteId === 'string' &&
  typeof value.name === 'string' &&
  wasteCategories.some((category) => category.id === value.category) &&
  containerOrder.some((container) => container === value.container) &&
  Array.isArray(value.recommendations) &&
  value.recommendations.every((text) => typeof text === 'string');

const isClassificationSession = (value: unknown): value is ClassificationSession =>
  isRecord(value) &&
  typeof value.id === 'string' &&
  typeof value.createdAt === 'string' &&
  !Number.isNaN(new Date(value.createdAt).getTime()) &&
  typeof value.source === 'string' &&
  sources.includes(value.source) &&
  Array.isArray(value.items) &&
  value.items.length > 0 &&
  value.items.every(isClassifiedWaste);

/** Carga el historial guardado, descartando registros dañados. Ordena de más reciente a más antiguo. */
export const loadHistory = async (): Promise<ClassificationSession[]> => {
  const stored = await readJson(HISTORY_STORAGE_KEY);
  if (!Array.isArray(stored)) return [];
  return stored
    .filter(isClassificationSession)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const saveHistory = (sessions: ClassificationSession[]): Promise<void> =>
  writeJson(HISTORY_STORAGE_KEY, sessions);

export const clearHistory = (): Promise<void> => removeKey(HISTORY_STORAGE_KEY);

import type { ClassificationSession, ClassificationSource, ClassifiedWaste } from '../types/classification';
import type { WasteItem } from '../types/waste';
import { createId } from '../utils/id';

import { getRecommendations } from './catalogService';

const toClassifiedWaste = (item: WasteItem): ClassifiedWaste => ({
  id: createId(),
  wasteId: item.id,
  name: item.name,
  category: item.category,
  container: item.container,
  recommendations: getRecommendations(item).map((recommendation) => recommendation.text),
});

/** Crea una sesión de clasificación con los residuos indicados, sin duplicados. Devuelve null si no hay residuos. */
export const createClassificationSession = (
  items: WasteItem[],
  source: ClassificationSource,
  now: Date = new Date(),
): ClassificationSession | null => {
  const uniqueItems = items.filter((item, index) => items.findIndex((other) => other.id === item.id) === index);
  if (uniqueItems.length === 0) return null;

  return {
    id: createId(),
    createdAt: now.toISOString(),
    source,
    items: uniqueItems.map(toClassifiedWaste),
  };
};

/** Indica si una sesión ya clasificada corresponde exactamente a los mismos residuos */
export const sessionMatchesWasteIds = (session: ClassificationSession, wasteIds: string[]): boolean =>
  session.items.length === wasteIds.length && wasteIds.every((id) => session.items.some((item) => item.wasteId === id));

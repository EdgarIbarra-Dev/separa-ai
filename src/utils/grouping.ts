import { containerOrder } from '../data/containers';
import type { WasteContainer } from '../types/waste';

export interface ContainerGroup<T> {
  container: WasteContainer;
  items: T[];
}

/** Agrupa elementos por recipiente (blanco, verde, negro) conservando el orden original dentro de cada grupo */
export const groupByContainer = <T extends { container: WasteContainer }>(items: T[]): ContainerGroup<T>[] =>
  containerOrder
    .map((container) => ({ container, items: items.filter((item) => item.container === container) }))
    .filter((group) => group.items.length > 0);

import { checkmarkCircleOutline, leafOutline, trashBinOutline } from 'ionicons/icons';

import type { ContainerInfo, WasteContainer } from '../types/waste';

/** Orden en el que se presentan los recipientes */
export const containerOrder: WasteContainer[] = ['white', 'green', 'black'];

export const containerInfo: Record<WasteContainer, ContainerInfo> = {
  white: {
    id: 'white',
    label: 'Recipiente blanco',
    kind: 'Aprovechable',
    instruction: 'Depositar en recipiente blanco',
    description:
      'Residuos aprovechables (plástico, cartón, papel, vidrio, metales). Asegúrate de depositarlos libres de suciedad.',
    statusLabel: 'Limpio y seco',
    statusIcon: checkmarkCircleOutline,
  },
  green: {
    id: 'green',
    label: 'Recipiente verde',
    kind: 'Orgánico aprovechable',
    instruction: 'Depositar en recipiente verde',
    description:
      'Residuos orgánicos aprovechables (restos de comida, cáscaras, café y podas). Se transforman en compostaje y abono orgánico.',
    statusLabel: 'Compostable',
    statusIcon: leafOutline,
  },
  black: {
    id: 'black',
    label: 'Recipiente negro',
    kind: 'No aprovechable',
    instruction: 'Depositar en recipiente negro',
    description:
      'Residuos no aprovechables (papel higiénico, servilletas usadas, papeles contaminados). Su destino es el relleno sanitario.',
    statusLabel: 'Descarte ordinario',
    statusIcon: trashBinOutline,
  },
};

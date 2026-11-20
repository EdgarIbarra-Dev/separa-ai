import {
  checkmarkCircleOutline,
  busOutline,
  flowerOutline,
  layersOutline,
  leafOutline,
  nutritionOutline,
  removeCircleOutline,
  restaurantOutline,
  scanOutline,
  sparklesOutline,
  sunnyOutline,
  trashBinOutline,
  trashOutline,
  waterOutline,
} from 'ionicons/icons';

import type { CaptureTip, GuideSuggestion, RecyclingContainer } from '../types/waste';

import { containerInfo } from './containers';

export const guideSuggestions: GuideSuggestion[] = [
  { id: 'plastics', label: 'Plásticos', query: 'plásticos' },
  { id: 'peels', label: 'Cáscaras', query: 'cáscaras' },
  { id: 'styrofoam', label: 'Icopor', query: 'icopor' },
  { id: 'coffee', label: 'Café', query: 'café' },
];

export const recyclingContainers: RecyclingContainer[] = [
  {
    id: 'white',
    title: containerInfo.white.label,
    badge: 'Aprovechables',
    tag: 'Secos',
    icon: trashOutline,
    itemsLayout: 'chips',
    items: [
      { id: 'plastic', label: 'Plástico', icon: checkmarkCircleOutline },
      { id: 'glass', label: 'Vidrio', icon: checkmarkCircleOutline },
      { id: 'metals', label: 'Metales', icon: checkmarkCircleOutline },
      { id: 'paper', label: 'Papel y cartón', icon: checkmarkCircleOutline },
    ],
    highlight: {
      icon: waterOutline,
      label: 'Indicador clave:',
      text: 'Deben estar limpios y secos',
    },
  },
  {
    id: 'green',
    title: containerInfo.green.label,
    badge: 'Orgánicos aprovechables',
    cornerIcon: leafOutline,
    icon: trashOutline,
    itemsLayout: 'list',
    items: [
      {
        id: 'food',
        label: 'Restos de comida y residuos de origen vegetal aprovechables',
        icon: restaurantOutline,
      },
      {
        id: 'peels',
        label: 'Cáscaras de frutas, verduras y restos de café',
        icon: nutritionOutline,
      },
      {
        id: 'garden',
        label: 'Desechos agrícolas y podas de jardín',
        icon: flowerOutline,
      },
    ],
    highlight: {
      icon: sparklesOutline,
      label: 'Transformación:',
      text: 'Aptos para compostaje y abono orgánico',
    },
  },
  {
    id: 'black',
    title: containerInfo.black.label,
    badge: 'No aprovechables',
    cornerIcon: trashBinOutline,
    icon: trashOutline,
    itemsLayout: 'list',
    items: [
      {
        id: 'hygiene',
        label: 'Papel higiénico usado y servilletas usadas',
        icon: removeCircleOutline,
      },
      {
        id: 'contaminated',
        label: 'Papeles y cartones contaminados con comida o grasa',
        icon: removeCircleOutline,
      },
      {
        id: 'others',
        label: 'Colillas de cigarrillo, polvo de barrido y empaques metalizados sucios',
        icon: removeCircleOutline,
      },
    ],
    highlight: {
      icon: busOutline,
      label: 'Destino:',
      text: 'Descarte ordinario hacia relleno sanitario',
    },
  },
];

export const captureTips: CaptureTip[] = [
  {
    id: 'light',
    icon: sunnyOutline,
    title: 'Buena iluminación',
    description: 'Evita sombras oscuras o reflejos excesivos sobre la superficie.',
  },
  {
    id: 'focus',
    icon: scanOutline,
    title: 'Enfoque cercano',
    description: 'Centra el objeto completamente dentro del marco de la cámara.',
  },
  {
    id: 'background',
    icon: layersOutline,
    title: 'Fondo despejado',
    description: 'Separa el residuo de otros elementos o superficies con texturas confusas.',
  },
];

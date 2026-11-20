import { useContext } from 'react';

import { ClassificationContext } from '../context/classificationContext';
import type { ClassificationContextValue } from '../context/classificationContext';

export const useClassification = (): ClassificationContextValue => {
  const context = useContext(ClassificationContext);
  if (!context) throw new Error('useClassification debe usarse dentro de ClassificationProvider');
  return context;
};

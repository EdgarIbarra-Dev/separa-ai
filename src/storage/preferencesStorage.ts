import { Preferences } from '@capacitor/preferences';

/**
 * Lectura y escritura de JSON sobre Capacitor Preferences.
 * En web usa localStorage; en la app móvil usa el almacenamiento nativo del dispositivo.
 */
export const readJson = async (key: string): Promise<unknown> => {
  const { value } = await Preferences.get({ key });
  if (value === null) return null;
  try {
    return JSON.parse(value) as unknown;
  } catch {
    return null;
  }
};

export const writeJson = async (key: string, data: unknown): Promise<void> => {
  await Preferences.set({ key, value: JSON.stringify(data) });
};

export const removeKey = async (key: string): Promise<void> => {
  await Preferences.remove({ key });
};

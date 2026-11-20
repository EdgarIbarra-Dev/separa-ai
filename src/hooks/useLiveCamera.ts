import { useCallback, useEffect, useRef, useState } from 'react';
import type { RefCallback } from 'react';

import { getCameraPermission, requestCameraPermission } from '../services/imagePicker/cameraService';
import {
  captureFrame,
  isCameraAccessDenied,
  isLiveCameraSupported,
  openCameraStream,
  stopCameraStream,
} from '../services/imagePicker/liveCameraService';
import type { CameraFacing } from '../services/imagePicker/liveCameraService';
import type { CapturedImage } from '../types/image';

/**
 * - idle: apagada
 * - starting: solicitando permiso o abriendo la cámara
 * - active: mostrando la cámara en vivo
 * - denied: sin permiso de cámara
 * - unavailable: sin cámara disponible o sin soporte de cámara en vivo en este WebView
 */
export type LiveCameraStatus = 'idle' | 'starting' | 'active' | 'denied' | 'unavailable';

export interface LiveCameraState {
  status: LiveCameraStatus;
  isActive: boolean;
  stream: MediaStream | null;
  /** Referencia que debe recibir el elemento <video> del visor */
  videoRef: RefCallback<HTMLVideoElement>;
  /** Toma un fotograma de la cámara en vivo. Devuelve undefined si no fue posible. */
  capture: () => Promise<CapturedImage | undefined>;
  flip: () => void;
}

/**
 * Cámara en vivo para el visor. Mientras `enabled` sea true pide el permiso (si falta) y abre la cámara;
 * al pasar a false, o al desmontar, la apaga y libera el dispositivo.
 */
export const useLiveCamera = (enabled: boolean): LiveCameraState => {
  // Fase de la cámara mientras está habilitada; al estar deshabilitada el estado visible siempre es 'idle'
  const [phase, setPhase] = useState<Exclude<LiveCameraStatus, 'idle'>>('starting');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facing, setFacing] = useState<CameraFacing>('environment');
  const videoElement = useRef<HTMLVideoElement | null>(null);

  const videoRef = useCallback<RefCallback<HTMLVideoElement>>((element) => {
    videoElement.current = element;
  }, []);

  // Conecta la cámara al elemento de video cuando ambos están disponibles
  useEffect(() => {
    const video = videoElement.current;
    if (!video) return;
    video.srcObject = stream;
    if (stream) void video.play().catch(() => undefined);
  }, [stream]);

  useEffect(() => {
    if (!enabled) return undefined;

    let cancelled = false;
    let opened: MediaStream | null = null;

    const start = async (): Promise<void> => {
      let permission = await getCameraPermission();
      if (permission === 'prompt' || permission === 'rationale') permission = await requestCameraPermission();
      if (cancelled) return;
      if (permission !== 'granted') {
        setPhase('denied');
        return;
      }
      if (!isLiveCameraSupported()) {
        setPhase('unavailable');
        return;
      }

      try {
        const next = await openCameraStream(facing);
        if (cancelled) {
          stopCameraStream(next);
          return;
        }
        opened = next;
        setStream(next);
        setPhase('active');
      } catch (error) {
        if (!cancelled) setPhase(isCameraAccessDenied(error) ? 'denied' : 'unavailable');
      }
    };

    void start();

    return () => {
      cancelled = true;
      stopCameraStream(opened);
      setStream(null);
      setPhase('starting');
    };
  }, [enabled, facing]);

  const capture = useCallback(async (): Promise<CapturedImage | undefined> => {
    const video = videoElement.current;
    return video ? captureFrame(video) : undefined;
  }, []);

  const flip = useCallback(() => {
    setFacing((current) => (current === 'environment' ? 'user' : 'environment'));
  }, []);

  const status: LiveCameraStatus = enabled ? phase : 'idle';

  return { status, isActive: status === 'active', stream, videoRef, capture, flip };
};

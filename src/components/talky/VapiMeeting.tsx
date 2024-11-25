// src/components/talky/VapiMeeting.tsx
import React, { useState, useEffect } from 'react';
import Vapi from '@vapi-ai/web';
import { VapiMeetingProps } from '../../types/talky';

// Inicialización de VAPI - Asegúrate de usar tu propia API key
const vapi = new Vapi("706ab1f0-466e-4acb-91d6-96f1bb69fa2c");

const VapiMeeting: React.FC<VapiMeetingProps> = ({ 
  isActive, 
  onEnd,
  onTranscriptUpdate,
  onError,
  onSpeechStart,
  onSpeechEnd,
  onConnectionChange
}) => {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  // Notificar cambios en el estado de conexión
  useEffect(() => {
    onConnectionChange?.({ connecting, connected });
  }, [connecting, connected, onConnectionChange]);

  // Configurar los event listeners de VAPI
  useEffect(() => {
    const setupVapiListeners = () => {
      vapi.on("call-start", () => {
        console.log("✓ Llamada iniciada");
        setConnecting(false);
        setConnected(true);
      });

      vapi.on("call-end", () => {
        console.log("✓ Llamada finalizada");
        setConnecting(false);
        setConnected(false);
        onEnd?.();
      });

      vapi.on("speech-start", () => {
        console.log("El asistente está hablando");
        onSpeechStart?.();
      });

      vapi.on("speech-end", () => {
        console.log("El asistente terminó de hablar");
        onSpeechEnd?.();
      });

      vapi.on("message", (message: { type: string; content: string }) => {
        if (message.type === 'transcript') {
          onTranscriptUpdate?.(message.content);
        }
      });

      vapi.on("error", (error: any) => {
        console.error("Error en VAPI:", error);
        setConnecting(false);
        setConnected(false);
        onError?.(error);
      });
    };

    setupVapiListeners();

    return () => {
      vapi.removeAllListeners();
    };
  }, [onEnd, onTranscriptUpdate, onError, onSpeechStart, onSpeechEnd]);

  // Manejar inicio/fin de llamada
  useEffect(() => {
    const startCall = async () => {
      try {
        if (!connected && !connecting) {
          setConnecting(true);
          // Usar tu assistant ID aquí
          await vapi.start("881c3adf-be55-470a-9dff-afe4263bb626");
        }
      } catch (error) {
        console.error("Error al iniciar la llamada:", error);
        setConnecting(false);
        setConnected(false);
        onError?.(error);
      }
    };

    const stopCall = async () => {
      try {
        if (connected) {
          await vapi.stop();
        }
      } catch (error) {
        console.error("Error al detener la llamada:", error);
        onError?.(error);
      }
    };

    if (isActive && !connected) {
      startCall();
    } else if (!isActive && connected) {
      stopCall();
    }

    return () => {
      if (connected) {
        stopCall();
      }
    };
  }, [isActive, connected, connecting, onError]);

  return null;
};

export default VapiMeeting;
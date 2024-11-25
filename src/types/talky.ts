// src/types/talky.ts

export interface ToneOption {
    id: string;
    icon: React.ComponentType;
    label: string;
    description: string;
  }
  
  export interface ResponseLengthOption {
    id: string;
    icon: React.ComponentType;
    label: string;
    description: string;
  }
  
  export interface ChatMessage {
    type: 'user' | 'bot';
    content: string;
    timestamp?: Date;
  }
  
  export interface MeetingSummary {
    overview: string;
    keyPoints: string[];
    challengesFaced: string[];
    nextSteps: string[];
  }
  
  export interface TranscriptEntry {
    speaker: string;
    text: string;
    timestamp?: Date;
  }
  
  export interface ConnectionStatus {
    connecting: boolean;
    connected: boolean;
  }
  
  // Props para los componentes
  export interface VapiMeetingProps {
    isActive: boolean;
    onEnd?: () => void;
    onTranscriptUpdate?: (text: string) => void;
    onError?: (error: any) => void;
    onSpeechStart?: () => void;
    onSpeechEnd?: () => void;
    onConnectionChange?: (status: ConnectionStatus) => void;
  }
  
  export interface ToneCardProps {
    option: ToneOption;
    selected: boolean;
    onClick: () => void;
  }
  
  export interface MeetingContentProps {
    voiceActive: boolean;
    setVoiceActive: (active: boolean) => void;
  }
  
  export interface TimerProps {
    startTime?: Date;
  }
  
  // Tipos de estado
  export type ActiveTab = 'personality' | 'chat' | 'meeting';
  export type MeetingTab = 'summary' | 'transcript' | 'next-steps' | 'notes';
  export type ToneType = 'neutral' | 'friendly' | 'professional' | 'matter-of-fact' | 'humorous';
  export type ResponseLengthType = 'concise' | 'standard' | 'thorough';
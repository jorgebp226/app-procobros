// src/components/talky/TalkyImprovement.tsx

import React, { useState, useCallback } from 'react';
import MeetingButton from '../ui/meeting-button';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from '../ui/Card';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import { Textarea } from '../ui/textarea';
import Button from '../ui/button';
import {
  Mic,
  Send,
  MessageSquare,
  Settings,
  Volume2,
  Bot,
  Clock,
  Smile,
  UserCircle2,
  Briefcase,
  ClipboardList,
  Coffee,
  AlignLeft,
  AlignCenter,
  AlignJustify,
  FileText,
  ListChecks,
  StickyNote,
  ChevronRight
} from 'lucide-react';

import ToneCard from './ToneCard';
import { Timer } from 'lucide-react';
import { AnimatedWaveform } from './AnimatedWaveform';
import { PermissionErrorMessage } from './PermissionErrorMessage';
import VapiMeeting from './VapiMeeting';
import ChatMessageComponent from './ChatMessage';
import TranscriptEntry from './TranscriptEntry';
import {
  ActiveTab,
  MeetingTab,
  ToneType,
  ResponseLengthType,
  MeetingSummary,
  ToneOption,
  ResponseLengthOption,
} from '../../types/talky';
import Sidebar from '../dashboard/Sidebar';


// Opciones predefinidas
const toneOptions: ToneOption[] = [
  {
    id: 'neutral',
    icon: UserCircle2,
    label: 'Neutral',
    description: 'Tono equilibrado y profesional'
  },
  {
    id: 'friendly',
    icon: Smile,
    label: 'Amigable',
    description: 'Acercamiento cálido y cercano'
  },
  {
    id: 'professional',
    icon: Briefcase,
    label: 'Profesional',
    description: 'Formal y centrado en negocios'
  },
  {
    id: 'matter-of-fact',
    icon: ClipboardList,
    label: 'Directo',
    description: 'Comunicación clara y concisa'
  },
  {
    id: 'humorous',
    icon: Coffee,
    label: 'Casual',
    description: 'Tono ligero y cercano'
  }
];

const responseLengthOptions: ResponseLengthOption[] = [
  {
    id: 'concise',
    icon: AlignLeft,
    label: 'Conciso',
    description: 'Respuestas breves y directas'
  },
  {
    id: 'standard',
    icon: AlignCenter,
    label: 'Estándar',
    description: 'Respuestas con detalle moderado'
  },
  {
    id: 'thorough',
    icon: AlignJustify,
    label: 'Detallado',
    description: 'Respuestas exhaustivas'
  }
];

// Datos de ejemplo para la reunión
const mockSummaryData: MeetingSummary = {
  overview: "La reunión se centró en la discusión de mejoras en la interfaz de usuario y la optimización del rendimiento del sistema.",
  keyPoints: [
    "Implementación de nuevas características de accesibilidad",
    "Mejora en los tiempos de respuesta del chatbot",
    "Actualización del diseño visual de los componentes"
  ],
  challengesFaced: [
    "Integración con APIs de terceros",
    "Optimización de la carga inicial de la aplicación"
  ],
  nextSteps: [
    "Programar reunión de seguimiento para la próxima semana",
    "Revisar e implementar los cambios propuestos",
    "Realizar pruebas de usuario con las nuevas funcionalidades"
  ]
};

const TalkyImprovement: React.FC = () => {
    const [activeTab, setActiveTab] = useState<ActiveTab>('personality');
    const [voiceActive, setVoiceActive] = useState(false);
    const [selectedTone, setSelectedTone] = useState<ToneType>('neutral');
    const [selectedLength, setSelectedLength] = useState<ResponseLengthType>('standard');
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
      { type: 'bot', content: '¡Hola! ¿En qué puedo ayudarte a mejorar hoy?' }
    ]);
  
    const handleSendMessage = () => {
      if (message.trim()) {
        setChatMessages(prev => [...prev, { type: 'user', content: message }]);
        setMessage('');
        
        // Simulate bot response
        setTimeout(() => {
          setChatMessages(prev => [...prev, { 
            type: 'bot', 
            content: 'He recibido tu mensaje y lo tendré en cuenta para mejorar mi desempeño.' 
          }]);
        }, 1000);
      }
    };
  
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar /> {/* Sidebar component on the left */}
        
        <div className="w-full pl-16 px-4 py-6"> {/* Main content with left padding */}
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center space-x-4 mb-8">
              <Bot className="w-10 h-10" style={{ color: '#22c55e' }} />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Mejora de Talkiers</h1>
                <p className="text-gray-600">Personaliza y mejora tus agentes de IA</p>
              </div>
            </div>
  
            {/* Main Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <TabsList className="w-full grid grid-cols-3 gap-4 bg-transparent">
                <TabsTrigger value="personality" className="data-[state=active]:bg-white shadow-sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Personalidad
                </TabsTrigger>
                <TabsTrigger value="chat" className="data-[state=active]:bg-white shadow-sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat Directo
                </TabsTrigger>
                <TabsTrigger value="meeting" className="data-[state=active]:bg-white shadow-sm">
                  <Volume2 className="w-4 h-4 mr-2" />
                  Reunión Virtual
                </TabsTrigger>
              </TabsList>
  
              {/* Tab Content */}
              <TabsContent value="personality" className="space-y-6">
                <section className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-800">Tono de Voz</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {toneOptions.map(option => (
                      <ToneCard
                        key={option.id}
                        option={option}
                        selected={selectedTone === option.id}
                        onClick={() => setSelectedTone(option.id)}
                      />
                    ))}
                  </div>
                </section>
  
                <section className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-800">Longitud de Respuestas</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {responseLengthOptions.map(option => (
                      <ToneCard
                        key={option.id}
                        option={option}
                        selected={selectedLength === option.id}
                        onClick={() => setSelectedLength(option.id)}
                      />
                    ))}
                  </div>
                </section>
              </TabsContent>
  
              {/* Chat Directo */}
              <TabsContent value="chat" className="space-y-4">
                <Card className="bg-white">
                  <CardContent className="p-6">
                    <div className="h-[500px] flex flex-col">
                      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                        {chatMessages.map((msg, idx) => (
                          <ChatMessageComponent key={idx} message={msg} />
                        ))}
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Escribe tu mensaje..."
                        />
                        <Button 
                          variant="default" 
                          size="icon"
                          onClick={handleSendMessage}
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
  
              {/* Reunión Virtual */}
              <TabsContent value="meeting" className="space-y-4">
            <Card className="bg-white">
                <CardContent className="p-6">
                {!voiceActive ? (
                    <div className="text-center space-y-6 py-12">
                    <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                        <Mic className="w-12 h-12" style={{ color: '#22c55e' }} />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-gray-800">Iniciar Reunión Virtual</h3>
                        <p className="text-gray-600">
                        Habla directamente con Talky para discutir mejoras y revisar el rendimiento
                        </p>
                    </div>
                    <MeetingButton 
                        onClick={() => setVoiceActive(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white w-full justify-center flex items-center py-2 px-4 rounded-lg transition-all duration-200"
                    >
                        <Mic className="w-4 h-4 mr-2" />
                        Comenzar Reunión
                    </MeetingButton>
                    </div>
                ) : (
                    <MeetingContent 
                    voiceActive={voiceActive} 
                    setVoiceActive={setVoiceActive} 
                    />
                )}
                </CardContent>
            </Card>
            </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    );
  };

// Componente MeetingContent
interface MeetingContentProps {
  voiceActive: boolean;
  setVoiceActive: (active: boolean) => void;
}

const MeetingContent: React.FC<MeetingContentProps> = ({ voiceActive, setVoiceActive }) => {
  const [activeMeetingTab, setActiveMeetingTab] = useState<MeetingTab>('summary');
  const [userNotes, setUserNotes] = useState('');
  const [transcriptData, setTranscriptData] = useState<TranscriptEntry[]>([]);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [showPermissionError, setShowPermissionError] = useState(false);
  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [startTime] = useState(new Date());

  const handleTranscriptUpdate = useCallback((text: string) => {
    setTranscriptData(prev => [...prev, {
      speaker: assistantIsSpeaking ? "Talky" : "Usuario",
      text: text,
      timestamp: new Date()
    }]);
  }, [assistantIsSpeaking]);

  const handleVapiError = useCallback((error: any) => {
    console.error("Error en la reunión virtual:", error);
    setConnecting(false);
    setConnected(false);
    
    if (error.name === 'NotAllowedError' || error.message?.includes('permission')) {
      setShowPermissionError(true);
    }
  }, []);

  const handleEndMeeting = useCallback(() => {
    setVoiceActive(false);
    setConnected(false);
    setConnecting(false);
  }, [setVoiceActive]);

  const handleStartMeeting = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      
      setConnecting(true);
      setVoiceActive(true);
      setShowPermissionError(false);
    } catch (error) {
      console.error('Error al solicitar permisos de audio:', error);
      setShowPermissionError(true);
      handleVapiError(error);
    }
  }, [setVoiceActive, handleVapiError]);

  return (
    <div className="space-y-6">
      <div className="text-center pb-6 border-b">
        <div className="relative w-24 h-24 mx-auto mb-4">
          <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-25"></div>
          <div className="relative w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
          <Volume2 className="w-12 h-12" style={{ color: '#22c55e' }} />
          </div>
        </div>

        <VapiMeeting 
          isActive={voiceActive}
          onEnd={handleEndMeeting}
          onTranscriptUpdate={handleTranscriptUpdate}
          onError={handleVapiError}
          onSpeechStart={() => setAssistantIsSpeaking(true)}
          onSpeechEnd={() => setAssistantIsSpeaking(false)}
          onConnectionChange={({ connecting: isConnecting, connected: isConnected }) => {
            setConnecting(isConnecting);
            setConnected(isConnected);
          }}
        />
        
        {connecting && !connected && (
          <div className="mb-4">
            <div className="text-blue-600 font-medium">
              Estableciendo conexión...
            </div>
            <div className="mt-2">
              <AnimatedWaveform />
            </div>
          </div>
        )}

        {connected && (
          <div className="space-y-4">
            <div className="mb-4">
              <AnimatedWaveform />
            </div>

            <div className="space-y-4 mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                {assistantIsSpeaking ? 'Talky está hablando...' : 'Reunión en Curso'}
              </h3>
              <p className="text-gray-600">
                {assistantIsSpeaking 
                  ? 'Escucha la respuesta de Talky' 
                  : 'Talky está escuchando... Habla con normalidad'}
              </p>
              <Timer startTime={startTime} />
            </div>

            <MeetingButton
              onClick={handleEndMeeting}
              variant="destructive"
              className="w-full justify-center"
            >
              <Clock className="w-4 h-4 mr-2" />
              Finalizar Reunión
            </MeetingButton>
          </div>
        )}

        {!connected && !connecting && (
          <div className="space-y-4">
            <MeetingButton
              onClick={handleStartMeeting}
              disabled={connecting}
              variant="default"
              className="w-full justify-center"
            >
              <Mic className="w-4 h-4 mr-2" />
              {connecting ? 'Conectando...' : 'Comenzar Reunión'}
            </MeetingButton>
          </div>
        )}
      </div>

      {showPermissionError && <PermissionErrorMessage />}

      <Tabs value={activeMeetingTab} onValueChange={setActiveMeetingTab}>
        <TabsList className="w-full grid grid-cols-4 gap-4 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger value="summary" className="data-[state=active]:bg-white">
            <FileText className="w-4 h-4 mr-2" />
            Resumen
          </TabsTrigger>
          <TabsTrigger value="transcript" className="data-[state=active]:bg-white">
            <MessageSquare className="w-4 h-4 mr-2" />
            Transcripción
          </TabsTrigger>
          <TabsTrigger value="next-steps" className="data-[state=active]:bg-white">
            <ListChecks className="w-4 h-4 mr-2" />
            Siguientes Pasos
          </TabsTrigger>
          <TabsTrigger value="notes" className="data-[state=active]:bg-white">
            <StickyNote className="w-4 h-4 mr-2" />
            Notas
          </TabsTrigger>
        </TabsList>
        <div className="mt-6">
          {/* Resumen */}
          <TabsContent value="summary" className="m-0">
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium mb-3">Resumen General</h4>
                <p className="text-gray-700">{mockSummaryData.overview}</p>
              </div>

              <div>
                <h4 className="text-lg font-medium mb-3">Puntos Clave</h4>
                <ul className="space-y-2">
                  {mockSummaryData.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight className="w-4 h-4 mt-1 mr-2 flex-shrink-0" style={{ color: '#22c55e' }} />
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-medium mb-3">Desafíos Identificados</h4>
                <ul className="space-y-2">
                  {mockSummaryData.challengesFaced.map((challenge, index) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight className="w-4 h-4 mt-1 mr-2 flex-shrink-0" style={{ color: '#22c55e' }} />
                      <span className="text-gray-700">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>

          {/* Transcripción */}
          <TabsContent value="transcript" className="m-0">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {transcriptData.map((entry, index) => (
                  <TranscriptEntry key={index} entry={entry} />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Siguientes Pasos */}
          <TabsContent value="next-steps" className="m-0">
            <div className="space-y-4">
              {mockSummaryData.nextSteps.map((step, index) => (
                <div 
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg flex items-start space-x-3"
                >
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-sm font-medium">{index + 1}</span>
                  </div>
                  <span className="text-gray-700">{step}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Notas */}
          <TabsContent value="notes" className="m-0">
            <div className="space-y-4">
              <Textarea
                placeholder="Añade tus notas sobre la reunión aquí..."
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                className="min-h-[300px] resize-none"
              />
              <Button 
                variant="outline" 
                className="w-full justify-center"
                onClick={() => console.log('Guardar notas:', userNotes)}
              >
                Guardar Notas
              </Button>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default TalkyImprovement;

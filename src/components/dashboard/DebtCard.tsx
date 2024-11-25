// src/components/dashboard/DebtCard.tsx
import React, { useState } from 'react';
import { Card, CardContent } from '../ui/Card';
import { Progress } from '../ui/Progress';
import {
  ChevronRight,
  Video,
  Mail,
  Calendar,
  ArrowLeft,
  Users,
  Brain,
  Building2,
  TrendingUp,
  MessageSquare,
  Phone,
  Clock
} from 'lucide-react';
import WorkerView from './WorkerView'; // Asegúrate de importar WorkerView
import { Debtor } from '../../types'; // Importamos los tipos si es necesario

// Interfaces
interface SizeClasses {
  sm: string;
  md: string;
  lg: string;
}

interface AvatarProps {
  src?: string;
  name: string;
  size?: keyof SizeClasses;
  status?: 'active' | 'pending' | 'inactive';
  isAI?: boolean;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
}

interface User {
  id: number;
  name: string;
  status: 'active' | 'pending' | 'inactive';
  avatar?: string;
  isAI?: boolean;
  role?: string;
  activeTask?: string;
  performance?: number;
}

interface WorkspaceProps {
  users: User[];
  onDrop: (userId: number) => void;
  onWorkerClick?: (workerId: number) => void;
}

interface AIPoolProps {
  aiAgents: User[];
  onDragStart: (userId: number) => void;
}

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ComponentType;
    trend?: {
      value: number;
      label: string;
    };
    color?: string;
  }

interface ModernDebtCardProps {
  isExpanded?: boolean;
  onClick?: () => void;
  onWorkerClick?: (workerId: number) => void;
  onBack?: () => void;
  debtId?: number;
}

interface MockData {
  company: string;
  title: string;
  amount: number;
  date: string;
  type: string;
  status: 'pending' | 'active' | 'completed';
  progress: number;
  participants: User[];
  aiAgents: User[];
  aiSummary: string;
  logo?: string;
  stats: {
    callsToday: number;
    activeAgents: number;
    successRate: number;
    averageTime: string;
  };
}

// Datos de ejemplo actualizados
const mockDebts: { [key: number]: MockData } = {
  1: {
    company: "Santander",
    title: "Cartera de préstamos Q1 2024",
    amount: 1250000,
    date: "2024-03-15",
    type: "santander",
    status: "active",
    progress: 65,
    logo: "/src/assets/logos/santander-logo.png",
    stats: {
      callsToday: 45,
      activeAgents: 8,
      successRate: 72,
      averageTime: "5:30 min"
    },
    participants: [
      { id: 1, name: "Ana R.", status: "active", avatar: "/src/assets/logos/31.png", role: "Agente Senior" },
      { id: 2, name: "Carlos M.", status: "pending", avatar: "/src/assets/logos/33.png", role: "Agente" },
      { id: 3, name: "Laura S.", status: "active", avatar: "/src/assets/logos/32.png", role: "Supervisor" }
    ],
    aiAgents: [
      { id: 101, name: "IA Bot 1", status: "active", isAI: true, role: "Análisis", performance: 95 },
      { id: 102, name: "IA Bot 2", status: "active", isAI: true, role: "Llamadas", performance: 88 },
      { id: 103, name: "IA Bot 3", status: "active", isAI: true, role: "Predicción", performance: 92 }
    ],
    aiSummary: "La cartera muestra un progreso positivo con una tasa de recuperación del 65%. Las estrategias automatizadas están siendo especialmente efectivas."
  },
  2: {
    company: "BBVA",
    title: "Hipotecas en mora 2024",
    amount: 980000,
    date: "2024-02-28",
    type: "bbva",
    status: "pending",
    progress: 45,
    logo: "/src/assets/logos/bbva-logo.png",
    stats: {
      callsToday: 32,
      activeAgents: 6,
      successRate: 65,
      averageTime: "6:15 min"
    },
    participants: [
      { id: 4, name: "Luis M.", status: "active", avatar: "/src/assets/logos/35.png", role: "Agente Senior" },
      { id: 5, name: "María S.", status: "active", avatar: "/src/assets/logos/37.png", role: "Agente" }
    ],
    aiAgents: [
      { id: 104, name: "IA Bot 4", status: "active", isAI: true, role: "Análisis", performance: 91 },
      { id: 105, name: "IA Bot 5", status: "active", isAI: true, role: "Llamadas", performance: 87 }
    ],
    aiSummary: "Cartera con potencial de mejora. Se recomienda intensificar las estrategias de contacto en horarios de tarde."
  },
  3: {
    company: "CaixaBank",
    title: "Préstamos personales Q1",
    amount: 750000,
    date: "2024-03-01",
    type: "caixabank",
    status: "completed",
    progress: 85,
    logo: "/src/assets/logos/caixabank-logo.png",
    stats: {
      callsToday: 28,
      activeAgents: 5,
      successRate: 78,
      averageTime: "4:45 min"
    },
    participants: [
      { id: 6, name: "Pablo R.", status: "active", avatar: "/src/assets/logos/36.png", role: "Agente Senior" },
      { id: 7, name: "Elena G.", status: "pending", avatar: "/src/assets/logos/38.png", role: "Agente" }
    ],
    aiAgents: [
      { id: 106, name: "IA Bot 6", status: "active", isAI: true, role: "Análisis", performance: 94 },
      { id: 107, name: "IA Bot 7", status: "active", isAI: true, role: "Predicción", performance: 89 }
    ],
    aiSummary: "Excelente progreso en la recuperación. Las estrategias implementadas han sido altamente efectivas."
  }
};

// Componente Avatar mejorado
const AvatarComponent: React.FC<AvatarProps> = ({ 
  src, 
  name, 
  size = "md", 
  status = "active",
  isAI = false,
  draggable = false,
  onDragStart
}) => {
  const sizeClasses: SizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-24 h-24"
  };

  return (
    <div 
      className={`relative ${draggable ? 'cursor-move' : ''}`}
      draggable={draggable}
      onDragStart={onDragStart}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${sizeClasses[size]} rounded-full object-cover border-2 
            ${isAI ? 'border-purple-400' : 'border-white'}`}
        />
      ) : (
        <div className={`${sizeClasses[size]} rounded-full 
          ${isAI ? 'bg-gradient-to-br from-purple-400 to-purple-600' : 
            'bg-gradient-to-br from-blue-400 to-blue-600'}
          flex items-center justify-center text-white font-medium`}>
          {name.charAt(0)}
        </div>
      )}
      {status && (
        <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white
          ${status === 'active' ? 'bg-green-500' : 
            status === 'pending' ? 'bg-yellow-500' : 'bg-gray-500'}`}
        />
      )}
      {isAI && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full 
          flex items-center justify-center">
          <Brain className="w-3 h-3 text-white" />
        </div>
      )}
    </div>
  );
};

// Componente Workspace (Oficina Virtual)
const Workspace: React.FC<WorkspaceProps> = ({ users, onDrop, onWorkerClick }) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const userId = Number(e.dataTransfer.getData('userId'));
    onDrop(userId);
  };

  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-sm min-h-[300px]"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Building2 className="w-5 h-5 text-gray-500" />
          <h4 className="text-lg font-semibold">Oficina Virtual</h4>
        </div>
        <span className="text-sm text-gray-500">{users.length} agentes activos</span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map((user) => (
          <div 
            key={user.id} 
            className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
            onClick={() => onWorkerClick?.(user.id)}
          >
            <div className="flex flex-col items-center space-y-2">
              <AvatarComponent
                src={user.avatar}
                name={user.name}
                status={user.status}
                isAI={user.isAI}
              />
              <div className="text-center">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.role}</p>
                {user.performance !== undefined && (
                  <div className="mt-2 text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                    {user.performance}% efectividad
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente AI Pool
const AIPool: React.FC<AIPoolProps> = ({ aiAgents, onDragStart }) => {
  return (
    <div className="bg-purple-50 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-purple-600" />
          <h4 className="text-lg font-semibold">Agentes IA Disponibles</h4>
        </div>
        <span className="text-sm text-purple-600">{aiAgents.length} agentes</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {aiAgents.map((agent) => (
          <div 
            key={agent.id} 
            className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col items-center space-y-2">
              <AvatarComponent
                src={agent.avatar}
                name={agent.name}
                status={agent.status}
                isAI={true}
                draggable={true}
                onDragStart={(e) => {
                  e.dataTransfer.setData('userId', agent.id.toString());
                  onDragStart(agent.id);
                }}
              />
              <div className="text-center">
                <p className="font-medium">{agent.name}</p>
                <p className="text-sm text-purple-600">{agent.role}</p>
                {agent.performance !== undefined && (
                  <div className="mt-2 text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
                    {agent.performance}% efectividad
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente StatCard
const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend, color = "blue" }) => {
    return (
      <Card className={`p-4 border-none shadow-sm bg-white`}>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
          <div className={`bg-${color}-100 p-2 rounded-lg`}>
            <Icon className={`w-5 h-5 text-${color}-600`} />
          </div>
        </div>
        {trend && (
          <div className="mt-2">
            <span className={`text-sm ${trend.value > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {trend.value > 0 ? '+' : ''}{trend.value}%
            </span>
            <span className="text-sm text-gray-500 ml-1">{trend.label}</span>
          </div>
        )}
      </Card>
    );
  };

// Componente principal ModernDebtCard
export const ModernDebtCard: React.FC<ModernDebtCardProps> = ({
  isExpanded = false,
  onClick,
  onWorkerClick,
  onBack,
  debtId = 1
}) => {
  const [activeAgents, setActiveAgents] = useState<User[]>([]);
  const mockData = mockDebts[debtId] || mockDebts[1];

  const handleAIAgentDrop = (agentId: number) => {
    const agent = mockData.aiAgents.find(a => a.id === agentId);
    if (agent && !activeAgents.some(a => a.id === agentId)) {
      setActiveAgents([...activeAgents, agent]);
    }
  };

  if (isExpanded) {
    return (
      <div className="fixed inset-0 z-50 overflow-auto bg-gray-50">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header con botón de retorno */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onBack?.();
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-3">
                {mockData.logo ? (
                  <img
                    src={mockData.logo}
                    alt={mockData.company}
                    className="w-12 h-12 object-contain"
                  />
                ) : (
                  <AvatarComponent
                    name={mockData.company}
                    size="md"
                    status={mockData.status}
                  />
                )}
                <div>
                  <h2 className="text-2xl font-bold">{mockData.company}</h2>
                  <p className="text-gray-600">{mockData.title}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm text-gray-500">Deuda total</p>
                <p className="text-xl font-bold">
                  {mockData.amount.toLocaleString('es-ES', {
                    style: 'currency',
                    currency: 'EUR'
                  })}
                </p>
              </div>
              <div className={`p-2 rounded-full ${
                mockData.status === 'active' ? 'bg-green-100 text-green-600' :
                mockData.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                'bg-blue-100 text-blue-600'}`}>
                {mockData.status.charAt(0).toUpperCase() + mockData.status.slice(1)}
              </div>
            </div>
          </div>

          {/* Grid de estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <StatCard
                title="Llamadas Hoy"
                value={mockData.stats.callsToday}
                icon={Phone}
                trend={{
                value: 12,
                label: "vs ayer"
                }}
                color="blue"
            />
            <StatCard
                title="Agentes Activos"
                value={mockData.stats.activeAgents}
                icon={Users}
                color="green"
            />
            <StatCard
                title="Tasa de Éxito"
                value={`${mockData.stats.successRate}%`}
                icon={TrendingUp}
                trend={{
                value: 5.2,
                label: "este mes"
                }}
                color="purple"
            />
            <StatCard
                title="Tiempo Promedio"
                value={mockData.stats.averageTime}
                icon={Clock}
                color="orange"
            />
            </div>

          {/* Workspace y AI Pool */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <Workspace 
                users={[...mockData.participants, ...activeAgents]}
                onDrop={handleAIAgentDrop}
                onWorkerClick={onWorkerClick} // Pasamos la prop onWorkerClick
              />
            </div>
            <div>
              <AIPool 
                aiAgents={mockData.aiAgents.filter(agent => 
                  !activeAgents.some(a => a.id === agent.id)
                )}
                onDragStart={() => {}}
              />
            </div>
          </div>

          {/* Análisis y Actividad */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="w-5 h-5 text-purple-600" />
                <h4 className="text-lg font-semibold">Análisis de IA</h4>
              </div>
              <p className="text-gray-700">{mockData.aiSummary}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-2 mb-4">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <h4 className="text-lg font-semibold">Actividad Reciente</h4>
              </div>
              <div className="space-y-4">
                {mockData.participants.slice(0, 3).map((user) => (
                  <div 
                    key={user.id} 
                    className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                    onClick={() => onWorkerClick?.(user.id)}
                  >
                    <AvatarComponent src={user.avatar} name={user.name} size="sm" status={user.status} />
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">Última actividad hace Xh</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Vista de tarjeta compacta
  return (
    <Card
      className={`transition-all duration-300 ease-in-out ${
        mockData.type === 'santander' ? 'bg-red-50' :
        mockData.type === 'bbva' ? 'bg-blue-50' :
        'bg-purple-50'} border-0 shadow-sm hover:shadow-md cursor-pointer`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {mockData.logo ? (
              <img
                src={mockData.logo}
                alt={mockData.company}
                className="w-12 h-12 object-contain"
              />
            ) : (
              <AvatarComponent
                name={mockData.company}
                size="md"
                status={mockData.status}
              />
            )}
            <div>
              <h3 className="font-semibold text-gray-900">{mockData.company}</h3>
              <p className="text-sm text-gray-600">{mockData.title}</p>
            </div>
          </div>
          <div className={`p-2 rounded-full ${
            mockData.status === 'active' ? 'bg-green-100 text-green-600' :
            mockData.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
            'bg-blue-100 text-blue-600'}`}>
            {mockData.status.charAt(0).toUpperCase() + mockData.status.slice(1)}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {mockData.amount.toLocaleString('es-ES', {
                style: 'currency',
                currency: 'EUR'
              })}
            </p>
            <p className="text-sm text-gray-600">Deuda total</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Progreso de recuperación</span>
              <span className="font-medium">{mockData.progress}%</span>
            </div>
            <Progress 
              value={mockData.progress} 
              className="h-2 bg-gray-100"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {mockData.participants.length + mockData.aiAgents.length} agentes
                </span>
              </div>
              <div className="flex -space-x-2">
                {mockData.participants.slice(0, 3).map((user) => (
                  <AvatarComponent
                    key={user.id}
                    src={user.avatar}
                    name={user.name}
                    size="sm"
                    status={user.status}
                  />
                ))}
                {mockData.aiAgents.length > 0 && mockData.aiAgents.slice(0, 3).map((agent) => (
                  <AvatarComponent
                    key={agent.id}
                    src={agent.avatar}
                    name={agent.name}
                    size="sm"
                    status={agent.status}
                    isAI={agent.isAI}
                  />
                ))}
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModernDebtCard;

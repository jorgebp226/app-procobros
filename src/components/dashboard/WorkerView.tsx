// src/components/dashboard/WorkerView.tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Progress } from '../ui/Progress';
import {
  ArrowLeft,
  Activity,
  Users,
  Target,
  Clock,
  MessageSquare,
  Banknote
} from 'lucide-react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Worker, Debtor } from '../../types'; // Importamos los tipos

// Datos de ejemplo para múltiples trabajadores
const mockWorkersData: { [key: number]: Worker } = {
  1: {
    id: 1,
    name: "IA Assistant 001",
    type: "ai",
    performance: 82,
    activeCases: 120,
    totalResolved: 450,
    successRate: 78,
    averageResponseTime: "8 minutos",
    dailyInteractions: 240,
    monthlyProgress: [
      { month: 'Ene', resolved: 85, pending: 35 },
      { month: 'Feb', resolved: 95, pending: 25 },
      { month: 'Mar', resolved: 120, pending: 20 },
      { month: 'Abr', resolved: 150, pending: 15 },
    ],
    debtors: [
      {
        id: 1,
        name: "Juan Pérez",
        debt: 15000,
        progress: 65,
        status: "active",
        lastContact: "2024-04-10",
        riskLevel: "medium"
      },
      {
        id: 2,
        name: "María López",
        debt: 28000,
        progress: 40,
        status: "negotiating",
        lastContact: "2024-04-11",
        riskLevel: "high"
      },
      // ... más deudores
    ],
    aiSummary: "Este agente IA muestra un rendimiento excepcional en la gestión de casos de riesgo medio. Su tasa de respuesta es un 15% superior a la media, con particular éxito en negociaciones de deudas entre 10.000€ y 30.000€. Recomendación: Aumentar asignación de casos en este rango."
  },
  2: {
    id: 2,
    name: "Ana González",
    type: "human",
    performance: 90,
    activeCases: 85,
    totalResolved: 300,
    successRate: 88,
    averageResponseTime: "5 minutos",
    dailyInteractions: 150,
    monthlyProgress: [
      { month: 'Ene', resolved: 70, pending: 15 },
      { month: 'Feb', resolved: 80, pending: 10 },
      { month: 'Mar', resolved: 95, pending: 5 },
      { month: 'Abr', resolved: 100, pending: 0 },
    ],
    debtors: [
      {
        id: 3,
        name: "Carlos Ruiz",
        debt: 20000,
        progress: 70,
        status: "active",
        lastContact: "2024-04-09",
        riskLevel: "low"
      },
      {
        id: 4,
        name: "Lucía Fernández",
        debt: 35000,
        progress: 50,
        status: "negotiating",
        lastContact: "2024-04-12",
        riskLevel: "high"
      },
      // ... más deudores
    ],
    aiSummary: "Agente humano con una tasa de éxito alta en negociaciones y gestión de deudas de alto riesgo. Excelente tiempo de respuesta y capacidad para resolver casos rápidamente."
  },
  // Añadir más trabajadores según sea necesario
};

// Componente para las tarjetas de KPI
const KPICard: React.FC<{ title: string; value: string | number; icon: React.ComponentType; trend?: number }> = ({ title, value, icon: Icon, trend }) => {
  return (
    <Card className="bg-white">
      <CardContent className="flex items-center p-6">
        <div className="rounded-full bg-blue-100 p-3 mr-4">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-600">{title}</p>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">{value}</h3>
            {trend !== undefined && (
              <span className={`text-sm ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {trend > 0 ? '+' : ''}{trend}%
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Componente para el avatar
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

// Componente para la tarjeta de deudor
const DebtorCard: React.FC<{ debtor: Debtor; onClick: () => void }> = ({ debtor, onClick }) => (
  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
    <CardContent className="p-4" onClick={onClick}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className={`w-2 h-2 rounded-full mr-2 ${
            debtor.riskLevel === 'high' ? 'bg-red-500' :
            debtor.riskLevel === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
          }`} />
          <h4 className="font-medium">{debtor.name}</h4>
        </div>
        <span className="text-sm text-gray-500">
          {new Date(debtor.lastContact).toLocaleDateString()}
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Deuda:</span>
          <span className="font-medium">{debtor.debt.toLocaleString()}€</span>
        </div>
        <Progress value={debtor.progress} className="w-full" />
        <div className="flex justify-between text-xs text-gray-500">
          <span>{debtor.status}</span>
          <span>{debtor.progress}% recuperado</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Componente principal de la vista de trabajador
const WorkerView: React.FC<{ workerId: number; onBack: () => void; onDebtorClick: (debtor: Debtor) => void }> = ({ workerId, onBack, onDebtorClick }) => {
  const worker = mockWorkersData[workerId];

  if (!worker) {
    return (
      <div className="fixed inset-0 bg-gray-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p>Trabajador no encontrado.</p>
          <button
            onClick={onBack}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="fixed inset-0 bg-gray-50 overflow-auto z-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header con botón de retroceso */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-4"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold">Perfil del Agente</h1>
        </div>

        {/* Información principal del trabajador */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Columna 1: Avatar e info básica */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6 flex flex-col items-center">
              <AvatarComponent type={worker.type} name={worker.name} size="lg" performance={worker.performance} />
              <h2 className="text-2xl font-bold mt-4">{worker.name}</h2>
              <span className="text-purple-600 font-medium">
                {worker.type === 'ai' ? 'Agente IA' : 'Agente Humano'}
              </span>
              <div className="w-full mt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Casos activos:</span>
                  <span className="font-medium">{worker.activeCases}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Casos resueltos:</span>
                  <span className="font-medium">{worker.totalResolved}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tasa de éxito:</span>
                  <span className="font-medium">{worker.successRate}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Interacciones Diarias:</span>
                  <span className="font-medium">{worker.dailyInteractions}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Columna 2: Gráficos de rendimiento */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Rendimiento Mensual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={worker.monthlyProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="resolved" fill="#8884d8" name="Casos Resueltos" />
                    <Bar dataKey="pending" fill="#82ca9d" name="Casos Pendientes" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KPICard
            title="Tasa de Respuesta"
            value={worker.averageResponseTime}
            icon={Clock}
            trend={5}
          />
          <KPICard
            title="Interacciones Diarias"
            value={worker.dailyInteractions}
            icon={MessageSquare}
            trend={12}
          />
          <KPICard
            title="Tasa de Éxito"
            value={`${worker.successRate}%`}
            icon={Target}
            trend={8}
          />
          <KPICard
            title="Casos Activos"
            value={worker.activeCases}
            icon={Users}
            trend={-3}
          />
        </div>

        {/* Análisis de IA */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-start">
              <div className="rounded-full bg-purple-100 p-3 mr-4">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Análisis de IA</h3>
                <p className="text-gray-700">{worker.aiSummary}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de deudores */}
        <div>
          <h3 className="text-xl font-bold mb-4">Deudores Asignados</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {worker.debtors.map(debtor => (
              <DebtorCard
                key={debtor.id}
                debtor={debtor}
                onClick={() => onDebtorClick(debtor)} // Pasamos el objeto Debtor completo
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerView;

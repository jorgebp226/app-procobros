// src/components/dashboard/DebtorView.tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Progress } from '../ui/Progress';
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Clock,
  Banknote,
  CalendarIcon,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Timer,
  BadgeEuro,
  Receipt,
  User
} from 'lucide-react';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Debtor, Interaction } from '../../types';

// Datos de ejemplo mejorados
const mockPaymentData = [
  { month: 'Ene', collected: 2500, expected: 3000, remaining: 500 },
  { month: 'Feb', collected: 2800, expected: 3000, remaining: 200 },
  { month: 'Mar', collected: 3000, expected: 3000, remaining: 0 },
  { month: 'Abr', collected: 2700, expected: 3000, remaining: 300 },
  { month: 'May', collected: 2900, expected: 3000, remaining: 100 },
  { month: 'Jun', collected: 3000, expected: 3000, remaining: 0 },
];

const mockContactHistory = [
  {
    type: 'call',
    status: 'successful',
    date: '2024-04-10',
    notes: 'Cliente confirma pago para el próximo viernes',
    duration: '5:30',
  },
  {
    type: 'email',
    status: 'sent',
    date: '2024-04-09',
    notes: 'Recordatorio de vencimiento enviado',
  },
  {
    type: 'payment',
    status: 'completed',
    date: '2024-04-08',
    notes: 'Pago recibido: 500€',
    amount: 500,
  },
];

// Componente Stat mejorado
const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ComponentType;
  description?: string;
  trend?: number;
  status?: 'success' | 'warning' | 'danger' | 'normal';
}> = ({ title, value, icon: Icon, description, trend, status = 'normal' }) => {
  const statusColors = {
    success: 'text-green-600 bg-green-100',
    warning: 'text-yellow-600 bg-yellow-100',
    danger: 'text-red-600 bg-red-100',
    normal: 'text-blue-600 bg-blue-100'
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className={`rounded-full p-3 ${statusColors[status]}`}>
            <Icon className="w-6 h-6" />
          </div>
          {trend !== undefined && (
            <span className={`text-sm ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {trend > 0 ? '+' : ''}{trend}%
            </span>
          )}
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-bold">{value}</h3>
          <p className="text-sm text-gray-600">{title}</p>
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Componente de Timeline mejorado
const TimelineItem: React.FC<{ interaction: Interaction }> = ({ interaction }) => {
  const typeIcons = {
    call: Phone,
    email: Mail,
    payment: Banknote,
    message: Mail
  };

  const statusColors = {
    successful: 'bg-green-100 text-green-800 border-green-200',
    sent: 'bg-blue-100 text-blue-800 border-blue-200',
    completed: 'bg-purple-100 text-purple-800 border-purple-200',
    failed: 'bg-red-100 text-red-800 border-red-200'
  };

  const Icon = typeIcons[interaction.type] || Mail;

  return (
    <div className="relative pb-8">
      <div className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" />
      <div className="relative flex items-start space-x-3">
        <div className={`relative px-4 py-3 rounded-lg ${statusColors[interaction.status]} border`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium">
                  {interaction.type.charAt(0).toUpperCase() + interaction.type.slice(1)}
                </p>
                <p className="text-sm">{interaction.notes}</p>
              </div>
            </div>
            <time className="text-sm text-gray-500 whitespace-nowrap">
              {new Date(interaction.date).toLocaleDateString()}
            </time>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente para el indicador de riesgo mejorado
const RiskIndicator: React.FC<{ 
  level: string; 
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}> = ({ level, size = "md", showLabel = true }) => {
  const colors = {
    low: 'bg-green-500',
    medium: 'bg-yellow-500',
    high: 'bg-red-500'
  };

  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  return (
    <div className="flex items-center space-x-2">
      <div className={`${sizes[size]} ${colors[level]} rounded-full`} />
      {showLabel && (
        <span className="text-sm font-medium capitalize">
          Riesgo {level}
        </span>
      )}
    </div>
  );
};

// Componente principal DebtorView mejorado
const DebtorView: React.FC<{ debtor: Debtor; onBack: () => void }> = ({ debtor, onBack }) => {
    return (
      <div className="fixed inset-0 bg-gray-50 overflow-auto z-50">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header Mejorado */}
          <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <div className="flex items-center space-x-3">
                  <h1 className="text-2xl font-bold">{debtor.name}</h1>
                  <RiskIndicator level={debtor.riskLevel} size="md" />
                </div>
                <div className="flex items-center space-x-3 mt-1 text-sm text-gray-500">
                  <span>ID: {debtor.id}</span>
                  <span>•</span>
                  <span>Última actualización: {new Date(debtor.lastUpdate || '').toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Mail className="w-4 h-4 inline-block mr-2" />
                Email
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Phone className="w-4 h-4 inline-block mr-2" />
                Llamar
              </button>
            </div>
          </div>
  
          {/* Grid Principal */}
          <div className="grid grid-cols-12 gap-6">
            {/* Columna Principal */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              {/* Tarjetas de Estadísticas */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard
                  title="Deuda Total"
                  value={`${debtor.debt.toLocaleString()}€`}
                  icon={BadgeEuro}
                  status={debtor.riskLevel === 'high' ? 'danger' : 'normal'}
                  trend={-2.5}
                />
                <StatCard
                  title="Progreso"
                  value={`${debtor.progress}%`}
                  icon={TrendingUp}
                  status={debtor.progress > 50 ? 'success' : 'warning'}
                  trend={5.2}
                />
                <StatCard
                  title="Días Restantes"
                  value={debtor.agreement?.remainingDays || 0}
                  icon={Timer}
                  description="Hasta próximo pago"
                />
                <StatCard
                  title="Pagos Completados"
                  value={`${debtor.agreement?.completedPayments || 0}/${debtor.agreement?.totalPayments || 0}`}
                  icon={CheckCircle2}
                  status="success"
                />
              </div>
  
              {/* Gráfico Principal de Series Temporales */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Evolución de Pagos</CardTitle>
                    <div className="flex space-x-2">
                      <span className="text-sm text-gray-500">Últimos 6 meses</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mockPaymentData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="collected"
                          stackId="1"
                          stroke="#10B981"
                          fill="#10B981"
                          fillOpacity={0.6}
                          name="Cobrado"
                        />
                        <Area
                          type="monotone"
                          dataKey="remaining"
                          stackId="1"
                          stroke="#EF4444"
                          fill="#EF4444"
                          fillOpacity={0.6}
                          name="Pendiente"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
  
              {/* Análisis y Predicciones */}
              <Card>
                <CardHeader>
                  <CardTitle>Análisis y Predicciones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <AlertTriangle className="w-5 h-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-2">Análisis de IA</h4>
                        <p className="text-gray-600">{debtor.aiSummary}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      {debtor.aiRiskFactors && Object.entries(debtor.aiRiskFactors).map(([key, value]) => (
                        key !== 'overallRisk' && (
                          <div key={key} className="text-center">
                            <div className="mb-2">
                              <Progress value={value} className="h-2" />
                            </div>
                            <span className="text-sm text-gray-600 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
  
            {/* Columna Lateral */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              {/* Información de Contacto */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Información de Contacto
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Phone className="w-5 h-5 text-gray-500 mr-3" />
                      <span className="flex-1">{debtor.contact?.phone}</span>
                      <button className="p-2 hover:bg-gray-200 rounded-full">
                        <Phone className="w-4 h-4 text-blue-600" />
                      </button>
                    </div>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-gray-500 mr-3" />
                      <span className="flex-1">{debtor.contact?.email}</span>
                      <button className="p-2 hover:bg-gray-200 rounded-full">
                        <Mail className="w-4 h-4 text-blue-600" />
                      </button>
                    </div>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-gray-500 mr-3" />
                      <span>{debtor.contact?.address}</span>
                    </div>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Clock className="w-5 h-5 text-gray-500 mr-3" />
                      <span>Horario preferido: {debtor.contact?.preferredTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
  
              {/* Plan de Pagos */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Receipt className="w-5 h-5 mr-2" />
                    Plan de Pagos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Plan Actual:</span>
                      <span className="font-medium">{debtor.agreement?.paymentPlan}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Cuota:</span>
                      <span className="font-medium">{debtor.agreement?.agreedAmount}€/mes</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Próximo pago:</span>
                      <span className="font-medium">
                        {new Date(debtor.agreement?.nextPayment || '').toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
  
              {/* Historial de Interacciones */}
              <Card>
                <CardHeader>
                  <CardTitle>Historial de Interacciones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockContactHistory.map((interaction, index) => (
                      <TimelineItem key={index} interaction={interaction} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default DebtorView;
// src/components/dashboard/DebtorsView.tsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Progress } from '../ui/Progress';
import Sidebar from './Sidebar';
import {
    Phone,
    Mail,
    Plus,
    Search,
    Filter,
    BadgeEuro,
    Building2,
    Calendar,
    AlertTriangle,
    Brain,
    Timer,
    User,
    MapPin,
    ChevronRight,
    CheckCircle2,
    TrendingUp,
    ArrowLeft,
    Clock,
    Users,
    CircleDollarSign,
    ArrowUpCircle,
    BarChart,
    Activity,
    MessageCircle,
    CalendarDays
  } from 'lucide-react';

// Tipos
interface Debtor {
    id: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    totalDebt: number;
    paidAmount: number;
    progress: number;
    riskLevel: 'low' | 'medium' | 'high';
    company?: string;
    sector?: string;
    status: 'active' | 'pending' | 'completed';
    aiScore?: number;
    notes?: string;
    agreement?: {
      nextPayment: string;
      agreedAmount?: number;
      paymentPlan?: string;
      remainingDays?: number;
      completedPayments?: number;
      totalPayments?: number;
    };
  }

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
      <Card className="hover:shadow-md transition-all duration-200">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">{title}</p>
              <p className="text-2xl font-bold mt-1">{value}</p>
              {description && (
                <p className="text-xs text-gray-500 mt-1">{description}</p>
              )}
            </div>
            <div className={`p-3 rounded-lg ${statusColors[status]}`}>
              <Icon className="w-5 h-5" />
            </div>
          </div>
          {trend !== undefined && (
            <div className="mt-2">
              <span className={`text-sm ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {trend > 0 ? '+' : ''}{trend}%
              </span>
              <span className="text-sm text-gray-500 ml-1">vs. último mes</span>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

// Componentes
const RiskBadge: React.FC<{ level: 'low' | 'medium' | 'high' }> = ({ level }) => {
  const colors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[level]}`}>
      {level.charAt(0).toUpperCase() + level.slice(1)} Risk
    </span>
  );
};
const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric'
    };
    return date.toLocaleDateString('es-ES', options);
  };
const DebtorCard: React.FC<{
    debtor: Debtor;
    onClick: () => void;
  }> = ({ debtor, onClick }) => (
    <Card 
      className="hover:shadow-md transition-all duration-200 cursor-pointer bg-white border-none"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{debtor.name}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{debtor.company}</span>
                {debtor.sector && (
                  <>
                    <span>•</span>
                    <span>{debtor.sector}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <RiskBadge level={debtor.riskLevel} />
        </div>
  
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {debtor.totalDebt.toLocaleString('es-ES')} €
            </p>
            <p className="text-sm text-gray-600">Deuda total</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{debtor.progress}%</p>
            <p className="text-sm text-gray-600">Progreso</p>
          </div>
        </div>
  
        <div className="space-y-2">
          <Progress value={debtor.progress} className="h-2" />
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-2 text-gray-600">
              <Phone className="w-4 h-4" />
              <span>{debtor.phone}</span>
            </div>
            {debtor.agreement?.nextPayment && (
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Vence: {formatDate(debtor.agreement.nextPayment)}</span>
              </div>
            )}
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

const CreateDebtorModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onCreate: (debtor: Partial<Debtor>) => void;
}> = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState<Partial<Debtor>>({
    name: '',
    phone: '',
    email: '',
    address: '',
    totalDebt: 0,
    company: '',
    sector: '',
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <h2 className="text-xl font-bold mb-6">Nuevo Deudor</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Empresa
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sector
              </label>
              <input
                type="text"
                value={formData.sector}
                onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deuda Total
              </label>
              <input
                type="number"
                value={formData.totalDebt}
                onChange={(e) => setFormData({ ...formData, totalDebt: Number(e.target.value) })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onCreate(formData);
              onClose();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  );
};

// Continuación de DebtorsView.tsx

// Tipos adicionales
interface CallStats {
    duration: string;
    sentiment: 'positive' | 'neutral' | 'negative';
    willingness: number;
    nextAction: string;
    summary: string;
    keyPoints: string[];
  }
  
  // Componente de llamada en progreso
  const CallInProgress: React.FC<{
    debtor: Debtor;
    onCallComplete: (stats: CallStats) => void;
  }> = ({ debtor, onCallComplete }) => {
    const [progress, setProgress] = useState(0);
  
    useEffect(() => {
      const startCall = async () => {
        try {
          // Formatear la deuda para el mensaje
          const numberToWords = (number: number): string => {
            const units = ['', 'un', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
            const teens = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
            const tens = ['', 'diez', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
          
            if (number === 0) return 'cero';
            if (number < 0) return `menos ${numberToWords(Math.abs(number))}`;
          
            if (number >= 1000000) {
              const millions = Math.floor(number / 1000000);
              const remainder = number % 1000000;
              const millionText = millions === 1 ? 'un millón' : `${numberToWords(millions)} millones`;
              return remainder > 0 ? `${millionText} ${numberToWords(remainder)}` : millionText;
            }
          
            if (number >= 1000) {
              const thousands = Math.floor(number / 1000);
              const remainder = number % 1000;
              const thousandText = thousands === 1 ? 'mil' : `${numberToWords(thousands)} mil`;
              return remainder > 0 ? `${thousandText} ${numberToWords(remainder)}` : thousandText;
            }
          
            if (number >= 100) {
              const hundreds = Math.floor(number / 100);
              const remainder = number % 100;
              const hundredText = hundreds === 1 ? 'cien' : `${units[hundreds]}cientos`;
              return remainder > 0 ? `${hundredText} ${numberToWords(remainder)}` : hundredText;
            }
          
            if (number >= 20) {
              const ten = Math.floor(number / 10);
              const unit = number % 10;
              return unit > 0 ? `${tens[ten]} y ${units[unit]}` : tens[ten];
            }
          
            if (number >= 10) return teens[number - 10];
            return units[number];
          };
          
          const formatDebtAmount = (amount: number): string => {
            const roundedAmount = Math.round(amount);
            return `${numberToWords(roundedAmount)} euros`;
          };

          
          const formattedDebt = formatDebtAmount(debtor.totalDebt);

          // Formatear la fecha
          const nextPaymentDate = debtor.agreement?.nextPayment 
            ? new Date(debtor.agreement.nextPayment).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })
            : 'fecha pendiente de confirmar';
  
          const response = await fetch('https://api.vapi.ai/call/phone', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer 388a5521-7f7e-48f2-a7f7-1d06fb8bf79c',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              phoneNumberId: "854b45f0-5e68-46ae-a0c4-61d885cc644f",
              customer: {
                number: debtor.phone
              },
              assistantId: "92057d12-2dac-416f-beaa-c54e28425433",
              assistantOverrides: {
                firstMessage: `Buenos días ${debtor.name}, te llamamos de la empresa PROCOBROS.`,
                variableValues: {
                  Nombre: debtor.name,
                  Monto: formattedDebt,
                  Fecha: nextPaymentDate,
                  Notas: debtor.notes || 'Sin notas adicionales'
                }
              }
            })
          });
  
          if (!response.ok) {
            console.error('Error en la llamada:', await response.text());
            throw new Error('Error al iniciar la llamada');
          }
  
          const responseData = await response.json();
          console.log('Llamada iniciada exitosamente:', responseData);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      startCall();
  
      // Simulación del progreso de la llamada
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            onCallComplete({
              duration: '4:32',
              sentiment: 'positive',
              willingness: 85,
              nextAction: 'Programar siguiente llamada en 1 semana',
              summary: `Llamada completada con ${debtor.name}. El deudor muestra disposición al pago y ha acordado un plan de pagos mensual.`,
              keyPoints: [
                'Acepta responsabilidad de la deuda',
                `Propone plan de pagos de 50€ mensuales`,
                `Próximo pago programado para: 2 de diciembre`
              ]
            });
            return 100;
          }
          return prev + 1;
        });
      }, 600);
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="max-w-2xl w-full p-8">
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-purple-100 rounded-full mb-4">
              <Phone className="w-8 h-8 text-purple-600 animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Llamada en Progreso</h2>
            <p className="text-gray-600">Conectando con {debtor.name}</p>
          </div>
  
          <div className="space-y-6">
            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Brain className="w-6 h-6 text-purple-600" />
                  <span className="font-medium">Agente IA</span>
                </div>
                <span className="text-sm text-purple-600">Activo</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Progreso</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </div>
  
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Timer className="w-5 h-5 text-gray-500" />
                  <span className="font-medium">Duración</span>
                </div>
                <span className="text-2xl font-bold">
                  {Math.floor(progress * 0.6 / 100)}:{String(Math.floor(progress * 0.6) % 60).padStart(2, '0')}
                </span>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-gray-500" />
                  <span className="font-medium">Estado</span>
                </div>
                <span className="text-green-600 font-medium">Conexión estable</span>
              </div>
            </div>
  
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Brain className="w-5 h-5 text-gray-500" />
                <span className="font-medium">Análisis en tiempo real</span>
              </div>
              <div className="space-y-2">
                {progress > 30 && (
                  <p className="text-sm text-gray-600">• Identificación completada</p>
                )}
                {progress > 50 && (
                  <p className="text-sm text-gray-600">• Verificación de deuda en curso</p>
                )}
                {progress > 70 && (
                  <p className="text-sm text-gray-600">• Negociación de plan de pagos</p>
                )}
                {progress > 90 && (
                  <p className="text-sm text-gray-600">• Finalizando acuerdos</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CallResults: React.FC<{
    stats: CallStats;
    onClose: () => void;
  }> = ({ stats, onClose }) => (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Volver
          </button>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="border-none">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Duración</p>
                  <p className="text-2xl font-bold mt-1">{stats.duration}</p>
                </div>
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Timer className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
  
          <Card className="border-none">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Disposición</p>
                  <p className="text-2xl font-bold mt-1">{stats.willingness}%</p>
                </div>
                <div className="bg-green-100 p-2 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <Progress value={stats.willingness} className="h-1 mt-2" />
            </CardContent>
          </Card>
  
          <Card className="border-none">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Sentimiento</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`w-3 h-3 rounded-full ${
                      stats.sentiment === 'positive' ? 'bg-green-500' :
                      stats.sentiment === 'neutral' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`} />
                    <span className="text-lg font-medium capitalize">
                      {stats.sentiment}
                    </span>
                  </div>
                </div>
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Brain className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-none">
            <CardHeader>
              <CardTitle>Resumen de la Llamada</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">{stats.summary}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Puntos Clave:</h4>
                  <ul className="space-y-2">
                    {stats.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
  
          <Card className="border-none">
            <CardHeader>
              <CardTitle>Próximos Pasos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <span className="font-medium">Siguiente Acción</span>
                </div>
                <p className="text-gray-700">{stats.nextAction}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
  
  // Componente principal DebtorsView
  const DebtorsView: React.FC = () => {
    const [debtors, setDebtors] = useState<Debtor[]>(mockDebtors);
    const [selectedDebtor, setSelectedDebtor] = useState<Debtor | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [isCallInProgress, setIsCallInProgress] = useState(false);
    const [callStats, setCallStats] = useState<CallStats | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'pending' | 'completed'>('all');
  
    const filteredDebtors = debtors.filter(debtor => {
      const matchesSearch = debtor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           debtor.company?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || debtor.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  
    const handleStartCall = () => {
      setIsCallInProgress(true);
    };
  
    const handleCallComplete = (stats: CallStats) => {
      setIsCallInProgress(false);
      setCallStats(stats);
    };
  
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <div className="pl-16">
          <div className="max-w-7xl mx-auto p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">Deudores</h1>
                <p className="text-gray-600">Gestiona y realiza seguimiento de deudores</p>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg 
                          hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Nuevo Deudor</span>
              </button>
            </div>
  
             {/* Filtros */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar deudor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex bg-white rounded-lg border border-gray-200">
              {['all', 'active', 'pending', 'completed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status as any)}
                  className={`px-4 py-2 text-sm font-medium capitalize
                    ${filterStatus === status 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50'} 
                    ${status === 'all' ? 'rounded-l-lg' : ''} 
                    ${status === 'completed' ? 'rounded-r-lg' : ''}`}
                >
                  {status === 'all' ? 'Todos' : status}
                </button>
              ))}
            </div>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {/* Lista de Deudores */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDebtors.map((debtor) => (
              <DebtorCard
                key={debtor.id}
                debtor={debtor}
                onClick={() => setSelectedDebtor(debtor)}
              />
            ))}
          </div>

          {/* Modal de Creación */}
          {showCreateModal && (
            <CreateDebtorModal
              isOpen={showCreateModal}
              onClose={() => setShowCreateModal(false)}
              onCreate={(newDebtor) => {
                setDebtors([...debtors, {
                  ...newDebtor,
                  id: `${Date.now()}`,
                  progress: 0,
                  riskLevel: 'medium',
                  status: 'pending',
                  paidAmount: 0,
                } as Debtor]);
              }}
            />
          )}

          {/* Vista Detallada del Deudor */}
          {selectedDebtor && !isCallInProgress && !callStats && (
            <div className="fixed inset-0 bg-gray-50 overflow-auto z-50">
              <div className="max-w-7xl mx-auto p-6">
                <div className="mb-6">
                  <button
                    onClick={() => setSelectedDebtor(null)}
                    className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Volver
                  </button>
                </div>

                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-gray-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{selectedDebtor.name}</h2>
                      <p className="text-gray-600">{selectedDebtor.company}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleStartCall}
                    className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"                  >
                    <Phone className="w-5 h-5" />
                    <span>Iniciar Llamada IA</span>
                  </button>
                </div>

                {/* Detalles del Deudor */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    {/* Métricas Principales */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <StatCard
                        title="Deuda Total"
                        value={selectedDebtor.totalDebt.toLocaleString('es-ES', {
                          style: 'currency',
                          currency: 'EUR'
                        })}
                        icon={BadgeEuro}
                      />
                      <StatCard
                        title="Progreso"
                        value={`${selectedDebtor.progress}%`}
                        icon={TrendingUp}
                      />
                      <StatCard
                        title="Riesgo"
                        value={selectedDebtor.riskLevel}
                        icon={AlertTriangle}
                        status={selectedDebtor.riskLevel as any}
                      />
                      <StatCard
                        title="Score IA"
                        value={selectedDebtor.aiScore || 'N/A'}
                        icon={Brain}
                      />
                    </div>

                    {/* Historial y Análisis */}
                    <Card className="border-none">
                      <CardHeader>
                        <CardTitle>Historial de Pagos</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {/* Aquí iría un gráfico de historial */}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Información de Contacto */}
                  <Card className="border-none">
                    <CardHeader>
                      <CardTitle>Información de Contacto</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <Phone className="w-5 h-5 text-gray-500 mr-3" />
                          <span>{selectedDebtor.phone}</span>
                        </div>
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <Mail className="w-5 h-5 text-gray-500 mr-3" />
                          <span>{selectedDebtor.email}</span>
                        </div>
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <MapPin className="w-5 h-5 text-gray-500 mr-3" />
                          <span>{selectedDebtor.address}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* Llamada en Progreso */}
          {isCallInProgress && selectedDebtor && (
            <CallInProgress
              debtor={selectedDebtor}
              onCallComplete={handleCallComplete}
            />
          )}

          {/* Resultados de la Llamada */}
          {callStats && (
            <CallResults
              stats={callStats}
              onClose={() => setCallStats(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Mock data para pruebas
const mockDebtors: Debtor[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    phone: '+34622039644',
    email: 'juan@email.com',
    address: 'Calle Mayor 1, Madrid',
    totalDebt: 15000,
    paidAmount: 5000,
    progress: 33,
    riskLevel: 'medium',
    company: 'Tech Solutions',
    sector: 'Tecnología',
    status: 'active',
    aiScore: 75
  },
  // Añade más deudores de ejemplo aquí
];

export default DebtorsView;
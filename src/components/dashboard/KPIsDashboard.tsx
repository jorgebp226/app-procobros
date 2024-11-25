// src/components/dashboard/KPIsDashboard.tsx
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Progress } from '../ui/Progress';
import {
  Clock,
  Phone,
  TrendingUp,
  DollarSign,
  BarChart as BarChartIcon,
  Users,
  Brain,
  ArrowRight,
  Filter,
  Calendar,
  ArrowLeft
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useNavigate } from 'react-router-dom';

// Tipos para mejorar la tipificación
type TimeFrame = 'week' | 'month' | 'quarter' | 'year';
type Portfolio = 'all' | 'santander' | 'bbva' | 'caixabank' | 'sabadell';

// Estructura de los datos
interface PerformanceDataPoint {
  period: string;
  ia: number;
  human: number;
  amt?: number;
}

interface TimeDataPoint {
  name: string;
  ia: number;
  human: number;
  amt?: number;
}

interface RadarDataPoint {
  subject: string;
  ia: number;
  human: number;
  fullMark: number;
}

// Datos simulados para diferentes combinaciones
const mockData = {
  week: {
    all: {
      performanceData: [
        { period: 'Lun', ia: 80, human: 70 },
        { period: 'Mar', ia: 85, human: 75 },
        { period: 'Mié', ia: 90, human: 80 },
        { period: 'Jue', ia: 88, human: 78 },
        { period: 'Vie', ia: 92, human: 82 },
      ],
      timeData: [
        { name: 'Santander', ia: 10, human: 20 },
        { name: 'BBVA', ia: 8, human: 18 },
        { name: 'CaixaBank', ia: 12, human: 22 },
        { name: 'Sabadell', ia: 9, human: 19 },
      ],
      radarData: [
        { subject: 'Eficiencia', ia: 90, human: 75, fullMark: 100 },
        { subject: 'Éxito', ia: 85, human: 80, fullMark: 100 },
        { subject: 'Rapidez', ia: 95, human: 65, fullMark: 100 },
        { subject: 'Satisfacción', ia: 80, human: 85, fullMark: 100 },
        { subject: 'Coste', ia: 88, human: 70, fullMark: 100 },
      ],
      stats: {
        tiempoMedioLlamada: { value: '4:00 min', trend: 10, comparison: 'IA vs 6:00 min Humano' },
        tasaExito: { value: '93%', trend: 5, comparison: 'IA vs 80% Humano' },
        costeRecuperacion: { value: '3.30€', trend: -10, comparison: 'IA vs 14€ Humano' },
      },
      comparatives: [
        { title: 'Llamadas por Deuda', iaValue: '3.0', humanValue: '5.5', icon: Phone, trend: -10 },
        { title: 'Coste por Minuto', iaValue: '0.70€', humanValue: '2.00€', icon: DollarSign, trend: -20 },
        { title: 'Rentabilidad por Minuto', iaValue: '4.60€', humanValue: '3.00€', icon: TrendingUp, trend: 12 },
      ],
    },
    // Puedes agregar más carteras aquí...
  },
  month: {
    all: {
      performanceData: [
        { period: 'Ene', ia: 85, human: 75 },
        { period: 'Feb', ia: 88, human: 78 },
        { period: 'Mar', ia: 92, human: 80 },
        { period: 'Abr', ia: 95, human: 82 },
        { period: 'May', ia: 91, human: 85 },
        { period: 'Jun', ia: 94, human: 83 },
      ],
      timeData: [
        { name: 'Santander', ia: 15, human: 25 },
        { name: 'BBVA', ia: 12, human: 20 },
        { name: 'CaixaBank', ia: 18, human: 28 },
        { name: 'Sabadell', ia: 14, human: 22 },
      ],
      radarData: [
        { subject: 'Eficiencia', ia: 95, human: 80, fullMark: 100 },
        { subject: 'Éxito', ia: 88, human: 85, fullMark: 100 },
        { subject: 'Rapidez', ia: 98, human: 70, fullMark: 100 },
        { subject: 'Satisfacción', ia: 85, human: 90, fullMark: 100 },
        { subject: 'Coste', ia: 92, human: 75, fullMark: 100 },
      ],
      stats: {
        tiempoMedioLlamada: { value: '4:30 min', trend: 12, comparison: 'IA vs 7:15 min Humano' },
        tasaExito: { value: '92%', trend: 8, comparison: 'IA vs 85% Humano' },
        costeRecuperacion: { value: '3.50€', trend: -15, comparison: 'IA vs 12.75€ Humano' },
      },
      comparatives: [
        { title: 'Llamadas por Deuda', iaValue: '3.2', humanValue: '5.8', icon: Phone, trend: -15 },
        { title: 'Coste por Minuto', iaValue: '0.75€', humanValue: '2.25€', icon: DollarSign, trend: -25 },
        { title: 'Rentabilidad por Minuto', iaValue: '4.50€', humanValue: '3.25€', icon: TrendingUp, trend: 15 },
      ],
    },
    // Puedes agregar más carteras aquí...
  },
  quarter: {
    all: {
      performanceData: [
        { period: 'Q1', ia: 250, human: 220 },
        { period: 'Q2', ia: 270, human: 230 },
        { period: 'Q3', ia: 300, human: 250 },
        { period: 'Q4', ia: 320, human: 270 },
      ],
      timeData: [
        { name: 'Santander', ia: 60, human: 100 },
        { name: 'BBVA', ia: 50, human: 90 },
        { name: 'CaixaBank', ia: 70, human: 110 },
        { name: 'Sabadell', ia: 55, human: 95 },
      ],
      radarData: [
        { subject: 'Eficiencia', ia: 92, human: 78, fullMark: 100 },
        { subject: 'Éxito', ia: 90, human: 82, fullMark: 100 },
        { subject: 'Rapidez', ia: 96, human: 72, fullMark: 100 },
        { subject: 'Satisfacción', ia: 88, human: 86, fullMark: 100 },
        { subject: 'Coste', ia: 90, human: 78, fullMark: 100 },
      ],
      stats: {
        tiempoMedioLlamada: { value: '4:15 min', trend: 11, comparison: 'IA vs 6:45 min Humano' },
        tasaExito: { value: '93%', trend: 7, comparison: 'IA vs 83% Humano' },
        costeRecuperacion: { value: '3.40€', trend: -12, comparison: 'IA vs 13.50€ Humano' },
      },
      comparatives: [
        { title: 'Llamadas por Deuda', iaValue: '3.1', humanValue: '5.6', icon: Phone, trend: -12 },
        { title: 'Coste por Minuto', iaValue: '0.73€', humanValue: '2.10€', icon: DollarSign, trend: -22 },
        { title: 'Rentabilidad por Minuto', iaValue: '4.55€', humanValue: '3.10€', icon: TrendingUp, trend: 13 },
      ],
    },
    // Puedes agregar más carteras aquí...
  },
  year: {
    all: {
      performanceData: [
        { period: '2021', ia: 1000, human: 900 },
        { period: '2022', ia: 1100, human: 950 },
        { period: '2023', ia: 1200, human: 1000 },
        { period: '2024', ia: 1300, human: 1050 },
      ],
      timeData: [
        { name: 'Santander', ia: 200, human: 300 },
        { name: 'BBVA', ia: 180, human: 280 },
        { name: 'CaixaBank', ia: 220, human: 320 },
        { name: 'Sabadell', ia: 190, human: 290 },
      ],
      radarData: [
        { subject: 'Eficiencia', ia: 94, human: 80, fullMark: 100 },
        { subject: 'Éxito', ia: 92, human: 85, fullMark: 100 },
        { subject: 'Rapidez', ia: 97, human: 75, fullMark: 100 },
        { subject: 'Satisfacción', ia: 90, human: 88, fullMark: 100 },
        { subject: 'Coste', ia: 93, human: 80, fullMark: 100 },
      ],
      stats: {
        tiempoMedioLlamada: { value: '4:45 min', trend: 13, comparison: 'IA vs 7:30 min Humano' },
        tasaExito: { value: '94%', trend: 10, comparison: 'IA vs 86% Humano' },
        costeRecuperacion: { value: '3.60€', trend: -18, comparison: 'IA vs 11.00€ Humano' },
      },
      comparatives: [
        { title: 'Llamadas por Deuda', iaValue: '3.3', humanValue: '6.0', icon: Phone, trend: -18 },
        { title: 'Coste por Minuto', iaValue: '0.80€', humanValue: '2.30€', icon: DollarSign, trend: -28 },
        { title: 'Rentabilidad por Minuto', iaValue: '4.70€', humanValue: '3.50€', icon: TrendingUp, trend: 18 },
      ],
    },
    // Puedes agregar más carteras aquí...
  },
};

// Función para obtener datos basados en timeFrame y portfolio
const getData = (timeFrame: TimeFrame, portfolio: Portfolio) => {
  // En un caso real, aquí realizarías una llamada a una API
  // para obtener los datos según el timeFrame y portfolio seleccionados.
  // Para este ejemplo, usamos datos simulados.
  
  // Si la cartera no está definida para el timeFrame, se usa 'all'
  const portfolioData = mockData[timeFrame][portfolio] || mockData[timeFrame]['all'];
  return portfolioData;
};

// Componente de gráfico envuelto para manejo de errores
const ChartWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
};

// Componente StatCard mejorado
const StatCard: React.FC<{
  title: string;
  value: string | number;
  comparison?: string;
  trend?: number;
  icon: React.ComponentType;
  description?: string;
}> = ({ title, value, comparison, trend, icon: Icon, description }) => (
  <Card className="hover:shadow-md transition-all duration-200">
    <CardContent className="p-6">
      <div className="flex justify-between items-start">
        <div className={`rounded-lg p-3 ${trend && trend > 0 ? 'bg-green-100' : 'bg-blue-100'}`}>
          <Icon className={`w-6 h-6 ${trend && trend > 0 ? 'text-green-600' : 'text-blue-600'}`} />
        </div>
        {trend !== undefined && (
          <span className={`text-sm font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-bold">{value}</h3>
        <p className="text-sm text-gray-600">{title}</p>
        {comparison && (
          <p className="text-xs text-gray-500 mt-1">{comparison}</p>
        )}
        {description && (
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        )}
      </div>
    </CardContent>
  </Card>
);

// Componente ComparisonSection mejorado
const ComparisonSection: React.FC<{
  title: string;
  iaValue: string | number;
  humanValue: string | number;
  icon: React.ComponentType;
  trend?: number;
}> = ({ title, iaValue, humanValue, icon: Icon, trend }) => (
  <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
    <div className="p-3 rounded-lg bg-purple-100">
      <Icon className="w-6 h-6 text-purple-600" />
    </div>
    <div className="flex-1">
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <div className="flex items-center justify-between mt-1">
        <div>
          <span className="text-lg font-bold">{iaValue}</span>
          <span className="text-sm text-purple-600 ml-1">IA</span>
        </div>
        <ArrowRight className="w-4 h-4 text-gray-400" />
        <div>
          <span className="text-lg font-bold">{humanValue}</span>
          <span className="text-sm text-blue-600 ml-1">Humano</span>
        </div>
      </div>
    </div>
  </div>
);

// Componente principal KPIsDashboard
const KPIsDashboard: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('month');
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio>('all');
  const [performanceData, setPerformanceData] = useState<PerformanceDataPoint[]>([]);
  const [timeData, setTimeData] = useState<TimeDataPoint[]>([]);
  const [radarData, setRadarData] = useState<RadarDataPoint[]>([]);
  const [stats, setStats] = useState({
    tiempoMedioLlamada: { value: '', trend: 0, comparison: '' },
    tasaExito: { value: '', trend: 0, comparison: '' },
    costeRecuperacion: { value: '', trend: 0, comparison: '' },
  });
  const [comparatives, setComparatives] = useState<any[]>([]);

  const navigate = useNavigate();

  const timeFrameOptions = [
    { id: 'week', label: 'Semana' },
    { id: 'month', label: 'Mes' },
    { id: 'quarter', label: 'Trimestre' },
    { id: 'year', label: 'Año' },
  ];

  const portfolioOptions = [
    { id: 'all', label: 'Todas las carteras' },
    { id: 'santander', label: 'Santander' },
    { id: 'bbva', label: 'BBVA' },
    { id: 'caixabank', label: 'CaixaBank' },
    { id: 'sabadell', label: 'Sabadell' },
  ];

  // Efecto para actualizar los datos cuando cambie el timeFrame o el portfolio
  useEffect(() => {
    const data = getData(timeFrame, selectedPortfolio);
    setPerformanceData(data.performanceData);
    setTimeData(data.timeData);
    setRadarData(data.radarData);
    setStats(data.stats);
    setComparatives(data.comparatives);
  }, [timeFrame, selectedPortfolio]);

  return (
    <div className="min-h-screen bg-gray-50">
    <Sidebar />
    <div className="pl-16">
    <div className="min-h-screen bg-gray-50">
      {/* Header mejorado */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold">Panel de KPIs</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                {timeFrameOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setTimeFrame(option.id as TimeFrame)}
                    className={`px-4 py-2 text-sm rounded-md transition-colors ${
                      timeFrame === option.id
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <select
                value={selectedPortfolio}
                onChange={(e) => setSelectedPortfolio(e.target.value as Portfolio)}
                className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {portfolioOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Columna Principal */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* KPIs Principales */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard
                title="Tiempo Medio por Llamada"
                value={stats.tiempoMedioLlamada.value}
                comparison={stats.tiempoMedioLlamada.comparison}
                icon={Clock}
                trend={stats.tiempoMedioLlamada.trend}
              />
              <StatCard
                title="Tasa de Éxito"
                value={stats.tasaExito.value}
                comparison={stats.tasaExito.comparison}
                icon={TrendingUp}
                trend={stats.tasaExito.trend}
              />
              <StatCard
                title="Coste por Recuperación"
                value={stats.costeRecuperacion.value}
                comparison={stats.costeRecuperacion.comparison}
                icon={DollarSign}
                trend={stats.costeRecuperacion.trend}
              />
            </div>

            {/* Gráfico de Rendimiento */}
            <Card>
              <CardHeader>
                <CardTitle>Evolución del Rendimiento</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartWrapper>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="ia"
                      name="IA"
                      stroke="#8B5CF6"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="human"
                      name="Humano"
                      stroke="#3B82F6"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ChartWrapper>
              </CardContent>
            </Card>

            {/* Comparativa de Tiempos */}
            <Card>
              <CardHeader>
                <CardTitle>Tiempo Medio por Cartera</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartWrapper>
                  <BarChart data={timeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="ia"
                      name="IA"
                      fill="#8B5CF6"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="human"
                      name="Humano"
                      fill="#3B82F6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ChartWrapper>
              </CardContent>
            </Card>
          </div>

          {/* Columna Lateral */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Radar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Análisis Comparativo</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartWrapper>
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name="IA"
                      dataKey="ia"
                      stroke="#8B5CF6"
                      fill="#8B5CF6"
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="Humano"
                      dataKey="human"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.6}
                    />
                    <Legend />
                  </RadarChart>
                </ChartWrapper>
              </CardContent>
            </Card>

            {/* Comparativas Detalladas */}
            <div className="space-y-4">
              {comparatives.map((comp, index) => (
                <ComparisonSection
                  key={index}
                  title={comp.title}
                  iaValue={comp.iaValue}
                  humanValue={comp.humanValue}
                  icon={comp.icon}
                  trend={comp.trend}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default KPIsDashboard;

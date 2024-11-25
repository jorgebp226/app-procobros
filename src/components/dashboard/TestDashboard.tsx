import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Progress } from '../ui/Progress';
import Sidebar from './Sidebar';
import {
  PhoneCall,
  TrendingUp,
  DollarSign,
  Brain,
  Users,
  ArrowLeft,
  Clock,
  ChevronRight,
  PlayCircle,
  CheckCircle2,
  Building2,
  ChartPieIcon,
  Percent
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Tipos
interface DebtToTest {
  id: number;
  company: string;
  title: string;
  totalDebt: number;
  debtorsCount: number;
  averageDebt: number;
  sector: string;
  location: string;
  logo?: string;
}

interface TestResults {
  successRate: number;
  avgCallDuration: string;
  potentialROI: number;
  recommendationScore: number;
  aiAnalysis: string;
  contactability: number;
  paymentWillingness: number;
  riskScore: number;
  estimatedRecovery: number;
  timeToRecovery: string;
}

// Datos de ejemplo
const mockDebtsToTest: DebtToTest[] = [
  {
    id: 1,
    company: "TechStart Solutions",
    title: "Préstamos Tech Startups 2024",
    totalDebt: 2500000,
    debtorsCount: 150,
    averageDebt: 16666,
    sector: "Tecnología",
    location: "Madrid",
    logo: "/src/assets/logos/tech-start.png"
  },
  {
    id: 2,
    company: "Green Energy Finance",
    title: "Financiación Renovables Q1",
    totalDebt: 1800000,
    debtorsCount: 85,
    averageDebt: 21176,
    sector: "Energía",
    location: "Barcelona",
    logo: "/src/assets/logos/green-energy.png"
  },
  {
    id: 3,
    company: "EduLoans Corp",
    title: "Préstamos Educativos 2024",
    totalDebt: 950000,
    debtorsCount: 220,
    averageDebt: 4318,
    sector: "Educación",
    location: "Valencia",
    logo: "/src/assets/logos/edu-loans.png"
  }
];

// Componente de Avatar para los agentes IA
const AIAgent: React.FC<{
  name: string;
  status: 'waiting' | 'calling' | 'completed';
  callDuration?: string;
}> = ({ name, status, callDuration }) => (
  <div className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm">
    <div className={`relative w-12 h-12 rounded-full flex items-center justify-center
      ${status === 'waiting' ? 'bg-gray-100' :
        status === 'calling' ? 'bg-purple-100 animate-pulse' :
        'bg-green-100'}`}>
      <Brain className={`w-6 h-6 
        ${status === 'waiting' ? 'text-gray-400' :
          status === 'calling' ? 'text-purple-500' :
          'text-green-500'}`} />
      {status === 'completed' && (
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full
          flex items-center justify-center">
          <CheckCircle2 className="w-3 h-3 text-white" />
        </div>
      )}
    </div>
    <div>
      <p className="font-medium text-sm">{name}</p>
      {callDuration && (
        <p className="text-xs text-gray-500">{callDuration}</p>
      )}
    </div>
  </div>
);

// Componente de Tarjeta de Deuda para Testear
const DebtTestCard: React.FC<{
  debt: DebtToTest;
  onClick: () => void;
}> = ({ debt, onClick }) => (
  <Card className="hover:shadow-md transition-all duration-200 cursor-pointer bg-white border-none"
        onClick={onClick}>
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {debt.logo ? (
            <img src={debt.logo} alt={debt.company} className="w-12 h-12 object-contain" />
          ) : (
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Building2 className="w-6 h-6 text-purple-600" />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-gray-900">{debt.company}</h3>
            <p className="text-sm text-gray-600">{debt.title}</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-2xl font-bold text-gray-900">
            {debt.totalDebt.toLocaleString('es-ES', {
              style: 'currency',
              currency: 'EUR'
            })}
          </p>
          <p className="text-sm text-gray-600">Deuda total</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">
            {debt.debtorsCount}
          </p>
          <p className="text-sm text-gray-600">Deudores</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <Building2 className="w-4 h-4" />
          <span>{debt.sector}</span>
        </div>
        <div>{debt.location}</div>
      </div>
    </CardContent>
  </Card>
);

// Componente Principal
const DebtTesting: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDebt, setSelectedDebt] = useState<DebtToTest | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [agents, setAgents] = useState<Array<{
    id: number;
    name: string;
    status: 'waiting' | 'calling' | 'completed';
    callDuration?: string;
  }>>([]);
  const [testResults, setTestResults] = useState<TestResults | null>(null);

  useEffect(() => {
    if (isTesting) {
      // Inicializar agentes
      const initialAgents = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        name: `IA Agent ${i + 1}`,
        status: 'waiting' as const
      }));
      setAgents(initialAgents);

      // Simular proceso de llamadas
      let currentAgent = 0;
      const interval = setInterval(() => {
        if (currentAgent < 10) {
          setAgents(prev => {
            const newAgents = [...prev];
            if (currentAgent > 0) {
              newAgents[currentAgent - 1] = {
                ...newAgents[currentAgent - 1],
                status: 'completed',
                callDuration: `${Math.floor(Math.random() * 3) + 2}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`
              };
            }
            newAgents[currentAgent] = {
              ...newAgents[currentAgent],
              status: 'calling'
            };
            return newAgents;
          });
          setTestProgress((currentAgent + 1) * 10);
          currentAgent++;
        } else {
          clearInterval(interval);
          // Completar última llamada
          setAgents(prev => {
            const newAgents = [...prev];
            newAgents[9] = {
              ...newAgents[9],
              status: 'completed',
              callDuration: `${Math.floor(Math.random() * 3) + 2}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`
            };
            return newAgents;
          });
          // Mostrar resultados
          setTestResults({
            successRate: 75,
            avgCallDuration: "3:45",
            potentialROI: 185,
            recommendationScore: 8.5,
            aiAnalysis: "Esta cartera muestra un alto potencial de recuperación. La mayoría de los deudores contactados mostraron disposición al pago y capacidad financiera. Se recomienda proceder con la adquisición con un enfoque en planes de pago flexibles.",
            contactability: 82,
            paymentWillingness: 68,
            riskScore: 25,
            estimatedRecovery: 72,
            timeToRecovery: "4.5 meses"
          });
          setIsTesting(false);
        }
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [isTesting]);

  const handleStartTest = () => {
    setIsTesting(true);
    setTestResults(null);
    setTestProgress(0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="pl-16">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              {(selectedDebt || testResults) && (
                <button
                  onClick={() => {
                    setSelectedDebt(null);
                    setTestResults(null);
                    setIsTesting(false);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
              )}
              <div>
                <h1 className="text-2xl font-bold">Test de Carteras</h1>
                <p className="text-gray-600">Analiza el potencial de recuperación antes de comprar</p>
              </div>
            </div>
          </div>

          {/* Contenido Principal */}
          {!selectedDebt && !testResults && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockDebtsToTest.map((debt) => (
                <DebtTestCard
                  key={debt.id}
                  debt={debt}
                  onClick={() => setSelectedDebt(debt)}
                />
              ))}
            </div>
          )}

          {selectedDebt && !isTesting && !testResults && (
            <div className="space-y-6">
              {/* Información de la deuda */}
              <Card className="border-none">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center space-x-4 mb-6">
                        {selectedDebt.logo ? (
                          <img
                            src={selectedDebt.logo}
                            alt={selectedDebt.company}
                            className="w-16 h-16 object-contain"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Building2 className="w-8 h-8 text-purple-600" />
                          </div>
                        )}
                        <div>
                          <h2 className="text-xl font-bold">{selectedDebt.company}</h2>
                          <p className="text-gray-600">{selectedDebt.title}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Deuda Total</p>
                          <p className="text-xl font-bold">
                            {selectedDebt.totalDebt.toLocaleString('es-ES', {
                              style: 'currency',
                              currency: 'EUR'
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Deuda Media</p>
                          <p className="text-xl font-bold">
                            {selectedDebt.averageDebt.toLocaleString('es-ES', {
                              style: 'currency',
                              currency: 'EUR'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center items-center bg-purple-50 rounded-lg p-6">
                      <Brain className="w-12 h-12 text-purple-600 mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Iniciar Test de Viabilidad</h3>
                      <p className="text-sm text-gray-600 text-center mb-4">
                        La IA realizará 10 llamadas de prueba para evaluar el potencial de recuperación de esta cartera
                      </p>
                      <button
                        onClick={handleStartTest}
                        className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        <PlayCircle className="w-5 h-5" />
                        <span>Iniciar Test</span>
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {isTesting && (
            <div className="space-y-6">
              <Card className="border-none">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <h3 className="text-xl font-bold mb-2">Test en Progreso</h3>
                    <p className="text-gray-600 mb-6">Realizando llamadas de prueba...</p>
                    
                    <div className="w-full max-w-md mb-8">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Progreso</span>
                        <span>{testProgress}%</span>
                      </div>
                      <Progress value={testProgress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                      {agents.map((agent) => (
                        <AIAgent
                          key={agent.id}
                          name={agent.name}
                          status={agent.status}
                          callDuration={agent.callDuration}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {testResults && (
            <div className="space-y-6">
              {/* Resultados principales */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-none">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-500">ROI Potencial</p>
                        <p className="text-2xl font-bold mt-1">{testResults.potentialROI}%</p>
                      </div>
                      <div className="bg-green-100 p-2 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      </div>
                    </div>
                    <Progress value={testResults.potentialROI} className="h-1 mt-2" />
                  </CardContent>
                </Card>

                <Card className="border-none">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-500">Tasa de Éxito</p>
                        <p className="text-2xl font-bold mt-1">{testResults.successRate}%</p>
                      </div>
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Percent className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                    <Progress value={testResults.successRate} className="h-1 mt-2" />
                  </CardContent>
                </Card>

                <Card className="border-none">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-500">Tiempo Medio Llamada</p>
                        <p className="text-2xl font-bold mt-1">{testResults.avgCallDuration}</p>
                      </div>
                      <div className="bg-purple-100 p-2 rounded-lg">
                        <Clock className="w-5 h-5 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-500">Puntuación IA</p>
                        <p className="text-2xl font-bold mt-1">{testResults.recommendationScore}/10</p>
                      </div>
                      <div className="bg-orange-100 p-2 rounded-lg">
                        <ChartPieIcon className="w-5 h-5 text-orange-600" />
                      </div>
                    </div>
                    <Progress value={testResults.recommendationScore * 10} className="h-1 mt-2" />
                  </CardContent>
                </Card>
              </div>

              {/* Análisis detallado */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="border-none h-full">
                    <CardHeader>
                      <CardTitle>Métricas Detalladas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Contactabilidad</span>
                              <span className="font-medium">{testResults.contactability}%</span>
                            </div>
                            <Progress value={testResults.contactability} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Disposición al Pago</span>
                              <span className="font-medium">{testResults.paymentWillingness}%</span>
                            </div>
                            <Progress value={testResults.paymentWillingness} className="h-2" />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Riesgo</span>
                              <span className="font-medium">{testResults.riskScore}%</span>
                            </div>
                            <Progress value={testResults.riskScore} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Recuperación Estimada</span>
                              <span className="font-medium">{testResults.estimatedRecovery}%</span>
                            </div>
                            <Progress value={testResults.estimatedRecovery} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-none">
                  <CardHeader>
                    <CardTitle>Análisis de IA</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-3">
                        <Brain className="w-5 h-5 text-purple-600" />
                        <span className="font-medium">Recomendación</span>
                      </div>
                      <p className="text-gray-700 text-sm">{testResults.aiAnalysis}</p>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span>Tiempo estimado de recuperación:</span>
                        <span className="font-medium">{testResults.timeToRecovery}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DebtTesting;
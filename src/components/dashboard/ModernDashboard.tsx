import React, { useState } from 'react';
import { ModernDebtCard } from './DebtCard';
import { 
  LayoutDashboard, 
  BarChart3, 
  Brain, 
  Users, 
  Phone, 
  Search,
  Bell,
  ChevronDown,
  Settings,
  Filter,
  Plus
} from 'lucide-react';
import { Card } from '../ui/Card';
import { useNavigate } from 'react-router-dom';

interface ModernDashboardProps {
    onDebtClick: (debtId: number) => void;
    onWorkerClick: (workerId: number) => void;
    onNavigateToKPIs: () => void;
    onNavigateToTalky: () => void;
  }
  const ModernDashboard: React.FC<ModernDashboardProps> = ({
    onDebtClick,
    onWorkerClick,
    onNavigateToKPIs,
    onNavigateToTalky
  }) => {
    const [activeFilter, setActiveFilter] = useState('all');
    const navigate = useNavigate();
  

  // Lista de deudas disponibles con sus IDs
const availableDebts = [
    { id: 1, type: 'santander' },
    { id: 2, type: 'bbva' },
    { id: 3, type: 'caixabank' }
  ];
  
  // Filtrar deudas según el filtro activo
  const filteredDebts = activeFilter === 'all' 
    ? availableDebts 
    : availableDebts.filter(debt => {
        // Aquí puedes añadir la lógica de filtrado según el estado de cada deuda
        return true; // Por ahora mostramos todas
      });

  const stats = {
    totalDeals: 34,
    dealsWon: 20,
    activeCalls: 3,
    activeAgents: 8,
    recoveryRate: 68.5
  };

  const navigationItems = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      active: true, 
      path: '/',
      onClick: () => navigate('/')
    },
    { 
      icon: BarChart3, 
      label: 'KPIs', 
      active: false, 
      path: '/kpis',
      onClick: onNavigateToKPIs
    },
    { 
      icon: Brain, 
      label: 'Talkier AI', 
      active: false, 
      path: '/talky',
      onClick: onNavigateToTalky
    },
    { 
      icon: Users, 
      label: 'Team', 
      active: false, 
      path: '/team',
      onClick: () => console.log('Team clicked')
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };


  const filterOptions = [
    { id: 'all', label: 'Todas' },
    { id: 'active', label: 'Activas' },
    { id: 'pending', label: 'Pendientes' },
    { id: 'completed', label: 'Completadas' },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'call',
      title: 'Llamada completada con deudor',
      agent: 'Ana R.',
      time: '2h ago',
      icon: Phone,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-500'
    },
    {
      id: 2,
      type: 'ai',
      title: 'IA completó análisis de caso',
      agent: 'Talkier AI',
      time: '3h ago',
      icon: Brain,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-500'
    },
    {
      id: 3,
      type: 'update',
      title: 'Actualización de estado de deuda',
      agent: 'Carlos M.',
      time: '4h ago',
      icon: BarChart3,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Mejorada */}
      <div className="fixed left-0 top-0 h-full w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 space-y-8">
        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">T</span>
        </div>
        {navigationItems.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 group relative ${
              window.location.pathname === item.path
                ? 'bg-green-100 text-green-600' 
                : 'text-gray-400 hover:bg-gray-100'
            }`}
          >
            <item.icon className="w-5 h-5" />
            {/* Tooltip */}
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              {item.label}
            </div>
          </button>
        ))}
      </div>
      {/* Main Content */}
      <div className="pl-16">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold">ProCobro</h1>
              <button className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200">
                Nueva Tarea
              </button>
            </div>
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                />
              </div>
              <button className="relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="flex items-center space-x-2 cursor-pointer">
                <img
                  src="/src/assets/logos/Foto de perfil 2.png"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-4 gap-4 px-6 py-4 bg-white">
            <Card className="p-4 border-none shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Deudas Activas</p>
                  <p className="text-2xl font-bold mt-1">{stats.totalDeals}</p>
                </div>
                <div className="bg-blue-100 p-2 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-sm text-green-500">+2.5%</span>
                <span className="text-sm text-gray-500 ml-1">mes pasado</span>
              </div>
            </Card>

            <Card className="p-4 border-none shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Deudas Ganadas</p>
                  <p className="text-2xl font-bold mt-1 text-green-500">{stats.dealsWon}</p>
                </div>
                <div className="bg-green-100 p-2 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-sm text-green-500">+5.2%</span>
                <span className="text-sm text-gray-500 ml-1">ratio de conversión</span>
              </div>
            </Card>

            <Card className="p-4 border-none shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">LLamadas activas</p>
                  <p className="text-2xl font-bold mt-1">{stats.activeCalls}</p>
                </div>
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Phone className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-sm text-purple-500">{stats.recoveryRate}%</span>
                <span className="text-sm text-gray-500 ml-1">ratio de conversión</span>
              </div>
            </Card>

            <Card className="p-4 border-none shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Agentes Activos</p>
                  <p className="text-2xl font-bold mt-1">{stats.activeAgents}</p>
                </div>
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Users className="w-5 h-5 text-orange-600" />
                </div>
              </div>
              <div className="flex items-center mt-2 space-x-1">
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <img
                      key={i}
                      src={`/src/assets/logos/${32 + i}.png`}
                      alt={`Agent ${i + 1}`}
                      className="w-6 h-6 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-2">+5 más</span>
              </div>
            </Card>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="p-6">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Deudas Activas</h2>
              <div className="flex items-center space-x-3">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  {filterOptions.map((option) => (
                    <button
                      key={option.id}
                      className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
                        activeFilter === option.id
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                      onClick={() => setActiveFilter(option.id)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <Filter className="w-5 h-5" />
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200">
                  <Plus className="w-4 h-4" />
                  <span>Nueva Deuda</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDebts.map((debt) => (
                <ModernDebtCard
                key={debt.id}
                debtId={debt.id}
                onClick={() => onDebtClick(debt.id)}
                isExpanded={false}
                />
            ))}
            </div>
          </div>

          {/* Recent Activity Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Actividad Reciente</h2>
            <Card className="border-none shadow-sm">
              <div className="divide-y divide-gray-100">
                {recentActivities.map((activity) => (
                  <div 
                    key={activity.id} 
                    className="flex items-center space-x-4 p-4 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className={`w-10 h-10 rounded-lg ${activity.iconBg} flex items-center justify-center`}>
                      <activity.icon className={`w-5 h-5 ${activity.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-500">
                        {activity.agent} • {activity.time}
                      </p>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <Settings className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ModernDashboard;
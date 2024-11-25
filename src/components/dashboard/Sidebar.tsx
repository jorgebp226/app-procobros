// Sidebar.tsx
import React from 'react';
import { LayoutDashboard, BarChart3, Brain, Users, TestTube2, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  onNavigateToKPIs?: () => void;
  onNavigateToTalky?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigateToKPIs, onNavigateToTalky }) => {
  const navigate = useNavigate();

  const navigationItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/', onClick: () => navigate('/') },
    { icon: BarChart3, label: 'KPIs', path: '/kpis', onClick: onNavigateToKPIs || (() => navigate('/kpis')) },
    { icon: Brain, label: 'Talkier AI', path: '/talky', onClick: onNavigateToTalky || (() => navigate('/talky')) },
    { icon: TestTube2, label: 'Test Deudas', path: '/debt-testing', onClick: () => navigate('/debt-testing') },
    { icon: CreditCard, label: 'Deudores', path: '/debtors', onClick: () => navigate('/debtors') },
    { icon: Users, label: 'Team', path: '/team', onClick: () => console.log('Team clicked') },
  ];

  return (
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
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            {item.label}
          </div>
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
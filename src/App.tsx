// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ModernDebtCard } from './components/dashboard/DebtCard';
import ModernDashboard from './components/dashboard/ModernDashboard';
import WorkerView from './components/dashboard/WorkerView';
import DebtorView from './components/dashboard/DebtorView';
import KPIsDashboard from './components/dashboard/KPIsDashboard';
import TalkyImprovement from './components/talky/TalkyImprovement';
import DebtTesting from './components/dashboard/TestDashboard';
import DebtorsView from './components/dashboard/DebtorsView';
import { Debtor } from './types';
import './styles/index.css';

// Componente envoltorio para manejar la navegación
const DashboardWrapper: React.FC = () => {
  const [selectedDebt, setSelectedDebt] = useState<number | null>(null);
  const [selectedWorker, setSelectedWorker] = useState<number | null>(null);
  const [selectedDebtor, setSelectedDebtor] = useState<Debtor | null>(null);
  const navigate = useNavigate();

  const handleDebtClick = (debtId: number) => {
    setSelectedDebt(debtId);
    setSelectedWorker(null);
    setSelectedDebtor(null);
  };

  const handleWorkerClick = (workerId: number) => {
    setSelectedWorker(workerId);
    setSelectedDebtor(null);
  };

  const handleDebtorClick = (debtor: Debtor) => {
    setSelectedDebtor(debtor);
  };

  const handleBack = () => {
    if (selectedDebtor) {
      setSelectedDebtor(null);
    } else if (selectedWorker) {
      setSelectedWorker(null);
    } else if (selectedDebt) {
      setSelectedDebt(null);
    }
  };

  const handleNavigateToKPIs = () => {
    navigate('/kpis');
  };

  const handleNavigateToTalky = () => {
    navigate('/talky');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {selectedDebtor && (
        <DebtorView
          debtor={selectedDebtor}
          onBack={handleBack}
        />
      )}

      {!selectedDebtor && selectedWorker && (
        <WorkerView
          workerId={selectedWorker}
          onBack={handleBack}
          onDebtorClick={handleDebtorClick}
        />
      )}

      {!selectedDebtor && !selectedWorker && selectedDebt && (
        <div className="fixed inset-0 bg-white z-50 overflow-auto">
          <div className="max-w-7xl mx-auto p-6">
            <ModernDebtCard
              onClick={() => {}}
              onWorkerClick={handleWorkerClick}
              onBack={handleBack}
              isExpanded={true}
              debtId={selectedDebt}
            />
          </div>
        </div>
      )}

      {!selectedDebtor && !selectedWorker && !selectedDebt && (
        <ModernDashboard
          onDebtClick={handleDebtClick}
          onWorkerClick={handleWorkerClick}
          onNavigateToKPIs={handleNavigateToKPIs}
          onNavigateToTalky={handleNavigateToTalky}
        />
      )}
    </div>
  );
};

// Componente principal App
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardWrapper />} />
        <Route path="/kpis" element={<KPIsDashboard />} />
        <Route path="/talky" element={<TalkyImprovement />} />
        <Route path="/debt-testing" element={<DebtTesting />} />
        <Route path="/debtors" element={<DebtorsView />} />
      </Routes>
    </Router>
  );
}

export default App;
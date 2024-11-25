// src/components/dashboard/Dashboard.tsx
import React, { useState } from 'react';
import ModernDebtCard from './DebtCard';
import WorkerView from './WorkerView';
import { Debtor } from '../../types'; // Asegúrate de tener los tipos definidos

const Dashboard: React.FC = () => {
  const [isDebtCardExpanded, setIsDebtCardExpanded] = useState<boolean>(false);
  const [selectedWorkerId, setSelectedWorkerId] = useState<number | null>(null);
  const [currentDebtId, setCurrentDebtId] = useState<number>(1); // Puedes cambiar esto según la lógica de tu aplicación

  const handleDebtCardClick = () => {
    setIsDebtCardExpanded(true);
  };

  const handleBack = () => {
    setIsDebtCardExpanded(false);
    setSelectedWorkerId(null);
  };

  const handleWorkerClick = (workerId: number) => {
    setSelectedWorkerId(workerId);
  };

  const handleDebtorClick = (debtor: Debtor) => {
    // Aquí puedes manejar la lógica cuando se hace clic en un deudor, por ejemplo, mostrar un modal con detalles
    console.log('Deudor clicado:', debtor);
  };

  return (
    <div className="p-6">
      <ModernDebtCard
        isExpanded={isDebtCardExpanded}
        onClick={handleDebtCardClick}
        onWorkerClick={handleWorkerClick}
        onBack={handleBack}
        debtId={currentDebtId}
      />
      {selectedWorkerId && (
        <WorkerView 
          workerId={selectedWorkerId}
          onBack={handleBack}
          onDebtorClick={handleDebtorClick}
        />
      )}
    </div>
  );
};

export default Dashboard;

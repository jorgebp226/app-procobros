import React from 'react';

export const PermissionErrorMessage: React.FC = () => (
  <div className="fixed bottom-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg" role="alert">
    <p className="font-bold">Permisos de Audio Requeridos</p>
    <p>Por favor, permite el acceso al micrófono para usar esta función.</p>
  </div>
);

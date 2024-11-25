// src/components/talky/ToneCard.tsx

import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { ToneOption } from '../../types/talky';

interface ToneCardProps {
  option: ToneOption;
  selected: boolean;
  onClick: () => void;
}

const ToneCard: React.FC<ToneCardProps> = ({ option, selected, onClick }) => (
  <Card 
    className={`cursor-pointer transition-all hover:shadow-lg ${
        selected 
        ? 'border-2 border-green-custom bg-green-custom-light' 
        : 'hover:border-green-custom-border'
    }`}
    onClick={onClick}
  >
    <CardContent className="p-4 flex items-start space-x-3">
    <div className="w-8 h-8 flex items-center justify-center" style={{ color: '#22c55e' }}>
        {React.createElement(option.icon, { size: 24 })}
      </div>
      <div>
        <h3 className="font-medium text-gray-800">{option.label}</h3>
        <p className="text-sm text-gray-600">{option.description}</p>
      </div>
    </CardContent>
  </Card>
);

export default ToneCard;

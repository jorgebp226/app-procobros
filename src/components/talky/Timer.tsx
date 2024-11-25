import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { TimerProps } from '../../types/talky';

export const Timer: React.FC<TimerProps> = ({ startTime = new Date() }) => {
  const [time, setTime] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const diff = Math.floor((Date.now() - startTime.getTime()) / 1000);
      setTime(diff);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    const pad = (num: number) => String(num).padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  return (
    <div className="inline-flex items-center px-3 py-1 bg-blue-100 rounded-full text-blue-700">
      <Clock className="w-4 h-4 mr-2" />
      <span className="font-medium">{formatTime(time)}</span>
    </div>
  );
};
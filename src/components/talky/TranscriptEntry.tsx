// src/components/talky/TranscriptEntry.tsx

import React from 'react';
import { TranscriptEntry as TranscriptEntryType } from '../../types/talky';

const TranscriptEntry: React.FC<{ entry: TranscriptEntryType }> = ({ entry }) => (
  <div className="space-y-1">
    <div className="font-medium text-gray-900">{entry.speaker}</div>
    <p className="text-gray-700">{entry.text}</p>
  </div>
);

export default TranscriptEntry;

// src/components/talky/ChatMessage.tsx

import React from 'react';
import { ChatMessage as ChatMessageType } from '../../types/talky';

const ChatMessageComponent: React.FC<{ message: ChatMessageType }> = ({ message }) => (
  <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
    <div
      className={`max-w-[70%] p-3 rounded-lg ${
        message.type === 'user' 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-100 text-gray-800'
      }`}
    >
      {message.content}
    </div>
  </div>
);

export default ChatMessageComponent;

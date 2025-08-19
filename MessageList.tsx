import React, { useEffect, useRef } from 'react';
import { Message, MessageSender } from '../types';
import BotIcon from './icons/BotIcon';
import UserIcon from './icons/UserIcon';

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex items-start gap-3 max-w-md ${
            message.sender === MessageSender.USER ? 'ml-auto flex-row-reverse' : 'mr-auto'
          }`}
        >
          <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-gray-800">
             {message.sender === MessageSender.USER ? <UserIcon /> : <BotIcon />}
          </div>
          <div
            className={`rounded-lg p-3 text-sm prose prose-invert prose-p:my-0 ${
              message.sender === MessageSender.USER
                ? 'bg-blue-600 text-white rounded-bl-none'
                : 'bg-gray-800 text-gray-200 rounded-br-none'
            }`}
          >
            {message.text}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
import React from 'react';
import { Message } from '../types';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

interface ChatPanelProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ messages, onSendMessage, isLoading }) => {
  return (
    <div className="w-1/3 max-w-md flex flex-col bg-gray-950 h-screen border-r border-gray-800">
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-xl font-bold text-white">متصفح الذكاء الاصطناعي</h1>
        <p className="text-sm text-gray-500">تحكم بالمتصفح باستخدام الأوامر</p>
      </div>
      <MessageList messages={messages} />
      <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatPanel;
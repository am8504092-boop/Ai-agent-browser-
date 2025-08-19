import React from 'react';

export enum MessageSender {
  USER = 'user',
  BOT = 'bot',
}

export interface Message {
  id: string;
  sender: MessageSender;
  text: React.ReactNode;
}

export enum AiActionType {
  NAVIGATE = 'NAVIGATE',
  SEARCH = 'SEARCH',
  UNSUPPORTED = 'UNSUPPORTED',
}

export interface AiAction {
  action: AiActionType;
  payload: {
    url?: string;
    query?: string;
    reason?: string;
  };
  thought: string;
}

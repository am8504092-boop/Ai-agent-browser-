import React, { useState, useCallback } from 'react';
import { Message, MessageSender, AiAction, AiActionType } from './types';
import { getBrowserAction } from './services/geminiService';
import ChatPanel from './components/ChatPanel';
import BrowserPanel from './components/BrowserPanel';
import { DEFAULT_URL } from './constants';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: MessageSender.BOT,
      text: 'أهلاً بك! أنا مساعدك لتصفح الويب. ماذا تريد أن تفعل؟ يمكنك أن تقول مثلاً: "ابحث عن أفضل وصفات الكيك" أو "اذهب إلى ويكيبيديا".',
    },
  ]);
  const [iframeSrc, setIframeSrc] = useState<string>(DEFAULT_URL);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: MessageSender.USER,
      text,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const action: AiAction = await getBrowserAction(text);
      
      let botResponseText: React.ReactNode;

      switch (action.action) {
        case AiActionType.NAVIGATE:
          if (action.payload.url) {
            setIframeSrc(action.payload.url);
            botResponseText = (
              <div>
                <p>بالتأكيد، سأنتقل إلى {action.payload.url}</p>
                <details className="mt-2 bg-gray-900 rounded p-2 text-xs">
                  <summary className="cursor-pointer">عرض طريقة التفكير</summary>
                  <p className="mt-1 text-gray-400 italic">{action.thought}</p>
                </details>
              </div>
            );
          }
          break;
        case AiActionType.SEARCH:
          if (action.payload.query) {
            const searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(action.payload.query)}`;
            setIframeSrc(searchUrl);
             botResponseText = (
              <div>
                <p>حسنًا، سأبحث عن "{action.payload.query}"</p>
                <details className="mt-2 bg-gray-900 rounded p-2 text-xs">
                  <summary className="cursor-pointer">عرض طريقة التفكير</summary>
                  <p className="mt-1 text-gray-400 italic">{action.thought}</p>
                </details>
              </div>
            );
          }
          break;
        case AiActionType.UNSUPPORTED:
           botResponseText = (
              <div>
                <p>أعتذر، لا يمكنني تنفيذ هذا الطلب.</p>
                <p className="text-sm text-gray-500">{action.payload.reason}</p>
                <details className="mt-2 bg-gray-900 rounded p-2 text-xs">
                  <summary className="cursor-pointer">عرض طريقة التفكير</summary>
                  <p className="mt-1 text-gray-400 italic">{action.thought}</p>
                </details>
              </div>
            );
          break;
        default:
          botResponseText = 'لم أستطع فهم الطلب. هل يمكنك المحاولة مرة أخرى؟';
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: MessageSender.BOT,
        text: botResponseText || "حدث خطأ ما.",
      };
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error('Error processing command:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: MessageSender.BOT,
        text: 'عفواً، حدث خطأ أثناء الاتصال بالذكاء الاصطناعي. الرجاء التحقق من مفتاح API والمحاولة مرة أخرى.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="flex h-screen w-screen bg-black font-sans">
      <BrowserPanel iframeSrc={iframeSrc} />
      <ChatPanel
        messages={messages}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default App;
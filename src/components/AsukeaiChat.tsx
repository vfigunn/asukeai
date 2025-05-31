import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function AsukeaiChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `¡**Mba'éichapa**! 👋 Soy **Asukeai**.

🎭 **Puedo ayudarte con:**
- 🎪 Eventos
- 🍽️ Restaurantes  
- 🎵 Música
- 🎨 Arte y más

¿Qué buscás hoy?`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    // Small delay to ensure DOM has updated
    setTimeout(scrollToBottom, 100);
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.success ? data.data.message : 'Error al procesar la consulta',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Lo siento, hubo un error. Por favor intenta de nuevo.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto flex flex-col h-full overflow-hidden">
      <div className="p-3 md:p-4 border-b">
        <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2">
          <Bot className="h-4 w-4 md:h-5 md:w-5" />
          <span className="hidden sm:inline">Asukeai Assistant</span>
          <span className="sm:hidden">Asukeai</span>
        </h2>
      </div>
      
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto">
        <div className="p-3 md:p-4 space-y-3 md:space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`flex gap-2 md:gap-3 max-w-[85%] md:max-w-[80%] ${
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {message.role === 'user' ? (
                    <User className="h-3 w-3 md:h-4 md:w-4" />
                  ) : (
                    <Bot className="h-3 w-3 md:h-4 md:w-4" />
                  )}
                </div>
                <div
                  className={`rounded-lg px-3 py-2 md:px-4 md:py-2 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {message.role === 'assistant' ? (
                    <div className="text-sm prose prose-sm max-w-none dark:prose-invert">
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          // Custom styling for markdown elements
                          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                          ul: ({ children }) => <ul className="list-disc list-inside mb-2">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal list-inside mb-2">{children}</ol>,
                          li: ({ children }) => <li className="mb-1">{children}</li>,
                          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                          em: ({ children }) => <em className="italic">{children}</em>,
                          code: ({ children }) => <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-xs">{children}</code>,
                          pre: ({ children }) => <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs overflow-x-auto">{children}</pre>,
                          h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                          h2: ({ children }) => <h2 className="text-base font-bold mb-2">{children}</h2>,
                          h3: ({ children }) => <h3 className="text-sm font-bold mb-1">{children}</h3>,
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm">{message.content}</p>
                  )}
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2 md:gap-3 justify-start">
              <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="h-3 w-3 md:h-4 md:w-4" />
              </div>
              <div className="bg-muted rounded-lg px-3 py-2 md:px-4">
                <div className="flex gap-1">
                  <div className="h-2 w-2 bg-primary/40 rounded-full animate-bounce" />
                  <div className="h-2 w-2 bg-primary/40 rounded-full animate-bounce delay-100" />
                  <div className="h-2 w-2 bg-primary/40 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="p-3 md:p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Pregunta sobre eventos..."
            disabled={isLoading}
            className="text-sm md:text-base"
          />
          <Button 
            onClick={sendMessage} 
            disabled={isLoading || !input.trim()}
            size="sm"
            className="px-3"
          >
            <Send className="h-3 w-3 md:h-4 md:w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
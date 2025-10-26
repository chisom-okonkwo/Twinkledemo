import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { Calendar, Sparkles, Send, Loader2, FileText, ChevronLeft, ChevronRight, Wand2 } from 'lucide-react';

interface Memory {
  id: string;
  title: string;
  snippet: string;
  date: string;
  timeAgo: string;
  fullContent?: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface NoteDetailDialogProps {
  memory: Memory | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  canNavigatePrev: boolean;
  canNavigateNext: boolean;
}

export function NoteDetailDialog({ memory, isOpen, onClose, onNavigate, canNavigatePrev, canNavigateNext }: NoteDetailDialogProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Clear messages when dialog closes or when navigating to a different memory
  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
      setInput('');
      setIsLoading(false);
    }
  }, [isOpen]);

  // Clear messages when memory changes
  useEffect(() => {
    setMessages([]);
    setInput('');
    setIsLoading(false);
  }, [memory?.id]);

  if (!memory) return null;

  // Mock full content - in real implementation, this would come from the API
  const fullContent = memory.fullContent || `${memory.snippet}\n\nThis is the full content of the note. In a real implementation, this would be fetched from your note service (Notion, Google Keep, etc.) and would contain the complete text, formatting, and any embedded content from your original note.`;

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Mock AI response - in real implementation, this would call OpenAI API
    setTimeout(() => {
      const mockResponse = generateMockResponse(userMessage, memory);
      setMessages(prev => [...prev, { role: 'assistant', content: mockResponse }]);
      setIsLoading(false);
    }, 1000);
  };

  const generateMockResponse = (question: string, note: Memory): string => {
    // Mock AI responses based on common questions
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('summary') || lowerQuestion.includes('summarize')) {
      return `Based on your note from ${note.timeAgo}, you were primarily focused on "${note.title}". The main themes were around innovation and forward-thinking ideas. This shows a consistent pattern in your thinking about long-term planning.`;
    }
    
    if (lowerQuestion.includes('thought process') || lowerQuestion.includes('thinking')) {
      return `Looking at your note, it seems you were in an exploratory mindset. The way you structured your thoughts suggests you were brainstorming freely without constraints. This is characteristic of your creative ideation phase, where you typically explore multiple angles before converging on a solution.`;
    }
    
    if (lowerQuestion.includes('why') || lowerQuestion.includes('reason')) {
      return `From the context and timing of this note (${note.date}), it appears this idea emerged during a period of reflection. The concepts you were exploring align with broader themes in your other notes from that period, suggesting this was part of a larger train of thought.`;
    }
    
    // Default response
    return `That's an interesting question about your note "${note.title}". Based on the content, you were exploring important ideas ${note.timeAgo}. The thought process reflected here shows creative thinking and attention to detail. Would you like me to explore any specific aspect of this note in more depth?`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100vw-4rem)] max-w-[1600px] max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200">
                {memory.timeAgo}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Calendar className="w-3.5 h-3.5" />
                {memory.date}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('prev')}
                disabled={!canNavigatePrev}
                className="h-8 px-2"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('next')}
                disabled={!canNavigateNext}
                className="h-8 px-2"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DialogTitle className="text-2xl">{memory.title}</DialogTitle>
            <a
              href="https://vapi.ai/?demo=true&shareKey=7e3c944b-33a0-46fb-8b15-fa4ca8d213ca&assistantId=8312bc6a-e941-4c5e-a83b-f2d6ed635f49"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 hover:bg-purple-100 rounded-md transition-colors group"
              title="Open in Vapi.ai"
            >
              <Wand2 className="w-5 h-5 text-purple-400 group-hover:text-purple-600 transition-colors" />
            </a>
          </div>
          <DialogDescription>
            Chat with AI to explore your thought process from this note
          </DialogDescription>
        </DialogHeader>

        <div className="grid lg:grid-cols-2 gap-0 flex-1 min-h-0">
          {/* Note Content */}
          <div className="flex flex-col px-6 py-5 border-r bg-white">
            <div className="flex items-center gap-2 mb-3 text-gray-700">
              <FileText className="w-4 h-4" />
              <h3 className="text-sm">Note Content</h3>
            </div>
            <ScrollArea className="flex-1 rounded-lg p-5 bg-gray-50 border border-gray-200">
              <div className="prose prose-sm max-w-none text-gray-800">
                <p className="whitespace-pre-wrap leading-relaxed">{fullContent}</p>
              </div>
            </ScrollArea>
          </div>

          {/* AI Chat Interface */}
          <div className="flex flex-col px-6 py-5 bg-gradient-to-br from-white to-purple-50/30">
            <div className="flex items-center gap-2 mb-3 text-gray-700">
              <div className="p-1.5 bg-purple-100 rounded-md">
                <Sparkles className="w-4 h-4 text-purple-600" />
              </div>
              <h3 className="text-sm">AI Assistant</h3>
            </div>
            
            <ScrollArea className="flex-1 rounded-lg p-5 mb-4 bg-white border border-gray-200 shadow-sm">
              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center text-gray-500 max-w-sm px-4">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-purple-500" />
                    </div>
                    <p className="text-sm mb-4 text-gray-600">
                      Ask me anything about this note to understand your thought process at the time
                    </p>
                    <div className="space-y-2">
                      <button
                        className="w-full text-left text-sm p-3 hover:bg-purple-50 rounded-lg border border-gray-200 transition-colors hover:border-purple-200"
                        onClick={() => setInput("What was my thought process here?")}
                      >
                        <span className="mr-2">💭</span>
                        What was my thought process here?
                      </button>
                      <button
                        className="w-full text-left text-sm p-3 hover:bg-purple-50 rounded-lg border border-gray-200 transition-colors hover:border-purple-200"
                        onClick={() => setInput("Can you summarize this note?")}
                      >
                        <span className="mr-2">📝</span>
                        Can you summarize this note?
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                          message.role === 'user'
                            ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-sm'
                            : 'bg-gray-100 text-gray-900 border border-gray-200'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-2xl px-4 py-3 border border-gray-200">
                        <Loader2 className="w-4 h-4 animate-spin text-purple-500" />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </ScrollArea>

            {/* Input Area */}
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about this note..."
                className="min-h-[60px] resize-none border-gray-300 focus:border-purple-400 focus:ring-purple-400"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 h-[60px] w-[60px] shadow-md"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

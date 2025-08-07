import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface AIChatProps {
  customerPreferences: any;
  selectedProperties: any[];
  onPreferencesUpdate: (preferences: any) => void;
}

export const AIChat = ({ customerPreferences, selectedProperties, onPreferencesUpdate }: AIChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your commercial property AI advisor. I specialize in analyzing business properties based on ROI, location benefits, operational costs, and growth potential. What type of commercial space are you looking for?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const simulateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('roi') || lowerMessage.includes('return') || lowerMessage.includes('investment')) {
      return `Based on ROI analysis, the Industrial Park property offers the highest return at 9.1% annually. The Downtown Plaza has strong appreciation potential at 8.2% ROI with premium location benefits. Would you like me to break down the cash flow projections?`;
    }
    
    if (lowerMessage.includes('foot traffic') || lowerMessage.includes('customers') || lowerMessage.includes('visibility')) {
      return `For customer-facing businesses, the Retail Center on Main Street has very high foot traffic and maximum visibility. The Downtown Plaza also offers excellent exposure for professional services. What type of business are you planning?`;
    }
    
    if (lowerMessage.includes('office') || lowerMessage.includes('professional') || lowerMessage.includes('corporate')) {
      return `For office spaces, the Downtown Business Plaza is ideal with Class A building status, modern tech infrastructure (95% rating), and professional amenities. It offers excellent client accessibility and business prestige.`;
    }
    
    if (lowerMessage.includes('warehouse') || lowerMessage.includes('industrial') || lowerMessage.includes('storage')) {
      return `The Industrial Park offers 350m² of warehouse space with loading dock access and flexible zoning. Lower operating costs at $1,900/month and excellent logistics access make it perfect for distribution or manufacturing.`;
    }
    
    if (lowerMessage.includes('cost') || lowerMessage.includes('operating') || lowerMessage.includes('expenses')) {
      return `Operating costs vary significantly: Industrial ($1,900/mo), Downtown Office ($2,800/mo), Retail ($3,200/mo). The industrial space offers the best cost efficiency per m², while retail commands premium but generates higher revenue potential.`;
    }
    
    if (lowerMessage.includes('recommend') || lowerMessage.includes('best') || lowerMessage.includes('suggest')) {
      if (selectedProperties.length > 0) {
        const bestROI = selectedProperties.reduce((best, current) => 
          current.roi > best.roi ? current : best
        );
        return `For maximum ROI, I recommend ${bestROI.address} with ${bestROI.roi}% annual return. It offers ${bestROI.m2}m² of ${bestROI.propertyType.toLowerCase()} space with ${bestROI.footTraffic.toLowerCase()} foot traffic and excellent business amenities.`;
      }
      return `I'd recommend selecting properties to compare. Consider your business type: retail needs high visibility, offices need professional image, warehouses need operational efficiency. What's your primary business focus?`;
    }
    
    return `That's a great question about commercial properties! I can analyze ROI potential, operational costs, location benefits, and growth opportunities. Current selection: ${selectedProperties.length} properties. What specific business requirements should we focus on?`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: simulateAIResponse(inputValue),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          Commercial Property AI
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col gap-4 p-4">
        <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
                
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === 'user' 
                    ? 'bg-primary text-primary-foreground ml-auto' 
                    : 'bg-muted'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                
                {message.type === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-secondary-foreground" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about ROI, location benefits, operating costs, or business suitability..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
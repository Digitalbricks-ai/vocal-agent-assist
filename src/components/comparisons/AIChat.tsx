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
      content: 'Hello! I\'m your property comparison AI. I can help you analyze properties based on size, environmental benefits, and provide selling advice. What are you looking for in a property?',
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
    
    if (lowerMessage.includes('environmental') || lowerMessage.includes('green') || lowerMessage.includes('sustainable')) {
      return `Based on your interest in environmental features, I recommend focusing on properties with high environmental scores. Property 123 Ocean View Drive has a 92% environmental score with solar panels and smart systems. Would you like me to compare the environmental benefits of the selected properties?`;
    }
    
    if (lowerMessage.includes('size') || lowerMessage.includes('m2') || lowerMessage.includes('space')) {
      return `For space requirements, I can see you prefer at least ${customerPreferences.minM2}m². The suburban home offers 120m² which is excellent for families, while the apartments range from 75-85m². What's your ideal space requirement?`;
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('budget') || lowerMessage.includes('cost')) {
      return `Your current budget is set to $${customerPreferences.maxPrice.toLocaleString()}. The properties range from $580,000 to $750,000. The Downtown Plaza apartment offers the best value per m² at $7,733/m². Would you like me to adjust your budget range?`;
    }
    
    if (lowerMessage.includes('recommend') || lowerMessage.includes('best') || lowerMessage.includes('suggest')) {
      if (selectedProperties.length > 0) {
        const bestMatch = selectedProperties.reduce((best, current) => 
          current.matchScore > best.matchScore ? current : best
        );
        return `Based on your preferences, ${bestMatch.address} is your best match with a ${bestMatch.matchScore}% compatibility score. It excels in environmental features and fits your size requirements. Key selling points: ${bestMatch.sellingPoints.slice(0, 2).join(', ')}.`;
      }
      return `I'd be happy to make recommendations! Please select some properties from the list so I can compare them against your preferences for size, environmental impact, and value.`;
    }
    
    return `That's interesting! Based on your preferences for ${customerPreferences.propertyType}s with environmental focus, I can help you analyze the properties. Selected properties: ${selectedProperties.length}. Would you like me to compare their environmental benefits, space efficiency, or provide selling advice?`;
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
          Property AI Assistant
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
            placeholder="Ask about properties, comparisons, or get selling advice..."
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
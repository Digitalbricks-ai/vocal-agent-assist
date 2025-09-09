import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, FileText } from "lucide-react";

interface ChatMessage {
  id: string;
  type: "user" | "robin";
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  documentType: "rental" | "sales" | "services";
  formData: any;
}

export const ChatInterface = ({ documentType, formData }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "robin",
      content: `Hallo! Ik ben Robin en ik help je bij het opstellen van je ${
        documentType === "rental" ? "huurovereenkomst" : 
        documentType === "sales" ? "koopovereenkomst" : 
        "dienstverleningscontract"
      }. Vul het formulier in en stel me gerust vragen als je hulp nodig hebt!`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate Robin's response
    setTimeout(() => {
      const robinResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "robin",
        content: generateRobinResponse(inputMessage, formData),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, robinResponse]);
    }, 1000);

    setInputMessage("");
  };

  const generateRobinResponse = (userInput: string, formData: any): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("help") || input.includes("hulp")) {
      return "Natuurlijk help ik je graag! Je kunt me vragen stellen over elk veld in het formulier. Ik kan ook uitleggen wat bepaalde juridische termen betekenen.";
    }
    
    if (input.includes("btw") || input.includes("vat")) {
      return "BTW op huur is meestal van toepassing bij commerciële verhuur. Voor kantoorruimte is dit standaard 21%. Wil je dat ik dit automatisch toepas op basis van je eigendom?";
    }
    
    if (input.includes("opzeg") || input.includes("notice")) {
      return "De standaard opzegtermijn voor commerciële huur is 12 maanden. Dit kan echter aangepast worden op basis van onderhandelingen tussen verhuurder en huurder.";
    }
    
    if (input.includes("waarborgsom") || input.includes("deposit")) {
      return "Een waarborgsom van 3 maanden is gebruikelijk voor commerciële verhuur. Dit biedt de verhuurder zekerheid tegen eventuele schade of huurachterstanden.";
    }
    
    if (input.includes("indexatie") || input.includes("index")) {
      return "Indexatie houdt in dat de huur jaarlijks wordt aangepast aan de hand van de consumentenprijsindex (CPI). Dit gebeurt meestal 1 jaar na de huuringangsdatum.";
    }

    return "Dank je voor je vraag! Ik zie dat je bezig bent met het invullen van het formulier. Heb je specifieke vragen over een van de velden? Ik kan je helpen met juridische termen en standaardpraktijken.";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          Chat met Robin
        </CardTitle>
        <div className="flex gap-2">
          <Button size="sm" variant="secondary">
            + Nieuwe Bladeren Chat
          </Button>
          <Button size="sm" variant="secondary">
            + Nieuwe Genereren Chat
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 mb-4 h-[400px]">
          <div className="space-y-4 pr-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.type === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === "robin" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary text-secondary-foreground"
                }`}>
                  {message.type === "robin" ? (
                    <Bot className="w-4 h-4" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>
                
                <div className={`flex-1 max-w-[80%] ${
                  message.type === "user" ? "text-right" : ""
                }`}>
                  <div className={`inline-block px-4 py-2 rounded-lg ${
                    message.type === "robin"
                      ? "bg-muted text-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {message.type === "robin" ? "GENEREREN" : "BLADEREN"} {" "}
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="border-t pt-4">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Vraag Robin..."
              className="flex-1"
            />
            <Button onClick={sendMessage} size="icon">
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
            <button className="flex items-center gap-1 hover:text-foreground">
              <FileText className="w-3 h-3" />
              Spreken
            </button>
            <button className="flex items-center gap-1 hover:text-foreground">
              <span>🔇</span>
              Stem uit
            </button>
            <button className="flex items-center gap-1 hover:text-foreground">
              <span>🗑️</span>
              Wis deze chat
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
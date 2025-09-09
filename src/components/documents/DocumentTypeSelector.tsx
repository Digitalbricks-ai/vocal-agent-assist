import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface DocumentType {
  id: "rental" | "sales" | "services";
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

interface DocumentTypeSelectorProps {
  documentTypes: DocumentType[];
  onSelectType: (type: "rental" | "sales" | "services") => void;
}

export const DocumentTypeSelector = ({ documentTypes, onSelectType }: DocumentTypeSelectorProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Kies een documenttype
        </h2>
        <p className="text-muted-foreground">
          Selecteer het type document dat je wilt genereren. Robin helpt je bij het invullen van alle benodigde informatie.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {documentTypes.map((type) => {
          const Icon = type.icon;
          return (
            <Card 
              key={type.id}
              className="hover:shadow-lg transition-all duration-200 cursor-pointer group"
              onClick={() => onSelectType(type.id)}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className={`w-8 h-8 ${type.color}`} />
                </div>
                <CardTitle className="text-xl">{type.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6">
                  {type.description}
                </p>
                <Button 
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectType(type.id);
                  }}
                >
                  Selecteer
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
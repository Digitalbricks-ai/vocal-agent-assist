import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DocumentTypeSelector } from "@/components/documents/DocumentTypeSelector";
import { RentalAgreementForm } from "@/components/documents/RentalAgreementForm";
import { ChatInterface } from "@/components/documents/ChatInterface";
import { FileText, HandshakeIcon, ScrollText, Search } from "lucide-react";

export type DocumentType = "rental" | "sales" | "services" | "browse" | null;

export const Documents = () => {
  const [selectedType, setSelectedType] = useState<DocumentType>(null);
  const [formData, setFormData] = useState<any>({});

  const documentTypes = [
    {
      id: "rental" as const,
      title: "Huurovereenkomst",
      description: "Genereer een professionele huurovereenkomst voor kantoor- of winkelruimte",
      icon: FileText,
      color: "text-primary"
    },
    {
      id: "sales" as const,
      title: "Koopovereenkomst",
      description: "Stel een koopovereenkomst op voor commercieel vastgoed",
      icon: HandshakeIcon,
      color: "text-accent"
    },
    {
      id: "services" as const,
      title: "Dienstverleningscontract",
      description: "Maak contractvoorwaarden voor het verlenen van diensten",
      icon: ScrollText,
      color: "text-success"
    },
    {
      id: "browse" as const,
      title: "Bladeren",
      description: "Zoek en bekijk bestaande documenten en contracten",
      icon: Search,
      color: "text-warning"
    }
  ];

  const handleBackToSelection = () => {
    setSelectedType(null);
    setFormData({});
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Documenten</h1>
              <p className="text-muted-foreground mt-1">
                Documenten beheren en direct samenwerken met Robin.
              </p>
            </div>
            {selectedType && (
              <button
                onClick={handleBackToSelection}
                className="text-primary hover:text-primary/80 font-medium"
              >
                ← Terug naar documenttypen
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 p-6">
          {!selectedType ? (
            <DocumentTypeSelector
              documentTypes={documentTypes}
              onSelectType={setSelectedType}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
              {/* Form Section */}
              <div className="space-y-4">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {documentTypes.find(type => type.id === selectedType)?.icon && (
                        <div className="w-5 h-5">
                          {(() => {
                            const IconComponent = documentTypes.find(type => type.id === selectedType)?.icon;
                            return IconComponent ? <IconComponent className="w-5 h-5 text-primary" /> : null;
                          })()}
                        </div>
                      )}
                      {documentTypes.find(type => type.id === selectedType)?.title} Formulier
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    {selectedType === "rental" && (
                      <RentalAgreementForm
                        formData={formData}
                        onFormDataChange={setFormData}
                      />
                    )}
                    {selectedType === "sales" && (
                      <div className="text-muted-foreground">
                        Koopovereenkomst formulier komt binnenkort beschikbaar.
                      </div>
                    )}
                    {selectedType === "services" && (
                      <div className="text-muted-foreground">
                        Dienstverleningscontract formulier komt binnenkort beschikbaar.
                      </div>
                    )}
                    {selectedType === "browse" && (
                      <div className="text-muted-foreground">
                        Document zoekfunctie komt binnenkort beschikbaar.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Chat Section */}
              <div className="space-y-4">
                <ChatInterface 
                  documentType={selectedType}
                  formData={formData}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
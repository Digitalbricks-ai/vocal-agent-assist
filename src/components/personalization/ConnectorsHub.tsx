import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { 
  Plug, 
  Cloud, 
  Instagram, 
  Linkedin, 
  Mail, 
  Calendar,
  Database,
  FileSpreadsheet,
  MessageSquare,
  Phone,
  Building2,
  Globe,
  CheckCircle2,
  XCircle,
  Settings2
} from "lucide-react";

interface Connector {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: "storage" | "social" | "communication" | "productivity" | "crm";
  isConnected: boolean;
  fields: { key: string; label: string; type: string; placeholder: string }[];
}

const connectors: Connector[] = [
  {
    id: "sharepoint",
    name: "Microsoft SharePoint",
    description: "Connect to SharePoint for document storage and collaboration",
    icon: Cloud,
    category: "storage",
    isConnected: false,
    fields: [
      { key: "siteUrl", label: "SharePoint Site URL", type: "url", placeholder: "https://yourcompany.sharepoint.com/sites/..." },
      { key: "clientId", label: "Client ID", type: "text", placeholder: "Your Azure AD Client ID" },
      { key: "clientSecret", label: "Client Secret", type: "password", placeholder: "Your Client Secret" },
    ],
  },
  {
    id: "instagram",
    name: "Instagram Business",
    description: "Connect your Instagram business account for property marketing",
    icon: Instagram,
    category: "social",
    isConnected: false,
    fields: [
      { key: "accessToken", label: "Access Token", type: "password", placeholder: "Your Instagram access token" },
      { key: "accountId", label: "Business Account ID", type: "text", placeholder: "Your business account ID" },
    ],
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    description: "Connect LinkedIn for professional networking and listings",
    icon: Linkedin,
    category: "social",
    isConnected: false,
    fields: [
      { key: "accessToken", label: "Access Token", type: "password", placeholder: "Your LinkedIn access token" },
      { key: "organizationId", label: "Organization ID", type: "text", placeholder: "Your company page ID (optional)" },
    ],
  },
  {
    id: "gmail",
    name: "Gmail / Google Workspace",
    description: "Connect Gmail for email automation and communications",
    icon: Mail,
    category: "communication",
    isConnected: true,
    fields: [
      { key: "email", label: "Email Address", type: "email", placeholder: "your@email.com" },
    ],
  },
  {
    id: "outlook",
    name: "Microsoft Outlook",
    description: "Connect Outlook for email and calendar integration",
    icon: Mail,
    category: "communication",
    isConnected: false,
    fields: [
      { key: "clientId", label: "Client ID", type: "text", placeholder: "Your Azure AD Client ID" },
      { key: "clientSecret", label: "Client Secret", type: "password", placeholder: "Your Client Secret" },
    ],
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    description: "Sync appointments and property viewings",
    icon: Calendar,
    category: "productivity",
    isConnected: true,
    fields: [
      { key: "calendarId", label: "Calendar ID", type: "text", placeholder: "primary" },
    ],
  },
  {
    id: "airtable",
    name: "Airtable",
    description: "Connect Airtable for flexible data management",
    icon: Database,
    category: "productivity",
    isConnected: false,
    fields: [
      { key: "apiKey", label: "API Key", type: "password", placeholder: "Your Airtable API key" },
      { key: "baseId", label: "Base ID", type: "text", placeholder: "Your base ID" },
    ],
  },
  {
    id: "google-sheets",
    name: "Google Sheets",
    description: "Connect Google Sheets for spreadsheet integration",
    icon: FileSpreadsheet,
    category: "productivity",
    isConnected: false,
    fields: [
      { key: "spreadsheetId", label: "Spreadsheet ID", type: "text", placeholder: "Your spreadsheet ID" },
    ],
  },
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    description: "Connect WhatsApp for client communications",
    icon: MessageSquare,
    category: "communication",
    isConnected: false,
    fields: [
      { key: "phoneNumberId", label: "Phone Number ID", type: "text", placeholder: "Your WhatsApp phone number ID" },
      { key: "accessToken", label: "Access Token", type: "password", placeholder: "Your access token" },
    ],
  },
  {
    id: "twilio",
    name: "Twilio",
    description: "Connect Twilio for SMS and voice communications",
    icon: Phone,
    category: "communication",
    isConnected: false,
    fields: [
      { key: "accountSid", label: "Account SID", type: "text", placeholder: "Your Twilio Account SID" },
      { key: "authToken", label: "Auth Token", type: "password", placeholder: "Your Auth Token" },
      { key: "phoneNumber", label: "Twilio Phone Number", type: "text", placeholder: "+1234567890" },
    ],
  },
  {
    id: "hubspot",
    name: "HubSpot CRM",
    description: "Connect HubSpot for CRM and marketing automation",
    icon: Building2,
    category: "crm",
    isConnected: false,
    fields: [
      { key: "apiKey", label: "API Key", type: "password", placeholder: "Your HubSpot API key" },
    ],
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Connect with 5000+ apps through Zapier webhooks",
    icon: Globe,
    category: "productivity",
    isConnected: false,
    fields: [
      { key: "webhookUrl", label: "Webhook URL", type: "url", placeholder: "https://hooks.zapier.com/..." },
    ],
  },
];

const categoryLabels: Record<string, string> = {
  storage: "Cloud Storage",
  social: "Social Media",
  communication: "Communication",
  productivity: "Productivity",
  crm: "CRM & Sales",
};

export const ConnectorsHub = () => {
  const [connectorStates, setConnectorStates] = useState<Record<string, boolean>>(
    Object.fromEntries(connectors.map(c => [c.id, c.isConnected]))
  );
  const [selectedConnector, setSelectedConnector] = useState<Connector | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleConnect = (connector: Connector) => {
    setSelectedConnector(connector);
    setFormData({});
    setIsDialogOpen(true);
  };

  const handleSaveConnection = () => {
    if (!selectedConnector) return;

    const missingFields = selectedConnector.fields.filter(f => !formData[f.key]);
    if (missingFields.length > 0) {
      toast({
        title: "Missing fields",
        description: `Please fill in: ${missingFields.map(f => f.label).join(", ")}`,
        variant: "destructive",
      });
      return;
    }

    setConnectorStates({ ...connectorStates, [selectedConnector.id]: true });
    setIsDialogOpen(false);
    toast({
      title: "Connected successfully",
      description: `${selectedConnector.name} has been connected`,
    });
  };

  const handleDisconnect = (connectorId: string) => {
    setConnectorStates({ ...connectorStates, [connectorId]: false });
    toast({
      title: "Disconnected",
      description: "The connector has been disconnected",
    });
  };

  const categories = [...new Set(connectors.map(c => c.category))];

  return (
    <div className="space-y-6">
      {categories.map((category) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle>{categoryLabels[category]}</CardTitle>
            <CardDescription>
              Connect your {categoryLabels[category].toLowerCase()} services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {connectors
                .filter(c => c.category === category)
                .map((connector) => {
                  const Icon = connector.icon;
                  const isConnected = connectorStates[connector.id];

                  return (
                    <div
                      key={connector.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isConnected
                          ? "border-green-500/50 bg-green-500/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isConnected ? "bg-green-500/10" : "bg-muted"}`}>
                            <Icon className={`h-5 w-5 ${isConnected ? "text-green-500" : "text-muted-foreground"}`} />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">{connector.name}</h4>
                            <div className="flex items-center gap-1 mt-1">
                              {isConnected ? (
                                <>
                                  <CheckCircle2 className="h-3 w-3 text-green-500" />
                                  <span className="text-xs text-green-500">Connected</span>
                                </>
                              ) : (
                                <>
                                  <XCircle className="h-3 w-3 text-muted-foreground" />
                                  <span className="text-xs text-muted-foreground">Not connected</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {connector.description}
                      </p>
                      <div className="flex gap-2">
                        {isConnected ? (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => handleConnect(connector)}
                            >
                              <Settings2 className="h-4 w-4 mr-1" />
                              Configure
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDisconnect(connector.id)}
                            >
                              Disconnect
                            </Button>
                          </>
                        ) : (
                          <Button
                            size="sm"
                            className="w-full"
                            onClick={() => handleConnect(connector)}
                          >
                            <Plug className="h-4 w-4 mr-1" />
                            Connect
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      ))}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedConnector && (
                <span className="flex items-center gap-2">
                  {selectedConnector.icon && <selectedConnector.icon className="h-5 w-5" />}
                  Connect {selectedConnector.name}
                </span>
              )}
            </DialogTitle>
            <DialogDescription>
              Enter your credentials to connect this service
            </DialogDescription>
          </DialogHeader>
          {selectedConnector && (
            <div className="space-y-4 py-4">
              {selectedConnector.fields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <Label htmlFor={field.key}>{field.label}</Label>
                  <Input
                    id={field.key}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.key] || ""}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                  />
                </div>
              ))}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveConnection}>
              Save Connection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

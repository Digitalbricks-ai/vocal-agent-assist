import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Globe, Download, Play, Pause, CheckCircle, AlertTriangle, Clock } from "lucide-react";

interface CompetitorScrapingFormProps {
  competitorSites: Array<{
    name: string;
    url: string;
    status: string;
  }>;
  onScrapingComplete: (data: { properties: number; sites: number }) => void;
}

export const CompetitorScrapingForm = ({ competitorSites, onScrapingComplete }: CompetitorScrapingFormProps) => {
  const { toast } = useToast();
  const [selectedSites, setSelectedSites] = useState<string[]>([]);
  const [customUrl, setCustomUrl] = useState("");
  const [scrapingInProgress, setScrapingInProgress] = useState(false);
  const [scrapingProgress, setScrapingProgress] = useState(0);
  const [lastResults, setLastResults] = useState<any>(null);
  const [selectedCity, setSelectedCity] = useState("amsterdam");

  const toggleSiteSelection = (siteName: string) => {
    setSelectedSites(prev => 
      prev.includes(siteName) 
        ? prev.filter(name => name !== siteName)
        : [...prev, siteName]
    );
  };

  const startScraping = async () => {
    if (selectedSites.length === 0 && !customUrl) {
      toast({
        title: "No sites selected",
        description: "Please select at least one competitor site or add a custom URL",
        variant: "destructive"
      });
      return;
    }

    setScrapingInProgress(true);
    setScrapingProgress(0);

    // Simulate scraping process
    const totalSteps = selectedSites.length + (customUrl ? 1 : 0);
    let currentStep = 0;

    for (const site of selectedSites) {
      // Simulate scraping delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      currentStep++;
      setScrapingProgress((currentStep / totalSteps) * 100);
      
      toast({
        title: "Scraping in progress",
        description: `Processing ${site}...`,
      });
    }

    if (customUrl) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      currentStep++;
      setScrapingProgress(100);
    }

    // Mock results
    const mockResults = {
      totalProperties: Math.floor(Math.random() * 50) + 20,
      newProperties: Math.floor(Math.random() * 15) + 5,
      updatedProperties: Math.floor(Math.random() * 10) + 3,
      scrapedSites: selectedSites.length + (customUrl ? 1 : 0),
      timestamp: new Date()
    };

    setLastResults(mockResults);
    setScrapingInProgress(false);
    
    onScrapingComplete({
      properties: mockResults.totalProperties,
      sites: mockResults.scrapedSites
    });

    toast({
      title: "Scraping completed",
      description: `Found ${mockResults.newProperties} new properties from ${mockResults.scrapedSites} sites`,
    });
  };

  return (
    <div className="space-y-6">
      <Alert>
        <Globe className="h-4 w-4" />
        <AlertDescription>
          Web scraping helps monitor competitor pricing and availability. Always ensure compliance with website terms of service.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scraping Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Competitor Sites
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Label>Select competitor websites to monitor:</Label>
              {competitorSites.map((site) => (
                <div key={site.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={selectedSites.includes(site.name)}
                      onCheckedChange={() => toggleSiteSelection(site.name)}
                    />
                    <div>
                      <p className="font-medium">{site.name}</p>
                      <p className="text-sm text-muted-foreground">{site.url}</p>
                    </div>
                  </div>
                  <Badge variant={site.status === "active" ? "default" : "secondary"}>
                    {site.status}
                  </Badge>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="custom-url">Custom competitor URL:</Label>
              <Input
                id="custom-url"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="https://example-competitor.nl"
              />
            </div>

            <div className="space-y-2">
              <Label>Target city:</Label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="amsterdam">Amsterdam</SelectItem>
                  <SelectItem value="rotterdam">Rotterdam</SelectItem>
                  <SelectItem value="den-haag">Den Haag</SelectItem>
                  <SelectItem value="utrecht">Utrecht</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Scraping Control */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Scraping Control
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {scrapingInProgress && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Scraping progress</span>
                  <span className="text-sm">{Math.round(scrapingProgress)}%</span>
                </div>
                <Progress value={scrapingProgress} />
              </div>
            )}

            <Button
              onClick={startScraping}
              disabled={scrapingInProgress}
              className="w-full"
            >
              {scrapingInProgress ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Scraping in progress...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start Scraping
                </>
              )}
            </Button>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-center p-2 border rounded">
                <p className="text-muted-foreground">Selected Sites</p>
                <p className="font-semibold">{selectedSites.length + (customUrl ? 1 : 0)}</p>
              </div>
              <div className="text-center p-2 border rounded">
                <p className="text-muted-foreground">Est. Duration</p>
                <p className="font-semibold">{(selectedSites.length + (customUrl ? 1 : 0)) * 2}min</p>
              </div>
            </div>

            {lastResults && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Last scraping results:</strong><br />
                  • {lastResults.newProperties} new properties<br />
                  • {lastResults.updatedProperties} updated properties<br />
                  • {lastResults.scrapedSites} sites processed<br />
                  • Completed: {lastResults.timestamp.toLocaleString()}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Schedule & Automation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Automation Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Scraping frequency:</Label>
              <Select defaultValue="daily">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Every hour</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="manual">Manual only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Notification threshold:</Label>
              <Select defaultValue="new">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any changes</SelectItem>
                  <SelectItem value="new">New properties only</SelectItem>
                  <SelectItem value="price">Price changes ±5%</SelectItem>
                  <SelectItem value="none">No notifications</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Data retention:</Label>
              <Select defaultValue="90days">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30days">30 days</SelectItem>
                  <SelectItem value="90days">90 days</SelectItem>
                  <SelectItem value="1year">1 year</SelectItem>
                  <SelectItem value="forever">Forever</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Automated scraping is currently disabled. Enable it in the premium plan to monitor competitors 24/7.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { PropertyComparisonCard } from "@/components/comparisons/PropertyComparisonCard";
import { PropertyComparisonDashboard } from "@/components/comparisons/PropertyComparisonDashboard";
import { LocationDashboard } from "@/components/competitors/LocationDashboard";
import { CompetitorScrapingForm } from "@/components/competitors/CompetitorScrapingForm";
import { Search, Globe, MapPin, TrendingUp, Building2, AlertTriangle } from "lucide-react";

const mockCompetitorProperties = [
  {
    id: "comp1",
    address: "Zuidas Financial District, Unit 401A",
    price: 920000,
    monthlyRent: 13200,
    m2: 220,
    propertyType: "Office Space",
    buildingClass: "Class A+",
    yearBuilt: 2019,
    roi: 8.6,
    footTraffic: "Very High",
    parkingSpaces: 18,
    techInfrastructure: 97,
    operatingCosts: 3100,
    zoning: "Commercial",
    leaseTerm: "3-7 years",
    visibility: "Premium",
    matchScore: 96,
    source: "competitor",
    competitorName: "ERA Makelaars",
    location: "Amsterdam",
    district: "Zuidas",
    businessFeatures: ["Premium fiber", "Executive suites", "Concierge", "Rooftop terrace", "Smart building"],
    locationBenefits: [
      "Premium Zuidas location with international visibility",
      "Direct access to financial institutions",
      "World-class business environment",
      "Excellent public transport connections",
      "High-end corporate amenities"
    ],
    image: "/placeholder.svg"
  },
  {
    id: "comp2", 
    address: "Canal Ring Historic Office, Herengracht 123",
    price: 1150000,
    monthlyRent: 15800,
    m2: 185,
    propertyType: "Historic Office",
    buildingClass: "Heritage Premium",
    yearBuilt: 1680,
    roi: 7.4,
    footTraffic: "High",
    parkingSpaces: 8,
    techInfrastructure: 85,
    operatingCosts: 4200,
    zoning: "Historic Commercial",
    leaseTerm: "5-15 years",
    visibility: "Historic Premium",
    matchScore: 89,
    source: "competitor",
    competitorName: "Funda Business",
    location: "Amsterdam",
    district: "Canal Ring",
    businessFeatures: ["Historic charm", "Canal views", "Restored interior", "Meeting rooms", "Heritage protection"],
    locationBenefits: [
      "Prestigious Canal Ring address with heritage value",
      "Unique historic character for brand prestige", 
      "Central Amsterdam location",
      "Tourist and business foot traffic",
      "Protected heritage investment"
    ],
    image: "/placeholder.svg"
  },
  {
    id: "comp3",
    address: "Rotterdam Port Industrial Complex B7",
    price: 680000,
    monthlyRent: 9400,
    m2: 420,
    propertyType: "Industrial/Logistics",
    buildingClass: "Industrial A",
    yearBuilt: 2017,
    roi: 9.8,
    footTraffic: "Medium", 
    parkingSpaces: 35,
    techInfrastructure: 82,
    operatingCosts: 2200,
    zoning: "Industrial Port",
    leaseTerm: "5-20 years",
    visibility: "High Industrial",
    matchScore: 92,
    source: "competitor",
    competitorName: "VBO Makelaars",
    location: "Rotterdam",
    district: "Port Area",
    businessFeatures: ["Port access", "Heavy logistics", "Rail connection", "Container handling", "24/7 operations"],
    locationBenefits: [
      "Direct port access for international shipping",
      "Major European logistics hub location",
      "Excellent freight rail connections",
      "Scalable industrial operations",
      "Strategic supply chain position"
    ],
    image: "/placeholder.svg"
  }
];

const dutchCities = [
  { value: "amsterdam", label: "Amsterdam", properties: 1247 },
  { value: "rotterdam", label: "Rotterdam", properties: 856 },
  { value: "den-haag", label: "Den Haag", properties: 623 },
  { value: "utrecht", label: "Utrecht", properties: 542 },
  { value: "eindhoven", label: "Eindhoven", properties: 387 },
  { value: "tilburg", label: "Tilburg", properties: 298 },
  { value: "groningen", label: "Groningen", properties: 267 }
];

const competitorSites = [
  { name: "Funda Business", url: "funda.nl/zakelijk", status: "active" },
  { name: "ERA Makelaars", url: "era.nl", status: "active" },
  { name: "VBO Makelaars", url: "vbo.nl", status: "active" },
  { name: "Cushman & Wakefield", url: "cushmanwakefield.nl", status: "active" },
  { name: "JLL Netherlands", url: "jll.nl", status: "active" }
];

export const CompetitorAnalysis = () => {
  const { toast } = useToast();
  const [selectedCity, setSelectedCity] = useState("amsterdam");
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [scrapingInProgress, setScrapingInProgress] = useState(false);
  const [lastScrapingUpdate, setLastScrapingUpdate] = useState<Date | null>(null);
  
  const customerPreferences = {
    maxPrice: 1000000,
    minM2: 180,
    preferredPropertyType: "office",
    minROI: 8.0,
    requiresParking: true,
    prioritizeFootTraffic: true
  };

  const togglePropertySelection = (propertyId: string) => {
    setSelectedProperties(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const selectedPropertyData = mockCompetitorProperties.filter(p => 
    selectedProperties.includes(p.id)
  );

  const filteredProperties = mockCompetitorProperties.filter(p => 
    selectedCity === "all" || p.location.toLowerCase() === selectedCity
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Competitor Property Analysis</h1>
        <p className="text-muted-foreground">
          Monitor competitor properties and market trends across the Netherlands
        </p>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Competitor properties are marked with red badges. Data is automatically updated from competitor websites.
          Last update: {lastScrapingUpdate?.toLocaleString() || "Never"}
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="properties" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="location">Location Analysis</TabsTrigger>
          <TabsTrigger value="scraping">Web Scraping</TabsTrigger>
          <TabsTrigger value="dashboard">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="properties" className="space-y-6">
          {/* Location Filter */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Location Filter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    {dutchCities.map(city => (
                      <SelectItem key={city.value} value={city.value}>
                        {city.label} ({city.properties})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe className="w-4 h-4" />
                  {filteredProperties.length} competitor properties found
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comparison Dashboard */}
          {selectedProperties.length > 0 && (
            <PropertyComparisonDashboard 
              properties={selectedPropertyData}
              customerPreferences={customerPreferences}
            />
          )}

          {/* Competitor Properties */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Competitor Properties
              <Badge variant="destructive" className="ml-2">
                {filteredProperties.length} properties
              </Badge>
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {filteredProperties.map((property) => (
                <div key={property.id} className="relative">
                  <Badge 
                    variant="destructive" 
                    className="absolute top-4 right-4 z-10"
                  >
                    {property.competitorName}
                  </Badge>
                  <PropertyComparisonCard
                    property={property}
                    isSelected={selectedProperties.includes(property.id)}
                    onToggleSelect={() => togglePropertySelection(property.id)}
                    customerPreferences={customerPreferences}
                  />
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="location" className="space-y-6">
          <LocationDashboard 
            selectedCity={selectedCity}
            properties={filteredProperties}
            cities={dutchCities}
          />
        </TabsContent>

        <TabsContent value="scraping" className="space-y-6">
          <CompetitorScrapingForm 
            competitorSites={competitorSites}
            onScrapingComplete={(data) => {
              setLastScrapingUpdate(new Date());
              toast({
                title: "Scraping Complete",
                description: `Found ${data.properties} new properties from competitors`,
              });
            }}
          />
        </TabsContent>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  Market Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg ROI Trend</p>
                    <p className="text-2xl font-bold text-green-600">+0.3%</p>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Price Trend</p>
                    <p className="text-2xl font-bold text-blue-600">+2.1%</p>
                    <Progress value={60} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Districts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Zuidas (Amsterdam)</span>
                    <Badge>8.6% ROI</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Port Area (Rotterdam)</span>
                    <Badge>9.8% ROI</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Canal Ring (Amsterdam)</span>
                    <Badge>7.4% ROI</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Competitor Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">New Listings</span>
                    <span className="font-semibold">+12 this week</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Price Changes</span>
                    <span className="font-semibold">8 properties</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Active Competitors</span>
                    <span className="font-semibold">5 agencies</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
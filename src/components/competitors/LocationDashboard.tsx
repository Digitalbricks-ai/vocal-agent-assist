import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { MapPin, TrendingUp, Building2, Users, Euro } from "lucide-react";

interface LocationDashboardProps {
  selectedCity: string;
  properties: any[];
  cities: any[];
}

export const LocationDashboard = ({ selectedCity, properties, cities }: LocationDashboardProps) => {
  const cityData = cities.find(c => c.value === selectedCity);
  const cityName = cityData?.label || "All Cities";
  
  // Mock similar properties data for selected city
  const similarProperties = [
    { district: "Zuidas", count: 25, avgPrice: 890000, avgROI: 8.4 },
    { district: "Centrum", count: 18, avgPrice: 1120000, avgROI: 7.2 },
    { district: "Noord", count: 15, avgPrice: 650000, avgROI: 9.1 },
    { district: "Oost", count: 12, avgPrice: 720000, avgROI: 8.7 },
    { district: "West", count: 8, avgPrice: 580000, avgROI: 9.3 }
  ];

  const priceHistoryData = [
    { month: "Jan", price: 820000, competitors: 5 },
    { month: "Feb", price: 835000, competitors: 6 },
    { month: "Mar", price: 850000, competitors: 7 },
    { month: "Apr", price: 870000, competitors: 8 },
    { month: "May", price: 885000, competitors: 9 },
    { month: "Jun", price: 900000, competitors: 10 }
  ];

  const districtColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c", "#8dd1e1"];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            {cityName} Market Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">Total Properties</p>
              <p className="text-2xl font-bold">{cityData?.properties || "3,400+"}</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">Avg Price</p>
              <p className="text-2xl font-bold">€895k</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">Avg ROI</p>
              <p className="text-2xl font-bold text-green-600">8.3%</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">Market Activity</p>
              <p className="text-2xl font-bold text-blue-600">High</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* District Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Properties by District</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={similarProperties}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="district" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--primary))" name="Properties" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* ROI Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>ROI Distribution by District</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={similarProperties}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ district, avgROI }) => `${district}: ${avgROI}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="avgROI"
                >
                  {similarProperties.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={districtColors[index % districtColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Price Trends */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Market Price Trends - {cityName}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={priceHistoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  name="Avg Price (€)" 
                />
                <Line 
                  type="monotone" 
                  dataKey="competitors" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={2}
                  name="Competitor Listings" 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Similar Properties Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Similar Properties Analysis - {cityName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {similarProperties.map((district, index) => (
              <div key={district.district} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: districtColors[index % districtColors.length] }}
                    />
                    {district.district} District
                  </h4>
                  <Badge variant="outline">
                    {district.count} properties
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Euro className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-muted-foreground">Average Price</span>
                    </div>
                    <p className="text-lg font-bold">€{(district.avgPrice / 1000).toFixed(0)}k</p>
                    <Progress value={(district.avgPrice / 1200000) * 100} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">Average ROI</span>
                    </div>
                    <p className="text-lg font-bold text-green-600">{district.avgROI}%</p>
                    <Progress value={(district.avgROI / 10) * 100} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-500" />
                      <span className="text-sm text-muted-foreground">Market Share</span>
                    </div>
                    <p className="text-lg font-bold">{((district.count / 78) * 100).toFixed(1)}%</p>
                    <Progress value={(district.count / 25) * 100} className="h-2" />
                  </div>
                </div>

                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm">
                    <strong>Market Insight:</strong> {district.district} shows {
                      district.avgROI > 8.5 ? "strong" : district.avgROI > 7.5 ? "moderate" : "cautious"
                    } investment potential with {district.count} competing properties. 
                    {district.avgPrice > 900000 ? " Premium pricing reflects high demand." : " Competitive pricing offers value opportunity."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
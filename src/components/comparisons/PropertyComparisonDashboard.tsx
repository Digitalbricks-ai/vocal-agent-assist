import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell } from "recharts";
import { Leaf, Home, DollarSign, Zap } from "lucide-react";

interface PropertyComparisonDashboardProps {
  properties: any[];
  customerPreferences: any;
}

export const PropertyComparisonDashboard = ({ properties, customerPreferences }: PropertyComparisonDashboardProps) => {
  const chartData = properties.map(property => ({
    name: property.address.split(',')[0],
    m2: property.m2,
    environmental: property.environmentalScore,
    price: property.price / 1000, // Convert to thousands for better chart readability
    match: property.matchScore
  }));

  const radarData = properties.map(property => ({
    property: property.address.split(',')[0],
    Size: (property.m2 / 150) * 100, // Normalize to 100
    Environmental: property.environmentalScore,
    Value: ((800000 - property.price) / 300000) * 100, // Inverse price score
    Location: Math.random() * 100, // Mock location score
    Features: property.sustainableFeatures.length * 20
  }));

  const pieData = properties.map((property, index) => ({
    name: property.address.split(',')[0],
    value: property.matchScore,
    color: `hsl(${index * 120}, 70%, 50%)`
  }));

  const avgEnvironmentalScore = properties.reduce((sum, p) => sum + p.environmentalScore, 0) / properties.length;
  const avgPrice = properties.reduce((sum, p) => sum + p.price, 0) / properties.length;
  const avgSize = properties.reduce((sum, p) => sum + p.m2, 0) / properties.length;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Property Comparison Dashboard</h2>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Home className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Size</p>
                <p className="text-2xl font-bold">{Math.round(avgSize)}m²</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Environmental</p>
                <p className="text-2xl font-bold">{Math.round(avgEnvironmentalScore)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Price</p>
                <p className="text-2xl font-bold">${Math.round(avgPrice / 1000)}k</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Best Match</p>
                <p className="text-2xl font-bold">{Math.max(...properties.map(p => p.matchScore))}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Size vs Environmental Score */}
        <Card>
          <CardHeader>
            <CardTitle>Size vs Environmental Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="m2" fill="hsl(var(--primary))" name="Size (m²)" />
                <Bar dataKey="environmental" fill="hsl(var(--secondary))" name="Environmental Score" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Match Score Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Match Scores</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Radar Chart - Overall Comparison */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Multi-factor Property Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData[0] ? [radarData[0]] : []}>
                <PolarGrid />
                <PolarAngleAxis dataKey="property" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                {radarData.map((property, index) => (
                  <Radar
                    key={index}
                    name={property.property}
                    dataKey="Size"
                    stroke={`hsl(${index * 120}, 70%, 50%)`}
                    fill={`hsl(${index * 120}, 70%, 50%)`}
                    fillOpacity={0.3}
                  />
                ))}
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Selling Advice */}
      <Card>
        <CardHeader>
          <CardTitle>AI Selling Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {properties.map((property, index) => (
              <div key={property.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{property.address}</h4>
                  <Badge variant={property.matchScore > 90 ? "default" : property.matchScore > 80 ? "secondary" : "outline"}>
                    {property.matchScore}% Match
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Selling Points:</p>
                    <ul className="text-sm space-y-1">
                      {property.sellingPoints.map((point: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Environmental Features:</p>
                    <div className="flex flex-wrap gap-1">
                      {property.sustainableFeatures.map((feature: string, idx: number) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground">Environmental Score:</p>
                      <Progress value={property.environmentalScore} className="h-2 mt-1" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
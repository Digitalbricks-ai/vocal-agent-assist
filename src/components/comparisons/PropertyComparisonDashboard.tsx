import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Building2, DollarSign, Users, Zap, MapPin } from "lucide-react";

interface PropertyComparisonDashboardProps {
  properties: any[];
  customerPreferences: any;
}

export const PropertyComparisonDashboard = ({ properties, customerPreferences }: PropertyComparisonDashboardProps) => {
  const chartData = properties.map(property => ({
    name: property.address.split(',')[0],
    m2: property.m2,
    roi: property.roi,
    rent: property.monthlyRent / 1000, // Convert to thousands
    costs: property.operatingCosts,
    match: property.matchScore
  }));

  const radarData = properties.map(property => ({
    property: property.address.split(',')[0],
    ROI: property.roi * 10, // Scale to 100
    Location: property.footTraffic === 'Very High' ? 100 : property.footTraffic === 'High' ? 80 : property.footTraffic === 'Medium' ? 60 : 40,
    Value: ((1000000 - property.price) / 400000) * 100, // Inverse price score
    Infrastructure: property.techInfrastructure,
    Parking: (property.parkingSpaces / 40) * 100 // Normalize parking spaces
  }));

  const pieData = properties.map((property, index) => ({
    name: property.address.split(',')[0],
    value: property.matchScore,
    color: `hsl(${index * 120}, 70%, 50%)`
  }));

  const avgROI = properties.reduce((sum, p) => sum + p.roi, 0) / properties.length;
  const avgRent = properties.reduce((sum, p) => sum + p.monthlyRent, 0) / properties.length;
  const avgSize = properties.reduce((sum, p) => sum + p.m2, 0) / properties.length;
  const avgOperatingCosts = properties.reduce((sum, p) => sum + p.operatingCosts, 0) / properties.length;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Commercial Property Analysis Dashboard</h2>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
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
              <TrendingUp className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Avg ROI</p>
                <p className="text-2xl font-bold">{avgROI.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Monthly Rent</p>
                <p className="text-2xl font-bold">${(avgRent / 1000).toFixed(0)}k</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Operating Costs</p>
                <p className="text-2xl font-bold">${(avgOperatingCosts / 1000).toFixed(1)}k</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ROI vs Operating Costs */}
        <Card>
          <CardHeader>
            <CardTitle>ROI vs Operating Costs</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="roi" fill="hsl(var(--primary))" name="ROI %" />
                <Bar dataKey="costs" fill="hsl(var(--secondary))" name="Operating Costs ($)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Business Suitability Scores */}
        <Card>
          <CardHeader>
            <CardTitle>Business Suitability Scores</CardTitle>
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

        {/* Multi-factor Business Analysis */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Multi-factor Commercial Property Analysis</CardTitle>
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
                    dataKey="ROI"
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

      {/* Business Investment Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Business Investment Analysis & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {properties.map((property, index) => (
              <div key={property.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{property.address}</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{property.propertyType}</Badge>
                    <Badge variant={property.matchScore > 90 ? "default" : property.matchScore > 85 ? "secondary" : "outline"}>
                      {property.matchScore}% Match
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Business Benefits:</p>
                    <ul className="text-sm space-y-1">
                      {property.locationBenefits.map((benefit: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Key Business Features:</p>
                        <div className="flex flex-wrap gap-1">
                          {property.businessFeatures.map((feature: string, idx: number) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">ROI:</p>
                          <p className="font-semibold text-green-600">{property.roi}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Monthly Rent:</p>
                          <p className="font-semibold">${property.monthlyRent.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Operating Costs:</p>
                          <p className="font-semibold">${property.operatingCosts.toLocaleString()}/mo</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Building Class:</p>
                          <p className="font-semibold">{property.buildingClass}</p>
                        </div>
                      </div>
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
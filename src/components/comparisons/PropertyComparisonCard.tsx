import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Home, TrendingUp, Car, DollarSign, Building2, MapPin, CheckCircle, Zap } from "lucide-react";

interface PropertyComparisonCardProps {
  property: any;
  isSelected: boolean;
  onToggleSelect: () => void;
  customerPreferences: any;
}

export const PropertyComparisonCard = ({ 
  property, 
  isSelected, 
  onToggleSelect,
  customerPreferences 
}: PropertyComparisonCardProps) => {
  const meetsPreferences = {
    price: property.price <= customerPreferences.maxPrice,
    size: property.m2 >= customerPreferences.minM2,
    roi: property.roi >= customerPreferences.minROI,
    parking: !customerPreferences.requiresParking || property.parkingSpaces > 0,
    footTraffic: !customerPreferences.prioritizeFootTraffic || 
                 property.footTraffic === 'High' || property.footTraffic === 'Very High'
  };

  const overallFit = Object.values(meetsPreferences).every(Boolean);

  return (
    <Card className={`transition-all duration-200 hover:shadow-lg ${isSelected ? 'ring-2 ring-primary' : ''}`}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Checkbox
            checked={isSelected}
            onCheckedChange={onToggleSelect}
            className="mt-1"
          />
          
          <div className="flex-1 space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{property.address}</h3>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-primary">${property.price.toLocaleString()}</p>
                  <Badge variant="outline" className="text-xs">{property.propertyType}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Monthly Rent: ${property.monthlyRent.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <Badge variant={overallFit ? "default" : "secondary"}>
                  {property.matchScore}% Match
                </Badge>
                {overallFit && (
                  <div className="flex items-center gap-1 mt-1 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-xs">Meets criteria</span>
                  </div>
                )}
              </div>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Size</p>
                  <p className="font-semibold">{property.m2}m²</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <div>
                  <p className="text-xs text-muted-foreground">ROI</p>
                  <p className="font-semibold text-green-600">{property.roi}%</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Parking</p>
                  <p className="font-semibold">{property.parkingSpaces} spaces</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Foot Traffic</p>
                  <p className="font-semibold">{property.footTraffic}</p>
                </div>
              </div>
            </div>

            {/* Business Metrics */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Tech Infrastructure</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{property.buildingClass}</Badge>
                  <span className="text-sm font-semibold">{property.techInfrastructure}%</span>
                </div>
              </div>
              <Progress value={property.techInfrastructure} className="h-2" />
              <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                <p>Operating Costs: ${property.operatingCosts}/mo</p>
                <p>Lease Term: {property.leaseTerm}</p>
              </div>
            </div>

            {/* Business Features */}
            <div>
              <p className="text-sm font-medium mb-2 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary" />
                Business Features
              </p>
              <div className="flex flex-wrap gap-1">
                {property.businessFeatures.map((feature: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Location Benefits */}
            <div>
              <p className="text-sm font-medium mb-2">Key Business Benefits</p>
              <ul className="text-sm space-y-1">
                {property.locationBenefits.slice(0, 3).map((benefit: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Business Suitability */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 pt-2 border-t">
              <div className={`text-center p-2 rounded ${meetsPreferences.price ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                <p className="text-xs">Price</p>
                <p className="font-semibold">{meetsPreferences.price ? 'Within Budget' : 'Over Budget'}</p>
              </div>
              <div className={`text-center p-2 rounded ${meetsPreferences.size ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                <p className="text-xs">Size</p>
                <p className="font-semibold">{meetsPreferences.size ? 'Adequate' : 'Too Small'}</p>
              </div>
              <div className={`text-center p-2 rounded ${meetsPreferences.roi ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                <p className="text-xs">ROI</p>
                <p className="font-semibold">{meetsPreferences.roi ? 'Meets Target' : 'Below Target'}</p>
              </div>
              <div className={`text-center p-2 rounded ${meetsPreferences.parking ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                <p className="text-xs">Parking</p>
                <p className="font-semibold">{meetsPreferences.parking ? 'Available' : 'Limited'}</p>
              </div>
              <div className={`text-center p-2 rounded ${meetsPreferences.footTraffic ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                <p className="text-xs">Traffic</p>
                <p className="font-semibold">{meetsPreferences.footTraffic ? 'High' : 'Moderate'}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
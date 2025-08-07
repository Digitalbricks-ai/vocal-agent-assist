import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Home, Leaf, Zap, DollarSign, Bed, Bath, CheckCircle } from "lucide-react";

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
    environmental: customerPreferences.prioritizeEnvironmental ? property.environmentalScore > 80 : true
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
                <p className="text-2xl font-bold text-primary">${property.price.toLocaleString()}</p>
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
                <Home className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Size</p>
                  <p className="font-semibold">{property.m2}m²</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Bed className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Bedrooms</p>
                  <p className="font-semibold">{property.bedrooms}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Bath className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Bathrooms</p>
                  <p className="font-semibold">{property.bathrooms}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Per m²</p>
                  <p className="font-semibold">${Math.round(property.price / property.m2).toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Environmental Score */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">Environmental Score</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{property.energyRating}</Badge>
                  <span className="text-sm font-semibold">{property.environmentalScore}%</span>
                </div>
              </div>
              <Progress value={property.environmentalScore} className="h-2" />
              <p className="text-xs text-muted-foreground">Carbon Footprint: {property.carbonFootprint}</p>
            </div>

            {/* Sustainable Features */}
            <div>
              <p className="text-sm font-medium mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-500" />
                Sustainable Features
              </p>
              <div className="flex flex-wrap gap-1">
                {property.sustainableFeatures.map((feature: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Selling Points */}
            <div>
              <p className="text-sm font-medium mb-2">Key Selling Points</p>
              <ul className="text-sm space-y-1">
                {property.sellingPoints.slice(0, 3).map((point: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Preference Matching */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t">
              <div className={`text-center p-2 rounded ${meetsPreferences.price ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                <p className="text-xs">Price</p>
                <p className="font-semibold">{meetsPreferences.price ? 'Within Budget' : 'Over Budget'}</p>
              </div>
              <div className={`text-center p-2 rounded ${meetsPreferences.size ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                <p className="text-xs">Size</p>
                <p className="font-semibold">{meetsPreferences.size ? 'Meets Requirement' : 'Too Small'}</p>
              </div>
              <div className={`text-center p-2 rounded ${meetsPreferences.environmental ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                <p className="text-xs">Environmental</p>
                <p className="font-semibold">{meetsPreferences.environmental ? 'Excellent' : 'Good'}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
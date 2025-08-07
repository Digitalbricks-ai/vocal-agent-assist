import { useState } from "react";
import { AIChat } from "@/components/comparisons/AIChat";
import { PropertyComparisonDashboard } from "@/components/comparisons/PropertyComparisonDashboard";
import { PropertyComparisonCard } from "@/components/comparisons/PropertyComparisonCard";

const mockProperties = [
  {
    id: "1",
    address: "123 Ocean View Drive, Unit 12A",
    price: 650000,
    m2: 85,
    bedrooms: 2,
    bathrooms: 2,
    environmentalScore: 92,
    energyRating: "A+",
    carbonFootprint: "Low",
    sustainableFeatures: ["Solar panels", "Smart thermostat", "LED lighting", "Water-efficient fixtures"],
    matchScore: 95,
    sellingPoints: [
      "Perfect size for young professionals",
      "Excellent environmental credentials",
      "Prime location with ocean views",
      "Modern energy-efficient systems"
    ],
    image: "/placeholder.svg"
  },
  {
    id: "2",
    address: "456 Downtown Plaza, Apartment 8B",
    price: 580000,
    m2: 75,
    bedrooms: 2,
    bathrooms: 1,
    environmentalScore: 78,
    energyRating: "B+",
    carbonFootprint: "Medium",
    sustainableFeatures: ["Double glazing", "Insulation upgrade", "Recycling facilities"],
    matchScore: 82,
    sellingPoints: [
      "Great urban location",
      "Good value for money",
      "Close to public transport",
      "Building amenities included"
    ],
    image: "/placeholder.svg"
  },
  {
    id: "3",
    address: "789 Suburban Lane, Single Family Home",
    price: 750000,
    m2: 120,
    bedrooms: 3,
    bathrooms: 2,
    environmentalScore: 88,
    energyRating: "A",
    carbonFootprint: "Low",
    sustainableFeatures: ["Solar panels", "Rainwater harvesting", "Native landscaping", "Smart home system"],
    matchScore: 88,
    sellingPoints: [
      "Spacious family home",
      "Large outdoor space",
      "Excellent schools nearby",
      "Strong environmental features"
    ],
    image: "/placeholder.svg"
  }
];

export const PropertyComparisons = () => {
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [customerPreferences, setCustomerPreferences] = useState({
    maxPrice: 700000,
    minM2: 80,
    prioritizeEnvironmental: true,
    propertyType: "apartment"
  });

  const togglePropertySelection = (propertyId: string) => {
    setSelectedProperties(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const selectedPropertyData = mockProperties.filter(p => selectedProperties.includes(p.id));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Property Comparisons</h1>
        <p className="text-muted-foreground">AI-powered property analysis and recommendations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Chat Panel */}
        <div className="lg:col-span-1">
          <AIChat 
            customerPreferences={customerPreferences}
            selectedProperties={selectedPropertyData}
            onPreferencesUpdate={setCustomerPreferences}
          />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Comparison Dashboard */}
          {selectedProperties.length > 0 && (
            <PropertyComparisonDashboard 
              properties={selectedPropertyData}
              customerPreferences={customerPreferences}
            />
          )}

          {/* Property Cards */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Available Properties</h2>
            <div className="grid grid-cols-1 gap-4">
              {mockProperties.map((property) => (
                <PropertyComparisonCard
                  key={property.id}
                  property={property}
                  isSelected={selectedProperties.includes(property.id)}
                  onToggleSelect={() => togglePropertySelection(property.id)}
                  customerPreferences={customerPreferences}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
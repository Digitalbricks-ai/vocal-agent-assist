import { useState } from "react";
import { AIChat } from "@/components/comparisons/AIChat";
import { PropertyComparisonDashboard } from "@/components/comparisons/PropertyComparisonDashboard";
import { PropertyComparisonCard } from "@/components/comparisons/PropertyComparisonCard";

const mockProperties = [
  {
    id: "1",
    address: "Downtown Business Plaza, Suite 301",
    price: 850000,
    monthlyRent: 12500,
    m2: 200,
    propertyType: "Office Space",
    buildingClass: "Class A",
    yearBuilt: 2018,
    roi: 8.2,
    footTraffic: "High",
    parkingSpaces: 15,
    techInfrastructure: 95,
    operatingCosts: 2800,
    zoning: "Commercial",
    leaseTerm: "5-10 years",
    visibility: "High",
    matchScore: 94,
    businessFeatures: ["High-speed fiber", "Conference rooms", "Reception area", "Elevator access", "24/7 security"],
    locationBenefits: [
      "Prime downtown location with excellent visibility",
      "Walking distance to financial district",
      "Strong foot traffic and client accessibility",
      "Modern building with professional amenities",
      "Flexible lease terms for growing businesses"
    ],
    image: "/placeholder.svg"
  },
  {
    id: "2",
    address: "Industrial Park West, Unit 12B",
    price: 620000,
    monthlyRent: 8200,
    m2: 350,
    propertyType: "Warehouse/Industrial",
    buildingClass: "Class B",
    yearBuilt: 2015,
    roi: 9.1,
    footTraffic: "Medium",
    parkingSpaces: 25,
    techInfrastructure: 78,
    operatingCosts: 1900,
    zoning: "Industrial",
    leaseTerm: "3-15 years",
    visibility: "Medium",
    matchScore: 87,
    businessFeatures: ["Loading dock", "High ceilings", "Industrial power", "Storage capacity", "Truck access"],
    locationBenefits: [
      "Large space ideal for manufacturing/storage",
      "Excellent logistics and shipping access",
      "Lower operating costs than downtown",
      "Scalable space for business growth",
      "Industrial zoning allows flexible operations"
    ],
    image: "/placeholder.svg"
  },
  {
    id: "3",
    address: "Retail Center Main Street, Unit 5A",
    price: 750000,
    monthlyRent: 11000,
    m2: 180,
    propertyType: "Retail Space",
    buildingClass: "Class A",
    yearBuilt: 2020,
    roi: 7.8,
    footTraffic: "Very High",
    parkingSpaces: 30,
    techInfrastructure: 88,
    operatingCosts: 3200,
    zoning: "Commercial Retail",
    leaseTerm: "5-10 years",
    visibility: "Very High",
    matchScore: 91,
    businessFeatures: ["Street-level access", "Large windows", "HVAC system", "Point-of-sale ready", "Signage rights"],
    locationBenefits: [
      "Prime retail location with maximum visibility",
      "High customer foot traffic throughout day",
      "Ample customer parking available",
      "Modern retail-ready infrastructure",
      "Strong potential for brand exposure"
    ],
    image: "/placeholder.svg"
  }
];

export const PropertyComparisons = () => {
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [customerPreferences, setCustomerPreferences] = useState({
    maxPrice: 800000,
    minM2: 150,
    preferredPropertyType: "office",
    minROI: 7.0,
    requiresParking: true,
    prioritizeFootTraffic: true
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
        <h1 className="text-3xl font-bold text-foreground">Commercial Property Comparisons</h1>
        <p className="text-muted-foreground">AI-powered commercial property analysis and ROI recommendations</p>
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
            <h2 className="text-xl font-semibold text-foreground">Available Commercial Properties</h2>
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
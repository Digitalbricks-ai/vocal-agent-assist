import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ContractCard } from "@/components/contracts/ContractCard";
import { FileText, AlertTriangle, CheckCircle, Clock } from "lucide-react";

interface Contract {
  id: string;
  propertyAddress: string;
  tenant: string;
  landlord: string;
  area: string;
  type: "office" | "shop" | "residential";
  startDate: string;
  endDate: string;
  monthlyRent: number;
  indexationDate: string;
  lastIndexation: string;
  status: "active" | "expiring" | "expired";
}

const mockContracts: Contract[] = [
  {
    id: "1",
    propertyAddress: "Hoofdstraat 123, Amsterdam",
    tenant: "Tech Solutions BV",
    landlord: "Property Invest NV",
    area: "Amsterdam Centrum",
    type: "office",
    startDate: "2022-01-15",
    endDate: "2025-01-14",
    monthlyRent: 2500,
    indexationDate: "2025-01-15",
    lastIndexation: "2024-01-15",
    status: "active"
  },
  {
    id: "2",
    propertyAddress: "Winkelstraat 45, Rotterdam",
    tenant: "Fashion Store",
    landlord: "Retail Properties BV",
    area: "Rotterdam Zuid",
    type: "shop",
    startDate: "2023-03-01",
    endDate: "2025-12-28",
    monthlyRent: 3200,
    indexationDate: "2025-03-01",
    lastIndexation: "2024-03-01",
    status: "expiring"
  },
  {
    id: "3",
    propertyAddress: "Kerkstraat 78, Utrecht",
    tenant: "Consulting Group",
    landlord: "Office Real Estate NV",
    area: "Utrecht Centrum",
    type: "office",
    startDate: "2021-06-01",
    endDate: "2024-05-31",
    monthlyRent: 1800,
    indexationDate: "2024-06-01",
    lastIndexation: "2023-06-01",
    status: "expired"
  },
  {
    id: "4",
    propertyAddress: "Marktplein 12, Den Haag",
    tenant: "Coffee Corner",
    landlord: "City Properties BV",
    area: "Den Haag Centrum",
    type: "shop",
    startDate: "2023-09-01",
    endDate: "2025-12-20",
    monthlyRent: 2100,
    indexationDate: "2025-09-01",
    lastIndexation: "2024-09-01",
    status: "expiring"
  },
  {
    id: "5",
    propertyAddress: "Bedrijvenweg 234, Amsterdam",
    tenant: "Logistics Co",
    landlord: "Industrial Estates NV",
    area: "Amsterdam Noord",
    type: "office",
    startDate: "2022-11-01",
    endDate: "2027-10-31",
    monthlyRent: 4500,
    indexationDate: "2025-11-01",
    lastIndexation: "2024-11-01",
    status: "active"
  },
  {
    id: "6",
    propertyAddress: "Singel 89, Amsterdam",
    tenant: "Design Studio",
    landlord: "Heritage Properties BV",
    area: "Amsterdam Centrum",
    type: "office",
    startDate: "2023-02-15",
    endDate: "2026-02-14",
    monthlyRent: 2800,
    indexationDate: "2026-02-15",
    lastIndexation: "2024-02-15",
    status: "active"
  }
];

export const Contracts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [areaFilter, setAreaFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredContracts = mockContracts.filter(contract => {
    const matchesSearch = contract.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.tenant.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArea = areaFilter === "all" || contract.area === areaFilter;
    const matchesStatus = statusFilter === "all" || contract.status === statusFilter;
    
    return matchesSearch && matchesArea && matchesStatus;
  });

  const stats = {
    total: mockContracts.length,
    active: mockContracts.filter(c => c.status === "active").length,
    expiring: mockContracts.filter(c => c.status === "expiring").length,
    expired: mockContracts.filter(c => c.status === "expired").length,
  };

  const areas = Array.from(new Set(mockContracts.map(c => c.area)));

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Contracten Beheer</h1>
        <p className="text-muted-foreground">
          Beheer al je huurovereenkomsten, indexaties en verlopen contracten
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totaal Contracten</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Alle actieve en inactieve contracten</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actieve Contracten</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.active}</div>
            <p className="text-xs text-muted-foreground">Contracten in goede staat</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Binnenkort Verlopen</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stats.expiring}</div>
            <p className="text-xs text-muted-foreground">Verlopen binnen 3 maanden</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verlopen</CardTitle>
            <Clock className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.expired}</div>
            <p className="text-xs text-muted-foreground">Actie vereist</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Filter contracten op gebied, status en zoekterm</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Zoeken</label>
              <Input
                placeholder="Zoek op adres of huurder..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Gebied</label>
              <Select value={areaFilter} onValueChange={setAreaFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecteer gebied" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle gebieden</SelectItem>
                  {areas.map(area => (
                    <SelectItem key={area} value={area}>{area}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecteer status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle statussen</SelectItem>
                  <SelectItem value="active">Actief</SelectItem>
                  <SelectItem value="expiring">Binnenkort verlopen</SelectItem>
                  <SelectItem value="expired">Verlopen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contracts Grid */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Contracten Overzicht</h2>
        {filteredContracts.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <p className="text-muted-foreground">Geen contracten gevonden met de huidige filters.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredContracts.map(contract => (
              <ContractCard key={contract.id} contract={contract} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

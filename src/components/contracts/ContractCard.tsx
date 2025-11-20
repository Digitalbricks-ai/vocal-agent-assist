import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, TrendingUp, User, Building2 } from "lucide-react";
import { format, differenceInDays, parseISO } from "date-fns";
import { nl } from "date-fns/locale";

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

interface ContractCardProps {
  contract: Contract;
}

export const ContractCard = ({ contract }: ContractCardProps) => {
  const endDate = parseISO(contract.endDate);
  const daysUntilExpiry = differenceInDays(endDate, new Date());
  
  const statusConfig = {
    active: { label: "Actief", variant: "default" as const, className: "bg-success/10 text-success hover:bg-success/20" },
    expiring: { label: "Verloopt Binnenkort", variant: "secondary" as const, className: "bg-warning/10 text-warning hover:bg-warning/20" },
    expired: { label: "Verlopen", variant: "destructive" as const, className: "bg-destructive/10 text-destructive hover:bg-destructive/20" }
  };

  const typeLabels = {
    office: "Kantoor",
    shop: "Winkel",
    residential: "Woonruimte"
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-1">{contract.propertyAddress}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" />
              {contract.area}
            </CardDescription>
          </div>
          <Badge className={statusConfig[contract.status].className}>
            {statusConfig[contract.status].label}
          </Badge>
        </div>
        <Badge variant="outline" className="w-fit">
          <Building2 className="h-3 w-3 mr-1" />
          {typeLabels[contract.type]}
        </Badge>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Huurder:</span>
            <span className="text-muted-foreground">{contract.tenant}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Einddatum:</span>
            <span className="text-muted-foreground">
              {format(endDate, "dd MMM yyyy", { locale: nl })}
            </span>
          </div>

          {contract.status === "expiring" && daysUntilExpiry > 0 && (
            <div className="text-sm text-warning font-medium">
              Verloopt over {daysUntilExpiry} dagen
            </div>
          )}

          {contract.status === "expired" && (
            <div className="text-sm text-destructive font-medium">
              Verlopen sinds {Math.abs(daysUntilExpiry)} dagen
            </div>
          )}
          
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Huur:</span>
            <span className="text-muted-foreground">
              €{contract.monthlyRent.toLocaleString("nl-NL")}/mnd
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Indexatie:</span>
            <span className="text-muted-foreground">
              {format(parseISO(contract.indexationDate), "dd MMM yyyy", { locale: nl })}
            </span>
          </div>
        </div>

        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground">
            Laatste indexatie: {format(parseISO(contract.lastIndexation), "dd MMM yyyy", { locale: nl })}
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button variant="outline" className="flex-1" size="sm">
          Details
        </Button>
        <Button variant="default" className="flex-1" size="sm">
          Beheren
        </Button>
      </CardFooter>
    </Card>
  );
};

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface RentalAgreementFormData {
  property: string;
  tenancyType: "office" | "shop" | "";
  rentalPeriod: string;
  commencementDate: string;
  rentalDiscount: boolean;
  firstRentalPayment: string;
  renewalPeriod: string;
  noticePeriod: string;
  initialRent: string;
  vatOnRent: boolean;
  serviceCharges: boolean;
  serviceChargesAmount: string;
  paymentTerm: string;
  indexation: string;
  securityDeposit: string;
  additionalAgreements: string;
}

interface RentalAgreementFormProps {
  formData: RentalAgreementFormData;
  onFormDataChange: (data: RentalAgreementFormData) => void;
}

export const RentalAgreementForm = ({ formData, onFormDataChange }: RentalAgreementFormProps) => {
  const [data, setData] = useState<RentalAgreementFormData>({
    property: "",
    tenancyType: "",
    rentalPeriod: "",
    commencementDate: "",
    rentalDiscount: false,
    firstRentalPayment: "",
    renewalPeriod: "",
    noticePeriod: "12 maanden",
    initialRent: "",
    vatOnRent: false,
    serviceCharges: false,
    serviceChargesAmount: "",
    paymentTerm: "per maand",
    indexation: "1 jaar na huuringangsdatum",
    securityDeposit: "3 maanden betalingsverplichting",
    additionalAgreements: "",
    ...formData
  });

  const updateData = (field: keyof RentalAgreementFormData, value: any) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    onFormDataChange(newData);
  };

  return (
    <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
      {/* Property Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Eigendom Informatie</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="property">Eigendom *</Label>
            <Input
              id="property"
              value={data.property}
              onChange={(e) => updateData("property", e.target.value)}
              placeholder="Selecteer eigendom uit CRM"
            />
            <p className="text-xs text-muted-foreground">
              Robin haalt verhuurder/huurder/m² gegevens op uit CRM
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tenancyType">Type Huurovereenkomst *</Label>
            <Select value={data.tenancyType} onValueChange={(value: "office" | "shop") => updateData("tenancyType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecteer type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="office">Kantoor</SelectItem>
                <SelectItem value="shop">Winkel</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Rental Terms */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Huurvoorwaarden</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rentalPeriod">Huurperiode</Label>
              <Input
                id="rentalPeriod"
                value={data.rentalPeriod}
                onChange={(e) => updateData("rentalPeriod", e.target.value)}
                placeholder="bijv. 5 jaar"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="commencementDate">Huuringangsdatum</Label>
              <Input
                id="commencementDate"
                type="date"
                value={data.commencementDate}
                onChange={(e) => updateData("commencementDate", e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="rentalDiscount"
              checked={data.rentalDiscount}
              onCheckedChange={(checked) => updateData("rentalDiscount", checked)}
            />
            <Label htmlFor="rentalDiscount">Huurkorting van toepassing</Label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstRentalPayment">Eerste Huurbetaling</Label>
              <Input
                id="firstRentalPayment"
                value={data.firstRentalPayment}
                onChange={(e) => updateData("firstRentalPayment", e.target.value)}
                placeholder="€"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="renewalPeriod">Verlengingsperiode</Label>
              <Input
                id="renewalPeriod"
                value={data.renewalPeriod}
                onChange={(e) => updateData("renewalPeriod", e.target.value)}
                placeholder="bijv. 1 jaar"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="noticePeriod">Opzegtermijn</Label>
            <Input
              id="noticePeriod"
              value={data.noticePeriod}
              onChange={(e) => updateData("noticePeriod", e.target.value)}
              placeholder="Standaard 12 maanden"
            />
          </div>
        </CardContent>
      </Card>

      {/* Financial Terms */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Financiële Voorwaarden</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="initialRent">Aanvangshuur</Label>
            <Input
              id="initialRent"
              value={data.initialRent}
              onChange={(e) => updateData("initialRent", e.target.value)}
              placeholder="€"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="vatOnRent"
              checked={data.vatOnRent}
              onCheckedChange={(checked) => updateData("vatOnRent", checked)}
            />
            <Label htmlFor="vatOnRent">BTW op huur</Label>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="serviceCharges"
                checked={data.serviceCharges}
                onCheckedChange={(checked) => updateData("serviceCharges", checked)}
              />
              <Label htmlFor="serviceCharges">Servicekosten</Label>
            </div>
            {data.serviceCharges && (
              <Input
                value={data.serviceChargesAmount}
                onChange={(e) => updateData("serviceChargesAmount", e.target.value)}
                placeholder="€ ... per maand"
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paymentTerm">Betalingstermijn</Label>
              <Input
                id="paymentTerm"
                value={data.paymentTerm}
                onChange={(e) => updateData("paymentTerm", e.target.value)}
                placeholder="Standaard per maand"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="indexation">Indexatie</Label>
              <Input
                id="indexation"
                value={data.indexation}
                onChange={(e) => updateData("indexation", e.target.value)}
                placeholder="Standaard 1 jaar na huuringangsdatum"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="securityDeposit">Waarborgsom</Label>
            <Input
              id="securityDeposit"
              value={data.securityDeposit}
              onChange={(e) => updateData("securityDeposit", e.target.value)}
              placeholder="Standaard 3 maanden betalingsverplichting"
            />
          </div>
        </CardContent>
      </Card>

      {/* Additional Terms */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Aanvullende Afspraken</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="additionalAgreements">Vrij tekstveld voor aanvullende afspraken</Label>
            <Textarea
              id="additionalAgreements"
              value={data.additionalAgreements}
              onChange={(e) => updateData("additionalAgreements", e.target.value)}
              placeholder="Voeg hier eventuele aanvullende afspraken toe..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end pb-6">
        <Button className="w-full md:w-auto">
          Genereer Huurovereenkomst
        </Button>
      </div>
    </div>
  );
};
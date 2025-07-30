import { useState } from "react";
import { VisitReportCard } from "@/components/reports/VisitReportCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockReports = [
  {
    id: "1",
    propertyAddress: "123 Ocean View Drive, Unit 12A",
    clientName: "Sarah Johnson",
    visitDate: "Today, 2:30 PM",
    duration: "45 minutes",
    status: "completed" as const,
    summary: "Spacious 2-bedroom condo with stunning ocean views. Client interested in the modern kitchen and balcony space. Concerns about HOA fees discussed.",
    keyPoints: [
      "Client loves the ocean view and modern finishes",
      "Interested in negotiating HOA fees",
      "Wants to schedule second viewing with spouse",
      "Asked about parking availability",
      "Inquired about pet policy"
    ],
    audioLength: "12:45"
  },
  {
    id: "2",
    propertyAddress: "456 Downtown Plaza, Apartment 8B",
    clientName: "Mike Brown",
    visitDate: "Today, 11:15 AM",
    duration: "30 minutes",
    status: "follow-up" as const,
    summary: "Urban apartment with great city views. Client concerned about noise levels and commute to work. Interested but needs more information.",
    keyPoints: [
      "Noise concerns from street traffic",
      "Wants information about soundproofing",
      "Interested in lease terms flexibility",
      "Asked about gym facilities in building"
    ],
    audioLength: "8:22"
  },
  {
    id: "3",
    propertyAddress: "789 Suburban Lane, Single Family Home",
    clientName: "Jennifer & Tom Wilson",
    visitDate: "Yesterday, 4:45 PM",
    duration: "60 minutes",
    status: "pending" as const,
    summary: "Beautiful 4-bedroom family home with large backyard. Clients impressed with space but have questions about school district and renovations needed.",
    keyPoints: [
      "Love the spacious layout and backyard",
      "Concerns about kitchen renovation costs",
      "Asked about local schools ratings",
      "Interested in home inspection details",
      "Discussing timeline for purchase"
    ],
    audioLength: "15:33"
  }
];

export const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handlePlayAudio = (id: string) => {
    toast({
      title: "Playing Audio",
      description: `Playing recording for report ${id}`,
    });
  };

  const handleViewDetails = (id: string) => {
    toast({
      title: "View Details",
      description: `Opening detailed view for report ${id}`,
    });
  };

  const handleExportReports = () => {
    toast({
      title: "Export Started",
      description: "Reports are being exported to PDF",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Visit Reports</h1>
          <p className="text-muted-foreground">AI-generated reports from your property visit recordings</p>
        </div>
        <Button onClick={handleExportReports} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Reports
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search by property address or client name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="follow-up">Follow-up</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredReports.map((report) => (
          <VisitReportCard
            key={report.id}
            report={report}
            onPlayAudio={handlePlayAudio}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {filteredReports.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No reports found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};
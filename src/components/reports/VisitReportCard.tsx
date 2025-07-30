import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, User, FileText, Play } from "lucide-react";

interface VisitReport {
  id: string;
  propertyAddress: string;
  clientName: string;
  visitDate: string;
  duration: string;
  status: "pending" | "completed" | "follow-up";
  summary: string;
  keyPoints: string[];
  audioLength: string;
}

interface VisitReportCardProps {
  report: VisitReport;
  onPlayAudio: (id: string) => void;
  onViewDetails: (id: string) => void;
}

export const VisitReportCard = ({ report, onPlayAudio, onViewDetails }: VisitReportCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success text-success-foreground";
      case "follow-up":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="truncate">{report.propertyAddress}</span>
          </CardTitle>
          <Badge className={getStatusColor(report.status)}>
            {report.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="w-4 h-4" />
            <span>{report.clientName}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{report.visitDate}</span>
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-3">
          <p className="text-sm text-foreground">{report.summary}</p>
        </div>

        {report.keyPoints.length > 0 && (
          <div>
            <h4 className="font-medium text-sm mb-2">Key Points:</h4>
            <ul className="space-y-1">
              {report.keyPoints.slice(0, 3).map((point, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
              {report.keyPoints.length > 3 && (
                <li className="text-sm text-muted-foreground">
                  +{report.keyPoints.length - 3} more points...
                </li>
              )}
            </ul>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Play className="w-4 h-4" />
            <span>Audio: {report.audioLength}</span>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => onPlayAudio(report.id)}
              variant="outline"
              size="sm"
            >
              <Play className="w-4 h-4 mr-1" />
              Play
            </Button>
            <Button
              onClick={() => onViewDetails(report.id)}
              variant="outline"
              size="sm"
            >
              <FileText className="w-4 h-4 mr-1" />
              Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
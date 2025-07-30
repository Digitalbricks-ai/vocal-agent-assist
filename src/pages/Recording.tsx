import { VoiceRecorder } from "@/components/voice/VoiceRecorder";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileAudio, TrendingUp, Clock } from "lucide-react";

export const Recording = () => {
  const recordingStats = [
    {
      title: "Total Recordings",
      value: "156",
      icon: FileAudio,
      trend: "+12 this month"
    },
    {
      title: "Average Duration",
      value: "8:32",
      icon: Clock,
      trend: "2min longer than last month"
    },
    {
      title: "Reports Generated",
      value: "148",
      icon: TrendingUp,
      trend: "95% conversion rate"
    }
  ];

  const recentRecordings = [
    {
      id: "1",
      title: "Ocean View Condo - Unit 12A",
      duration: "12:45",
      date: "Today, 2:30 PM",
      status: "processed"
    },
    {
      id: "2", 
      title: "Downtown Apartment - 456 Elm St",
      duration: "8:22",
      date: "Today, 11:15 AM",
      status: "processing"
    },
    {
      id: "3",
      title: "Suburban House - 789 Oak Ave",
      duration: "15:33",
      date: "Yesterday, 4:45 PM",
      status: "processed"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Voice Recording</h1>
        <p className="text-muted-foreground">Record property visits and generate automated reports</p>
      </div>

      {/* Recording Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recordingStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="w-4 h-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.trend}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Voice Recorder Component */}
      <VoiceRecorder />

      {/* Recent Recordings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Recordings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentRecordings.map((recording) => (
              <div key={recording.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <FileAudio className="w-5 h-5 text-primary" />
                  <div>
                    <h4 className="font-medium">{recording.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {recording.duration} • {recording.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    recording.status === 'processed' 
                      ? 'bg-success/20 text-success' 
                      : 'bg-warning/20 text-warning'
                  }`}>
                    {recording.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
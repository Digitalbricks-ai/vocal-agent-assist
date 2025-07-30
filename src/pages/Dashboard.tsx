import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, FileText, CheckSquare, TrendingUp, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const stats = [
    {
      title: "Active Recordings",
      value: "12",
      icon: Mic,
      trend: "+2 today",
      color: "text-primary"
    },
    {
      title: "Visit Reports",
      value: "48",
      icon: FileText,
      trend: "+5 this week",
      color: "text-accent"
    },
    {
      title: "Pending Tasks",
      value: "23",
      icon: CheckSquare,
      trend: "8 due today",
      color: "text-warning"
    },
    {
      title: "Properties Visited",
      value: "156",
      icon: TrendingUp,
      trend: "+12 this month",
      color: "text-success"
    }
  ];

  const recentActivities = [
    {
      type: "recording",
      title: "New voice recording completed",
      description: "123 Main St property visit",
      time: "2 hours ago"
    },
    {
      type: "report",
      title: "Visit report generated",
      description: "Downtown condo showing with John Smith",
      time: "4 hours ago"
    },
    {
      type: "task",
      title: "Follow-up task created",
      description: "Schedule second viewing for Ocean View property",
      time: "6 hours ago"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your real estate activity overview.</p>
        </div>
        <div className="flex gap-3">
          <Button asChild>
            <Link to="/recording">
              <Mic className="w-4 h-4 mr-2" />
              Start Recording
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-all duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.trend}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{activity.title}</h4>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/recording">
                <Mic className="w-4 h-4 mr-2" />
                Start New Recording
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/reports">
                <FileText className="w-4 h-4 mr-2" />
                View All Reports
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/tasks">
                <CheckSquare className="w-4 h-4 mr-2" />
                Manage Tasks
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Today's Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/20">
              <div>
                <h4 className="font-medium">Property Showing - Ocean View Condo</h4>
                <p className="text-sm text-muted-foreground">Client: Sarah Johnson | 10:00 AM - 11:00 AM</p>
              </div>
              <Button size="sm" variant="outline">Details</Button>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div>
                <h4 className="font-medium">Follow-up Call - Downtown Apartment</h4>
                <p className="text-sm text-muted-foreground">Client: Mike Brown | 2:00 PM - 2:30 PM</p>
              </div>
              <Button size="sm" variant="outline">Details</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
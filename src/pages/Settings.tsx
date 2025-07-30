import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Settings as SettingsIcon, User, Mic, Bell, Shield, Download } from "lucide-react";

export const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account and application preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="John Smith" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john.smith@realestate.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="agency">Agency</Label>
              <Input id="agency" defaultValue="Premier Real Estate" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="license">License Number</Label>
              <Input id="license" defaultValue="RE12345678" />
            </div>
            <Button>Update Profile</Button>
          </CardContent>
        </Card>

        {/* Recording Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="w-5 h-5 text-primary" />
              Recording Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="quality">Audio Quality</Label>
              <Select defaultValue="high">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low (32 kbps)</SelectItem>
                  <SelectItem value="medium">Medium (64 kbps)</SelectItem>
                  <SelectItem value="high">High (128 kbps)</SelectItem>
                  <SelectItem value="lossless">Lossless (WAV)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-save">Auto-save recordings</Label>
              <Switch id="auto-save" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="noise-reduction">Noise reduction</Label>
              <Switch id="noise-reduction" defaultChecked />
            </div>
            <div className="space-y-2">
              <Label htmlFor="storage">Storage Location</Label>
              <Select defaultValue="cloud">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="local">Local Device</SelectItem>
                  <SelectItem value="cloud">Cloud Storage</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* AI & Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="w-5 h-5 text-primary" />
              AI Analysis Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-analysis">Auto-analyze recordings</Label>
              <Switch id="auto-analysis" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="task-extraction">Extract tasks automatically</Label>
              <Switch id="task-extraction" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="summary-generation">Generate visit summaries</Label>
              <Switch id="summary-generation" defaultChecked />
            </div>
            <div className="space-y-2">
              <Label htmlFor="analysis-depth">Analysis Depth</Label>
              <Select defaultValue="detailed">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="detailed">Detailed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="task-reminders">Task reminders</Label>
              <Switch id="task-reminders" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="recording-complete">Recording completion</Label>
              <Switch id="recording-complete" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Email notifications</Label>
              <Switch id="email-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="daily-summary">Daily summary reports</Label>
              <Switch id="daily-summary" defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security & Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Security & Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="two-factor">Two-factor authentication</Label>
                <Switch id="two-factor" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-logout">Auto-logout after inactivity</Label>
                <Switch id="auto-logout" defaultChecked />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="data-encryption">Encrypt stored recordings</Label>
                <Switch id="data-encryption" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="analytics">Share usage analytics</Label>
                <Switch id="analytics" />
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex gap-3">
            <Button variant="outline">Change Password</Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
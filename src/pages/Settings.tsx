import { useState } from "react";
import { Bell, Lock, Palette, LogOut } from "lucide-react";
import { PageHeader } from "@/components/shared";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="p-6 max-w-2xl space-y-6">
      <PageHeader title="Settings" description="Manage your account and preferences" />

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="notif">Enable notifications</Label>
            <Switch id="notif" checked={notifications} onCheckedChange={setNotifications} />
          </div>
          <Separator />
          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground">Notifications for:</p>
            <div className="ml-4 space-y-2">
              <div className="flex items-center"><input type="checkbox" defaultChecked /> Test results</div>
              <div className="flex items-center"><input type="checkbox" defaultChecked /> Performance alerts</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Appearance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="dark">Dark mode</Label>
            <Switch id="dark" checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full">Change password</Button>
          <Button variant="outline" className="w-full">Two-factor authentication</Button>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/20">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2">
            <LogOut className="w-5 h-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" className="w-full">Sign out</Button>
        </CardContent>
      </Card>
    </div>
  );
}
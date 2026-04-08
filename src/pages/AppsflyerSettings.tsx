import { useState } from "react";
import { Eye, EyeOff, RefreshCw } from "lucide-react";
import { PageHeader } from "@/components/shared";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function AppsflyerSettings() {
  const [tokenVisible, setTokenVisible] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [formData, setFormData] = useState({
    apiToken: "af_test_token_7890xyz",
    iosAppId: "12345678",
    androidAppId: "com.example.zenflow",
  });

  const [syncData] = useState({
    lastSync: "2026-04-08T14:23:45Z",
    syncStatus: "success",
    testsSync: 12,
  });

  const handleSync = async () => {
    setIsSyncing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSyncing(false);
  };

  const lastSyncDate = new Date(syncData.lastSync);
  const formattedDate = lastSyncDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = lastSyncDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="p-6 max-w-[1400px] space-y-6">
      <PageHeader
        title="AppsFlyer SSOT"
        description="Attribution data source configuration"
      />

      {/* Configuration Form */}
      <Card className="bg-card border border-border">
        <CardContent className="p-8">
          <h3 className="text-lg font-bold text-foreground mb-6">
            Connection Settings
          </h3>

          <div className="space-y-6">
            {/* API Token */}
            <div className="space-y-2">
              <Label htmlFor="apiToken" className="text-foreground">
                API Token
              </Label>
              <div className="relative">
                <Input
                  id="apiToken"
                  type={tokenVisible ? "text" : "password"}
                  value={formData.apiToken}
                  onChange={(e) =>
                    setFormData({ ...formData, apiToken: e.target.value })
                  }
                  className="bg-secondary border-border text-foreground pr-10"
                  placeholder="Enter your AppsFlyer API token"
                />
                <button
                  onClick={() => setTokenVisible(!tokenVisible)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {tokenVisible ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Your AppsFlyer API token is encrypted and secure
              </p>
            </div>

            {/* iOS App ID */}
            <div className="space-y-2">
              <Label htmlFor="iosAppId" className="text-foreground">
                iOS App ID
              </Label>
              <Input
                id="iosAppId"
                value={formData.iosAppId}
                onChange={(e) =>
                  setFormData({ ...formData, iosAppId: e.target.value })
                }
                className="bg-secondary border-border text-foreground"
                placeholder="e.g., 12345678"
              />
            </div>

            {/* Android App ID */}
            <div className="space-y-2">
              <Label htmlFor="androidAppId" className="text-foreground">
                Android App ID
              </Label>
              <Input
                id="androidAppId"
                value={formData.androidAppId}
                onChange={(e) =>
                  setFormData({ ...formData, androidAppId: e.target.value })
                }
                className="bg-secondary border-border text-foreground"
                placeholder="e.g., com.example.app"
              />
            </div>

            <Separator />

            {/* Sync Status */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Sync Status</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Sync</span>
                  <span className="text-sm font-medium">
                    {formattedDate} at {formattedTime}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge className="bg-green-500/10 text-green-400">Success</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Tests Synced
                  </span>
                  <span className="text-sm font-medium">{syncData.testsSync}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Actions */}
            <Button
              onClick={handleSync}
              disabled={isSyncing}
              className="w-full bg-primary hover:bg-primary/90"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              {isSyncing ? "Syncing..." : "Sync Now"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
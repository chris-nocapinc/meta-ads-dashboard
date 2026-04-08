import { MetricCard, PageHeader } from "@/components/shared";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Dashboard() {
  return (
    <div className="p-6 max-w-[1400px] space-y-6">
      <PageHeader
        title="Dashboard"
        description="Real-time Meta Ads performance and testing overview"
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Spend (14d)"
          value="$1.04M"
          delta={5.2}
          isDeltaPositive={false}
        />
        <MetricCard
          label="Installs"
          value="34,590"
          delta={-3.1}
          isDeltaPositive={false}
        />
        <MetricCard
          label="Cost Per Install"
          value="$30.06"
          delta={1.9}
          isDeltaPositive={false}
        />
        <MetricCard
          label="ROAS"
          value="0.12"
          delta={-14.3}
          isDeltaPositive={false}
        />
      </div>

      {/* Main Content */}
      <Tabs defaultValue="tests" className="w-full">
        <TabsList>
          <TabsTrigger value="tests">Active Tests</TabsTrigger>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="tests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Test Pipeline Status</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No active tests. View pipeline to start new tests.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No recent activity</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <p className="font-semibold text-yellow-400 text-sm">ROAS Declining</p>
                  <p className="text-xs text-muted-foreground mt-1">ROAS dropped 14.3% week-over-week</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
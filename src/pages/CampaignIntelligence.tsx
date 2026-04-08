import { useState } from "react";
import { TrendingUp, AlertCircle, BarChart3 } from "lucide-react";
import { PageHeader, MetricCard, CategoryBadge } from "@/components/shared";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CampaignIntelligence() {
  const campaigns = [
    {
      id: "camp_1",
      name: "Wellness Core - Lookalike",
      spend: 45230,
      installs: 1512,
      ecpi: 29.9,
      roas: 0.13,
    },
    {
      id: "camp_2",
      name: "Retargeting - Cart Abandoners",
      spend: 12580,
      installs: 420,
      ecpi: 29.95,
      roas: 0.18,
    },
  ];

  const insights = [
    {
      title: "High Performer Alert",
      description: "Retargeting campaign outperforming by 38% on ROAS",
      type: "positive",
    },
    {
      title: "Budget Opportunity",
      description: "Core campaign has room to scale - stable performance",
      type: "info",
    },
  ];

  return (
    <div className="p-6 max-w-[1400px] space-y-6">
      <PageHeader
        title="Campaign Intelligence"
        description="Cross-campaign performance analysis and recommendations"
      />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {campaigns.map((camp) => (
              <Card key={camp.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{camp.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <MetricCard label="ECPI" value={`$${camp.ecpi}`} />
                    <MetricCard label="ROAS" value={camp.roas.toFixed(2)} />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Spend: ${camp.spend.toLocaleString()}</p>
                    <p>Installs: {camp.installs}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          {insights.map((insight, idx) => (
            <Card key={idx}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">{insight.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
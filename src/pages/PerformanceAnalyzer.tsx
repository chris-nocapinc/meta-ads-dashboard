import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { PageHeader, MetricCard } from "@/components/shared";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PerformanceAnalyzer() {
  const data = [
    { date: "Apr 1", ecpi: 29.5, roas: 0.12, cpm: 18 },
    { date: "Apr 2", ecpi: 29.8, roas: 0.11, cpm: 18.2 },
    { date: "Apr 3", ecpi: 30.1, roas: 0.12, cpm: 18.5 },
    { date: "Apr 4", ecpi: 29.9, roas: 0.13, cpm: 18.3 },
    { date: "Apr 5", ecpi: 30.2, roas: 0.12, cpm: 18.6 },
    { date: "Apr 6", ecpi: 30.1, roas: 0.12, cpm: 18.4 },
  ];

  return (
    <div className="p-6 max-w-[1400px] space-y-6">
      <PageHeader
        title="Performance Analyzer"
        description="In-depth trend analysis and performance insights"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard label="Avg ECPI" value="$30.02" />
        <MetricCard label="Avg ROAS" value="0.12" />
        <MetricCard label="Avg CPM" value="$18.33" />
      </div>

      <Tabs defaultValue="trends" className="w-full">
        <TabsList>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>7-Day Performance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="ecpi" stroke="#3b82f6" />
                  <Line type="monotone" dataKey="roas" stroke="#10b981" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">Performance is stable with minor fluctuations.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
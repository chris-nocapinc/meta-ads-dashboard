import { PageHeader, MetricCard } from "@/components/shared";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TestComparison({ ids }: { ids: number[] }) {
  const testData = [
    { id: 1, name: "Control", spend: 5000, installs: 167, ecpi: 29.94 },
    { id: 2, name: "Test Variant", spend: 5000, installs: 172, ecpi: 29.07 },
  ];

  return (
    <div className="p-6 max-w-[1400px] space-y-6">
      <PageHeader title="Test Comparison" description="Compare performance metrics across variants" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {testData.map((test) => (
          <Card key={test.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {test.name}
                <Badge variant="outline">{test.id === 1 ? "Control" : "Variant"}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <MetricCard label="Spend" value={`$${test.spend}`} />
              <MetricCard label="Installs" value={test.installs.toString()} />
              <MetricCard label="eCPI" value={`$${test.ecpi}`} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
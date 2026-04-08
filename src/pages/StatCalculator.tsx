import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { PageHeader } from "@/components/shared";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function StatCalculator() {
  const [sampleSize, setSampleSize] = useState(1000);
  const [convRate, setConvRate] = useState(0.05);
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const stdError = Math.sqrt((convRate * (1 - convRate)) / sampleSize);
    const ci95 = 1.96 * stdError;
    setResults({
      standardError: (stdError * 100).toFixed(3),
      ci95Lower: ((convRate - ci95) * 100).toFixed(2),
      ci95Upper: ((convRate + ci95) * 100).toFixed(2),
    });
  };

  const reset = () => {
    setSampleSize(1000);
    setConvRate(0.05);
    setResults(null);
  };

  return (
    <div className="p-6 max-w-2xl space-y-6">
      <PageHeader
        title="Statistical Calculator"
        description="Calculate confidence intervals and sample sizes"
      />

      <Card>
        <CardContent className="p-8 space-y-6">
          <div className="space-y-3">
            <Label htmlFor="sampleSize">Sample Size</Label>
            <Input
              id="sampleSize"
              type="number"
              value={sampleSize}
              onChange={(e) => setSampleSize(Number(e.target.value))}
              className="bg-secondary text-foreground"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="convRate">Conversion Rate</Label>
            <Input
              id="convRate"
              type="number"
              step="0.001"
              value={convRate}
              onChange={(e) => setConvRate(Number(e.target.value))}
              className="bg-secondary text-foreground"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 bg-primary">Calculate</Button>
            <Button onClick={reset} variant="outline" size="icon">
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>

          {results && (
            <div className="p-4 bg-secondary rounded-lg space-y-2">
              <p className="text-sm"><span className="text-muted-foreground">Standard Error:</span> {results.standardError}%</p>
              <p className="text-sm"><span className="text-muted-foreground">95% CI:</span> {results.ci95Lower}% - {results.ci95Upper}%</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
import { useState } from "react";
import { PageHeader } from "@/components/shared";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TestCalendar() {
  const tests = [
    { date: "2026-04-15", title: "CBO vs ABO Launch", status: "scheduled" },
    { date: "2026-04-22", title: "Creative Refresh A/B Test", status: "scheduled" },
    { date: "2026-05-01", title: "Audience Expansion Test", status: "planned" },
  ];

  const statusColor = {
    scheduled: "bg-blue-500/10 text-blue-400",
    running: "bg-green-500/10 text-green-400",
    completed: "bg-gray-500/10 text-gray-400",
    planned: "bg-yellow-500/10 text-yellow-400",
  };

  return (
    <div className="p-6 max-w-4xl space-y-6">
      <PageHeader
        title="Test Calendar"
        description="Upcoming tests and scheduled experiments"
      />

      <div className="space-y-3">
        {tests.map((test, idx) => (
          <Card key={idx}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">{test.title}</p>
                  <p className="text-sm text-muted-foreground">{test.date}</p>
                </div>
                <Badge className={statusColor[test.status as keyof typeof statusColor]}>
                  {test.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
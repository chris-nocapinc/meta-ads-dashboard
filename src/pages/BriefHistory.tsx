import { useState } from "react";
import { Archive, Eye, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/shared";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function BriefHistory() {
  const briefs = [
    {
      id: 1,
      weekStart: "2026-04-01",
      weekEnd: "2026-04-07",
      status: "approved",
      createdAt: "2026-04-08T10:00:00Z",
    },
    {
      id: 2,
      weekStart: "2026-03-25",
      weekEnd: "2026-03-31",
      status: "approved",
      createdAt: "2026-04-01T14:30:00Z",
    },
    {
      id: 3,
      weekStart: "2026-03-18",
      weekEnd: "2026-03-24",
      status: "draft",
      createdAt: "2026-03-25T09:15:00Z",
    },
  ];

  return (
    <div className="p-6 max-w-4xl space-y-6">
      <PageHeader
        title="Brief History"
        description="All generated and archived briefs"
      />

      <div className="space-y-3">
        {briefs.map((brief) => (
          <Card key={brief.id} className="hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-foreground">
                    {brief.weekStart} to {brief.weekEnd}
                  </p>
                  <p className="text-sm text-muted-foreground">Created {brief.createdAt}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    className={brief.status === "approved" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}
                  >
                    {brief.status}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Archive className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
import { Trash2 } from "lucide-react";
import { PageHeader } from "@/components/shared";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function LearningLog() {
  const learnings = [
    {
      id: 1,
      title: "Broad Audience Outperforms Lookalike",
      category: "Audience",
      confidence: "high",
      impact: "ECPI improved 8% with broader targeting",
      createdAt: "2026-04-02",
    },
    {
      id: 2,
      title: "Video Creative Fatigue",
      category: "Creative",
      confidence: "medium",
      impact: "Refresh ads every 4 days to maintain performance",
      createdAt: "2026-03-28",
    },
  ];

  const confidenceColor = {
    high: "bg-green-500/10 text-green-400",
    medium: "bg-yellow-500/10 text-yellow-400",
    low: "bg-red-500/10 text-red-400",
  };

  return (
    <div className="p-6 max-w-4xl space-y-6">
      <PageHeader
        title="Learning Log"
        description="Document insights and hypotheses from tests"
      />

      <div className="space-y-3">
        {learnings.map((learning) => (
          <Card key={learning.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{learning.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{learning.impact}</p>
                  <div className="flex gap-2 mt-3">
                    <Badge variant="outline">{learning.category}</Badge>
                    <Badge className={confidenceColor[learning.confidence as keyof typeof confidenceColor]}>
                      {learning.confidence}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
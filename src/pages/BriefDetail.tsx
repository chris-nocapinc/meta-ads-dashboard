import { useState } from "react";
import { ArrowLeft, Copy, Download, MessageSquare } from "lucide-react";
import { PageHeader } from "@/components/shared";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function BriefDetail({ params }: { params: { id: string } }) {
  const briefId = parseInt(params.id);
  const [copied, setCopied] = useState(false);

  const brief = {
    id: briefId,
    weekStart: "2026-04-01",
    weekEnd: "2026-04-07",
    status: "approved",
    title: "Weekly Brief - Q2 Week 1",
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <PageHeader title={brief.title} description={`${brief.weekStart} to ${brief.weekEnd}`} />
      </div>

      <div className="flex gap-4">
        <Button variant="outline" size="sm">
          <Copy className="w-4 h-4 mr-2" />
          {copied ? "Copied!" : "Copy Content"}
        </Button>
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Export as PDF
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Brief Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">Sample brief content would be displayed here.</p>
          <Separator />
          <div className="flex items-center gap-2">
            <Badge className="bg-green-500/10 text-green-400">Approved</Badge>
            <span className="text-sm text-muted-foreground">Approved on 2026-04-08</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
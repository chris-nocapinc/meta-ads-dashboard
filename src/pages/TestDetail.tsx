import { useState } from "react";
import { ArrowLeft, Edit, Archive } from "lucide-react";
import { PageHeader } from "@/components/shared";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TestDetail({ params }: { params: { id: string } }) {
  const testId = parseInt(params.id);
  const [editing, setEditing] = useState(false);

  const test = {
    id: testId,
    title: "CBO vs ABO: Budget Allocation Strategy",
    status: "active",
    priority: "high",
    category: "Budget Structure",
    hypothesis: "Campaign Budget Optimization will deliver lower ECPI...",
    startDate: "2026-04-01",
    endDate: null,
  };

  return (
    <div className="p-6 max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <PageHeader title={test.title} />
        </div>
        <Button variant="outline" size="sm">
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Test Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <Badge className="mt-1 bg-blue-500/10 text-blue-400">{test.status}</Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Priority</p>
                  <Badge className="mt-1 bg-red-500/10 text-red-400">{test.priority}</Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Category</p>
                  <p className="text-sm font-medium mt-1">{test.category}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Start Date</p>
                  <p className="text-sm font-medium mt-1">{test.startDate}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Hypothesis</p>
                <p className="text-sm mt-1">{test.hypothesis}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">No results yet - test is still running</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">Analysis will appear here once test completes</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
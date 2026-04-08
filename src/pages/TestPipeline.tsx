import { Plus } from "lucide-react";
import { PageHeader } from "@/components/shared";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TestPipeline() {
  const tests = {
    backlog: [
      { id: 101, title: "CBO vs ABO", category: "Budget", priority: "high" },
      { id: 102, title: "Broad vs 1% LAL", category: "Audience", priority: "high" },
    ],
    active: [
      { id: 201, title: "Video vs Static", category: "Creative", priority: "medium" },
    ],
    results: [
      { id: 301, title: "Bid Cap Optimization", category: "Bidding", priority: "medium", winner: true },
    ],
  };

  const statusColors = {
    backlog: "bg-slate-500/10 text-slate-400",
    active: "bg-green-500/10 text-green-400",
    results: "bg-blue-500/10 text-blue-400",
  };

  return (
    <div className="p-6 max-w-[1400px] space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader title="Test Pipeline" description="View and manage all tests" />
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          New Test
        </Button>
      </div>

      <Tabs defaultValue="backlog">
        <TabsList>
          <TabsTrigger value="backlog">Backlog ({tests.backlog.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({tests.active.length})</TabsTrigger>
          <TabsTrigger value="results">Results ({tests.results.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="backlog" className="space-y-3">
          {tests.backlog.map((test) => (
            <Card key={test.id} className="hover:border-primary/50 transition-colors cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{test.title}</p>
                    <p className="text-sm text-muted-foreground">{test.category}</p>
                  </div>
                  <Badge className="bg-red-500/10 text-red-400">{test.priority}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="active" className="space-y-3">
          {tests.active.map((test) => (
            <Card key={test.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{test.title}</p>
                    <p className="text-sm text-muted-foreground">{test.category}</p>
                  </div>
                  <Badge className={statusColors.active}>Active</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="results" className="space-y-3">
          {tests.results.map((test: any) => (
            <Card key={test.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{test.title}</p>
                    <p className="text-sm text-muted-foreground">{test.category}</p>
                  </div>
                  {test.winner && <Badge className="bg-green-500/10 text-green-400">Winner</Badge>}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
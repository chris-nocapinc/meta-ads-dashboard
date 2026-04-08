import { useState } from "react";
import { Sparkles, Send } from "lucide-react";
import { PageHeader } from "@/components/shared";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function BriefGenerator() {
  const [generating, setGenerating] = useState(false);
  const [prompt, setPrompt] = useState("");

  const handleGenerate = async () => {
    setGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setGenerating(false);
  };

  return (
    <div className="p-6 max-w-2xl space-y-6">
      <PageHeader
        title="Generate Brief"
        description="Create a weekly brief powered by AI analysis"
      />

      <Card>
        <CardContent className="p-8 space-y-6">
          <div className="space-y-3">
            <Label htmlFor="prompt" className="text-foreground">Brief Description</Label>
            <Textarea
              id="prompt"
              placeholder="Describe what you'd like the brief to focus on..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="bg-secondary text-foreground min-h-[150px]"
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={generating || !prompt.trim()}
            className="w-full bg-primary hover:bg-primary/90"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {generating ? "Generating..." : "Generate Brief"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card border border-border">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-6">
              <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                404
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground mb-2">
                Page not found
              </h1>
              <p className="text-muted-foreground">
                Sorry, we couldn't find the page you're looking for.
              </p>
            </div>

            <Button asChild className="bg-blue-600 hover:bg-blue-700 w-full">
              <a href="/">Go back to home</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
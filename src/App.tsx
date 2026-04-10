import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import DashboardLayout from "@/components/DashboardLayout";
import Dashboard from "@/pages/Dashboard";
import TestPipeline from "@/pages/TestPipeline";
import TestDetail from "@/pages/TestDetail";
import BriefGenerator from "@/pages/BriefGenerator";
import BriefHistory from "@/pages/BriefHistory";
import BriefDetail from "@/pages/BriefDetail";
import LearningLog from "@/pages/LearningLog";
import PerformanceAnalyzer from "@/pages/PerformanceAnalyzer";
import StatCalculator from "@/pages/StatCalculator";
import Settings from "@/pages/Settings";
import AppsflyerSettings from "@/pages/AppsflyerSettings";
import CampaignIntelligence from "@/pages/CampaignIntelligence";
import Team from "@/pages/Team";
import JoinTeam from "@/pages/JoinTeam";
import TestComparison from "@/pages/TestComparison";
import TestCalendar from "@/pages/TestCalendar";
import TestIdeaGenerator from "@/pages/TestIdeaGenerator";
import ChannelPerformance from "@/pages/ChannelPerformance";

function AppRoutes() {
  return (
    <DashboardLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/channels" component={ChannelPerformance} />
        <Route path="/ideas" component={TestIdeaGenerator} />
        <Route path="/pipeline" component={TestPipeline} />
        <Route path="/tests/:id">
          {(params) => <TestDetail params={params} />}
        </Route>
        <Route path="/briefs" component={BriefGenerator} />
        <Route path="/briefs/history" component={BriefHistory} />
        <Route path="/briefs/:id">
          {(params) => <BriefDetail params={params} />}
        </Route>
        <Route path="/learnings" component={LearningLog} />
        <Route path="/analyzer" component={PerformanceAnalyzer} />
        <Route path="/stat-calc" component={StatCalculator} />
        <Route path="/settings" component={Settings} />
        <Route path="/settings/appsflyer" component={AppsflyerSettings} />
        <Route path="/campaigns" component={CampaignIntelligence} />
        <Route path="/team" component={Team} />
        <Route path="/join" component={JoinTeam} />
        <Route path="/calendar" component={TestCalendar} />
        <Route path="/compare">
          {() => {
            const ids = new URLSearchParams(window.location.search)
              .get("ids")
              ?.split(",")
              .map(Number)
              .filter(Boolean) ?? [];
            return <TestComparison ids={ids} />;
          }}
        </Route>
        <Route component={NotFound} />
      </Switch>
    </DashboardLayout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <AppRoutes />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

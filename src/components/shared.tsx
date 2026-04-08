import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, Dot } from "lucide-react";

// MetricCard: Display KPI with value, delta, and trend
interface MetricCardProps {
  label: string;
  value: string;
  delta?: number;
  deltaLabel?: string;
  isDeltaPositive?: boolean;
}

export function MetricCard({
  label,
  value,
  delta,
  deltaLabel = "vs prior",
  isDeltaPositive = true,
}: MetricCardProps) {
  const showDelta = delta !== undefined && delta !== null;

  return (
    <Card className="bg-card border border-border">
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground mb-2">{label}</p>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          {showDelta && (
            <div
              className={cn(
                "flex items-center gap-1 text-xs font-medium",
                isDeltaPositive ? "text-green-500" : "text-red-500"
              )}
            >
              {isDeltaPositive ? (
                <ArrowUp className="w-3 h-3" />
              ) : (
                <ArrowDown className="w-3 h-3" />
              )}
              <span>
                {Math.abs(delta).toFixed(1)}% {deltaLabel}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// PageHeader: Standard page header with title and description
interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}

// CategoryBadge: Badge for experiment category
interface CategoryBadgeProps {
  category: string;
  className?: string;
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  // Color mapping for categories
  const getVariant = (cat: string) => {
    const lower = cat.toLowerCase();
    if (lower.includes("creative")) return "bg-purple-500/10 text-purple-400";
    if (lower.includes("audience")) return "bg-blue-500/10 text-blue-400";
    if (lower.includes("bidding")) return "bg-amber-500/10 text-amber-400";
    if (lower.includes("targeting")) return "bg-cyan-500/10 text-cyan-400";
    if (lower.includes("landing")) return "bg-green-500/10 text-green-400";
    return "bg-slate-500/10 text-slate-400";
  };

  return (
    <Badge className={cn("rounded-md px-2 py-1 text-xs", getVariant(category))}>
      {category}
    </Badge>
  );
}

// StatusBadge: Badge for campaign/experiment status
interface StatusBadgeProps {
  status: "active" | "paused" | "archived";
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variants = {
    active: "bg-green-500/10 text-green-400",
    paused: "bg-yellow-500/10 text-yellow-400",
    archived: "bg-slate-500/10 text-slate-400",
  };

  return (
    <Badge className={cn("rounded-md px-2 py-1 text-xs", variants[status])}>
      <Dot className="w-2 h-2 inline mr-1" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

// OutcomeBadge: Badge for experiment outcome
interface OutcomeBadgeProps {
  outcome: "winner" | "loser" | "inconclusive";
  className?: string;
}

export function OutcomeBadge({ outcome, className }: OutcomeBadgeProps) {
  const variants = {
    winner: "bg-green-500/10 text-green-400",
    loser: "bg-red-500/10 text-red-400",
    inconclusive: "bg-slate-500/10 text-slate-400",
  };

  const labels = {
    winner: "Winner",
    loser: "Loser",
    inconclusive: "Inconclusive",
  };

  return (
    <Badge className={cn("rounded-md px-2 py-1 text-xs", variants[outcome])}>
      {labels[outcome]}
    </Badge>
  );
}

// TierBadge: Badge for tier classification (S, A, B, C)
interface TierBadgeProps {
  tier: "S" | "A" | "B" | "C";
  className?: string;
}

export function TierBadge({ tier, className }: TierBadgeProps) {
  const variants = {
    S: "bg-yellow-500/10 text-yellow-400",
    A: "bg-green-500/10 text-green-400",
    B: "bg-blue-500/10 text-blue-400",
    C: "bg-slate-500/10 text-slate-400",
  };

  return (
    <Badge className={cn("rounded-md px-2 py-1 text-xs font-bold uppercase", variants[tier])}>
      {tier}
    </Badge>
  );
}

// EmptyState: Display when no data is available
interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <p className="text-lg font-semibold">{title}</p>
      {description && (
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export default {
  MetricCard,
  PageHeader,
  CategoryBadge,
  StatusBadge,
  OutcomeBadge,
  TierBadge,
  EmptyState,
};

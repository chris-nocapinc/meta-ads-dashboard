import { Mail, Shield, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/shared";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Team() {
  const members = [
    {
      id: 1,
      name: "Chris",
      email: "chris@nocapinc.com",
      role: "admin",
      joinedAt: "2026-01-15",
    },
    {
      id: 2,
      name: "Sarah",
      email: "sarah@company.com",
      role: "analyst",
      joinedAt: "2026-02-20",
    },
    {
      id: 3,
      name: "Mike",
      email: "mike@company.com",
      role: "viewer",
      joinedAt: "2026-03-10",
    },
  ];

  const roleColor = {
    admin: "bg-red-500/10 text-red-400",
    analyst: "bg-blue-500/10 text-blue-400",
    viewer: "bg-gray-500/10 text-gray-400",
  };

  return (
    <div className="p-6 max-w-4xl space-y-6">
      <PageHeader
        title="Team Members"
        description="Manage team access and permissions"
      />

      <div className="space-y-3">
        {members.map((member) => (
          <Card key={member.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.email}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge className={roleColor[member.role as keyof typeof roleColor]}>
                      {member.role}
                    </Badge>
                    <span className="text-xs text-muted-foreground">Joined {member.joinedAt}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" title="Send email">
                    <Mail className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Change role">
                    <Shield className="w-4 h-4" />
                  </Button>
                  {member.id !== 1 && (
                    <Button variant="ghost" size="icon" title="Remove member">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
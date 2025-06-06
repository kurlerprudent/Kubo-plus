// src/components/recent-activities.tsx
import { Clock, Shield, UserCog, Activity, Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ActivityItem {
  id: number;
  type: "admin" | "system" | "security";
  description: string;
  timestamp: string;
}

interface RecentActivitiesProps {
  activities: ActivityItem[];
}

export function RecentActivities({ activities }: RecentActivitiesProps) {
  const getIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "admin":
        return <UserCog className="h-4 w-4 text-purple-600" />;
      case "system":
        return <Activity className="h-4 w-4 text-teal-600" />;
      case "security":
        return <Shield className="h-4 w-4 text-red-600" />;
      default:
        return <Database className="h-4 w-4 text-blue-600" />;
    }
  };

  const getBadge = (type: ActivityItem["type"]) => {
    const config = {
      admin: { label: "Admin", class: "bg-purple-100 text-purple-800" },
      system: { label: "System", class: "bg-teal-100 text-teal-800" },
      security: { label: "Security", class: "bg-red-100 text-red-800" },
    };
    return config[type] || { label: "Other", class: "bg-gray-100" };
  };

  return (
    <div className="space-y-4">
      {activities.map((activity) => {
        const badgeConfig = getBadge(activity.type);
        
        return (
          <div
            key={activity.id}
            className="flex items-start gap-4 p-4 rounded-lg border hover:bg-white transition-colors"
          >
            <div className="flex-shrink-0">
              <div className="p-2 rounded-full bg-gray-50">
                {getIcon(activity.type)}
              </div>
            </div>
            
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={badgeConfig.class}>
                  {badgeConfig.label}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {new Date(activity.timestamp).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm font-medium">{activity.description}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {new Date(activity.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
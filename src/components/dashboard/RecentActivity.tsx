
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ActivityItem {
  id: string;
  description: string;
  type: "admission" | "release" | "transfer" | "incident";
  timestamp: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

const RecentActivity = ({ activities }: RecentActivityProps) => {
  const getActivityTypeStyles = (type: ActivityItem["type"]) => {
    switch (type) {
      case "admission":
        return "bg-blue-100 text-blue-800";
      case "release":
        return "bg-green-100 text-green-800";
      case "transfer":
        return "bg-purple-100 text-purple-800";
      case "incident":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <div className={`px-2 py-1 rounded-md text-xs font-medium mr-3 ${getActivityTypeStyles(activity.type)}`}>
                {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
              </div>
              <div className="flex-1">
                <p className="text-sm">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;

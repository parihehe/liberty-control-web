
import { Users, Lock, AlertCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { ActivityItem, DashboardStats } from "@/types";

const Index = () => {
  // Mock data - in a real application, this would come from an API
  const stats: DashboardStats = {
    totalPrisoners: 245,
    totalCapacity: 300,
    occupancyRate: 81.7,
    releasingThisMonth: 12
  };

  const recentActivities: ActivityItem[] = [
    {
      id: "1",
      description: "New prisoner John Doe admitted to Block A",
      type: "admission",
      timestamp: "2 hours ago"
    },
    {
      id: "2",
      description: "Prisoner Mike Smith transferred to Block C",
      type: "transfer",
      timestamp: "5 hours ago"
    },
    {
      id: "3",
      description: "Prisoner David Johnson released on parole",
      type: "release",
      timestamp: "Yesterday"
    },
    {
      id: "4",
      description: "Incident reported in Block B, Cell 103",
      type: "incident",
      timestamp: "2 days ago"
    },
    {
      id: "5",
      description: "New prisoner James Wilson admitted to Block D",
      type: "admission",
      timestamp: "3 days ago"
    }
  ];

  return (
    <div className="page-container">
      <h1 className="page-title">Prison Management System</h1>
      <p className="text-muted-foreground mb-8">Welcome to the prison management dashboard</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard 
          title="Total Prisoners" 
          value={stats.totalPrisoners} 
          icon={Users}
          description="Currently incarcerated" 
        />
        <StatsCard 
          title="Facility Capacity" 
          value={stats.totalCapacity}
          icon={Lock}
          description="Maximum capacity" 
        />
        <StatsCard 
          title="Occupancy Rate" 
          value={`${stats.occupancyRate}%`}
          icon={AlertCircle}
          trend={{ value: 2.5, isPositive: true }}
        />
        <StatsCard 
          title="Releasing This Month" 
          value={stats.releasingThisMonth}
          icon={Clock}
        />
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentActivity activities={recentActivities} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;

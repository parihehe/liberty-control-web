
import { Users, Lock, AlertCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { DashboardStats } from "@/types";

const Index = () => {
  // Mock data - in a real application, this would come from an API
  const stats: DashboardStats = {
    totalPrisoners: 245,
    totalCapacity: 300,
    occupancyRate: 81.7,
    releasingThisMonth: 12
  };

  const recentActivities = [
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
  ] as const;

  return (
    <div className="page-container">
      <h1 className="page-title">Dashboard</h1>
      
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Prisoners by Block</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted/20 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>
        
        <div className="col-span-1">
          <RecentActivity activities={recentActivities} />
        </div>
      </div>
    </div>
  );
};

export default Index;


import { Users, Lock, AlertCircle, Clock } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import { DashboardStats } from "@/types";

const Index = () => {
  // Mock data - in a real application, this would come from an API
  const stats: DashboardStats = {
    totalPrisoners: 245,
    totalCapacity: 300,
    occupancyRate: 81.7,
    releasingThisMonth: 12
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Prison Management System</h1>
      <p className="text-muted-foreground mb-6">Welcome to the prison management system</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
        />
        <StatsCard 
          title="Releasing This Month" 
          value={stats.releasingThisMonth}
          icon={Clock}
        />
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg border shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Quick Navigation</h2>
        <p className="text-muted-foreground mb-4">
          Use the navigation menu above to manage prisoners, cells, and staff records.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors">
            <h3 className="font-medium flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Prisoners
            </h3>
            <p className="text-sm text-muted-foreground mt-1">Manage prisoner records and assignments</p>
          </div>
          <div className="p-4 border rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors">
            <h3 className="font-medium flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Cells
            </h3>
            <p className="text-sm text-muted-foreground mt-1">Manage cell blocks and assignments</p>
          </div>
          <div className="p-4 border rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors">
            <h3 className="font-medium flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Staff
            </h3>
            <p className="text-sm text-muted-foreground mt-1">Manage staff members and schedules</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

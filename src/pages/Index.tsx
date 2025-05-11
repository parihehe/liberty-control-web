
import { Users, Lock, ClipboardCheck, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="page-container max-w-5xl mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight">Prison Management System</h1>
        <p className="text-muted-foreground mt-2">A comprehensive solution for prison administration</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Prisoners Module */}
        <Link to="/prisoners" className="block group">
          <div className="border rounded-lg p-6 h-full bg-white hover:border-primary transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">Prisoner Management</h2>
            </div>
            <p className="text-muted-foreground">
              Register, update, and track prisoner records. View prisoner details, their 
              assigned cells, sentences, and release dates.
            </p>
          </div>
        </Link>
        
        {/* Cells Module */}
        <Link to="/cells" className="block group">
          <div className="border rounded-lg p-6 h-full bg-white hover:border-primary transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">Cell Management</h2>
            </div>
            <p className="text-muted-foreground">
              Monitor cell blocks and occupancy. Assign prisoners to cells and 
              track capacity across different security levels.
            </p>
          </div>
        </Link>
        
        {/* Staff Module */}
        <Link to="/staff" className="block group">
          <div className="border rounded-lg p-6 h-full bg-white hover:border-primary transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <UserCheck className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">Staff Management</h2>
            </div>
            <p className="text-muted-foreground">
              Maintain records of prison staff including guards, medical personnel, 
              and administrative staff. Manage shifts and departments.
            </p>
          </div>
        </Link>
        
        {/* Visitors Module - Placeholder for future implementation */}
        <div className="border rounded-lg p-6 h-full bg-white opacity-70">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-muted p-3 rounded-full">
              <ClipboardCheck className="h-6 w-6 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-muted-foreground">Visitor & Parole Records</h2>
          </div>
          <p className="text-muted-foreground">
            Coming soon: Track visitor logs and manage parole records for inmates.
          </p>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          Prison Management System • Admin Mode • Version 1.0
        </p>
      </div>
    </div>
  );
};

export default Index;

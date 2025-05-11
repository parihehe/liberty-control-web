
import { Link, useLocation } from "react-router-dom";
import { User, Home, Users, Lock, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/prisoners", label: "Prisoners", icon: Users },
    { path: "/cells", label: "Cells", icon: Lock },
    { path: "/staff", label: "Staff", icon: User },
  ];

  return (
    <nav className="bg-sidebar text-sidebar-foreground shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <div className="flex items-center p-4">
            <FileText className="h-6 w-6 mr-2 text-primary" />
            <span className="font-bold text-xl">PrisonMS</span>
          </div>
          
          <div className="flex">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const ItemIcon = item.icon;
              
              return (
                <Link 
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "px-4 py-3 flex items-center transition-colors duration-200",
                    isActive 
                      ? "border-b-2 border-primary text-white" 
                      : "hover:bg-sidebar-accent text-sidebar-foreground/80 hover:text-white"
                  )}
                >
                  <ItemIcon className="h-5 w-5 mr-2" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import { Home, Mic, FileText, CheckSquare, Settings, BarChart3, Search, UserPlus, ScrollText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navigationItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/recording", label: "Voice Recording", icon: Mic },
  { href: "/reports", label: "Visit Reports", icon: FileText },
  { href: "/comparisons", label: "Property Comparisons", icon: BarChart3 },
  { href: "/competitor-analysis", label: "Competitor Analysis", icon: Search },
  { href: "/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/documents", label: "Documenten", icon: ScrollText },
  { href: "/lead-generation", label: "Lead Generation", icon: UserPlus },
  { href: "/settings", label: "Settings", icon: Settings },
];

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-card border-r border-border h-screen w-64 fixed left-0 top-0 z-50">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <img
            src="/lovable-uploads/3f36d35d-d547-4e2d-89a9-aa62954b3801.png"
            alt="RobinRocks logo"
            className="h-8 w-auto"
            loading="eager"
            decoding="async"
          />
          <h1 className="font-bold text-xl text-foreground">RobinRocks</h1>
        </div>
        
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
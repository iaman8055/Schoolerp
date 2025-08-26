import { NavLink, useLocation } from "react-router-dom";
import { 
  Home, 
  Users, 
  UserCheck, 
  Calendar, 
  BookOpen, 
  CreditCard, 
  MessageSquare, 
  Library, 
  Bus, 
  Building, 
  BarChart3, 
  Settings,
  GraduationCap,
  ChevronLeft,
  Menu,
  BookOpenTextIcon,
  BookCheck,
  Box,
  UserRoundCheck,
  Smartphone,
  Bell,
  Monitor
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useState } from "react";
import logo from "../../../public/colored-logo.png"
const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Student Management', href: '/students', icon: Users },
  { name: 'Staff Management', href: '/staff', icon: UserCheck },
  { name: 'Classes', href: '/classes', icon:BookOpenTextIcon  },
  { name: 'Attendance', href: '/attendance', icon: Calendar },
  { name: 'Academic', href: '/academic', icon: BookOpen },
  { name: 'Fee Management', href: '/fees', icon: CreditCard },
  { name: 'Exams', href: '/exams', icon: BookCheck },
  { name: 'Notices', href: '/notices', icon: Bell },
  { name: 'Communication', href: '/communication', icon: MessageSquare },
  { name: 'Library', href: '/library', icon: Library },
  { name: 'HR & Payroll', href: '/hr-payroll', icon: UserRoundCheck },
  { name: 'Transport', href: '/transport', icon: Bus },
  { name: 'Inventory', href: '/inventory', icon:Box  },
  { name: 'Parent Portal', href: '/parent-portal', icon:Smartphone  },
  { name: 'Hostel', href: '/hostel', icon: Building },
  { name: 'E-Learning', href: '/elearning', icon: Monitor },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <div className={cn(
      "bg-gradient-primary text-primary-foreground transition-all duration-300 shadow-strong",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-primary-light/20">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <img src={logo} className="w-16"/>
            <h1 className="text-xl font-bold text-primary-foreground">CrudStudio</h1>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="text-primary-foreground hover:bg-primary-light/20 h-8 w-8"
        >
          {collapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                  isActive 
                    ? "bg-primary-foreground text-primary shadow-soft" 
                    : "text-primary-foreground/90 hover:bg-primary-light/20 hover:text-primary-foreground",
                  collapsed && "justify-center px-3"
                )}
              >
                <item.icon className={cn("h-5 w-5 flex-shrink-0")} />
                {!collapsed && (
                  <span className="animate-fade-in">{item.name}</span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </ScrollArea>

      {/* User Profile Section */}
      {!collapsed && (
        <div className="border-t border-primary-light/20 p-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <span className="text-xs font-semibold text-primary-foreground">AD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-primary-foreground truncate">Admin User</p>
              <p className="text-xs text-primary-foreground/70 truncate">admin@school.edu</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="staff" element={<div className="p-6 text-center text-muted-foreground">Staff Management - Coming Soon</div>} />
            <Route path="attendance" element={<div className="p-6 text-center text-muted-foreground">Attendance Management - Coming Soon</div>} />
            <Route path="academic" element={<div className="p-6 text-center text-muted-foreground">Academic Management - Coming Soon</div>} />
            <Route path="fees" element={<div className="p-6 text-center text-muted-foreground">Fee Management - Coming Soon</div>} />
            <Route path="communication" element={<div className="p-6 text-center text-muted-foreground">Communication - Coming Soon</div>} />
            <Route path="library" element={<div className="p-6 text-center text-muted-foreground">Library Management - Coming Soon</div>} />
            <Route path="transport" element={<div className="p-6 text-center text-muted-foreground">Transport Management - Coming Soon</div>} />
            <Route path="hostel" element={<div className="p-6 text-center text-muted-foreground">Hostel Management - Coming Soon</div>} />
            <Route path="reports" element={<div className="p-6 text-center text-muted-foreground">Reports & Analytics - Coming Soon</div>} />
            <Route path="settings" element={<div className="p-6 text-center text-muted-foreground">Settings - Coming Soon</div>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

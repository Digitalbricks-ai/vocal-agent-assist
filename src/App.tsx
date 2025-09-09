import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Recording } from "./pages/Recording";
import { Reports } from "./pages/Reports";
import { PropertyComparisons } from "./pages/PropertyComparisons";
import { CompetitorAnalysis } from "./pages/CompetitorAnalysis";
import { Tasks } from "./pages/Tasks";
import { Settings } from "./pages/Settings";
import { LeadGeneration } from "./pages/LeadGeneration";
import { Documents } from "./pages/Documents";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/recording" element={<Recording />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/comparisons" element={<PropertyComparisons />} />
            <Route path="/competitor-analysis" element={<CompetitorAnalysis />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/lead-generation" element={<LeadGeneration />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

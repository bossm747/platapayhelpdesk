import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { useSession } from '@supabase/auth-helpers-react';

// Dashboard & Analytics
import Index from "./pages/Index";
import Analytics from "./pages/Analytics";

// Ticket Management
import Tickets from "./pages/tickets/Index";
import TicketDetails from "./pages/tickets/[id]";
import NewTicket from "./pages/tickets/new";

// Knowledge Base
import KnowledgeBase from "./pages/knowledge-base/Index";
import Article from "./pages/knowledge-base/[id]";
import NewArticle from "./pages/knowledge-base/new";

// Customer Support
import Chat from "./pages/chat/Index";
import ChatRoom from "./pages/chat/[id]";

// Settings & Administration
import Settings from "./pages/settings/Index";
import Team from "./pages/settings/team";
import Automation from "./pages/settings/automation";
import Integration from "./pages/settings/integration";
import Profile from "./pages/settings/profile";

// Auth Components
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  
  if (!session) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        retry: 1,
      },
    },
  }));

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem themes={["light", "dark", "purple"]}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/knowledge-base" element={<KnowledgeBase />} />
              <Route path="/knowledge-base/:id" element={<Article />} />
              
              {/* Protected Routes */}
              <Route path="/analytics" element={
                <ProtectedRoute><Analytics /></ProtectedRoute>
              } />
              
              <Route path="/tickets" element={
                <ProtectedRoute><Tickets /></ProtectedRoute>
              } />
              <Route path="/tickets/new" element={
                <ProtectedRoute><NewTicket /></ProtectedRoute>
              } />
              <Route path="/tickets/:id" element={
                <ProtectedRoute><TicketDetails /></ProtectedRoute>
              } />
              
              <Route path="/knowledge-base/new" element={
                <ProtectedRoute><NewArticle /></ProtectedRoute>
              } />
              
              <Route path="/chat" element={
                <ProtectedRoute><Chat /></ProtectedRoute>
              } />
              <Route path="/chat/:id" element={
                <ProtectedRoute><ChatRoom /></ProtectedRoute>
              } />
              
              <Route path="/settings" element={
                <ProtectedRoute><Settings /></ProtectedRoute>
              } />
              <Route path="/settings/team" element={
                <ProtectedRoute><Team /></ProtectedRoute>
              } />
              <Route path="/settings/automation" element={
                <ProtectedRoute><Automation /></ProtectedRoute>
              } />
              <Route path="/settings/integration" element={
                <ProtectedRoute><Integration /></ProtectedRoute>
              } />
              <Route path="/settings/profile" element={
                <ProtectedRoute><Profile /></ProtectedRoute>
              } />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

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
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Dashboard & Analytics */}
            <Route path="/" element={<Index />} />
            <Route path="/analytics" element={<Analytics />} />
            
            {/* Ticket Management */}
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/tickets/new" element={<NewTicket />} />
            <Route path="/tickets/:id" element={<TicketDetails />} />
            
            {/* Knowledge Base */}
            <Route path="/knowledge-base" element={<KnowledgeBase />} />
            <Route path="/knowledge-base/new" element={<NewArticle />} />
            <Route path="/knowledge-base/:id" element={<Article />} />
            
            {/* Customer Support */}
            <Route path="/chat" element={<Chat />} />
            <Route path="/chat/:id" element={<ChatRoom />} />
            
            {/* Settings & Administration */}
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/team" element={<Team />} />
            <Route path="/settings/automation" element={<Automation />} />
            <Route path="/settings/integration" element={<Integration />} />
            <Route path="/settings/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
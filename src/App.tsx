import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PickTeam from "./pages/PickTeam";
import Fixtures from "./pages/Fixtures";
import Rules from "./pages/Rules";
import Transfers from "./pages/Transfers";
import Leagues from "./pages/Leagues";
import Statistics from "./pages/Statistics";
import PlayerProfile from "./pages/PlayerProfile";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Compare from "./pages/Compare";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Register />} />
            <Route path="/rules" element={<Rules />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/pick-team" element={
              <ProtectedRoute>
                <PickTeam />
              </ProtectedRoute>
            } />
            <Route path="/transfers" element={
              <ProtectedRoute>
                <Transfers />
              </ProtectedRoute>
            } />
            <Route path="/fixtures" element={
              <ProtectedRoute>
                <Fixtures />
              </ProtectedRoute>
            } />
            <Route path="/leagues" element={
              <ProtectedRoute>
                <Leagues />
              </ProtectedRoute>
            } />
            <Route path="/statistics" element={
              <ProtectedRoute>
                <Statistics />
              </ProtectedRoute>
            } />
            <Route path="/player/:id" element={
              <ProtectedRoute>
                <PlayerProfile />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="/compare" element={
              <ProtectedRoute>
                <Compare />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

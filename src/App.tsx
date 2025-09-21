import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import EventDetailsPage from "./pages/EventDetailsPage";

// Create a context to track if the loader has been shown
export const LoaderContext = createContext({
  hasSeenLoader: false,
  setHasSeenLoader: (value: boolean) => {}
});

const queryClient = new QueryClient();

const App = () => {
  // State to track if the user has seen the loader
  const [hasSeenLoader, setHasSeenLoader] = useState(() => {
    // Check if we've stored this in session storage
    const stored = sessionStorage.getItem('hasSeenLoader');
    return stored === 'true';
  });

  // Update session storage when the state changes
  useEffect(() => {
    sessionStorage.setItem('hasSeenLoader', hasSeenLoader.toString());
  }, [hasSeenLoader]);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LoaderContext.Provider value={{ hasSeenLoader, setHasSeenLoader }}>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/event/:eventId" element={<EventDetailsPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LoaderContext.Provider>
    </TooltipProvider>
  </QueryClientProvider>
  );
}

export default App;

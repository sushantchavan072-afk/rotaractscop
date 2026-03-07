import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "./components/Navbar";
import DarkModeNotification from "./components/DarkModeNotification";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Members from "./pages/Members";
import Avenue from "./pages/Avenue";
import Info from "./pages/Info";
import Join from "./pages/Join";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/events" element={<PageTransition><Events /></PageTransition>} />
        <Route path="/members" element={<PageTransition><Members /></PageTransition>} />
        <Route path="/avenue" element={<PageTransition><Avenue /></PageTransition>} />
        <Route path="/info" element={<PageTransition><Info /></PageTransition>} />
        <Route path="/join" element={<PageTransition><Join /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="rotaract-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <AnimatedRoutes />
            </main>
            <Footer />
            <DarkModeNotification />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

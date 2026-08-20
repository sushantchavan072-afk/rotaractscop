import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { useEffect } from "react";
import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import InteractiveDotGrid from "./components/InteractiveDotGrid";
import ClickSpark from "./components/ClickSpark";
import { SiteCursor } from "./components/ui/cursor";
import RouteSeo from "./components/RouteSeo";
import Analytics from "./components/Analytics";

// Lazy load pages for performance optimization
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Events = lazy(() => import("./pages/Events"));
const Members = lazy(() => import("./pages/Members"));
const Avenue = lazy(() => import("./pages/Avenue"));
const Info = lazy(() => import("./pages/Info"));
const Contact = lazy(() => import("./pages/Contact"));
const Join = lazy(() => import("./pages/Join"));
const Sponsorship = lazy(() => import("./pages/Sponsorship"));
const BODApplication = lazy(() => import("./pages/BODApplication"));
const NotFound = lazy(() => import("./pages/NotFound"));

import { ThemeProvider } from "./components/theme-provider";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center min-h-[50vh]">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      }>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/events" element={<PageTransition><Events /></PageTransition>} />
          <Route path="/members" element={<PageTransition><Members /></PageTransition>} />
          <Route path="/avenue" element={<PageTransition><Avenue /></PageTransition>} />
          <Route path="/info" element={<PageTransition><Info /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/join" element={<PageTransition><Join /></PageTransition>} />
          <Route path="/sponsorship" element={<PageTransition><Sponsorship /></PageTransition>} />
          <Route path="/bod-application" element={<PageTransition><BODApplication /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

const App = () => {
  useEffect(() => {
    // Remove the preload class after initial render to re-enable transitions safely
    const timer = setTimeout(() => {
      document.body.classList.remove('preload');
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider defaultTheme="system" storageKey="rotaract-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <RouteSeo />
            <Analytics />
            <ClickSpark sparkColor="theme" sparkSize={8} sparkRadius={18} sparkCount={8} duration={420}>
              <div 
                className="site-shell relative isolate flex min-h-screen flex-col bg-background text-foreground"
              style={{
                backgroundImage: 'radial-gradient(at 0% 0%, hsla(339,78%,48%,0.12) 0px, transparent 50%), radial-gradient(at 100% 100%, hsla(38,100%,74%,0.15) 0px, transparent 50%)'
              }}
            >
              <InteractiveDotGrid />
              <Navbar />
              <main className="relative z-10 flex-1 pt-24 pb-12 sm:pt-28">
                <AnimatedRoutes />
              </main>
                <div className="relative z-10"><Footer /></div>
              </div>
            </ClickSpark>
            <SiteCursor />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;

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

// Lazy load pages for performance optimization
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Events = lazy(() => import("./pages/Events"));
const Members = lazy(() => import("./pages/Members"));
const Avenue = lazy(() => import("./pages/Avenue"));
const Info = lazy(() => import("./pages/Info"));
const Join = lazy(() => import("./pages/Join"));
const BODApplication = lazy(() => import("./pages/BODApplication"));
const Login = lazy(() => import("./pages/Login"));
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
          <Route path="/join" element={<PageTransition><Join /></PageTransition>} />
          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
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
            <div 
              className="flex flex-col min-h-screen bg-background text-foreground"
              style={{
                backgroundImage: 'radial-gradient(at 0% 0%, hsla(339,78%,48%,0.12) 0px, transparent 50%), radial-gradient(at 100% 100%, hsla(38,100%,74%,0.15) 0px, transparent 50%)',
                backgroundAttachment: 'fixed'
              }}
            >
              <Navbar />
              <main className="flex-1 pt-24 sm:pt-28 pb-12">
                <AnimatedRoutes />
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;

import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Home, Info, Calendar, Users, Briefcase, UserPlus, Moon, Sun, LogIn } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import logo from "@/assets/logo.png";

const navLinks = [
  { path: "/", label: "Home", icon: Home },
  { path: "/about", label: "About", icon: Info },
  { path: "/events", label: "Events", icon: Calendar },
  { path: "/members", label: "Members", icon: Users },
  { path: "/avenue", label: "Avenue", icon: Briefcase },
  { path: "/info", label: "Info", icon: Info },
  { path: "/join", label: "Join Us", icon: UserPlus },
];

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.div
      className="fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none p-4 sm:p-6"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative w-full max-w-7xl mx-auto flex justify-center pointer-events-auto">
        <nav
          className={`transition-all duration-500 flex items-center w-full lg:w-auto ${
            scrolled 
              ? "glass-pill px-3 py-2 shadow-xl" 
              : "bg-background/40 backdrop-blur-xl px-2 py-2 rounded-full border border-border/40 shadow-sm"
          }`}
        >
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {[...navLinks, { path: "/login", label: "Login", icon: LogIn }].map((link, i) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-5 py-2.5 text-[15px] transition-colors duration-300 rounded-full ${
                  i === navLinks.length ? "font-bold text-primary ml-2 bg-primary/10 hover:bg-primary/20" : "font-medium"
                } ${
                  isActive(link.path) && i !== navLinks.length
                    ? "text-primary"
                    : i !== navLinks.length ? "text-foreground/70 hover:text-foreground" : ""
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                {isActive(link.path) && i !== navLinks.length && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-foreground/5 dark:bg-white/10 rounded-full shadow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            
            {/* Theme Toggle Desktop */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="ml-2 w-10 h-10 rounded-full bg-foreground/5 hover:bg-foreground/10 relative overflow-hidden transition-colors"
              aria-label="Toggle theme"
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === "dark" ? 0 : 90, scale: theme === "dark" ? 1 : 0.5, opacity: theme === "dark" ? 1 : 0 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 25 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Sun className="w-5 h-5" />
              </motion.div>
              <motion.div
                initial={false}
                animate={{ rotate: theme === "dark" ? -90 : 0, scale: theme === "dark" ? 0.5 : 1, opacity: theme === "dark" ? 0 : 1 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 25 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Moon className="w-5 h-5" />
              </motion.div>
            </button>
          </div>

          {/* Mobile: center logo (small) + Hamburger */}
          <div className="lg:hidden flex items-center justify-between w-full px-2 min-w-[200px]">
            <Link to="/">
              <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
            </Link>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-10 h-10 rounded-full bg-foreground/5 relative overflow-hidden hover:bg-foreground/10 transition-colors z-50"
                aria-label="Toggle theme"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: theme === "dark" ? 0 : 90, scale: theme === "dark" ? 1 : 0.5, opacity: theme === "dark" ? 1 : 0 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 25 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Sun className="w-5 h-5" />
                </motion.div>
                <motion.div
                  initial={false}
                  animate={{ rotate: theme === "dark" ? -90 : 0, scale: theme === "dark" ? 0.5 : 1, opacity: theme === "dark" ? 0 : 1 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 25 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Moon className="w-5 h-5" />
                </motion.div>
              </button>
              
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center hover:bg-foreground/10 transition-colors z-50 relative"
                aria-label="Toggle menu"
              >
                <Menu className="w-5 h-5 text-foreground/80" />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Dropdown Menu (Rendered outside the nav to prevent overflow:hidden clipping when scrolled) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scaleY: 0.8, scaleX: 0.9, y: -20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="lg:hidden absolute top-[calc(100%+16px)] left-0 right-0 w-full bg-card rounded-[2rem] p-3 shadow-2xl flex flex-col gap-1 border border-border origin-top z-40"
            >
              {[...navLinks, { path: "/login", label: "Login", icon: LogIn }].map((link) => {
                const active = isActive(link.path);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`relative flex items-center px-5 py-3.5 rounded-full text-[15px] font-bold transition-all overflow-hidden group ${
                      active ? "text-primary-foreground" : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
                    } ${link.path === "/login" && !active ? "text-primary mt-2 bg-primary/5" : ""}`}
                  >
                    <span className="relative z-10 flex items-center gap-4">
                      <Icon className={`w-[18px] h-[18px] transition-colors ${active ? "text-primary-foreground" : "text-primary/60 group-hover:text-primary"}`} />
                      {link.label}
                    </span>
                    
                    {/* Animated Spring Pill Background */}
                    {active && (
                      <motion.div
                        layoutId="mobile-nav-pill-floating"
                        className="absolute inset-0 bg-primary shadow-md shadow-primary/20"
                        initial={false}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      />
                    )}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Navbar;

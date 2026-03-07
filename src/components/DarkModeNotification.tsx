import { useState, useEffect } from "react";
import { Moon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/theme-provider";

const DarkModeNotification = () => {
  const [visible, setVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const dismissed = sessionStorage.getItem("dark-mode-hint-dismissed");
    const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (!dismissed && !isDark) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [theme]);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem("dark-mode-hint-dismissed", "true");
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-5 right-5 z-50 max-w-xs"
        >
          <div className="bg-card border border-border/80 rounded-xl shadow-lg px-4 py-3 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
              <Moon className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground leading-snug">
                Best viewed in Dark Mode
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Toggle dark mode from the theme switcher for the best experience.
              </p>
            </div>
            <button
              onClick={dismiss}
              className="text-muted-foreground hover:text-foreground transition-colors shrink-0 mt-0.5"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DarkModeNotification;

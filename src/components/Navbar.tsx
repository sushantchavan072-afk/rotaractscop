import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Menu, Home, Info, Calendar, Users, Briefcase, UserPlus, Moon, Sun, SlidersHorizontal, Handshake, Mail, RotateCcw, X, ChevronDown, Check } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { EVENTS_DATA } from "@/data/events";
import logo from "@/assets/logo.png";

const navLinks = [
  { path: "/", label: "Home", icon: Home },
  { path: "/about", label: "About", icon: Info },
  { path: "/events", label: "Events", icon: Calendar },
  { path: "/members", label: "Members", icon: Users },
  { path: "/avenue", label: "Avenue", icon: Briefcase },
  { path: "/info", label: "Info", icon: Info },
  { path: "/contact", label: "Contact", icon: Mail },
  { path: "/join", label: "Join Us", icon: UserPlus },
  { path: "/sponsorship", label: "Sponsorship", icon: Handshake },
];

const monthOptions = ["July", "August", "September", "October", "November", "December", "January", "February", "March", "April", "May", "June"];
const getYear = (date: string) => date.match(/\d{4}/)?.[0] ?? "";
const memberFilterOptions = [
  { key: "all", label: "All members" },
  { key: "core", label: "Core members" },
  { key: "bod", label: "Board of Directors" },
  { key: "general", label: "General Body" },
];

const Navbar = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMemberFilterOpen, setIsMemberFilterOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const isEventsPage = location.pathname === "/events";
  const isMembersPage = location.pathname === "/members";
  const memberFilter = searchParams.get("memberFilter") ?? "all";

  const eventFilters = useMemo(() => ({
    date: searchParams.get("eventDate") ?? "all",
    month: searchParams.get("eventMonth") ?? "all",
    year: searchParams.get("eventYear") ?? "all",
    avenue: searchParams.get("eventAvenue") ?? "all",
  }), [searchParams]);

  const filterOptions = useMemo(() => ({
    dates: Array.from({ length: 31 }, (_, index) => String(index + 1)),
    years: Array.from(new Set(EVENTS_DATA.map((event) => getYear(event.date)).filter(Boolean))).sort(),
    avenues: Array.from(new Set(EVENTS_DATA.flatMap((event) => event.avenue.split(/[,&x]+/).map((avenue) => avenue.trim()).filter((avenue) => avenue && avenue !== "NA")))).sort(),
  }), []);

  const activeFilterCount = Object.values(eventFilters).filter((value) => value !== "all").length;

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsFilterOpen(false);
    setIsMemberFilterOpen(false);
    const eventKeys = ["eventDate", "eventMonth", "eventYear", "eventAvenue"];
    const shouldClearEvents = !isEventsPage && eventKeys.some((key) => searchParams.has(key));
    const shouldClearMembers = !isMembersPage && searchParams.has("memberFilter");
    if (shouldClearEvents || shouldClearMembers) {
      const next = new URLSearchParams(searchParams);
      eventKeys.forEach((key) => next.delete(key));
      next.delete("memberFilter");
      setSearchParams(next, { replace: true });
    }
  }, [isEventsPage, isMembersPage, searchParams, setSearchParams]);

  const isActive = (path: string) => location.pathname === path;
  const updateFilter = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value === "all") next.delete(key);
    else next.set(key, value);
    setSearchParams(next, { replace: true });
  };

  const clearFilters = () => {
    const next = new URLSearchParams(searchParams);
    ["eventDate", "eventMonth", "eventYear", "eventAvenue"].forEach((key) => next.delete(key));
    setSearchParams(next, { replace: true });
  };

  const updateMemberFilter = (value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value === "all") next.delete("memberFilter");
    else next.set("memberFilter", value);
    setSearchParams(next, { replace: true });
  };

  const themeToggle = (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-foreground/5 transition-colors hover:bg-foreground/10" aria-label="Toggle theme">
      <motion.div initial={false} animate={{ rotate: theme === "dark" ? 0 : 90, scale: theme === "dark" ? 1 : 0.5, opacity: theme === "dark" ? 1 : 0 }} transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 25 }} className="absolute inset-0 flex items-center justify-center"><Sun className="h-5 w-5" /></motion.div>
      <motion.div initial={false} animate={{ rotate: theme === "dark" ? -90 : 0, scale: theme === "dark" ? 0.5 : 1, opacity: theme === "dark" ? 0 : 1 }} transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 25 }} className="absolute inset-0 flex items-center justify-center"><Moon className="h-5 w-5" /></motion.div>
    </button>
  );

  const filterMenu = (
    <AnimatePresence>
      {isFilterOpen && isEventsPage && (
        <motion.div initial={{ opacity: 0, y: -10, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.98 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }} id="event-filter-menu" className="fixed left-3 right-3 top-[4.5rem] z-[60] max-h-[calc(100dvh-6rem)] w-auto overflow-y-auto origin-top-right rounded-[1.75rem] sm:absolute sm:left-auto sm:right-0 sm:top-[calc(100%+20px)] sm:max-h-none sm:w-[min(23rem,calc(100vw-1rem))] sm:overflow-visible border border-border/80 bg-background/95 p-5 shadow-2xl shadow-primary/10 backdrop-blur-2xl ring-1 ring-background/30 dark:bg-card/95 will-change-transform sm:p-6">
          <div className="mb-5 flex items-start justify-between gap-5 border-b border-border/60 pb-5"><div><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Refine events</p><p className="mt-2 max-w-[15rem] text-xs leading-5 text-muted-foreground">Choose a date, month, year, or avenue to narrow the calendar.</p></div><button type="button" onClick={() => setIsFilterOpen(false)} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary" aria-label="Close event filters"><X className="h-4 w-4" /></button></div>
          <div className="grid gap-3 sm:grid-cols-2">
            <FilterSelect label="Date" value={eventFilters.date} onChange={(value) => updateFilter("eventDate", value)} options={filterOptions.dates} />
            <FilterSelect label="Month" value={eventFilters.month} onChange={(value) => updateFilter("eventMonth", value)} options={monthOptions} />
            <FilterSelect label="Year" value={eventFilters.year} onChange={(value) => updateFilter("eventYear", value)} options={filterOptions.years} />
            <FilterSelect label="Avenue" value={eventFilters.avenue} onChange={(value) => updateFilter("eventAvenue", value)} options={filterOptions.avenues} />
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4"><span className="text-xs text-muted-foreground">{activeFilterCount ? `${activeFilterCount} filter${activeFilterCount === 1 ? "" : "s"} active` : "Showing all events"}</span><button type="button" onClick={clearFilters} className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-primary"><RotateCcw className="h-3.5 w-3.5" />Reset</button></div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const filterControl = isEventsPage ? (
    <div className="relative">
      <button type="button" onClick={() => setIsFilterOpen((open) => !open)} className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 ${isFilterOpen || activeFilterCount > 0 ? "border-primary/30 bg-primary/10 text-primary" : "border-border/60 bg-background/60 text-foreground/75 hover:border-primary/30 hover:text-primary"}`} aria-label="Open event filters" aria-expanded={isFilterOpen} aria-controls="event-filter-menu">
        <SlidersHorizontal className="h-4 w-4" />
        {activeFilterCount > 0 && <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground shadow-sm">{activeFilterCount}</span>}
      </button>
      {filterMenu}
    </div>
  ) : null;

  const memberFilterMenu = (
    <AnimatePresence>
      {isMemberFilterOpen && isMembersPage && <motion.div initial={{ opacity: 0, y: -10, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.98 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }} id="member-filter-menu" className="fixed left-3 right-3 top-[4.5rem] z-[60] max-h-[calc(100dvh-6rem)] w-auto overflow-y-auto origin-top-right rounded-[1.75rem] sm:absolute sm:left-auto sm:right-0 sm:top-[calc(100%+20px)] sm:max-h-none sm:w-[min(20rem,calc(100vw-1rem))] sm:overflow-visible border border-border/80 bg-background/95 p-5 shadow-2xl shadow-primary/10 backdrop-blur-2xl ring-1 ring-background/30 dark:bg-card/95 sm:p-6">
        <div className="mb-4 border-b border-border/60 pb-4"><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Browse members</p><p className="mt-2 text-xs leading-5 text-muted-foreground">Choose a member group to explore.</p></div>
        <div className="space-y-1.5">{memberFilterOptions.map((option) => { const isSelected = memberFilter === option.key; return <button key={option.key} type="button" onClick={() => { updateMemberFilter(option.key); setIsMemberFilterOpen(false); }} className={`flex w-full items-center justify-between rounded-2xl px-3.5 py-3 text-left text-sm font-medium transition-colors ${isSelected ? "bg-primary/10 text-primary" : "text-foreground/75 hover:bg-muted hover:text-foreground"}`}><span>{option.label}</span>{isSelected && <Check className="h-4 w-4" />}</button>; })}</div>
      </motion.div>}
    </AnimatePresence>
  );

  const memberFilterControl = isMembersPage ? (
    <div className="relative">
      <button type="button" onClick={() => setIsMemberFilterOpen((open) => !open)} className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 ${isMemberFilterOpen || memberFilter !== "all" ? "border-primary/30 bg-primary/10 text-primary" : "border-border/60 bg-background/60 text-foreground/75 hover:border-primary/30 hover:text-primary"}`} aria-label="Open member filters" aria-expanded={isMemberFilterOpen} aria-controls="member-filter-menu"><Users className="h-4 w-4" />{memberFilter !== "all" && <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground shadow-sm">1</span>}</button>
      {memberFilterMenu}
    </div>
  ) : null;

  return (
    <motion.div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center p-3 sm:p-6" initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
      <div className="relative mx-auto flex w-full max-w-7xl justify-center pointer-events-auto">
        <nav className={`hidden w-full items-center transition-all duration-500 lg:flex lg:w-auto ${scrolled ? "rounded-full border border-white/20 bg-background/30 px-3 py-2 shadow-xl backdrop-blur-md" : "rounded-full border border-border/40 bg-background/30 px-2 py-2 shadow-sm backdrop-blur-sm"}`}>
          <div className="flex items-center gap-1">
            {navLinks.map((link) => <Link key={link.path} to={link.path} onClick={() => { setIsFilterOpen(false); setIsMemberFilterOpen(false); }} className={`relative rounded-full px-4 py-2.5 text-[14px] font-medium transition-colors duration-300 ${isActive(link.path) ? "text-primary" : "text-foreground/70 hover:text-foreground"}`}><span className="relative z-10 whitespace-nowrap">{link.label}</span>{isActive(link.path) && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-foreground/5 shadow-sm dark:bg-white/10" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}</Link>)}
            {filterControl}{memberFilterControl}
            <div className="ml-1 flex items-center justify-center">{themeToggle}</div>
          </div>

        </nav>

        <div className="flex w-full min-w-0 items-center justify-between rounded-full border border-border/40 bg-background/30 px-2 py-2 shadow-sm backdrop-blur-xl lg:hidden">
          <Link to="/" aria-label="Go to home" className="flex h-10 w-10 shrink-0 items-center justify-center leading-none"><img src={logo} alt="Rotaract Club Logo" className="h-8 w-8 object-contain" /></Link>
          <div className="ml-auto flex shrink-0 items-center justify-center gap-1 sm:gap-2">{filterControl}{memberFilterControl}<div className="flex items-center justify-center">{themeToggle}</div><button onClick={() => setIsOpen(!isOpen)} className="relative flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5 transition-colors hover:bg-foreground/10" aria-label="Toggle menu"><Menu className="h-5 w-5 text-foreground/80" /></button></div>
        </div>

        <AnimatePresence>{isOpen && <motion.div initial={{ opacity: 0, scale: 0.95, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scaleY: 0.8, scaleX: 0.9, y: -20 }} transition={{ type: "spring", stiffness: 350, damping: 25 }} className="absolute left-0 right-0 top-[calc(100%+16px)] z-40 flex w-full origin-top flex-col gap-1 rounded-[2rem] border border-border bg-card p-3 shadow-2xl lg:hidden">{navLinks.map((link) => { const active = isActive(link.path); const Icon = link.icon; return <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className={`relative flex items-center overflow-hidden rounded-full px-5 py-3.5 text-[15px] font-bold transition-all ${active ? "text-primary-foreground" : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"}`}><span className="relative z-10 flex items-center gap-4"><Icon className={`h-[18px] w-[18px] ${active ? "text-primary-foreground" : "text-primary/60"}`} />{link.label}</span>{active && <motion.div layoutId="mobile-nav-pill-floating" className="absolute inset-0 rounded-full bg-primary shadow-md shadow-primary/20" initial={false} transition={{ type: "spring", stiffness: 350, damping: 25 }} />}</Link>; })}</motion.div>}</AnimatePresence>
      </div>
    </motion.div>
  );
};

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedLabel = value === "all" ? `All ${label}s` : value;

  return (
    <div className="relative">
      <button type="button" onClick={() => setIsOpen((open) => !open)} className={`flex min-h-[4.1rem] w-full items-center justify-between gap-3 rounded-2xl border px-3.5 py-2.5 text-left transition-all duration-200 ${isOpen ? "border-primary/45 bg-primary/[0.04] ring-2 ring-primary/10" : "border-border/70 bg-background/60 hover:border-primary/30 hover:bg-background"}`} aria-expanded={isOpen}>
        <span className="min-w-0"><span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{label}</span><span className={`mt-1 block truncate text-sm font-semibold ${value === "all" ? "text-foreground/65" : "text-foreground"}`}>{selectedLabel}</span></span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && <motion.div initial={{ opacity: 0, y: -6, scale: 0.97 }} animate={{ opacity: 1, y: 4, scale: 1 }} exit={{ opacity: 0, y: -4, scale: 0.98 }} transition={{ duration: 0.16 }} className="absolute left-0 right-0 top-full z-[70] max-h-56 overflow-y-auto rounded-2xl border border-border/70 bg-card p-1.5 shadow-xl shadow-primary/5">
          {["all", ...options].map((option) => { const isSelected = value === option; const optionLabel = option === "all" ? `All ${label}s` : option; return <button key={option} type="button" onClick={() => { onChange(option); setIsOpen(false); }} className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs font-medium transition-colors ${isSelected ? "bg-primary/10 text-primary" : "text-foreground/75 hover:bg-muted hover:text-foreground"}`}><span>{optionLabel}</span>{isSelected && <Check className="h-3.5 w-3.5" />}</button>; })}
        </motion.div>}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;

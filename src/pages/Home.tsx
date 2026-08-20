import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarWidget } from "@/components/ui/calendar";
import { ArrowRight, Users, Award, Heart, Globe, Calendar, ArrowUpRight, MapPin, Clock, Leaf, CheckCircle2, ChevronDown } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EVENTS_DATA } from "@/data/events";
import { format } from "date-fns";
import { motion, AnimatePresence, Variants } from "framer-motion";
import logo from "@/assets/logo.png";
import { Testimonials } from "@/components/ui/unique-testimonial";

const springTransition = { type: "spring" as const, stiffness: 350, damping: 30 };
const stagger: Variants = { visible: { transition: { staggerChildren: 0.1 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: springTransition },
};

const clubInfo = [
  { label: "Club ID", value: "8826281", icon: Award, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Charter Date", value: "12 Mar 2024", icon: Calendar, color: "text-rose-500", bg: "bg-rose-500/10" },
  { label: "RI District", value: "3131", icon: Globe, color: "text-indigo-500", bg: "bg-indigo-500/10" },
  { label: "Sponsor", value: "RC Pune Nanded City", icon: Users, color: "text-amber-500", bg: "bg-amber-500/10" },
];

const achievementGroups = [
  {
    label: "Hosted district events",
    entries: ["S.T.A.R. 2.0", "District Fellowship Meet"],
  },
  {
    label: "District council recognition",
    entries: ["Rtr. Sushant Chavan"],
  },
  {
    label: "District awards",
    featured: true,
    entries: [
      "District Sports Indoor Meet",
      "Outstanding Leader (Institute Club) — Rtr. Pragama Magotra",
      "Outstanding Secretary (Institute Club) — Rtr. Prerna Bhilare",
      "Outstanding Treasurer (Institute Club) — Rtr. Arya Londhe",
      "Outstanding PAO (Institute Club) — Rtr. Arya Chavan",
      "Outstanding Interact–Rotaract Relations Officer (Institute Club) — Rtr. Aditi Gandhi",
      "Outstanding DEI Representative (Institute Club) — Rtr. Jagruti Dave",
      "Outstanding Editor (Institute Club) — Rtr. Sushant Chavan",
    ],
  },
  {
    label: "DRR citation",
    entries: ["Silver Category — 125 points"],
  },
  {
    label: "District nominations",
    featured: true,
    entries: [
      "Outstanding Sergeant-at-Arms — Rtr. Urvashi Chaudhari",
      "Outstanding Vice President (Institute Club) — Rtr. Pradnya Gaikar",
      "Outstanding Club Advisor (Institute Club) — Rtr. Srushti Lahamge",
      "Outstanding PDD (Institute Club) — Rtr. Vedanti Khardikar",
      "Outstanding CMD (Institute Club) — Rtr. Mrunal Potharkar",
      "Outstanding ISD (Institute Club) — Rtr. Amruta Potdukhe",
      "Outstanding RRRO (Institute Club) — Rtr. Aditi Gandhi",
      "Outstanding Sports Director (Institute Club) — Rtr. Bhumi Sharma",
      "Outstanding Public Relations (Institute Club) — Rtr. Sushant Chavan & Rtr. Chaitanya Jadhav",
      "Outstanding WRWC (Institute Club) — Rtr. Palak Kumari",
      "Outstanding PID — Rtr. Anushka Chaudhari",
      "Outstanding Institute Club — RaC SCOP",
      "Best DZR Visit — Zone 7",
      "Best Installation — RaC SCOP",
    ],
  },
];

const BentoGrid = React.memo(() => (
  <motion.div
    className="lg:col-span-7 grid grid-cols-2 gap-4"
    variants={stagger}
    initial="hidden"
    animate="visible"
  >
    <motion.div variants={item} className="group relative col-span-2 flex min-h-[12rem] items-center p-6 sm:col-span-1 sm:p-8">
      <Link to="/avenue" className="absolute inset-0 z-10" aria-label="Explore our avenues" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-2 top-5 bottom-5 hidden w-px bg-border/70 sm:block" />
      <div className="relative z-0">
        <div className="flex items-end gap-3">
          <span className="text-7xl font-black leading-none tracking-[-0.08em] text-foreground sm:text-8xl">04</span>
          <span className="mb-2 text-xl font-bold text-primary transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl">Avenues</span>
        </div>
        <div className="mt-5 flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
          <span className="whitespace-nowrap">Explore the avenues behind our impact</span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
        </div>
        <motion.div className="mt-3 h-px w-16 origin-left bg-primary/70 transition-all duration-500 group-hover:w-32" />
      </div>
    </motion.div>
    <motion.div variants={item} className="group relative col-span-2 flex min-h-[12rem] items-center p-6 sm:col-span-1 sm:p-8">
      <Link to="/members" className="absolute inset-0 z-10" aria-label="Meet our members" />
      <div className="relative z-0">
        <div className="flex items-end gap-3">
          <span className="text-7xl font-black leading-none tracking-[-0.08em] text-foreground sm:text-8xl">26</span>
          <span className="mb-2 text-xl font-bold text-primary transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl">Members</span>
        </div>
        <div className="mt-5 flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
          <span>Meet the people behind the purpose</span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
        </div>
        <motion.div className="mt-3 h-px w-16 origin-left bg-primary/70 transition-all duration-500 group-hover:w-32" />
      </div>
    </motion.div>
    <motion.div variants={item} className="col-span-2 glass-panel bg-white/60 p-6 dark:bg-white/5"><div className="mb-4 flex items-center justify-between"><h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Club Information</h3><Link to="/about" className="flex items-center text-xs font-bold text-primary hover:underline">Learn More <ArrowRight className="ml-1 h-3 w-3" /></Link></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{clubInfo.map((info) => <motion.div key={info.label} whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.95 }} className="group flex cursor-pointer flex-col items-start justify-center rounded-2xl border border-black/5 bg-white p-3 pl-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-white/5 dark:bg-card"><div className={`mb-2 flex h-8 w-8 items-center justify-center rounded-full ${info.bg} transition-all duration-300 group-hover:scale-125 group-hover:shadow-sm`}><info.icon className={`h-4 w-4 ${info.color} transition-transform duration-300 group-hover:rotate-12`} /></div><span className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-primary">{info.label}</span><span className="text-[11px] font-extrabold leading-tight text-foreground">{info.value}</span></motion.div>)}</div></motion.div>
  </motion.div>
));

const Home = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedEvents, setSelectedEvents] = useState<typeof EVENTS_DATA>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [openAchievement, setOpenAchievement] = useState<number | null>(null);
  const [showAllAchievements, setShowAllAchievements] = useState(false);
  const recentEvents = useMemo(() => EVENTS_DATA.slice(-4).reverse(), []);

  useEffect(() => {
    let midnightTimer: number | undefined;

    const refreshToday = () => {
      const now = new Date();
      setDate(now);
      const nextMidnight = new Date(now);
      nextMidnight.setHours(24, 0, 0, 0);
      midnightTimer = window.setTimeout(refreshToday, Math.max(1000, nextMidnight.getTime() - now.getTime() + 250));
    };

    const now = new Date();
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 0, 0);
    midnightTimer = window.setTimeout(refreshToday, Math.max(1000, nextMidnight.getTime() - now.getTime() + 250));

    return () => {
      if (midnightTimer !== undefined) window.clearTimeout(midnightTimer);
    };
  }, []);

  const eventDates = useMemo(() => {
    return EVENTS_DATA.flatMap(event => {
      const dates: Date[] = [];
      const eventDateStr = event.date;
      if (eventDateStr.includes("-")) {
        try {
          const parts = eventDateStr.replace(",", "").split(" ");
          if(parts.length >= 3) {
            const monthStr = parts[0];
            const daysStr = parts[1];
            const yearStr = parts[2];
            const [startDay, endDay] = daysStr.split("-").map(Number);
            for (let d = startDay; d <= endDay; d++) {
              dates.push(new Date(`${monthStr} ${d}, ${yearStr}`));
            }
          }
        } catch (e) {
          // ignore
        }
      } else {
        dates.push(new Date(eventDateStr));
      }
      return dates;
    });
  }, []);

  const handleDateSelect = useCallback((selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (!selectedDate) return;

    const eventsOnDate = EVENTS_DATA.filter(event => {
      const eventDateStr = event.date;
      
      // Handle ranges like "November 19-26, 2025"
      if (eventDateStr.includes("-")) {
         try {
           const parts = eventDateStr.replace(",", "").split(" ");
           if(parts.length >= 3) {
             const monthStr = parts[0];
             const daysStr = parts[1];
             const yearStr = parts[2];
             const [startDay, endDay] = daysStr.split("-").map(Number);
             const startDate = new Date(`${monthStr} ${startDay}, ${yearStr}`);
             const endDate = new Date(`${monthStr} ${endDay}, ${yearStr}`);
             
             const clickTime = new Date(selectedDate);
             clickTime.setHours(0,0,0,0);
             return clickTime >= startDate && clickTime <= endDate;
           }
         } catch (e) {
           return false;
         }
      }
      
      return format(selectedDate, "MMMM d, yyyy") === eventDateStr || format(selectedDate, "MMMM dd, yyyy") === eventDateStr;
    });

    if (eventsOnDate.length > 0) {
      setSelectedEvents(eventsOnDate);
      setIsDialogOpen(true);
    }
  }, []);

  const handleUpcomingEventClick = useCallback((event: typeof EVENTS_DATA[0]) => {
    setSelectedEvents([event]);
    const firstDate = new Date(event.date.replace(/-\d+/, ""));
    if (!Number.isNaN(firstDate.getTime())) setDate(firstDate);
    setIsDialogOpen(true);
  }, []);

  return (
    <div className="w-full">
      {/* ── Minimal Interactive Hero ──────────────── */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-10 sm:pt-8 sm:pb-20 overflow-hidden">
        
        {/* Subtle Background Glows instead of heavy image */}
        
        

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography Hook */}
          <motion.div 
            className="lg:col-span-5 space-y-8"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              variants={item}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] tracking-tight"
            >
              Rotaract<br/>
              <span 
                className="relative inline-block overflow-hidden align-bottom max-w-full py-2 -my-2"
                style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
              >
                <span className="invisible whitespace-nowrap" aria-hidden="true">Club of SCOP</span>
                <span className="absolute top-2 flex items-center whitespace-nowrap animate-marquee text-primary pr-4">
                  Club of Sinhgad College Of Pharmacy
                </span>
              </span>
            </motion.h1>

            <motion.p variants={item} className="text-base sm:text-lg text-muted-foreground font-medium leading-relaxed max-w-lg">
              An elite circle of young leaders shaping impact, influence, and global connections in RID 3131.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4">
              <Link to="/join">
                <Button className="rounded-full h-12 px-8 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all">
                  Join The Movement <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="rounded-full h-12 px-8 bg-card border-transparent dark:border-white/10 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all">
                  Who We Are
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive Bento Grid */}
          <div className="relative lg:col-span-7">
            <BentoGrid />
          </div>

        </div>
      </section>

      {/* ── GO GREEN Initiative ──────────────── */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 sm:py-16">
        <div className="overflow-hidden rounded-[2rem] border border-emerald-500/20 bg-emerald-50/80 dark:bg-emerald-950/25">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            <div className="relative flex min-h-[17rem] flex-col justify-between overflow-hidden bg-emerald-600 p-7 text-white sm:p-10">
              <Leaf className="h-10 w-10 text-emerald-100" />
              <div className="relative z-10 mt-12"><p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-100">GO GREEN</p><h2 className="mt-3 text-4xl font-black tracking-tight">Small actions.<br />Greener tomorrow.</h2></div>
              <div className="absolute -bottom-20 -right-8 h-56 w-56 rounded-full border-[20px] border-white/10" aria-hidden="true" />
            </div>
            <div className="p-7 sm:p-10">
              <p className="max-w-2xl text-base leading-7 text-muted-foreground">At <strong className="text-foreground">Rotaract Club of Sinhgad College of Pharmacy</strong>, we believe sustainability is not a one-day activity—it is a responsibility woven into the way we work, celebrate, and serve.</p>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">As part of the <strong className="text-foreground">GO GREEN Initiative by Rotaract District 3131</strong>, we are making our club activities more environmentally conscious through practical, everyday changes.</p>
              <p className="mt-7 max-w-2xl text-sm leading-7 text-foreground/80">
                Our commitment includes environmental-focused projects, digital documentation instead of unnecessary printing, reusable and sustainable event materials, less single-use plastic and bottled water, plant-watering ceremonies, e-certificates wherever possible, and reusable metal badges for events.
              </p>
              <div className="mt-7 flex flex-col gap-4 border-t border-emerald-500/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-md text-sm font-semibold leading-6 text-emerald-800 dark:text-emerald-200">Our goal is to make sustainability a habit in every project, event, and interaction.</p>
                <Link to="/join"><Button className="shrink-0 rounded-full bg-emerald-600 px-5 hover:bg-emerald-700">Think green with us <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Calendar & event list ──────────────── */}
      <section className="mx-auto mb-16 w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Stay connected</p><h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">What’s happening next</h2></div>
          <Link to="/events" className="text-sm font-semibold text-primary hover:underline">View all events <ArrowRight className="ml-1 inline h-4 w-4" /></Link>
        </div>
        <div className="grid gap-6 rounded-[2rem] border border-border/60 bg-card/60 p-4 shadow-sm sm:p-6 lg:grid-cols-[minmax(20rem,0.85fr)_1.15fr] lg:p-8">
          <div className="min-w-0 rounded-3xl border border-border/60 bg-background/80 p-2 sm:p-5">
            <CalendarWidget
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              modifiers={{ hasEvent: eventDates }}
              modifiersClassNames={{ hasEvent: "text-primary font-extrabold underline decoration-2 underline-offset-4" }}
              className="mx-auto w-full max-w-full overflow-hidden bg-transparent"
              classNames={{
                months: "w-full",
                month: "w-full space-y-4",
                caption: "flex w-full items-center justify-between border-b border-border/60 pb-4",
                caption_label: "text-base font-bold tracking-tight text-foreground sm:text-xl",
                nav: "flex gap-2",
                nav_button: "flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
                nav_button_previous: "relative",
                nav_button_next: "relative",
                table: "w-full border-collapse",
                head_row: "mb-1 flex w-full justify-between sm:mb-2",
                head_cell: "w-8 text-center text-[10px] font-semibold text-muted-foreground sm:w-10 sm:text-xs",
                row: "mt-1 flex w-full justify-between sm:mt-2",
                cell: "p-0 text-center",
                day: "flex h-8 w-8 items-center justify-center rounded-lg text-xs text-foreground transition-colors hover:bg-primary/10 sm:h-10 sm:w-10 sm:text-sm",
                day_selected: "bg-primary font-bold text-primary-foreground hover:bg-primary/90",
                day_today: "font-bold text-primary",
                day_outside: "text-muted-foreground/30",
                day_disabled: "text-muted-foreground/30",
              }}
            />
            <p className="mx-auto mt-4 max-w-[16rem] px-2 text-center text-[11px] leading-5 text-muted-foreground sm:max-w-none sm:px-0 sm:text-xs">Select a highlighted date to view its events.</p>
          </div>
          <div className="min-w-0 p-2 sm:p-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-4"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Latest additions</p><h3 className="mt-1 text-xl font-bold">Upcoming on the club calendar</h3></div><Calendar className="h-5 w-5 text-primary" /></div>
            <div className="mt-3 divide-y divide-border/60">
              {recentEvents.map((event) => <button key={event.title} type="button" onClick={() => handleUpcomingEventClick(event)} className="group flex w-full items-center gap-4 py-4 text-left transition-colors sm:gap-5"><div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-muted sm:h-16 sm:w-16"><img src={event.image} alt={event.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-foreground sm:text-base">{event.title}</p><p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground"><Calendar className="h-3.5 w-3.5 text-primary" />{event.date}</p><p className="mt-1 flex items-center gap-1.5 truncate text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />{event.location}</p></div><ArrowUpRight className="hidden h-4 w-4 shrink-0 text-muted-foreground sm:block" /></button>)}
            </div>
          </div>
        </div>
      </section>

      {/* ── Achievements ──────────────── */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">District Awards Night · Au Revoir</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Achievements</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">Celebrating the people, projects, and collective effort behind an unforgettable RIY 2025–26.</p>
          </div>
          <span className="text-sm font-semibold text-muted-foreground">RIY 2025–26</span>
        </motion.div>
        <div className="grid gap-x-12 sm:grid-cols-2">
          {achievementGroups.map((group, index) => {
            const isOpen = openAchievement === index;
            return (
              <motion.div key={group.label} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: index * 0.06, duration: 0.4 }} onMouseEnter={() => setOpenAchievement(index)} onMouseLeave={() => setOpenAchievement((current) => current === index ? null : current)} className="border-t border-border/70">
                <button type="button" aria-expanded={isOpen} onClick={() => setOpenAchievement(isOpen ? null : index)} className="flex w-full items-center justify-between gap-5 py-5 text-left transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4">
                  <span><span className="block text-sm font-semibold text-foreground">{group.label}</span><span className="mt-1 block text-xs text-muted-foreground">Rotaract District 3131</span></span>
                  <span className="flex shrink-0 items-center gap-3"><span className="text-xs font-medium text-muted-foreground">{group.entries.length.toString().padStart(2, "0")}</span><ChevronDown className={`h-4 w-4 text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} /></span>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden"><div className={`space-y-3 pb-5 pr-2 ${group.label === "District nominations" ? "sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-3 sm:space-y-0" : ""}`}>{group.entries.map((entry) => <div key={entry} className="flex items-start gap-3 text-sm leading-6 text-muted-foreground"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" /><span>{entry}</span></div>)}</div></div>
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="mt-8 flex justify-center">
          <button type="button" onClick={() => setShowAllAchievements((open) => !open)} className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/35 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4">
            {showAllAchievements ? "Hide all recognitions" : "View all recognitions"}
            <ChevronDown className={`h-4 w-4 text-primary transition-transform duration-300 ${showAllAchievements ? "rotate-180" : ""}`} />
          </button>
        </div>
        <AnimatePresence initial={false}>
          {showAllAchievements && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35, ease: "easeOut" }} className="overflow-hidden">
              <div className="mt-6 grid gap-5 rounded-3xl border border-border/60 bg-card/40 p-6 sm:grid-cols-2 sm:p-8">
                {achievementGroups.map((group) => (
                  <div key={`archive-${group.label}`}>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{group.label}</p>
                    <div className="mt-3 space-y-2.5">{group.entries.map((entry) => <p key={`archive-${entry}`} className="flex items-start gap-3 text-sm leading-6 text-muted-foreground"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" /><span>{entry}</span></p>)}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <p className="mt-7 w-full text-sm leading-7 text-muted-foreground sm:whitespace-nowrap">These recognitions reflect the teamwork, dedication, service, and unwavering spirit of every member, mentor, district leader, alumnus, and supporter who contributed to the journey.</p>
      </section>

      {/* ── Testimonials ──────────────── */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <Testimonials />
      </section>

      {/* Events Popup Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold tracking-tight">
              Events on {date ? format(date, "MMMM d, yyyy") : ""}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4 overflow-hidden">
            <AnimatePresence>
              {selectedEvents.map((event, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, delay: idx * 0.1, type: "spring", stiffness: 300, damping: 24 }}
                  className="flex gap-4 p-4 rounded-xl border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 items-center hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 shadow-sm">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-foreground text-lg leading-tight mb-1">{event.title}</h4>
                    <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                      <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1.5 shrink-0 text-primary" /> {event.time}</span>
                      <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1.5 shrink-0 text-primary" /> <span className="line-clamp-1">{event.location}</span></span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default Home;

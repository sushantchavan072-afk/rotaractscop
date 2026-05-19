import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarWidget } from "@/components/ui/calendar";
import { ArrowRight, Users, Award, Heart, Globe, Calendar, ArrowUpRight, MapPin, Clock, Leaf } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EVENTS_DATA } from "./Events";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const springTransition = { type: "spring", stiffness: 350, damping: 30 };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: springTransition },
};

const clubInfo = [
  { label: "Club ID", value: "8826281", icon: Award, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Charter Date", value: "12 Mar 2024", icon: Calendar, color: "text-rose-500", bg: "bg-rose-500/10" },
  { label: "RI District", value: "3131", icon: Globe, color: "text-indigo-500", bg: "bg-indigo-500/10" },
  { label: "Sponsor", value: "RC Pune Nanded City", icon: Users, color: "text-amber-500", bg: "bg-amber-500/10" },
];

const marqueeImages = [
  "https://i.ibb.co/JFnRxw3f/NASRAPUR.jpg",
  "https://i.ibb.co/8yvZwLw/NETRUTVANXT.jpg",
  "https://i.ibb.co/R4zgwzf2/ORIENTATION.jpg",
  "https://i.ibb.co/MytZqK4K/PRANIC-HEALING.jpg",
  "https://i.ibb.co/n8nTjrrk/PLAYPOINT.jpg",
  "https://i.ibb.co/8gkxMyg1/NS1.jpg",
  "https://i.ibb.co/Jj661BF0/M-BONDING.jpg",
  "https://i.ibb.co/B29dWnjr/NS2.jpg",
  "https://i.ibb.co/20GpHXVB/ASSEMBLY.jpg",
  "https://i.ibb.co/4Zv02bZ6/RESCUE-RHYTHMS.jpg",
];

const Home = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedEvents, setSelectedEvents] = useState<typeof EVENTS_DATA>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const eventDates = EVENTS_DATA.flatMap(event => {
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

  const handleDateSelect = (selectedDate: Date | undefined) => {
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
  };

  return (
    <div className="w-full">
      {/* ── Minimal Interactive Hero ──────────────── */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 overflow-hidden">
        
        {/* Subtle Background Glows instead of heavy image */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10 translate-y-1/3 -translate-x-1/3" />

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
          <motion.div 
            className="lg:col-span-7 grid grid-cols-2 gap-4"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {/* Bento Box 1: Avenues */}
            <motion.div variants={item} className="col-span-2 sm:col-span-1 glass-panel p-6 bg-white/70 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 transition-colors group">
              <Link to="/avenue" className="absolute inset-0 z-10" aria-label="View Avenues" />
              <div className="flex justify-between items-start mb-8 relative z-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
              <div className="relative z-0">
                <p className="text-3xl font-extrabold text-foreground mb-1">4 Avenues</p>
                <p className="text-sm font-medium text-muted-foreground">Discover Our Core Focus</p>
              </div>
            </motion.div>

            {/* Bento Box 2: Next Event */}
            <motion.div variants={item} className="col-span-2 sm:col-span-1 glass-panel p-6 bg-primary text-white hover:shadow-lg hover:shadow-primary/30 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <Link to="/events" className="absolute inset-0 z-10" aria-label="View Events" />
              <div className="flex justify-between items-start mb-8 relative z-0">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
              <div className="relative z-0">
                <p className="text-sm font-semibold text-white/80 uppercase tracking-widest mb-1">Upcoming</p>
                <p className="text-xl font-bold leading-tight">Discover Our Next Impactful Event</p>
              </div>
            </motion.div>

            {/* Bento Box 3: Club Info Grid */}
            <motion.div variants={item} className="col-span-2 glass-panel p-6 bg-white/60 dark:bg-white/5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Club Information</h3>
                <Link to="/about" className="text-xs font-bold text-primary hover:underline flex items-center">
                  Learn More <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {clubInfo.map((info) => (
                  <motion.div 
                    key={info.label}
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white dark:bg-card shadow-sm border border-black/5 dark:border-white/5 text-center transition-all cursor-pointer group hover:shadow-md"
                  >
                    <div className={`w-8 h-8 rounded-full ${info.bg} flex items-center justify-center mb-2 group-hover:scale-125 group-hover:shadow-sm transition-all duration-300`}>
                      <info.icon className={`w-4 h-4 ${info.color} group-hover:rotate-12 transition-transform duration-300`} />
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5 group-hover:text-primary transition-colors">{info.label}</span>
                    <span className="text-[11px] font-extrabold text-foreground leading-tight">{info.value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ── Event Image Marquee ──────────────── */}
      <section className="py-12 sm:py-16 overflow-hidden relative">
        <div className="text-center mb-10">
          <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">Moments of Impact</h2>
          <p className="text-3xl font-extrabold text-foreground">Relive Our Best Memories</p>
        </div>

        {/* Fading Edges for Marquee */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#f7f9fb] dark:from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#f7f9fb] dark:from-background to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 w-max animate-scroll-x hover:[animation-play-state:paused] px-4">
          {/* We duplicate the images to create a seamless infinite scroll effect */}
          {[...marqueeImages, ...marqueeImages].map((imgSrc, idx) => (
            <div 
              key={idx} 
              className="w-64 sm:w-80 aspect-[4/3] rounded-3xl overflow-hidden shrink-0 glass-panel p-1 bg-white/50 dark:bg-white/5"
            >
              <img 
                src={`${imgSrc}&w=800&auto=format&fit=crop`} 
                alt={`Event ${idx}`}
                className="w-full h-full object-cover rounded-[1.25rem] hover:scale-110 transition-transform duration-500 cursor-pointer will-change-transform"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── Go-Green Initiative Section ──────────────── */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-r from-emerald-500/90 to-teal-400/90 dark:from-emerald-900/80 dark:to-teal-800/80 p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-8 isolate border border-emerald-500/20">
          <div className="absolute inset-0 bg-white/5 opacity-20 mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-[80px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full blur-[80px] -z-10 -translate-x-1/2 translate-y-1/2"></div>
          
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/30 shadow-lg">
            <Leaf className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-md" />
          </div>
          
          <div className="flex-1 text-center md:text-left text-white z-10">
            <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-widest mb-3 backdrop-blur-sm border border-white/30">Sustainability</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-3 tracking-tight drop-shadow-sm">Go-Green Initiative</h2>
            <p className="text-white/90 text-lg leading-relaxed max-w-2xl font-medium">
              As part of our commitment to a sustainable future, the Rotaract Club of SCOP actively promotes environmental conservation. Join us in our ongoing efforts to reduce our carbon footprint, plant trees, and create a cleaner, greener planet.
            </p>
          </div>
          
          <div className="shrink-0 z-10">
            <Link to="/about">
              <Button className="bg-white text-emerald-700 hover:bg-emerald-50 dark:bg-zinc-900 dark:text-emerald-400 dark:hover:bg-zinc-800 rounded-full h-14 px-8 font-extrabold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all border-none text-base">
                Get Involved <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Calendar & Info Section (Liquid Pill Design) ──────────────── */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mb-16 flex justify-center">
        
        {/* Animated Liquid Orbs behind */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/30 dark:bg-primary/20 mix-blend-multiply dark:mix-blend-screen filter blur-[60px] animate-liquid pointer-events-none z-0 transform-gpu will-change-transform" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-blue-500/30 dark:bg-blue-500/20 mix-blend-multiply dark:mix-blend-screen filter blur-[60px] animate-liquid pointer-events-none z-0 transform-gpu will-change-transform" style={{ animationDelay: '-2s', animationDuration: '10s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-purple-500/30 dark:bg-purple-500/20 mix-blend-multiply dark:mix-blend-screen filter blur-[60px] animate-liquid pointer-events-none z-0 transform-gpu will-change-transform" style={{ animationDelay: '-4s', animationDuration: '12s' }}></div>

        {/* Pill Shaped Container */}
        <div className="relative z-10 w-full max-w-5xl grid md:grid-cols-2 gap-8 lg:gap-12 items-center glass-panel p-4 sm:p-8 md:p-12 md:px-16 md:rounded-[4rem] border border-white/20 dark:border-white/10 shadow-2xl overflow-hidden hover-spring">
          
          {/* Inner specular liquid shine */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/5 dark:from-white/10 dark:to-transparent opacity-60 pointer-events-none"></div>

          {/* Left Side: Calendar */}
          <div className="flex justify-center md:justify-end relative z-10 w-full overflow-hidden sm:overflow-visible">
            <div className="bg-[#f2f4f8] dark:bg-zinc-900 p-3 sm:p-6 w-full sm:w-auto inline-block rounded-[1.5rem] shadow-[10px_10px_30px_rgba(0,0,0,0.05),-10px_-10px_30px_rgba(255,255,255,0.8)] dark:shadow-2xl border border-white/50 dark:border-white/5 transition-all duration-500 hover:scale-[1.02] max-w-md mx-auto md:max-w-none">
              <CalendarWidget
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                modifiers={{ hasEvent: eventDates }}
                modifiersClassNames={{ hasEvent: "text-primary font-extrabold drop-shadow-[0_1.5px_1.5px_rgba(217,27,92,0.5)]" }}
                className="p-1 sm:p-2 bg-transparent"
                classNames={{
                  months: "w-full",
                  month: "space-y-4 w-full",
                  caption: "flex w-full justify-between items-center pb-4 mb-4 border-b border-black/10 dark:border-white/10 transition-colors duration-500",
                  caption_label: "text-xl sm:text-2xl font-bold tracking-tight text-foreground ml-1 sm:ml-2 transition-colors duration-500",
                  nav: "flex space-x-2",
                  nav_button: "h-8 w-8 sm:h-8 sm:w-8 bg-primary hover:bg-primary/90 rounded-md flex items-center justify-center transition-all duration-500 text-primary-foreground shadow-sm shadow-primary/20",
                  nav_button_previous: "relative",
                  nav_button_next: "relative",
                  table: "w-full border-collapse space-y-2",
                  head_row: "flex w-full justify-between mb-2 sm:mb-4",
                  head_cell: "text-foreground w-9 sm:w-10 font-bold text-sm sm:text-lg text-center transition-colors duration-500",
                  row: "flex w-full mt-2 justify-between",
                  cell: "text-center relative p-0",
                  day: "h-9 w-9 sm:h-10 sm:w-10 p-0 font-medium rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-500 flex items-center justify-center text-sm sm:text-base text-foreground",
                  day_selected: "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground font-bold shadow-md shadow-primary/30 rounded-md",
                  day_today: "font-bold text-primary",
                  day_outside: "text-muted-foreground/30 opacity-50 transition-colors duration-500",
                  day_disabled: "text-muted-foreground opacity-30 transition-colors duration-500",
                }}
              />
            </div>
          </div>

          {/* Right Side: Website Text */}
          <div className="space-y-6 text-center md:text-left relative z-10">
            <div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">Stay Connected</h3>
              <div className="w-full max-w-md h-1.5 bg-gradient-to-r from-primary to-rose-400 rounded-full mx-auto md:mx-0 shadow-sm shadow-primary/20"></div>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg max-w-md mx-auto md:mx-0">
              Explore our calendar to stay updated with all upcoming events, meetings, and fellowship opportunities. We believe in taking action, having fun, and making a difference in our community and the world. Check back regularly so you don't miss out on what we're doing next!
            </p>
            <div className="flex justify-center md:justify-start pt-2">
              <Link to="/events">
                <Button className="rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1 h-14 px-8 text-base">
                  View All Events <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
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

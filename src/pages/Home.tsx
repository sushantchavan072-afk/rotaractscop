import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Award, Heart, Globe, Calendar, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
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
                className="w-full h-full object-cover rounded-[1.25rem] hover:scale-110 transition-transform duration-500 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;

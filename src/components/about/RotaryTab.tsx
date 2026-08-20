import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Droplets, Globe2, HandHeart, HeartPulse, Leaf, Scale, Sprout, Users } from "lucide-react";
import rotaryLogo from "@/assets/Rotary Logo_EN21_DynamicSize_FontUpdate.png";

const areasOfFocus = [
  { name: "Peacebuilding and conflict prevention", icon: Scale, color: "text-sky-600", bg: "bg-sky-500/10" },
  { name: "Disease prevention and treatment", icon: HeartPulse, color: "text-red-600", bg: "bg-red-500/10" },
  { name: "Water, sanitation, and hygiene", icon: Droplets, color: "text-cyan-600", bg: "bg-cyan-500/10" },
  { name: "Maternal and child health", icon: HandHeart, color: "text-violet-600", bg: "bg-violet-500/10" },
  { name: "Basic education and literacy", icon: BookOpen, color: "text-orange-600", bg: "bg-orange-500/10" },
  { name: "Community economic development", icon: Sprout, color: "text-teal-600", bg: "bg-teal-500/10" },
  { name: "Environment", icon: Leaf, color: "text-emerald-600", bg: "bg-emerald-500/10" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({ opacity: 1, y: 0, transition: { delay: index * 0.06, duration: 0.45, ease: "easeOut" as const } }),
};

const RotaryTab = () => (
  <div className="space-y-8">
    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="relative overflow-hidden rounded-[2rem] bg-[#17458f] px-7 py-10 text-white sm:px-12 sm:py-14">
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#f7a81b]/20 blur-3xl" />
      <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-[auto_1fr] lg:items-center">
        <motion.div variants={fadeUp} custom={0} className="flex h-32 w-40 items-center justify-center rounded-3xl bg-white p-5 shadow-2xl sm:h-40 sm:w-48">
          <img src={rotaryLogo} alt="Rotary International Logo" className="max-h-full max-w-full object-contain" />
        </motion.div>
        <div>
          <motion.p variants={fadeUp} custom={1} className="text-xs font-bold uppercase tracking-[0.24em] text-[#f7a81b]">Create Lasting Impact</motion.p>
          <motion.h2 variants={fadeUp} custom={2} className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">Rotary International</motion.h2>
          <motion.p variants={fadeUp} custom={3} className="mt-5 max-w-3xl text-lg leading-relaxed text-white/85">A global network of neighbours, friends, leaders, and problem-solvers who create lasting change in communities around the world.</motion.p>
          <motion.a variants={fadeUp} custom={4} href="https://www.rotary.org/who-we-are" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#17458f] transition-transform hover:-translate-y-0.5">
            Discover Rotary <ArrowUpRight className="h-4 w-4" />
          </motion.a>
        </div>
      </div>
    </motion.section>

    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
      <motion.div variants={fadeUp} custom={0} className="rounded-3xl border border-border/60 bg-card/60 p-7 shadow-sm sm:p-9">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Our Vision</p>
        <blockquote className="mt-4 text-2xl font-bold leading-snug tracking-tight sm:text-3xl">“Together, we create lasting impact across the globe, in our communities, and in ourselves.”</blockquote>
        <p className="mt-6 max-w-3xl leading-relaxed text-muted-foreground">Founded in 1905, Rotary brings together people of diverse cultures, professions, and perspectives to exchange ideas, build relationships, and take meaningful action.</p>
      </motion.div>
      <motion.div variants={fadeUp} custom={1} className="rounded-3xl bg-[#f7a81b] p-7 text-[#17458f] shadow-sm sm:p-9">
        <Globe2 className="h-9 w-9" />
        <p className="mt-8 text-5xl font-black">1.2M</p>
        <p className="mt-2 font-semibold">Rotary and Rotaract members</p>
        <div className="mt-6 border-t border-[#17458f]/20 pt-5">
          <p className="text-2xl font-extrabold">200+</p>
          <p className="mt-1 text-sm font-semibold">countries and geographical areas</p>
        </div>
      </motion.div>
    </motion.section>

    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="rounded-3xl border border-border/60 bg-card/50 p-7 sm:p-10">
      <motion.div variants={fadeUp} custom={0} className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">What we focus on</p>
          <h3 className="mt-2 text-3xl font-extrabold tracking-tight">Seven Areas of Focus</h3>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">Rotary channels local knowledge and global connections into practical, sustainable service projects.</p>
      </motion.div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {areasOfFocus.map((area, index) => {
          const Icon = area.icon;
          return (
            <motion.div key={area.name} variants={fadeUp} custom={index + 1} className="flex items-center gap-4 rounded-2xl border border-border/50 bg-background/60 p-4 transition-transform hover:-translate-y-1 hover:shadow-md">
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${area.bg}`}><Icon className={`h-5 w-5 ${area.color}`} /></div>
              <p className="text-sm font-bold leading-snug">{area.name}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.section>

    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} custom={0} className="rounded-3xl border border-primary/15 bg-primary/5 p-7 sm:p-9">
      <div className="flex gap-5"><Users className="mt-1 h-7 w-7 shrink-0 text-primary" /><div><h3 className="text-xl font-bold">Service through fellowship</h3><p className="mt-3 max-w-4xl leading-relaxed text-muted-foreground">Rotary’s mission is to provide service to others, promote integrity, and advance world understanding, goodwill, and peace through its fellowship of business, professional, and community leaders.</p></div></div>
    </motion.section>
  </div>
);

export default RotaryTab;

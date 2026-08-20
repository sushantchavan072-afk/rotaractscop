import { ArrowUpRight, BriefcaseBusiness, Globe2, Handshake, HeartHandshake, Image, Megaphone, UsersRound, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface AvenueItem {
  title: string;
  abbr: string;
  icon: LucideIcon;
  statement: string;
  description: string;
  focus: string[];
}

const avenues: AvenueItem[] = [
  {
    title: "Professional Development",
    abbr: "PDD",
    icon: BriefcaseBusiness,
    statement: "Build the confidence to take the next step.",
    description: "We create practical spaces for members to learn, connect with professionals, and turn curiosity into capability.",
    focus: ["Skill-building", "Career perspective", "Industry exposure"],
  },
  {
    title: "Diversity, Equity & Inclusion",
    abbr: "DEI",
    icon: UsersRound,
    statement: "Make belonging part of the way we lead.",
    description: "We celebrate different experiences and work toward a club culture where every voice is heard, respected, and valued.",
    focus: ["Inclusive spaces", "Equal opportunity", "Shared voices"],
  },
  {
    title: "Community Service",
    abbr: "CMD",
    icon: HeartHandshake,
    statement: "Turn care into visible community impact.",
    description: "We listen to real needs and respond through thoughtful, hands-on service that leaves people and places stronger.",
    focus: ["Local action", "Human dignity", "Long-term care"],
  },
  {
    title: "Public Relations",
    abbr: "PRO",
    icon: Megaphone,
    statement: "Keep the right conversations moving.",
    description: "We build relationships with members, partners, media, and the wider community through clear and purposeful communication.",
    focus: ["Relationships", "Communication", "Outreach"],
  },
  {
    title: "Public Image",
    abbr: "PIO",
    icon: Image,
    statement: "Give meaningful work a memorable voice.",
    description: "We shape the club’s visual language and digital presence so its people, projects, and purpose are easy to discover.",
    focus: ["Storytelling", "Visual identity", "Digital presence"],
  },
  {
    title: "Club Service",
    abbr: "CSD",
    icon: Handshake,
    statement: "Create the culture that brings people back.",
    description: "We nurture fellowship, participation, and shared ownership through experiences that make the club feel like a community.",
    focus: ["Fellowship", "Participation", "Club culture"],
  },
  {
    title: "International Service",
    abbr: "ISD",
    icon: Globe2,
    statement: "Think beyond borders. Serve with perspective.",
    description: "We connect with Rotaractors around the world to exchange ideas, understand different contexts, and collaborate with purpose.",
    focus: ["Global connection", "Cross-cultural learning", "Shared action"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.06, duration: 0.42, ease: "easeOut" as const },
  }),
};

const Avenue = () => (
  <div className="min-h-screen py-16">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.header initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mx-auto mb-16 max-w-7xl text-center">
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">Avenues of Service</h1>
        <p className="mx-auto mt-5 max-w-none text-xl leading-8 text-muted-foreground sm:whitespace-nowrap">Seven connected ways to turn intention into action, and action into a lasting culture of service.</p>
      </motion.header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {avenues.map((avenue, index) => {
          const Icon = avenue.icon;
          return (
            <motion.article key={avenue.abbr} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} custom={index} className="group relative flex min-h-[25rem] flex-col overflow-hidden rounded-3xl border border-border/70 bg-card/60 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-xl sm:p-7">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground"><Icon className="h-5 w-5" /></div>
                <div className="flex items-center gap-3"><span className="rounded-full border border-border/70 px-2.5 py-1 text-[10px] font-bold tracking-[0.16em] text-muted-foreground">{avenue.abbr}</span></div>
              </div>
              <div className="mt-auto pt-12"><h2 className="max-w-xl text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{avenue.title}</h2><p className="mt-3 max-w-xl text-lg font-semibold leading-7 text-primary">{avenue.statement}</p><p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">{avenue.description}</p></div>
              <div className="mt-7 flex flex-wrap gap-2 border-t border-border/60 pt-4">{avenue.focus.map((item) => <span key={item} className="text-xs font-medium text-muted-foreground">{item}</span>)}<ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" /></div>
            </motion.article>
          );
        })}
      </div>

    </div>
  </div>
);

export default Avenue;

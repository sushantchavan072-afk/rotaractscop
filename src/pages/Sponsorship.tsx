import { ArrowRight, BadgeCheck, Check, Handshake, Mail, Megaphone, Sprout, Users, WalletCards } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const partnershipBenefits = [
  { icon: Users, title: "Reach an engaged community", copy: "Connect with students, young professionals, Rotaractors, and community leaders across Pune and District 3131." },
  { icon: Megaphone, title: "Build meaningful visibility", copy: "Be present across selected events, digital communication, and impact stories with a purpose-led audience." },
  { icon: Handshake, title: "Support real community work", copy: "Help us deliver projects across professional development, community service, inclusion, and fellowship." },
];

const sponsorshipPlans = [
  {
    number: "01",
    name: "Community Ally",
    descriptor: "Start with one meaningful moment.",
    copy: "A focused way to support a single event, activity, or community initiative.",
    icon: Sprout,
    points: ["Support one selected activity", "In-kind or financial contribution", "Recognition connected to the initiative"],
  },
  {
    number: "02",
    name: "Impact Partner",
    descriptor: "Build a visible partnership.",
    copy: "A balanced association for brands that want to support multiple activities across the year.",
    icon: BadgeCheck,
    featured: true,
    points: ["Support across selected events", "Brand presence in agreed communication", "A post-event impact update"],
  },
  {
    number: "03",
    name: "Legacy Catalyst",
    descriptor: "Create sustained community impact.",
    copy: "A deeper collaboration for organisations ready to shape a larger project or a term-long initiative.",
    icon: WalletCards,
    points: ["Term-long or project-based association", "Co-created impact opportunity", "Tailored visibility and engagement"],
  },
];

const Sponsorship = () => (
  <div className="min-h-screen pb-16">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <section className="py-16 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Choose your level of involvement</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Three ways to make an impact.</h2>
          <p className="mt-4 leading-7 text-muted-foreground">Every organisation has a different way of giving. Choose the pathway that feels right, and we will shape the details together.</p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {sponsorshipPlans.map(({ number, name, descriptor, copy, icon: Icon, points, featured }, index) => {
            const isCommunity = number === "01";
            const isLegacy = number === "03";
            const cardTone = featured ? "isolate border-primary bg-primary text-primary-foreground shadow-[0_20px_70px_-24px_hsl(var(--primary)/0.75)] before:pointer-events-none before:absolute before:-inset-3 before:-z-10 before:rounded-[2rem] before:bg-primary/20 before:blur-2xl" : isCommunity ? "border-emerald-500/25 bg-emerald-50/60 dark:bg-emerald-950/15" : "border-violet-500/25 bg-violet-50/60 dark:bg-violet-950/15";
            const iconTone = featured ? "bg-primary-foreground/15" : isCommunity ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "bg-violet-500/10 text-violet-700 dark:text-violet-300";
            const accentTone = featured ? "text-primary-foreground/70" : isCommunity ? "text-emerald-700 dark:text-emerald-300" : "text-violet-700 dark:text-violet-300";
            const bodyTone = featured ? "text-primary-foreground/80" : "text-muted-foreground";
            return (
              <motion.article key={name} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: index * 0.08, duration: 0.45, ease: "easeOut" }} className={`group relative flex h-full min-h-[31rem] flex-col rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl sm:p-7 ${cardTone}`}>
                <div className="flex items-start justify-between"><span className={`text-sm font-bold tracking-[0.18em] ${accentTone}`}>{number}</span><div className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105 ${iconTone}`}><Icon className="h-5 w-5" /></div></div>
                <h3 className="mt-8 text-2xl font-bold tracking-tight">{name}</h3>
                <p className={`mt-2 min-h-6 text-sm font-semibold ${featured ? "text-primary-foreground/90" : accentTone}`}>{descriptor}</p>
                <p className={`mt-4 min-h-[4.5rem] text-sm leading-6 ${bodyTone}`}>{copy}</p>
                <div className={`my-6 h-px ${featured ? "bg-primary-foreground/15" : "bg-border/70"}`} />
                <div className="space-y-3">
                  {points.map((point) => <div key={point} className="flex items-start gap-3 text-sm leading-5"><Check className={`mt-0.5 h-4 w-4 shrink-0 ${featured ? "text-primary-foreground" : accentTone}`} /><span className={bodyTone}>{point}</span></div>)}
                </div>
                <a href="mailto:rotaractscop@gmail.com?subject=Sponsorship%20enquiry" className={`mt-auto pt-8 inline-flex items-center text-sm font-bold ${featured ? "text-primary-foreground" : accentTone}`}>Discuss this pathway <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></a>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="py-4 sm:py-8">
        <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Why partner with us</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">A partnership that feels human.</h2><p className="mt-4 leading-7 text-muted-foreground">We believe sponsorship works best when it is collaborative, transparent, and connected to a shared intention—not just a logo placement.</p></div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {partnershipBenefits.map(({ icon: Icon, title, copy }, index) => <motion.article key={title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: index * 0.06, duration: 0.35 }} className="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Icon className="h-5 w-5" /></div><h3 className="mt-6 text-lg font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p></motion.article>)}
        </div>
      </section>

      <section className="mt-12 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-3xl bg-muted/70 p-7 sm:p-9"><WalletCards className="h-8 w-8 text-primary" /><h2 className="mt-8 text-2xl font-bold">Ways to collaborate</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">We can shape a sponsorship plan around your goals, audience, and preferred level of involvement.</p></div>
        <div className="rounded-3xl border border-border/60 bg-card/60 p-7 sm:p-9"><div className="grid gap-4 sm:grid-cols-2">{["Event partnership", "In-kind support", "Learning session support", "Community project support"].map((item) => <div key={item} className="flex items-center gap-3 rounded-2xl border border-border/50 bg-background/60 p-4 text-sm font-semibold"><Check className="h-4 w-4 shrink-0 text-primary" />{item}</div>)}</div><p className="mt-6 text-sm leading-6 text-muted-foreground">Have a different idea? We are open to building a thoughtful partnership together.</p></div>
      </section>

      <section className="mt-5 rounded-3xl border border-primary/15 bg-primary/5 p-7 sm:p-10"><div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Let’s create impact</p><h2 className="mt-2 text-2xl font-bold">Bring your brand, ideas, and purpose to the table.</h2></div><a href="mailto:rotaractscop@gmail.com?subject=Sponsorship%20enquiry"><Button className="rounded-full px-6">Contact the club <ArrowRight className="ml-2 h-4 w-4" /></Button></a></div></section>
    </div>
  </div>
);

export default Sponsorship;

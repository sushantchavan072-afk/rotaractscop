import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import clubLogo from "@/assets/logo.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const logoMeaning = [
  {
    title: "Gears of Unity",
    description:
      "The cog signifies coordination and collective motion. Every member is a vital tooth in the gear—moving together with purpose to drive impact.",
  },
  {
    title: "Colours of Impact",
    description:
      "Plum and magenta reflect energy, compassion, and progress—our promise to lead with empathy while taking decisive action.",
  },
  {
    title: "Tree of Transformation",
    description:
      "Rooted in service, the growing branches embody youth leadership evolving into sustainable change for community and profession.",
  },
];

const clubInfo = [
  { label: "Club ID", value: "8826281" },
  { label: "Charter Date", value: "12 March 2024" },
  { label: "RI District", value: "3131" },
  { label: "Sponsor Rotary", value: "Rotary Club Of Pune Nanded City" },
];

interface OverviewTabProps {
  onOpenThemeDialog: () => void;
}

const OverviewTab = ({ onOpenThemeDialog }: OverviewTabProps) => (
  <div className="space-y-12">
    {/* Logo & Meaning */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      <Card className="glass-panel shadow-xl border-border/50 overflow-hidden">
        <CardContent className="p-8 sm:p-12">
          <motion.div variants={fadeUp} custom={0} className="flex justify-center mb-10">
            <img src={clubLogo} alt="Club Logo" className="h-44 object-contain drop-shadow-lg" />
          </motion.div>

          <motion.h2 variants={fadeUp} custom={1} className="text-3xl font-bold mb-8 text-center">
            Logo Meaning
          </motion.h2>

          <div className="grid sm:grid-cols-3 gap-6">
            {logoMeaning.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                custom={i + 2}
                className="glass-panel p-6 rounded-xl border border-border/50 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold mb-2 text-primary">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>

    {/* Woven By We */}
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-border/50 bg-primary/[0.04] shadow-sm">
        <CardContent className="p-8 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Woven By We</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">Many threads. One shared direction.</h2>
          <p className="mt-5 max-w-5xl text-base leading-8 text-muted-foreground">
            “Woven By We” is a reminder that every person, idea, act of service, and shared moment adds strength to the fabric of our club. When we bring our different talents and perspectives together, individual efforts become a collective movement—one that supports people, creates opportunity, and leaves a lasting mark on the community.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {[
              ["People", "Different voices, shared purpose."],
              ["Ideas", "Curiosity turned into action."],
              ["Impact", "Small efforts made stronger together."],
            ].map(([title, description]) => (
              <div key={title} className="rounded-2xl border border-border/60 bg-background/70 p-4">
                <p className="text-sm font-bold text-foreground">{title}</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>

    {/* Club Info */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      <motion.h2 variants={fadeUp} custom={0} className="text-3xl font-bold mb-8">
        Club Information
      </motion.h2>
      <div className="grid sm:grid-cols-2 gap-5">
        {clubInfo.map((item, i) => (
          <motion.div
            key={item.label}
            variants={fadeUp}
            custom={i + 1}
            className="glass-panel p-6 rounded-xl border border-border/50 shadow-md hover:shadow-lg transition-shadow"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">
              {item.label}
            </p>
            <p className="text-xl font-bold">{item.value}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
);

export default OverviewTab;

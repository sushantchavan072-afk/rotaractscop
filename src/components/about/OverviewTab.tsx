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
      <Card className="shadow-xl border-border/50 overflow-hidden">
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
                className="p-6 rounded-xl bg-muted/30 border border-border/50 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold mb-2 text-primary">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>

    {/* Theme */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="p-10 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-2 border-primary/30 cursor-pointer hover:shadow-xl transition-all group"
        onClick={onOpenThemeDialog}
      >
        <p className="text-4xl font-bold text-center text-primary group-hover:scale-105 transition-transform">
          सेवा संगठन परिवर्तन
        </p>
        <p className="text-center text-muted-foreground mt-3 text-sm">
          Our theme for RIY 2025-26 · Click to learn more
        </p>
      </div>
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
            className="p-6 rounded-xl bg-card border border-border/50 shadow-md hover:shadow-lg transition-shadow"
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

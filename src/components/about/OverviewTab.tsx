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

    {/* Theme */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="flex justify-center"
    >
      <button
        onClick={onOpenThemeDialog}
        className="group flex flex-col lg:flex-row items-center justify-center gap-1.5 lg:gap-3 p-5 sm:px-8 sm:py-4 rounded-3xl lg:rounded-full bg-primary/5 hover:bg-primary/10 border border-primary/20 transition-all cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5 w-full lg:w-auto"
      >
        <div className="flex items-center">
          <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-primary animate-pulse shrink-0" />
          <span className="text-xl sm:text-2xl text-primary tracking-wider font-devanagari mx-2">सेवा संगठन परिवर्तन</span>
          <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-primary animate-pulse shrink-0" />
        </div>
        <span className="text-[13px] sm:text-base font-medium text-muted-foreground transition-colors group-hover:text-foreground text-center mt-1 lg:mt-0 lg:ml-1 leading-snug">
          Our theme for RIY 2025-26 <span className="hidden sm:inline">&nbsp;·&nbsp;</span><br className="sm:hidden" />
          <span className="text-primary group-hover:underline">Click to learn more</span>
        </span>
      </button>
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

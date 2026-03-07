import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import rotaryLogo from "@/assets/rotary.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

const areasOfFocus = [
  "Promoting peace",
  "Fighting disease",
  "Providing clean water, sanitation, and hygiene",
  "Saving mothers and children",
  "Supporting education",
  "Growing local economies",
  "Protecting the environment",
];

const RotaryTab = () => (
  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
    <Card className="shadow-xl border-border/50 overflow-hidden">
      <CardContent className="p-8 sm:p-12">
        <motion.div variants={fadeUp} custom={0} className="flex justify-center mb-10">
          <img src={rotaryLogo} alt="Rotary International Logo" className="h-36 object-contain" />
        </motion.div>

        <motion.h2 variants={fadeUp} custom={1} className="text-3xl font-bold mb-6">
          Rotary International
        </motion.h2>

        <motion.p variants={fadeUp} custom={2} className="text-lg text-muted-foreground leading-relaxed mb-5">
          Rotary International is a universal network of 1.2 million acquaintances, companions, leaders, and problem-solvers who have a vision of the world where people unite and take action to create a long-lasting change – across the globe, in our communities, and ourselves.
        </motion.p>

        <motion.p variants={fadeUp} custom={3} className="text-lg text-muted-foreground leading-relaxed mb-5">
          Rotary is a 110-year-old international chain of clubs consisting of phenomenal visionaries who, since the establishment of this chain have used their passion, energy and intelligence to contribute to the development of a sustainable world.
        </motion.p>

        <motion.p variants={fadeUp} custom={4} className="text-lg text-muted-foreground leading-relaxed mb-8">
          The mission of Rotary is to provide service to others, promote integrity, and advance world understanding, goodwill, and peace through our fellowship of business, professional, and community leaders.
        </motion.p>

        <motion.h3 variants={fadeUp} custom={5} className="text-2xl font-bold mb-6">
          Seven Areas of Focus
        </motion.h3>

        <div className="grid sm:grid-cols-2 gap-4">
          {areasOfFocus.map((area, i) => (
            <motion.div
              key={area}
              variants={fadeUp}
              custom={i + 6}
              className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 border border-border/50"
            >
              <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
              <span className="text-foreground font-medium">{area}</span>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default RotaryTab;

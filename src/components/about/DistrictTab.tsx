import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import auraLogo from "@/assets/Aura.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

const auraValues = [
  {
    title: "Adapt",
    description:
      "In an ever-changing world, adaptability is crucial. We embrace change and adjust our approaches to meet new challenges and opportunities with flexibility and creativity.",
  },
  {
    title: "Unite",
    description:
      "Unity is the strength that binds us together. We come from diverse backgrounds and experiences, but we stand as one in our commitment to service and fellowship.",
  },
  {
    title: "Resilience",
    description:
      "Our journey is filled with trials and triumphs. Resilience is our ability to withstand adversity, bounce back from setbacks, and emerge stronger than before.",
  },
  {
    title: "Aspire",
    description:
      "Aspiration drives us to reach new heights. We set ambitious goals, both individually and collectively, and strive to achieve them with determination and passion.",
  },
];

const DistrictTab = () => (
  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
    <Card className="shadow-xl border-border/50 overflow-hidden">
      <CardContent className="p-8 sm:p-12 space-y-10">
        <div>
          <motion.h2 variants={fadeUp} custom={0} className="text-3xl font-bold mb-6">
            Rotaract District 3131
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="text-lg text-muted-foreground leading-relaxed mb-4">
            Rotaract District 3131 is a dynamic and impactful non-profit organization dedicated to creating positive change, working in close collaboration with Rotary International District 3131. Established at the start of RIY 2008-09, it encompasses the Raigad and Pune revenue districts of Maharashtra, India.
          </motion.p>
          <motion.div variants={fadeUp} custom={2} className="grid sm:grid-cols-3 gap-4">
            {[
              { value: "100+", label: "Rotaract Clubs" },
              { value: "2700+", label: "Rotaractors" },
              { value: "18+", label: "Age Eligibility" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-5 rounded-xl bg-muted/30 border border-border/50">
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div variants={fadeUp} custom={3} className="flex justify-center">
          <img src={auraLogo} alt="AURA Theme Logo" className="h-44 object-contain drop-shadow-lg" />
        </motion.div>

        <div>
          <motion.h3 variants={fadeUp} custom={4} className="text-2xl font-bold mb-6">
            Theme for RIY 2025-26: AURA
          </motion.h3>
          <div className="grid sm:grid-cols-2 gap-5">
            {auraValues.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                custom={i + 5}
                className="p-6 rounded-xl bg-muted/30 border border-border/50 hover:shadow-lg transition-shadow"
              >
                <h4 className="text-xl font-bold mb-2 text-primary">{item.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div variants={fadeUp} custom={9}>
          <a
            href="https://www.rotaractdistrict3131.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline text-lg font-semibold"
          >
            Visit Rotaract District 3131 Website
            <ExternalLink className="w-5 h-5" />
          </a>
        </motion.div>
      </CardContent>
    </Card>
  </motion.div>
);

export default DistrictTab;

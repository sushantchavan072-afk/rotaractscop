import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Card } from "@/components/ui/card";

const CoreMembersTab = () => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45 }}
    aria-labelledby="drr-message-title"
  >
    <Card className="overflow-hidden rounded-md border-border/60 bg-background shadow-sm">
      <div className="mx-auto max-w-5xl">
        <div className="px-6 py-10 sm:px-10 sm:py-14 lg:px-12 lg:py-20">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Message from the DRR</p>
            <div className="relative mt-2 pl-8">
              <Quote className="absolute left-0 top-1 h-5 w-5 text-primary/60" aria-hidden="true" />
              <p className="text-lg font-medium leading-8 text-foreground sm:text-xl">
                Rotaract Empowering Individuals for Growth and Networking.
              </p>
            </div>

            <div className="mt-9 space-y-5 text-sm leading-7 text-muted-foreground sm:text-base">
              <p>Dear Rotaractors of District 3131,</p>
              <p>
                It gives me immense pleasure to welcome you to Rotary International Year 2026–27 under our district theme <strong className="font-semibold text-foreground">REIGN</strong>.
              </p>
              <p>
                This year is about unlocking the potential within every Rotaractor: nurturing leadership, strengthening professional skills, deepening our commitment to community service, and building networks that endure beyond the Rotary year.
              </p>
              <p>
                REIGN calls us to empower one another—in our clubs, across our zones, and throughout Pune and Raigad. When individuals grow, clubs grow. When clubs grow, our district creates impact that is measurable, inclusive, and lasting.
              </p>
              <p>
                I invite every club president, secretary, and member to carry REIGN into your meetings, projects, fellowships, and reporting. Let us lead with purpose, serve with compassion, and network with integrity.
              </p>
              <p>
                Together, let us make RIY 2026–27 a year of empowered leaders, stronger communities, and proud Rotaract across RID 3131.
              </p>
            </div>

            <div className="mt-10 border-t border-border/70 pt-6">
              <p className="text-sm font-semibold text-foreground">Dr. Karishma Awari</p>
              <p className="mt-1 text-xs text-muted-foreground">DRR, RID 3131 · RIY 2026–27</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </motion.section>
);

export default CoreMembersTab;

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import rotaractLogo from "@/assets/Rotaract Logo_EN21_DynamicSize_FontUpdate (1).png";

const DistrictTab = () => (
  <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}>
    <Card className="glass-panel shadow-xl border-border/50 overflow-hidden">
      <CardContent className="p-8 sm:p-12 space-y-8">
        <div>
          <div className="flex flex-col items-start gap-3">
            <h2 className="text-3xl font-bold">Rotaract District 3131</h2>
            <div className="flex h-24 w-48 items-center justify-center rounded-2xl bg-white p-3 shadow-sm dark:bg-white/95">
              <img src={rotaractLogo} alt="Rotaract District 3131 Logo" className="max-h-full max-w-full object-contain" />
            </div>
          </div>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Rotaract District 3131 is a dynamic and impactful non-profit organisation dedicated to creating positive change in the world. Working in close collaboration with Rotary International District 3131 (RID 3131), and under the guidance of Rotary International, we empower young leaders to make a significant difference in their communities and beyond.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-border/60 bg-card/50 p-6">
            <h3 className="text-lg font-bold mb-3">Formation and Scope</h3>
            <p className="text-muted-foreground leading-relaxed">Established at the start of Rotary International Year 2008-09 following the bifurcation of RID 3130, Rotaract District 3131 encompasses the Raigad and Pune revenue districts of Maharashtra, India.</p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-card/50 p-6">
            <h3 className="text-lg font-bold mb-3">Membership and Reach</h3>
            <p className="text-muted-foreground leading-relaxed">Our district comprises over 100 Rotaract clubs and a vibrant network of 2,700+ Rotaractors aged 18 and above, fostering a diverse and inclusive community of young leaders.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-primary/15 bg-primary/5 p-6 sm:p-8">
          <h3 className="text-xl font-bold mb-3">Leadership, Fellowship and Service</h3>
          <p className="text-muted-foreground leading-relaxed">Rotaractors work primarily through standing committees in Professional Development, Community Service, Club Service, International Service, and other avenues that build leadership and fellowship. There is no upper age limit for Rotaractors.</p>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-primary via-primary to-rose-500 p-8 sm:p-12 text-primary-foreground shadow-lg">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-white/75 mb-4">District Theme</p>
          <h3 className="text-5xl sm:text-6xl font-black tracking-tight mb-4">REIGN</h3>
          <p className="text-xl sm:text-2xl font-semibold leading-relaxed max-w-3xl">Rotaract Empowering Individuals for Growth and Networking</p>
          <p className="mt-5 max-w-3xl text-white/85 leading-relaxed">A year to unlock leadership potential, strengthen professional skills, deepen community service, and build networks that last beyond the Rotary year.</p>
        </div>

        <a href="https://www.rotaractdistrict3131.org/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:underline text-lg font-semibold">
          Visit Rotaract District 3131 Website
          <ExternalLink className="w-5 h-5" />
        </a>
      </CardContent>
    </Card>
  </motion.div>
);

export default DistrictTab;

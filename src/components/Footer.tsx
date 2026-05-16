import { Instagram, Twitter, Linkedin, Youtube, MapPin, Mail, Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const socials = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/events", label: "Events" },
  { to: "/members", label: "Members" },
  { to: "/avenue", label: "Avenues" },
  { to: "/join", label: "Join Us" },
];

const Footer = () => (
  <footer className="bg-white/80 dark:bg-card/40 backdrop-blur-xl border-t border-white/40 dark:border-white/10 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Rotaract Club Logo" className="w-11 h-11 object-contain" />
            <div>
              <h3 
                className="font-bold text-sm relative inline-block overflow-hidden align-bottom max-w-full w-[140px] py-1 -my-1"
                style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
              >
                <span className="invisible whitespace-nowrap" aria-hidden="true">Rotaract Club of SCOP</span>
                <span className="absolute top-1 flex items-center whitespace-nowrap animate-marquee pr-4">
                  Rotaract Club of Sinhgad College Of Pharmacy
                </span>
              </h3>
              <p className="text-[13px] text-muted-foreground font-devanagari">सेवा संगठन परिवर्तन</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            A youth-led service organisation under RID 3131, empowering students through leadership and community impact.
          </p>
          {/* Socials */}
          <div className="flex gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-full bg-primary/5 flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-primary/10 hover:scale-105 transition-all"
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-xs uppercase tracking-widest text-foreground/60 mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-xs uppercase tracking-widest text-foreground/60 mb-4">Contact</h4>
          <div className="space-y-4">
            <div className="flex items-start gap-3 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-foreground mb-0.5">Address</p>
                <p className="text-xs leading-relaxed">S.No. 44/1, Sinhgad College of Pharmacy,<br />Vadgaon (Bk.), Off Sinhgad Road,<br />Pune (M.S.) 411 041</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <div>
                <p className="text-xs font-semibold text-foreground mb-0.5">Email</p>
                <a href="mailto:rotaractscop@gmail.com" className="text-xs hover:text-primary transition-colors">
                  rotaractscop@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <div>
                <p className="text-xs font-semibold text-foreground mb-0.5">Phone</p>
                <a href="tel:+919529936483" className="text-xs hover:text-primary transition-colors">
                  +91-9529936483
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="opacity-40" />

      <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground text-center sm:text-left overflow-hidden">
        <p className="order-2 sm:order-1 opacity-80">© {new Date().getFullYear()} Rotaract Club of SCOP. All Rights Reserved.</p>
        <div className="flex items-center justify-center gap-x-1.5 sm:gap-x-3 order-1 sm:order-2 opacity-80 text-[10px] min-[375px]:text-[11px] sm:text-xs whitespace-nowrap">
          <span>Club ID: 8826281</span>
          <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-border/80" />
          <span>RI District 3131</span>
          <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-border/80" />
          <span>Est. March 2024</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

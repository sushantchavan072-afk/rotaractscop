import { Instagram, Twitter, Linkedin, Youtube, MapPin, Mail, Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const socials = [
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  ];

  return (
    <footer className="bg-card/80 backdrop-blur-sm border-t border-border/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-14 flex flex-col md:flex-row items-start justify-between gap-10">
          <div className="space-y-6 max-w-lg">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Rotaract Club Logo" className="w-12 h-12 object-contain" />
              <div>
                <h3 className="font-bold text-base tracking-tight">Rotaract Club of SCOP</h3>
                <p className="text-xs text-muted-foreground">सेवा संगठन परिवर्तन</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground">Contact Us</h4>

              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 shrink-0 text-primary mt-1" />
                <div>
                  <p className="font-medium text-foreground mb-0.5">Official Address</p>
                  <p>S.No. 44/1, Sinhgad College Of Pharmacy,</p>
                  <p>Vadgaon (Bk.), Off Sinhgad Road,</p>
                  <p>Pune (M.S.), India 411 041</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 shrink-0 text-primary" />
                <div>
                  <p className="font-medium text-foreground mb-0.5">Email Us</p>
                  <a href="mailto:rotaractscop@gmail.com" className="hover:text-primary transition-colors">
                    rotaractscop@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 shrink-0 text-primary" />
                <div>
                  <p className="font-medium text-foreground mb-0.5">Call Us</p>
                  <a href="tel:+919529936483" className="hover:text-primary transition-colors">
                    +91-9529936483
                  </a>
                </div>
              </div>

              {/* Follow Us */}
              <div className="pt-2">
                <h4 className="font-semibold text-sm uppercase tracking-wider mb-3 text-foreground">Follow Us</h4>
                <div className="flex gap-3">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-9 h-9 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center flex-1">
            <img src={logo} alt="" className="w-50 h-50 lg:w-100 lg:h-80 object-contain opacity-70" />
          </div>
        </div>

        <Separator className="opacity-50" />

        <div className="py-5 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-[11px] sm:text-xs text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} Rotaract Club of Sinhgad College of Pharmacy. All Rights Reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] sm:text-xs text-muted-foreground">
            <span>Club ID: 8826281</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
            <span>RI District 3131</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
            <span>Est. March 2024</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

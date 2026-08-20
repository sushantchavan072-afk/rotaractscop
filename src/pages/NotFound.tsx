import { ArrowLeft, ArrowUpRight, Compass, Home, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const recoveryLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Events", href: "/events", icon: Search },
  { label: "About us", href: "/about", icon: Compass },
  { label: "Club information", href: "/info", icon: ArrowUpRight },
];

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16 sm:px-6">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-3xl rounded-[2rem] border border-border/70 bg-card/70 p-7 text-center shadow-sm backdrop-blur-sm sm:p-12"
        aria-labelledby="not-found-title"
      >
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Lost on the way</p>
        <h1 id="not-found-title" className="mt-4 text-7xl font-black tracking-[-0.08em] text-foreground sm:text-8xl">404</h1>
        <h2 className="mt-5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">This page took a different route.</h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted-foreground">The page you are looking for does not exist or may have moved. Let us get you back to the work, people, and stories of Rotaract SCOP.</p>
        <p className="mt-4 truncate text-xs text-muted-foreground/70" title={location.pathname}>Requested path: {location.pathname}</p>

        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
          {recoveryLinks.map(({ label, href, icon: Icon }) => (
            <Link key={href} to={href} className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/35 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4">
              <Icon className="h-4 w-4 text-primary" />
              {label}
            </Link>
          ))}
        </div>

        <Link to="/" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"><ArrowLeft className="h-4 w-4" />Return to the homepage</Link>
      </motion.section>
    </div>
  );
};

export default NotFound;

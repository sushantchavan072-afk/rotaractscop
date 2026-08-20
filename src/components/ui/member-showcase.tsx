import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";

export interface ShowcaseMember {
  name: string;
  position: string;
  image?: string;
  category: "core" | "bod" | "general";
}

function SplitText({ text }: { text: string }) {
  return (
    <span className="inline">
      {text.split(" ").map((word, index) => (
        <motion.span key={`${word}-${index}`} initial={{ opacity: 0, y: 16, filter: "blur(7px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.35, delay: index * 0.025, ease: [0.22, 1, 0.36, 1] }} className="mr-[0.25em] inline-block">
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export function MemberShowcase({ members }: { members: ShowcaseMember[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useSpring(mouseX, { damping: 25, stiffness: 150 });
  const cursorY = useSpring(mouseY, { damping: 25, stiffness: 150 });
  const activeMember = members[activeIndex];

  useEffect(() => {
    setActiveIndex(0);
  }, [members]);

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  }, [mouseX, mouseY]);

  const handleNext = () => setActiveIndex((index) => (index + 1) % members.length);
  if (!activeMember) return null;

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-2xl px-6 py-12 sm:px-10 sm:py-16" onMouseMove={handleMouseMove} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={handleNext} style={{ cursor: "none" }}>
      <motion.div className="pointer-events-none absolute z-50 hidden mix-blend-difference sm:block" style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}>
        <motion.div className="flex items-center justify-center rounded-full bg-foreground" animate={{ width: isHovered ? 76 : 0, height: isHovered ? 76 : 0, opacity: isHovered ? 1 : 0 }} transition={{ type: "spring", damping: 20, stiffness: 200 }}>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-background">Next</span>
        </motion.div>
      </motion.div>

      <div className="absolute right-6 top-6 flex items-baseline gap-1 font-mono text-xs sm:right-10 sm:top-10">
        <motion.span key={activeIndex} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-2xl font-light text-foreground">{String(activeIndex + 1).padStart(2, "0")}</motion.span>
        <span className="text-muted-foreground">/</span><span className="text-muted-foreground">{String(members.length).padStart(2, "0")}</span>
      </div>

      <div className="absolute left-6 top-6 flex -space-x-2 sm:left-10 sm:top-10">
        {members.slice(0, 5).map((member, index) => <div key={`${member.name}-${index}`} className={`h-7 w-7 overflow-hidden rounded-full border-2 border-background transition-all ${index === activeIndex ? "ring-1 ring-primary ring-offset-1 ring-offset-background" : "grayscale opacity-50"}`}><MemberImage member={member} /></div>)}
      </div>

      <div className="relative pt-12 sm:pt-8">
        <AnimatePresence mode="wait">
          <motion.div key={`${activeMember.name}-${activeIndex}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.18 } }}>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-primary">Tap or click to explore the team</p>
            <blockquote className="text-2xl font-light leading-relaxed tracking-tight text-foreground sm:text-4xl"><SplitText text={activeMember.position} /></blockquote>
          </motion.div>
        </AnimatePresence>

        <motion.div className="relative mt-12" layout>
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 shrink-0">
              <motion.div className="absolute -inset-1.5 rounded-full border border-primary/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
              {members.map((member, index) => <motion.div key={member.name} className="absolute inset-0 overflow-hidden rounded-full" animate={{ opacity: index === activeIndex ? 1 : 0, zIndex: index === activeIndex ? 1 : 0 }} transition={{ duration: 0.35 }}><MemberImage member={member} large /></motion.div>)}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={activeMember.name} className="relative border-l border-primary pl-4" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.25 }}>
                <span className="block text-sm font-semibold tracking-wide text-foreground">{activeMember.name}</span>
                <span className="mt-1 block text-xs uppercase tracking-[0.14em] text-muted-foreground">{activeMember.category === "core" ? "Core member" : activeMember.category === "bod" ? "Board member" : "General body"}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="relative mt-12 h-px overflow-hidden bg-border"><motion.div className="absolute inset-y-0 left-0 bg-primary" animate={{ width: `${((activeIndex + 1) / members.length) * 100}%` }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} /></div>
        <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground"><span>Rotaract Club of SCOP</span><ArrowRight className="h-4 w-4 text-primary" /></div>
      </div>
    </div>
  );
}

function MemberImage({ member, large = false }: { member: ShowcaseMember; large?: boolean }) {
  const initials = member.name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase();
  return member.image ? <img src={member.image} alt={member.name} className="h-full w-full object-cover object-top" /> : <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-primary via-primary to-rose-500 text-primary-foreground ${large ? "text-lg" : "text-[9px]"}`}><span className="font-bold">{initials || <Users className="h-4 w-4" />}</span></div>;
}

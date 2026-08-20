import { useEffect, useRef, useState } from "react";
import { Quote } from "lucide-react";
import aditiPhoto from "@/assets/Members/Aditi Gandhi.jpg";
import pranjalPhoto from "@/assets/Members/Rtr. Pranjal landge.jpg";

const testimonials = [
  {
    id: 1,
    quote: "Rotaract gives young people the confidence to turn an idea into meaningful service.",
    author: "Aditi Mahendra Gandhi",
    displayName: "Rtr. Aditi",
    avatar: aditiPhoto,
  },
  {
    id: 2,
    quote: "Every project becomes a lesson in leadership, teamwork, and showing up for the community.",
    author: "Onkar Sushil Deshpande",
    displayName: "Rtr. Onkar",
    avatar: undefined,
  },
  {
    id: 3,
    quote: "The strongest part of Rotaract is the people: a network that helps you grow while you help others.",
    author: "Pranjal Landge",
    displayName: "Rtr. Pranjal",
    avatar: pranjalPhoto,
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const activeTestimonial = testimonials[activeIndex];

  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: fine)");
    const updatePointer = () => setIsFinePointer(pointerQuery.matches);
    updatePointer();
    pointerQuery.addEventListener?.("change", updatePointer);
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      pointerQuery.removeEventListener?.("change", updatePointer);
    };
  }, []);

  const handleSelect = (index: number) => {
    if (index === activeIndex || isAnimating) return;
    setIsAnimating(true);
    timeoutRef.current = window.setTimeout(() => {
      setActiveIndex(index);
      setIsAnimating(false);
    }, 180);
  };

  return (
    <section className="relative overflow-hidden px-5 py-12 sm:px-10 sm:py-16" aria-labelledby="testimonials-title">
      <div className="relative z-10 flex flex-col items-center gap-9">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Words from our people</p>
          <h2 id="testimonials-title" className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Why Rotaract feels like home</h2>
        </div>

        <div className="relative w-full max-w-2xl px-8 sm:px-12">
          <span className="pointer-events-none absolute -left-1 -top-7 select-none font-serif text-7xl leading-none text-primary/[0.16]" aria-hidden="true">“</span>
          <p className={`break-words text-center text-xl font-['Times_New_Roman',_Times,_serif] italic leading-7 tracking-[-0.015em] text-foreground transition-all duration-300 sm:text-3xl sm:leading-[1.25] ${isAnimating ? "scale-[0.98] opacity-0 blur-sm" : "scale-100 opacity-100 blur-0"}`}>
            {activeTestimonial.quote}
          </p>
          <span className="pointer-events-none absolute -bottom-8 -right-1 select-none font-serif text-7xl leading-none text-primary/[0.16]" aria-hidden="true">”</span>
        </div>

        <div className="flex flex-col items-center gap-5">
          <div className="flex w-full max-w-[18rem] flex-nowrap items-center justify-center gap-2 sm:max-w-none sm:gap-3" role="tablist" aria-label="Testimonials">
            {testimonials.map((testimonial, index) => {
              const isActive = activeIndex === index;
              const showName = isActive || (isFinePointer && hoveredIndex === index);
              return (
                <button
                  key={testimonial.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Show testimonial from ${testimonial.author}`}
                  onClick={() => handleSelect(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`relative flex items-center gap-0 rounded-full transition-all duration-300 ${isActive ? "bg-foreground py-2 pl-2 pr-4 shadow-lg" : showName ? "bg-muted py-2 pl-2 pr-4" : "bg-transparent p-1 hover:bg-muted/80"}`}
                >
                  {testimonial.avatar ? <img src={testimonial.avatar} alt="" className={`h-9 w-9 rounded-full object-cover transition-all duration-500 ${isActive ? "ring-2 ring-background/30" : "hover:scale-105"}`} /> : <span className={`flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary transition-all duration-500 ${isActive ? "ring-2 ring-background/30" : "hover:scale-105"}`}>OD</span>}
                  <span className={`grid overflow-hidden transition-all duration-300 ${showName ? "ml-2 max-w-40 opacity-100" : "ml-0 max-w-0 opacity-0"}`}>
                    <span className={`whitespace-nowrap text-sm font-medium ${isActive ? "text-background" : "text-foreground"}`}>{testimonial.displayName}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

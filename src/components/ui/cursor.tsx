import { useEffect, useRef, type CSSProperties, type HTMLAttributes, type SVGProps } from "react";
import { Children } from "react";
import { cn } from "@/lib/utils";

export type CursorProps = HTMLAttributes<HTMLSpanElement>;

export const Cursor = ({ className, children, ...props }: CursorProps) => (
  <span className={cn("pointer-events-none relative select-none", className)} {...props}>
    {children}
  </span>
);

export type CursorPointerProps = SVGProps<SVGSVGElement>;

export const CursorPointer = ({ className, ...props }: CursorPointerProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    className={cn("size-3.5", className)}
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path fill="currentColor" d="M19.438 6.716 1.115.05A.832.832 0 0 0 .05 1.116L6.712 19.45a.834.834 0 0 0 1.557.025l3.198-8 7.995-3.2a.833.833 0 0 0 0-1.559h-.024Z" />
  </svg>
);

export type CursorBodyProps = HTMLAttributes<HTMLSpanElement>;

export const CursorBody = ({ children, className, ...props }: CursorBodyProps) => (
  <span
    className={cn(
      "relative ml-3.5 flex flex-col whitespace-nowrap rounded-xl py-1 pl-2.5 pr-3 text-xs",
      Children.count(children) > 1 && "rounded-tl [&>:first-child]:opacity-70",
      "bg-secondary text-foreground",
      className,
    )}
    {...props}
  >
    {children}
  </span>
);

export type CursorNameProps = HTMLAttributes<HTMLSpanElement>;
export const CursorName = (props: CursorNameProps) => <span {...props} />;

export type CursorMessageProps = HTMLAttributes<HTMLSpanElement>;
export const CursorMessage = (props: CursorMessageProps) => <span {...props} />;

export const SiteCursor = () => {
  const cursorRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: fine)");
    if (!pointerQuery.matches) return;

    document.documentElement.classList.add("custom-cursor");
    let animationFrame = 0;
    let nextX = 0;
    let nextY = 0;

    const renderCursor = () => {
      animationFrame = 0;
      const cursor = cursorRef.current;
      if (!cursor) return;
      cursor.style.transform = `translate3d(${nextX - 1}px, ${nextY - 1}px, 0)`;
    };

    const handleMove = (event: MouseEvent) => {
      nextX = event.clientX;
      nextY = event.clientY;
      const cursor = cursorRef.current;
      if (cursor) cursor.style.opacity = "1";
      if (animationFrame === 0) animationFrame = window.requestAnimationFrame(renderCursor);
    };

    const handleLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <span
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[200] opacity-0 transition-opacity duration-100 ease-out"
      style={{ willChange: "transform, opacity" } as CSSProperties}
    >
      <CursorPointer className="size-3.5 text-[hsl(var(--cursor-color))]" />
    </span>
  );
};

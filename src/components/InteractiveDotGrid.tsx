import { useEffect, useRef } from "react";

const SPACING = 32;
const INFLUENCE_RADIUS = 150;
const INFLUENCE_RADIUS_SQUARED = INFLUENCE_RADIUS * INFLUENCE_RADIUS;

const InteractiveDotGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const interactivePointer = window.matchMedia("(pointer: fine)").matches && !reduceMotion;
    const pointer = { x: -1000, y: -1000, active: false };
    const smoothPointer = { x: -1000, y: -1000 };
    let width = 0;
    let height = 0;
    let devicePixelRatio = 1;
    let animationFrame = 0;
    let renderPending = false;

    const scheduleRender = () => {
      renderPending = true;
      if (animationFrame === 0) animationFrame = window.requestAnimationFrame(draw);
    };

    const resize = () => {
      devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * devicePixelRatio);
      canvas.height = Math.floor(height * devicePixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      scheduleRender();
    };

    const draw = () => {
      animationFrame = 0;
      if (!renderPending) return;
      renderPending = false;

      if (interactivePointer && pointer.active) {
        smoothPointer.x += (pointer.x - smoothPointer.x) * 0.14;
        smoothPointer.y += (pointer.y - smoothPointer.y) * 0.14;
      }

      context.clearRect(0, 0, width, height);
      const darkMode = document.documentElement.classList.contains("dark");
      const baseColor = darkMode ? "rgba(220, 228, 240, 0.12)" : "rgba(35, 45, 60, 0.11)";
      const highlightColor = darkMode ? "rgba(236, 72, 153, 0.42)" : "rgba(190, 24, 93, 0.32)";
      const canHighlight = interactivePointer && pointer.active;

      for (let y = SPACING / 2; y < height + SPACING; y += SPACING) {
        for (let x = SPACING / 2; x < width + SPACING; x += SPACING) {
          let influence = 0;
          if (canHighlight) {
            const deltaX = x - smoothPointer.x;
            const deltaY = y - smoothPointer.y;
            const distanceSquared = deltaX * deltaX + deltaY * deltaY;
            if (distanceSquared < INFLUENCE_RADIUS_SQUARED) {
              influence = Math.max(0, 1 - Math.sqrt(distanceSquared) / INFLUENCE_RADIUS);
            }
          }

          context.beginPath();
          context.arc(x, y, 1.05 + influence * 0.7, 0, Math.PI * 2);
          context.fillStyle = influence > 0.01 ? highlightColor : baseColor;
          context.globalAlpha = influence > 0.01 ? 0.45 + influence * 0.55 : 1;
          context.fill();
        }
      }
      context.globalAlpha = 1;

      if (canHighlight && (Math.abs(pointer.x - smoothPointer.x) > 0.5 || Math.abs(pointer.y - smoothPointer.y) > 0.5)) {
        scheduleRender();
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!interactivePointer) return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
      scheduleRender();
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      scheduleRender();
    };

    const themeObserver = new MutationObserver(scheduleRender);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    resize();
    window.addEventListener("resize", resize, { passive: true });
    if (interactivePointer) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    }

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 opacity-80" />;
};

export default InteractiveDotGrid;

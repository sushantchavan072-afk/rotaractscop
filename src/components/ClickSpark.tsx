import { useCallback, useEffect, useRef, type CSSProperties, type MouseEvent, type ReactNode } from "react";

interface Spark {
  x: number;
  y: number;
  angle: number;
  startTime: number;
}

interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: "linear" | "ease-in" | "ease-out" | "ease-in-out";
  extraScale?: number;
  children: ReactNode;
}

const ClickSpark = ({
  sparkColor = "hsl(var(--primary))",
  sparkSize = 8,
  sparkRadius = 18,
  sparkCount = 8,
  duration = 420,
  easing = "ease-out",
  extraScale = 1,
  children,
}: ClickSparkProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparksRef = useRef<Spark[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const resizeCanvas = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(window.innerWidth * pixelRatio));
      canvas.height = Math.max(1, Math.round(window.innerHeight * pixelRatio));
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    const ease = (value: number) => {
      switch (easing) {
        case "linear":
          return value;
        case "ease-in":
          return value * value;
        case "ease-in-out":
          return value < 0.5 ? 2 * value * value : -1 + (4 - 2 * value) * value;
        default:
          return value * (2 - value);
      }
    };

    const getResolvedSparkColor = () => {
      if (sparkColor !== "theme") return sparkColor;
      const themeColor = getComputedStyle(document.documentElement).getPropertyValue("--click-spark-color").trim();
      return themeColor ? `hsl(${themeColor})` : "hsl(339 78% 48%)";
    };

    const draw = (timestamp: number) => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      context.lineCap = "round";
      context.lineWidth = 1.5;
      const resolvedSparkColor = getResolvedSparkColor();

      sparksRef.current = sparksRef.current.filter((spark) => {
        const progress = (timestamp - spark.startTime) / duration;
        if (progress >= 1) return false;

        const eased = ease(Math.max(0, progress));
        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);
        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        context.strokeStyle = resolvedSparkColor;
        context.globalAlpha = 1 - eased;
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
        context.globalAlpha = 1;
        return true;
      });

      if (sparksRef.current.length > 0) {
        animationFrameRef.current = requestAnimationFrame(draw);
      } else {
        animationFrameRef.current = null;
      }
    };

    const startAnimation = () => {
      if (animationFrameRef.current === null) {
        animationFrameRef.current = requestAnimationFrame(draw);
      }
    };

    (canvas as HTMLCanvasElement & { startAnimation?: () => void }).startAnimation = startAnimation;

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    };
  }, [duration, easing, extraScale, sparkColor, sparkRadius, sparkSize]);

  const handleClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const now = performance.now();
    sparksRef.current.push(
      ...Array.from({ length: sparkCount }, (_, index) => ({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        angle: (2 * Math.PI * index) / sparkCount,
        startTime: now,
      })),
    );

    (canvas as HTMLCanvasElement & { startAnimation?: () => void }).startAnimation?.();
  }, [sparkCount]);

  const wrapperStyle: CSSProperties = {
    position: "relative",
    width: "100%",
    minHeight: "100vh",
  };

  return (
    <div style={wrapperStyle} onClick={handleClick}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
      {children}
    </div>
  );
};

export default ClickSpark;

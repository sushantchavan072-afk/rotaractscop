import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type AnalyticsEvent = {
  name: string;
  path: string;
  title: string;
  referrer: string;
  timestamp: string;
};

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
};

const trackPageView = (path: string) => {
  if (navigator.doNotTrack === "1") return;

  const payload: AnalyticsEvent = {
    name: "page_view",
    path,
    title: document.title,
    referrer: document.referrer,
    timestamp: new Date().toISOString(),
  };
  const analyticsWindow = window as AnalyticsWindow;

  analyticsWindow.dataLayer?.push({ event: payload.name, page_path: payload.path, page_title: payload.title });
  analyticsWindow.gtag?.("event", payload.name, { page_path: payload.path, page_title: payload.title });
  analyticsWindow.plausible?.("pageview", { props: { path: payload.path, title: payload.title } });

  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT as string | undefined;
  if (!endpoint) return;

  const body = JSON.stringify(payload);
  if (navigator.sendBeacon) {
    navigator.sendBeacon(endpoint, new Blob([body], { type: "application/json" }));
  } else {
    void fetch(endpoint, { method: "POST", body, headers: { "Content-Type": "application/json" }, keepalive: true });
  }
};

const Analytics = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    trackPageView(`${pathname}${search}`);
  }, [pathname, search]);

  return null;
};

export default Analytics;

import brandscapeImage from "@/assets/Events/BRANDSCAPE.jpeg";
import paintscapeImage from "@/assets/Events/PAINTSCAPE.jpeg";

export const EVENTS_DATA = [
  {
    title: "Paintscape",
    date: "July 1, 2026",
    month: "July",
    time: "11 AM",
    avenue: "CSD",
    location: "Shaniwarwada Premises",
    attendees: "26 Rotaractors attended · 8 participating clubs",
    status: "Completed",
    description: "A creative painting experience designed to bring members together through colour, imagination, and shared expression.",
    image: paintscapeImage,
  },
  {
    title: "Brandscape",
    date: "July 26, 2026",
    month: "July",
    time: "10.00 AM onwards",
    avenue: "PDD & PRO Initiative",
    location: "Chandrakant Darode School",
    attendees: "40+ participants",
    status: "Completed",
    description: "A brand and communication-focused experience exploring creative identity, storytelling, and the ideas that shape how organisations connect with people.",
    image: brandscapeImage,
  },
] as const;

export type Event = typeof EVENTS_DATA[number];

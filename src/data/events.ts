import brandscapeImage from "@/assets/Events/BRANDSCAPE.jpeg";
import paintscapeImage from "@/assets/Events/PAINTSCAPE.jpeg";
import ananddayiShanivarImage from "@/assets/Events/आनंददायीशनिवार.jpeg";
import innerExcellenceImage from "@/assets/Events/inner excellence.jpeg";
import shuttleShowdownImage from "@/assets/Events/SHUTTLE SHOWDOWN.jpeg";

export const EVENTS_DATA = [
  {
    title: "Paintscape",
    date: "July 1, 2026",
    month: "July",
    time: "11.00 AM",
    avenue: "CSD",
    location: "Shaniwarwada Premises",
    attendees: "26 Rotaractors · 8 participating clubs",
    status: "Completed",
    description: "A creative painting experience designed to bring members together through colour, imagination, and shared expression.",
    image: paintscapeImage,
  },
  {
    title: "Brandscape",
    date: "July 26, 2026",
    month: "July",
    time: "10.00 AM",
    avenue: "PDD & PRO",
    location: "Chandrakant Darode School",
    attendees: "40+",
    status: "Completed",
    description: "A brand and communication-focused experience exploring creative identity, storytelling, and the ideas that shape how organisations connect with people.",
    image: brandscapeImage,
  },
  {
    title: "आनंददायी शनिवार",
    date: "August 22, 2026",
    month: "August",
    time: "7.45 AM – 12.00 PM",
    avenue: "PDD, PAO, CSD, CMD, ISD, DEI & RRRO",
    location: "Bandoji Khandoji Chavan High School, Dhayri",
    attendees: "20 Rotaractors · 200+ students",
    status: "Completed",
    description: "A Joyful Saturday is a multi-avenue community event bringing together Rotaract Club of Sinhgad College of Pharmacy and Rotary Club of Pune Nanded City. Featuring service activities, creative sessions, learning, and community engagement across 7 avenues, the event aims to create a meaningful day filled with service, creativity, learning & smiles.",
    image: ananddayiShanivarImage,
  },
    {
    title: "Inner Excellence",
    date: "September 06, 2026",
    month: "September",
    time: "11.30 AM",
    avenue: "PAO,PDD,CMD",
    location: "SCOP, Seminar School",
    attendees: "-",
    status: "Completed",
    description: "Inner Excellence is an interactive professional development session with BK Mitali, focusing on self-awareness, confidence, stress management, leadership, and balancing ambition with happiness.",
    image: innerExcellenceImage,
  },
  {
    title: "Shuttle Showdown (Badminton)",
    date: "October 1, 2026",
    month: "October",
    time: "11.00 AM – 2.00 PM",
    avenue: "PRO, CSD & SD",
    location: "Nahata Sports Complex",
    attendees: "20+ members",
    status: "Completed",
    description: "Get ready for Shuttle Showdown, a lively badminton event bringing Rotaractors together for friendly competition, great rallies, and plenty of team spirit. Join us on court for an energetic day of sport and fellowship.",
    image: shuttleShowdownImage,
  },
] as const;

export type Event = typeof EVENTS_DATA[number];

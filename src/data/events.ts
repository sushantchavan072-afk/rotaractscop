import brandscapeImage from "@/assets/Events/BRANDSCAPE.jpeg";
import paintscapeImage from "@/assets/Events/PAINTSCAPE.jpeg";
import ananddayiShanivarImage from "@/assets/Events/आनंददायीशनिवार.jpeg";

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
] as const;

export type Event = typeof EVENTS_DATA[number];

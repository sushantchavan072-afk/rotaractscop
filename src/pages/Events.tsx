import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock, Tag } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { motion } from "framer-motion";

// =====================================================
// EVENTS DATA - Edit this section to add/update events
// =====================================================

const EVENTS_DATA = [
  {
    title: "Mega Interclub Collab",
    date: "July 12, 2025",
    month: "July",
    time: "8:45 AM to 2:00 PM",
    avenue: "PDD, PAO, CMD, ISD, DEI",
    location: "Shri Shivaji Vidyalay, Nasrapur",
    attendees: "15",
    status: "Past",
    description: "A comprehensive developmental programme designed to support 10th and 12th standard students. Featured soft skills session 'Confidence to Competence' by PAO Rtr. Arya Chavan and WRWC Rtr. Palak, 'Dream, Decide, Deliver' career guidance by Rtr. Mrunal Potharkar, 'Values and Responsibilities - Ethics and Civic Sense' by Rtr. Pragama, and a session on Diversity, Equity, and Inclusivity by Rtr. Jagruti Dave.",
    image: "https://i.ibb.co/JFnRxw3f/NASRAPUR.jpg&w=1600&auto=format&fit=crop",
  },
  {
    title: "Netrutva NXT",
    date: "July 13, 2025",
    month: "July",
    time: "2:00 PM to 5:00 PM",
    avenue: "PDD",
    location: "Seminar Hall SCOP",
    attendees: "21",
    status: "Past",
    description: "Professional readiness session led by Mrs. Radhika Supale covering resume building, LinkedIn profile optimization, networking, and personal branding. Concluded with interactive Q&A and structured feedback for personalized career guidance.",
    image: "https://i.ibb.co/8yvZwLw/NETRUTVANXT.jpg&w=1600&auto=format&fit=crop",
  },
  {
    title: "Club Orientation",
    date: "July 16, 2025",
    month: "July",
    time: "2:00 PM to 4:30 PM",
    avenue: "NA",
    location: "Seminar Hall SCOP",
    attendees: "24",
    status: "Past",
    description: "Welcome session facilitated by Rtr. Disha Daga introducing Rotary and Rotaract values, the Four-Way Test, Rotaract Protocols, and the importance of different Avenues for leadership, service, and personal growth.",
    image: "https://i.ibb.co/R4zgwzf2/ORIENTATION.jpg&w=1600&auto=format&fit=crop",
  },
  {
    title: "Pranic Healing",
    date: "July 20, 2025",
    month: "July",
    time: "10:50 AM to 12:30 PM",
    avenue: "PDD",
    location: "Chandrakant Darode School",
    attendees: "13",
    status: "Past",
    description: "Co-hosted by four Rotaract clubs featuring speaker Mr. Vijay Khanke, introducing energy-based healing as a non-invasive complementary practice. Included interactive healing practicals and Q&A sessions on holistic wellbeing.",
    image: "https://i.ibb.co/MytZqK4K/PRANIC-HEALING.jpg&w=1600&auto=format&fit=crop",
  },
  {
    title: "Play Point",
    date: "July 31, 2025",
    month: "July",
    time: "4:30 PM to 5:30 PM",
    avenue: "CSD",
    location: "SVCP Canteen, Sinhgad Campus",
    attendees: "13",
    status: "Past",
    description: "A fun bonding event opened by Rtr. Shubhangi where members engaged in UNO games divided into two groups with dedicated referees, fostering relaxation, team spirit, and friendly competitiveness.",
    image: "https://i.ibb.co/n8nTjrrk/PLAYPOINT.jpg&w=1600&auto=format&fit=crop",
  },
  {
    title: "Nanha Salam Part 1",
    date: "August 2, 2025",
    month: "August",
    time: "2:06 PM to 5:10 PM",
    avenue: "CMD",
    location: "The Saint Mary Society",
    attendees: "10",
    status: "Past",
    description: "Raksha Bandhan celebration with children at Saint Mary Society School in collaboration with RC Pune Katraj. Crafted seed-embedded Rakhis that grow into fruit-bearing plants, distributed stationery kits, and promoted sustainability and nature conservation.",
    image: "https://i.ibb.co/8gkxMyg1/NS1.jpg&w=1600&auto=format&fit=crop",
  },
  {
    title: "Movie Bonding",
    date: "August 5, 2025",
    month: "August",
    time: "6:30 PM to 9:30 PM",
    avenue: "CSD",
    location: "City Pride, Kothrud",
    attendees: "11",
    status: "Past",
    description: "Collective screening of Mahavatar Narsimha creating a shared spiritual and cultural experience with interval reflections and a concluding feedback and review segment.",
    image: "https://i.ibb.co/Jj661BF0/M-BONDING.jpg&w=1600&auto=format&fit=crop",
  },
  {
    title: "Nanha Salam Part II",
    date: "August 9, 2025",
    month: "August",
    time: "12:13 PM to 1:45 PM",
    avenue: "CMD",
    location: "ALC, Pune",
    attendees: "9",
    status: "Past",
    description: "Heartfelt Raksha Bandhan celebration with soldiers at the Artificial Limb Centre of Pune in collaboration with RC Pune Katraj. Tied handmade seed-embedded Rakhis and shared inspiring stories of resilience and sacrifice.",
    image: "https://i.ibb.co/B29dWnjr/NS2.jpg&w=1600&auto=format&fit=crop",
  },
  {
    title: "Sacred Bonds: Siblings Love",
    date: "August 15, 2025",
    month: "August",
    time: "2:00 PM to 3:00 PM",
    avenue: "CSD",
    location: "ISCKON TEMPLE",
    attendees: "9",
    status: "Past",
    description: "Open forum where members from RCSCOP and RC Pune Katraj shared personal childhood stories centered around siblings and cherished Raksha Bandhan memories, fostering deep emotional connections and camaraderie.",
    image: "https://i.ibb.co/fYBk8tJ7/nanha-pt2.jpg&w=1600&auto=format&fit=crop&w=1600&auto=format&fit=crop",
  },
  {
    title: "Club Assembly",
    date: "August 11, 2025",
    month: "August",
    time: "6:00 PM to 7:35 PM",
    avenue: "NA",
    location: "Aura Celestia",
    attendees: "18",
    status: "Past",
    description: "Formal governance convening covering Club Bylaws, handover letters, Master Budget presentation with Sponsor Rotary fellowship, Board of Directors plans, and strategic reviews by AZR Rtr. Prayuja Patil.",
    image: "https://i.ibb.co/20GpHXVB/ASSEMBLY.jpg&w=1600&auto=format&fit=crop",
  },
  {
    title: "Rescue Rhythms",
    date: "August 12, 2025",
    month: "August",
    time: "10:30 AM to 12:30 PM",
    avenue: "PDD",
    location: "Seminar Hall, SCOP",
    attendees: "11",
    status: "Past",
    description: "Disaster management and first aid session by Dr. Rajkumar Shah with hands-on CPR demonstration on realistic dummies — 30 compressions at 100-120 bpm paired with two breaths — for life-saving competencies.",
    image: "https://i.ibb.co/4Zv02bZ6/RESCUE-RHYTHMS.jpg&w=1600&auto=format&fit=crop",
  },
  {
    title: "Youth In Action",
    date: "August 13, 2025",
    month: "August",
    time: "10:00 AM to 11:00 AM",
    avenue: "DEI",
    location: "001 Classroom, Sinhgad College Of Pharmacy",
    attendees: "11",
    status: "Past",
    description: "International Youth Day elocution competition empowering student voices on youth leadership, innovation, social justice, and inclusive change. Assessed by two impartial judges on content depth, delivery, and persuasive power.",
    image: "https://i.ibb.co/BHcR3hD8/Youth-In-Action.png&w=1600&auto=format&fit=crop",
  },
  {
    title: "Krishna Janmashtami Seva",
    date: "August 16, 2025",
    month: "August",
    time: "11:30 AM to 2:00 PM",
    avenue: "CMD",
    location: "ISKCON Temple Kondhwa, Pune",
    attendees: "12",
    status: "Past",
    description: "Temple Seva event with darshan, preparing fasting meals, collective prayers, inspiring lecture, temple cleaning, devotional Kirtan with fellow devotees, and shared Prasadam.",
    image: "https://i.ibb.co/8DmCMS35/ISKON.jpg&w=1600&auto=format&fit=crop",
  },
  {
    title: "The Red Rise",
    date: "August 16, 2025",
    month: "August",
    time: "8:00 PM to 9:30 PM",
    avenue: "PDD & CMD",
    location: "Online Google Meet",
    attendees: "11",
    status: "Past",
    description: "Enlightening session by Dr. Harshhini Lakshminarayana on haemoglobin, anaemia causes, iron-rich foods, vitamin C for absorption, self-check for Hb levels, and blood donation awareness for Mahadaan 11:0.",
    image: "https://i.ibb.co/PZ5HWHsX/red.jpg&w=1600&auto=format&fit=crop",
  },
  {
    title: "Teachers Day Celebration",
    date: "September 11, 2025",
    month: "September",
    time: "4:00 PM to 5:45 PM",
    avenue: "DEI & PDD",
    location: "Seminar Hall, Sinhgad College Of Pharmacy",
    attendees: "11",
    status: "Past",
    description: "Teacher felicitation by Principal Dr. Rajesh Patil with heartfelt handwritten thank-you notes and interactive games like Dumb Charades, Musical Chairs, and Guess the Song.",
    image: "https://i.ibb.co/63Sx61f/TEACHERS-DAY.jpg&w=1600&auto=format&fit=crop",
  },
  {
    title: "Club Installation",
    date: "September 19, 2025",
    month: "September",
    time: "3:18 PM to 5:18 PM",
    avenue: "NA",
    location: "Seminar Hall, Sinhgad College Of Pharmacy",
    attendees: "33",
    status: "Past",
    description: "Formal installation ceremony with President and Secretary addresses, new member induction by DRR, Board of Directors installation, Guest of Honour Rtr. Anant Tope, Mr. Prashant Mali, and Chief Guest PHF DRR Rtr. Dwijesh Nashikkour. Featured musical performance by Mr. Shubham.",
    image: "https://images.unsplash.com/photo-1772421956241-7a76bd9f65a8?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1600&auto=format&fit=crop",
  },
  {
    title: "Pharma Pulse Rally",
    date: "September 25, 2025",
    month: "September",
    time: "11:00 AM to 12:00 PM",
    avenue: "CMD, PDD, DEI",
    location: "Sinhgad Campus",
    attendees: "17",
    status: "Past",
    description: "Awareness rally with around 150 participants promoting the vital role of pharmacists in society. Students carried vibrant placards, raised slogans, and interacted with onlookers about safe medicine use and healthcare.",
    image: "https://i.ibb.co/hRbY3hwd/PHARMAPULSE.jpg&w=1600&auto=format&fit=crop",
  },
  {
    title: "Beyond The Blister Pack",
    date: "September 25, 2025",
    month: "September",
    time: "2:00 PM to 4:30 PM",
    avenue: "PDD & PAO",
    location: "Seminar Hall, SCOP",
    attendees: "16",
    status: "Past",
    description: "Career advancement session with Chief Guest Mr. Sagar Paygude and Principal Dr. Rajesh Patil. Featured interactive career advancement session on networking, mentorship, interview preparation, and certificate distribution.",
    image: "https://i.ibb.co/9S9740K/bbb-s.jpg&w=1600&auto=format&fit=crop",
  },
  {
    title: "Scribble and Song Trivia",
    date: "October 4, 2025",
    month: "October",
    time: "7:00 PM to 9:00 PM",
    avenue: "CSD",
    location: "Online Google Meet",
    attendees: "16",
    status: "Past",
    description: "Creative Scribble Rounds ignited artistic flair as participants sketched with enthusiasm, while lively Song Trivia sparked musical passion and team spirit through guessing challenges. A resounding success full of fresh learning experiences.",
    image: "https://i.ibb.co/Y4LfhVj7/ssnst.jpg",
  },
  {
    title: "Back To Childhood",
    date: "October 9, 2025",
    month: "October",
    time: "12:00 PM to 2:30 PM",
    avenue: "CSD",
    location: "Sinhgad College of Pharmacy Parking",
    attendees: "17",
    status: "Past",
    description: "Nostalgic event featuring beloved childhood games including the thrilling Knock Game and exuberant Break the Chain challenge, concluding with a heartfelt Reflection and Sharing Circle of cherished childhood memories.",
    image: "https://i.ibb.co/Q7qyLvXW/back-to-childhood.jpg&w=1600&auto=format&fit=crop",
  },
  {
    title: "Diwali Pahat",
    date: "October 17, 2025",
    month: "October",
    time: "5:30 AM to 9:00 AM",
    avenue: "RRRO",
    location: "Amphitheatre, Nanded City",
    attendees: "14",
    status: "Past",
    description: "Grand Diwali celebration in collaboration with Rotary Club of Pune Nanded City, drawing over 3,000 participants. Featured volunteering, a mesmerizing solo concert by renowned singer Arya Ambekar and band, sponsor felicitations, and community spirit.",
    image: "https://i.ibb.co/ksGW8VCM/diwali.jpg&w=1600&auto=format&fit=crop",
  },
  {
    title: "Unshakable Spirits",
    date: "October 31, 2025",
    month: "October",
    time: "3:00 PM to 5:00 PM",
    avenue: "PDD",
    location: "Cultural Centre, Sinhgad College of Pharmacy",
    attendees: "17",
    status: "Past",
    description: "Event centred on cultivating a resilient mindset through the FOCUS theme. Members shared profound reflections on harnessing resilience to surmount obstacles, adapt to change, and catalyze personal evolution.",
    image: "https://i.ibb.co/Y4JsQ3Wk/unshake.jpg&w=1600&auto=format&fit=crop",
  },
  {
    title: "DZR Visit",
    date: "November 2, 2025",
    month: "November",
    time: "5:20 PM to 6:30 PM",
    avenue: "NA",
    location: "Seminar Hall",
    attendees: "22",
    status: "Past",
    description: "Exemplary governance event with official document presentation to ZRS, insightful member discussions, and reviews by District Council Members Rtr. Salvin, Rtr. Vaibhav, Rtr. Prayuja, and Rtr. Abhishek.",
    image: "https://i.ibb.co/pBS9WQ9H/IMG-20251102-WA0029.jpg&w=1600&auto=format&fit=crop",
  },
  {
    title: "Unmasking Lung Cancer",
    date: "November 13, 2025",
    month: "November",
    time: "8:00 PM to 8:45 PM",
    avenue: "PDD, CMD",
    location: "Online Google Meet",
    attendees: "14",
    status: "Past",
    description: "Powerful awareness initiative co-hosted with RC GL Bajaj and 35+ collaborating clubs. Covered lung cancer causes, prevention, early detection, treatment options, and myth-busting through expert talks and interactive discussions.",
    image: "https://i.ibb.co/b5RGYf4z/lung.jpg&w=1600&auto=format&fit=crop",
  },
  {
    title: "Gentlemen in Frame",
    date: "November 19-26, 2025",
    month: "November",
    time: "08 Days",
    avenue: "DEI x PRO",
    location: "Instagram",
    attendees: "12",
    status: "Past",
    description: "One-of-a-kind International Men's Day DEI initiative — the only one in District 3131. Eight distinguished female office bearers shared heartfelt one-minute videos appreciating men who made a positive impact in their lives, promoting gender inclusivity and emotional awareness.",
    image: "https://i.ibb.co/N26kMRpy/flow.png&w=1600&auto=format&fit=crop",
  },
  {
    title: "Productivity Palooza",
    date: "November 29, 2025",
    month: "November",
    time: "12:05 PM to 1:30 PM",
    avenue: "PDD",
    location: "Online Google Meet",
    attendees: "13",
    status: "Past",
    description: "Professional Development event co-hosted with RC ROAR NIBM and multiple clubs. Focused on soft skills, effective communication, emotional intelligence, and maintaining a balanced lifestyle for personal and professional growth.",
    image: "https://i.ibb.co/rGQ5Yz31/productibity.jpg&w=1600&auto=format&fit=crop",
  },
  {
    title: "Fun Break",
    date: "December 19, 2025",
    month: "December",
    time: "8:00 PM to 9:30 PM",
    avenue: "CSD",
    location: "Online Google Meet",
    attendees: "12",
    status: "Past",
    description: "Interactive 'Guess the Person' game with two teams answering sentence-based questions with one-word clues. Covered Bollywood actors, mythological figures, and famous personalities with gradually increasing difficulty.",
    image: "https://i.ibb.co/bMSgkrs1/Whats-App-Image-2026-03-06-at-21-58-11.jpg",
  },
  {
    title: "Food Donation Drive",
    date: "December 26, 2025",
    month: "December",
    time: "01:30 PM to 3:30 PM",
    avenue: "CMD, ISD, DEI",
    location: "Karnabadhir Mulanchi Shala, Dhayari",
    attendees: "12",
    status: "Past",
    description: "As part of the Global Service Project – Food Donation Drive, Rotaractors came together in a meaningful intra-club collaboration under the Avenues of Diversity, Equity & Inclusion (DEI), International Service (ISD) and Community Service (CMD) to serve children at a school for the deaf and mute. The initiative stood as a reminder that true service lies not only in giving, but in understanding and connecting.",
    image: "https://i.ibb.co/tMKtGXRW/11.png&w=1600&auto=format&fit=crop",
  },
  {
    title: "Bachpan Ki Udaan",
    date: "December 26, 2025",
    month: "December",
    time: "11:00 AM to 12:30 PM",
    avenue: "ISD",
    location: "Karnabadhir Mulanchi Shala, Dhayari",
    attendees: "12",
    status: "Past",
    description: "Under the ISD Avenue, we hosted an inclusive art workshop for children with hearing and speech impairments. Pre-printed sheets featuring outlines of characters, cartoons, and creative sketches were distributed to each child, who then brought them to life using watercolour paints. With the hands-on support of our dedicated members and staff, the children expressed themselves freely through colour and creativity, transcending all barriers of communication. The activity sparked imagination and provided a joyful, confidence-building experience for every participant. A beautiful reminder that the language of art speaks to everyone, regardless of ability.",
    image: "https://i.ibb.co/YBshcgKP/Whats-App-Image-2026-03-06-at-22-07-34.jpg",
  },
  {
    title: "Picture Your Future",
    date: "December 29, 2025",
    month: "December",
    time: "9.00: PM to 10:00 PM",
    avenue: "PDD",
    location: "Google Meet",
    attendees: "12",
    status: "Past",
    description: "Under the PDD Avenue, members came together for an inspiring Personal Development session — Picture Your Future. Each member crafted their own vision board, mapping out their goals, dreams, and aspirations while gaining a deeper understanding of the power of manifestation and intentional living. The activity encouraged members to reflect on their personal and professional ambitions, fostering a positive and motivated mindset within the club. It was an engaging and thought-provoking session that reminded everyone that clarity of vision is the first step towards achieving success..",
    image: "https://i.ibb.co/tpnngNFM/pyf.jpg",
  },
  {
    title: "Tomorrow’s Peacemakers",
    date: "January 17, 2025",
    month: "January",
    time: "9:30 PM to 10:30 PM",
    avenue: "CMD",
    location: "Kanya Prashala",
    attendees: "11",
    status: "Past",
    description: "Under the CMD Avenue, we organised an Essay Writing Competition for Grade 7 girls from Kanya Prashala, centered around the themes of Peacebuilding and Conflict Resolution. Participants were given thoughtfully chosen topics that encouraged them to reflect on harmony, dialogue, and the importance of resolving conflicts peacefully. The girls enthusiastically put their thoughts to paper, submitting well-articulated essays that showcased remarkable maturity and awareness. After careful evaluation, three outstanding winners were selected and felicitated, celebrating their efforts and intellect. The event beautifully nurtured young voices and inspired the next generation to think beyond boundaries and embrace peace.",
    image: "https://i.ibb.co/NgxJBQ5R/tp.jpg",
  },
  {
    title: "Sneha – Clothes Donation Drive",
    date: "January 18, 2025",
    month: "January",
    time: "03:00 PM to 03:55 PM",
    avenue: "CMD, ISD",
    location: "SCOP, Pune",
    attendees: "11",
    status: "Past",
    description: "Under the CMD & ISD Avenue, our members actively collected and contributed clothing, gathering 25+ bags of garments for those in need. The collected clothes were donated to Adarsh Pratishthan NGO, ensuring they reached underprivileged individuals and families who truly need them. Members took personal initiative in collecting and organising the donations, making the drive a wholehearted club effort. The event was a powerful demonstration of unity and empathy, as every bag collected brought warmth and dignity to someone deserving a better tomorrow.",
    image: "https://i.ibb.co/cS5mLr67/sn.jpg",
  },
  {
    title: "Where Diversity Meets Design",
    date: "January 21, 2025",
    month: "January",
    time: "11:00 AM to 02:30 PM",
    avenue: "DEI",
    location: "Bharati Vidyapeeth",
    attendees: "12",
    status: "Past",
    description: "Under the DEI Avenue, our members visited a captivating Art Exhibition, immersing themselves in a rich tapestry of creative expression. Each piece of art told a unique story, and members connected with the works on deeply personal levels, reflecting on diverse perspectives and human experiences. The visit was a meaningful reminder of how art bridges differences, celebrates diversity, and fosters empathy - core values that lie at the heart of everything we do.",
    image: "https://i.ibb.co/pBLWMSZX/pottery.jpg",
  },
  {
    title: "Pottery Workshop",
    date: "January 24, 2025",
    month: "January",
    time: "12:30 PM to 03:00 PM",
    avenue: "CSD",
    location: "Bharati Vidyapeeth",
    attendees: "12",
    status: "Past",
    description: "Under the Club Service Avenue, our members rolled up their sleeves and got their hands beautifully dirty at an engaging Pottery Making Workshop! From shaping elegant pots to crafting decorative plates and more, members discovered the meditative joy of working with clay, channeling their creativity into tangible works of art. Beyond the craft itself, the workshop became a wonderful space for members to laugh and bond - strengthening friendships and club camaraderie in the most organic way possible. The rhythmic whirl of the potter's wheel and the earthy texture of clay created an atmosphere that was both calming and exhilarating. A perfect blend of creativity, mindfulness, and togetherness - the workshop reminded everyone that sometimes, the best connections are made when we create something with our own hands.",
    image: "https://i.ibb.co/v6rKyvgp/Whats-App-Image-2026-03-05-at-15-58-37.jpg",
  },
   {
    title: "Fun Brew",
    date: "January 27, 2025",
    month: "January",
    time: "02:00 PM to 05:30 PM",
    avenue: "CSD",
    location: "Crazy Cheesy",
    attendees: "11",
    status: "Past",
    description: "Under the CSD Avenue, members gathered for a delightful Fun Brew evening - sipping on warm cups of coffee and tea while engaging in lighthearted conversations and fun games. It was a relaxed, joyful setting that brought members closer, sparked laughter, and strengthened bonds over the simplest of pleasures - good company and a great brew!",
    image: "https://i.ibb.co/xKZ1PdfL/fb.jpg",
  },
   {
    title: "Trip Nova",
    date: "January 29, 2025",
    month: "January",
    time: "08:05 PM to 09:00 PM",
    avenue: "PDD",
    location: "Google Meet",
    attendees: "15",
    status: "Past",
    description: "Under the PDD Avenue, members embarked on a wonderful journey - without leaving the room! In this engaging storytelling session, members shared their personal travel experiences, from thrilling adventures and breathtaking destinations to unexpected mishaps and cherished memories. Every story opened a window to a different world, sparking wanderlust, laughter, and meaningful conversations. It was an evening filled with vivid tales that brought members closer through the universal love of exploration.",
    image: "https://i.ibb.co/4nfK91RH/tn.jpg",
  },
   {
    title: "Rota Bond",
    date: "January 30, 2025",
    month: "January",
    time: "04:00 PM to 5:30 PM",
    avenue: "RRRO",
    location: "Aura Celestia",
    attendees: "29",
    status: "Past",
    description: "our members came together with their sponsoring Rotary members for a vibrant and engaging interaction session, organised by the Rotary Rotaract Relations Officer. Through fun games and exciting activities, both Rotary and Rotaract members bonded, shared laughs, and forged stronger inter-club relationships. The event provided a wonderful platform for members to connect with their Rotary mentors beyond formalities, fostering a sense of belonging, mutual respect, and a shared passion for service - truly celebrating the spirit of the Rotary family.",
    image: "https://i.ibb.co/ZR8rtQn4/rr.jpg",
  },
   {
    title: "ConvoCraft",
    date: "February 27, 2025",
    month: "February",
    time: "05:00 PM to 06:30 PM",
    avenue: "PDD",
    location: "Nescafe SCOP",
    attendees: "17",
    status: "Past",
    description: "Under the PDD Avenue, members participated in an insightful and empowering session focused on handling difficult conversations with confidence. The session delved into practical strategies and techniques to approach challenging dialogues with clarity, composure, and assertiveness -whether in personal or professional settings. Members engaged actively, gaining valuable communication skills that will help them navigate tough situations with poise and empathy. It was a thought-provoking session that left every member better equipped to face difficult conversations head-on, turning challenges into opportunities for growth and understanding.",
    image: "https://i.ibb.co/QvWMWMcH/cc.jpg",
  },
];

// =====================================================
// END OF EDITABLE SECTION
// =====================================================

const Events = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [selectedAvenue, setSelectedAvenue] = useState<string>("all");
  const [selectedEvent, setSelectedEvent] = useState<typeof EVENTS_DATA[0] | null>(null);

  // Get unique months in order
  const monthOrder = ["July", "August", "September", "October", "November", "December", "January", "February", "March", "April", "May", "June"];
  const months = monthOrder.filter(month => EVENTS_DATA.some(event => event.month === month));

  // Get unique avenues
  const allAvenues = Array.from(new Set(
    EVENTS_DATA.flatMap(e => e.avenue.split(/[,&x]+/).map(a => a.trim()).filter(a => a && a !== "NA"))
  )).sort();

  // Filter events
  const filteredEvents = EVENTS_DATA.filter(event => {
    const matchesMonth = selectedMonth === "all" || event.month === selectedMonth;
    const matchesAvenue = selectedAvenue === "all" || event.avenue.includes(selectedAvenue);
    return matchesMonth && matchesAvenue;
  });

  const EventCard = ({ event, index }: { event: typeof EVENTS_DATA[0]; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.1, ease: "easeOut" as const }}
    >
      <Card 
        className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group sm:hover:scale-105"
        onClick={() => setSelectedEvent(event)}
      >
        <div className="relative h-40 sm:h-48 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{event.attendees}</span>
            </div>
            {event.avenue && event.avenue !== "NA" && (
              <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="truncate max-w-[80px] sm:max-w-[100px]">{event.avenue}</span>
              </div>
            )}
          </div>
          <h3 className="text-base sm:text-xl font-semibold mb-2 sm:mb-3 line-clamp-2">{event.title}</h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 line-clamp-2">{event.description}</p>
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <>
    <div className="min-h-screen py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
          className="text-center mb-10 sm:mb-16"
        >
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6">Events</h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" as const }}
            className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Discover our activities and achievements.
          </motion.p>
        </motion.div>

        {/* Filters */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by Month" />
            </SelectTrigger>
            <SelectContent className="bg-background z-50">
              <SelectItem value="all">All Months</SelectItem>
              {months.map(month => (
                <SelectItem key={month} value={month}>{month}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedAvenue} onValueChange={setSelectedAvenue}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by Avenue" />
            </SelectTrigger>
            <SelectContent className="bg-background z-50">
              <SelectItem value="all">All Avenues</SelectItem>
              {allAvenues.map(avenue => (
                <SelectItem key={avenue} value={avenue}>{avenue}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredEvents.map((event, index) => (
              <EventCard key={index} event={event} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No events found for the selected filters.</p>
          </div>
        )}
      </div>
    </div>

    {/* Event Details Dialog */}
    <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto mx-2 sm:mx-auto">
        {selectedEvent && (
          <>
            <div className="relative h-48 sm:h-80 -mx-6 -mt-6 mb-4 sm:mb-6 overflow-hidden">
              <img 
                src={selectedEvent.image} 
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <DialogTitle className="text-xl sm:text-3xl font-bold text-foreground">{selectedEvent.title}</DialogTitle>
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-muted-foreground text-sm">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <span className="font-medium">{selectedEvent.date}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <span className="font-medium">{selectedEvent.time}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <span className="font-medium">{selectedEvent.location}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <span className="font-medium">{selectedEvent.attendees} Attendees</span>
                </div>
                {selectedEvent.avenue && selectedEvent.avenue !== "NA" && (
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Tag className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    <span className="font-medium">Avenue: {selectedEvent.avenue}</span>
                  </div>
                )}
              </div>
              <div className="prose prose-sm sm:prose-lg max-w-none">
                <p className="text-foreground leading-relaxed text-sm sm:text-lg">
                  {selectedEvent.description}
                </p>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
    </>
  );
};

export default Events;

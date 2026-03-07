import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Briefcase, Users, Heart, Megaphone, Image, Handshake, Globe } from "lucide-react";

const avenues = [
  {
    title: "Professional Development",
    abbr: "PDD",
    icon: Briefcase,
    description: "Empowering members through skill-building workshops, career guidance sessions, and industry exposure to foster professional growth.",
    events: ["Netrutva NXT GBM", "Pranic Healing", "Rescue Rhythms", "Unshakable Spirits", "Unmasking Lung Cancer", "Productivity Palooza", "Beyond The Blister Pack"],
  },
  {
    title: "Diversity, Equity & Inclusivity",
    abbr: "DEI",
    icon: Users,
    description: "Promoting an inclusive environment where every voice is valued, championing equal opportunity and celebrating diverse perspectives.",
    events: ["Youth In Action", "Teachers Day Celebration", "Gentlemen in Frame", "Pharma Pulse Rally"],
  },
  {
    title: "Community Service",
    abbr: "CMD",
    icon: Heart,
    description: "Creating meaningful impact through hands-on service projects that address real needs in our local community.",
    events: ["Mega Interclub Collab", "Nanha Salam Part 1", "Nanha Salam Part II", "Krishna Janmashtami Seva", "The Red Rise", "Pharma Pulse Rally"],
  },
  {
    title: "Public Relations",
    abbr: "PRO",
    icon: Megaphone,
    description: "Building and maintaining strong relationships with the media, stakeholders, and the wider community to amplify our mission.",
    events: ["Gentlemen in Frame"],
  },
  {
    title: "Public Image",
    abbr: "PIO",
    icon: Image,
    description: "Crafting the club's visual identity and digital presence to ensure our story reaches and inspires a broader audience.",
    events: [],
  },
  {
    title: "Club Service",
    abbr: "CSD",
    icon: Handshake,
    description: "Strengthening internal fellowship, organizing bonding activities, and ensuring a thriving club culture for all members.",
    events: ["Club Orientation", "Play Point", "Movie Bonding", "Club Assembly", "Scribble and Song Trivia", "Back To Childhood", "Fun Break", "DZR Visit", "Club Installation"],
  },
  {
    title: "International Service",
    abbr: "ISD",
    icon: Globe,
    description: "Connecting with Rotaract clubs worldwide to foster cross-cultural understanding and collaborate on global service initiatives.",
    events: ["Mega Interclub Collab"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" as const },
  }),
};

const Avenue = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Avenues of Service</h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" as const }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Our seven avenues of service guide every initiative we undertake.
          </motion.p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {avenues.map((avenue, index) => {
            const Icon = avenue.icon;
            return (
              <motion.div
                key={avenue.abbr}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                custom={index}
              >
                <Card className="h-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold">{avenue.title}</h3>
                      <Badge variant="secondary" className="text-xs">{avenue.abbr}</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
                      {avenue.description}
                    </p>
                    {avenue.events.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                          Past Events
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {avenue.events.map((event) => (
                            <Badge key={event} variant="outline" className="text-xs font-normal">
                              {event}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Avenue;

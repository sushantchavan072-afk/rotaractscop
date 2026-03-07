import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import clubLogo from "@/assets/logo.png";

const memberImages: Record<string, string> = {
  "Rtr. Pragama Magotra": "https://i.ibb.co/3yp77QmS/Pragama.png",
  "Rtr. Prerna Bhilare": "https://i.ibb.co/9m1Zxg8q/Prerna.png",
  "Rtr. Pradnya Gaikar": "https://i.ibb.co/s921stS8/installation.png",
  "Rtr. Arya Londhe": "https://i.ibb.co/bgSm9CXp/Arya-londhe.png",
  "Rtr. Vaishnavi Kharat": "https://i.ibb.co/cXFwjVZk/Whats-App-Image-2026-03-04-at-17-26-57.jpg",
};
import type { Leader } from "./MessagesTab";

const coreMembers = [
  {
    name: "Rtr. Pragama Magotra",
    position: "President",
    joiningDate: "June 2025",
    message:
      "Pragama: As the President, I see leadership as a commitment to serve with integrity, lead with vision, and stand firmly with my team. I am dedicated to fostering transparency, encouraging innovation, and creating opportunities where every member can grow and contribute meaningfully. Together, we will not only achieve our goals but set new benchmarks of excellence and impact. ",
  },
  {
    name: "Rtr. Prerna Bhilare",
    position: "Secretary",
    joiningDate: "June 2025",
    message:
      "As Secretary, my commitment goes beyond records and meetings - I aspire to be the backbone of seamless communication, bridging our Board, members, and community with clarity and purpose. I see this role as a strategic partnership in our club's growth. My vision is to build transparent processes, maintain accountability at every level, and create channels where every member feels heard. I believe structured systems don't constrain creativity - they unleash it. Who I am is simple: a dedicated Rotaractor — calm under pressure, meticulous in execution, and unwavering in commitment to our shared goals. My ambition this year is to elevate our operational standards while nurturing the fellowship that defines us. Together, through consistent, purposeful action guided by integrity and fueled by passion - let us create a legacy worth remembering.",
  },
  {
    name: "Rtr. Pradnya Gaikar",
    position: "Vice President",
    joiningDate: "June 2025",
    message:
      "It is an honour to serve as the Vice President. Rotaract, to me, is more than a club - it is a movement. My vision is rooted in empowering youth to lead with purpose, serving communities with sincerity, and growing together through every opportunity we create. Under the theme Seva Sangathan Parivartan, I believe each one of us holds the power to transform - our surroundings, our society, and ourselves. Let us serve. Let us rise..",
  },
  {
    name: "Rtr. Arya Londhe",
    position: "Treasurer",
    joiningDate: "June 2025",
    message:
      "As the Treasurer of RC SCOP, I uphold the financial integrity and fiduciary responsibility of our club. I oversee budgeting, maintain meticulous records, and ensure transparent fiscal operations. Through prudent financial management, I support the successful execution of our initiatives and the club’s sustainable growth.",
  },
  {
    name: "Rtr. Vaishnavi Kharat",
    position: "IPP & Club Advisor",
    joiningDate: "June 2025",
    message:
      "Guiding our club with experience and wisdom from past leadership.",
  },
];

interface CoreMembersTabProps {
  onSelectLeader: (leader: Leader) => void;
}

const CoreMembersTab = ({ onSelectLeader }: CoreMembersTabProps) => (
  <div className="space-y-5">
    {coreMembers.map((member, index) => (
      <motion.div
        key={member.name}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
      >
        <Card
          className="shadow-lg border-border/50 hover:shadow-xl transition-all cursor-pointer hover:scale-[1.01] group"
          onClick={() =>
            onSelectLeader({
              name: member.name,
              title: member.position,
              photo: memberImages[member.name] || clubLogo,
              message: `${member.message}\n\nJoining Date: ${member.joiningDate}`,
            })
          }
        >
          <CardContent className="p-6 flex items-center gap-5">
            <Avatar className="h-14 w-14 border-2 border-primary/20 group-hover:border-primary/50 transition-colors">
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                {member.name
                  .replace("Rtr. ", "")
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-muted-foreground">{member.position}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    ))}
  </div>
);

export default CoreMembersTab;

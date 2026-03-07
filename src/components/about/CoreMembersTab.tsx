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
      "As President, I am committed to leading our club towards greater heights of service and fellowship.",
  },
  {
    name: "Rtr. Prerna Bhilare",
    position: "Secretary",
    joiningDate: "June 2025",
    message:
      "Dedicated to ensuring smooth operations and effective communication within our club.",
  },
  {
    name: "Rtr. Pradnya Gaikar",
    position: "Vice President",
    joiningDate: "June 2025",
    message:
      "Supporting our President and ensuring continuity in our club's vision and mission.",
  },
  {
    name: "Rtr. Arya Londhe",
    position: "Treasurer",
    joiningDate: "June 2025",
    message:
      "Managing our club's finances with transparency and responsibility.",
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

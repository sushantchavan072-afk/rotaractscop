import { AnimatePresence, motion } from "framer-motion";
import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SiInstagram } from "@icons-pack/react-simple-icons";
import { Badge, Phone, Rotate3D, Users } from "lucide-react";
import AryaPhoto from "@/assets/Members/Arya.png";
import AmeetPhoto from "@/assets/Members/Ameet professional photo.jpg";
import AditiPhoto from "@/assets/Members/Aditi Gandhi.jpg";
import AmrutaPhoto from "@/assets/Members/Amruta Potdukhe.jpg";
import AnushkaPhoto from "@/assets/Members/Anushka professional photo.jpg";
import rotaractLogo from "@/assets/rotaract_logo_without_name.png";
import SushantPhoto from "@/assets/Members/Sushant.jpeg";
import ChaitraliPhoto from "@/assets/Members/Rtr. Chaitrali Dave.jpg";
import DhanashriPhoto from "@/assets/Members/Dhanashri professional photo.jpg";
import GovindPhoto from "@/assets/Members/Govind professional photo.jpg";
import KushalPhoto from "@/assets/Members/Kushal Damore.jpg";
import MonikaPhoto from "@/assets/Members/Monika Kshirsagar.jpg";
import PragamaPhoto from "@/assets/Members/Rtr. Pragama Magotra.jpg";
import PrayagPhoto from "@/assets/Members/Rtr. prayag.jpg";
import PrernaPhoto from "@/assets/Members/Prerna Bhilare.jpg";
import RajadnyaPhoto from "@/assets/Members/Rajadnya Khandale.jpg";
import YogirajPhoto from "@/assets/Members/Yogiraj professional photo.jpg";

interface MemberDetails {
  name: string;
  position: string;
  image?: string;
  category: "core" | "avenue" | "bod" | "general";
  bio?: string;
  instagram?: string;
  rotaryId?: string;
  phone?: string;
}

const allMembers: MemberDetails[] = [
  { name: "Arya Chavan", position: "President", image: AryaPhoto, category: "core", bio: "Leads the club with a clear focus on purposeful service and shared ownership." },
  { name: "Chaitrali Dave", position: "Vice President", image: ChaitraliPhoto, category: "core", bio: "Supports the club’s direction by turning ideas into thoughtful, coordinated action." },
  { name: "Amruta Potdukhe", position: "Secretary & FD", image: AmrutaPhoto, category: "core", bio: "Keeps communication, planning, and follow-through moving with intention." },
  { name: "Pragama Magotra", position: "IPP & RRIRO", image: PragamaPhoto, category: "core", bio: "Carries forward institutional memory while helping the next team grow with confidence." },
  { name: "Prerna Bhilare", position: "Treasurer & CA", image: PrernaPhoto, category: "core", bio: "Offers perspective and continuity as the club moves between seasons of service." },
  { name: "Rajadnya Khandale", position: "Jt. Secretary & CMD", image: RajadnyaPhoto, category: "core", bio: "Connects administration with community-focused action and meaningful participation." },
  { name: "Ambika Chavan", position: "PDD & Editor", category: "avenue" },
  { name: "Saini Devadiga", position: "Professional Assistance Officer (PAO)", category: "avenue" },
  { name: "Anushka Chaudhari", position: "International Service Director (ISD)", image: AnushkaPhoto, category: "avenue" },
  { name: "Govind Choudhary", position: "Jt. Editor", image: GovindPhoto, category: "bod", bio: "Shapes the visual voice of the club and helps its stories travel further." },
  { name: "Yogiraj Apsingekar", position: "PID & SD", image: YogirajPhoto, category: "bod" },
  { name: "Ameet Bhosale", position: "PRO & SD", image: AmeetPhoto, category: "bod" },
  { name: "Monika Kshirsagar", position: "Club Service Director (CSD)", image: MonikaPhoto, category: "avenue" },
  { name: "Kushal Damoor", position: "Sergeant At Arms", image: KushalPhoto, category: "bod" },
  { name: "Aditi Gandhi", position: "DEI Director", image: AditiPhoto, category: "bod" },
  { name: "Prayag Pokale", position: "Membership Development Director (MDD)", image: PrayagPhoto, category: "bod" },
  { name: "Dhanashri Chaudhari", position: "World Rotaract Week Chairperson (WRWC)", image: DhanashriPhoto, category: "bod" },
  { name: "Sushant Chavan", position: "Website Co-Ordinator", image: SushantPhoto, category: "bod" },
];

const sections: { key: "core" | "avenue" | "bod" | "general"; title: string; subtitle: string }[] = [
  { key: "core", title: "Core Members", subtitle: "The executive leadership of our club" },
  { key: "avenue", title: "Avenue Directors", subtitle: "Leaders coordinating the club’s service avenues" },
  { key: "bod", title: "Board of Directors", subtitle: "Directors driving each service avenue" },
  { key: "general", title: "General Body", subtitle: "The heartbeat of our community" },
];

const getInitials = (name: string) => name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase();
const displayName = (name: string) => name.startsWith("Rtr.") ? name : `Rtr. ${name}`;
const displayFirstName = (name: string) => `Rtr. ${name.replace(/^Rtr\.\s*/, "").split(" ")[0]}`;
const shortPosition = (position: string) => ({
  "President": "President",
  "Vice President": "Vice President",
  "Secretary": "Secretary",
  "Secretary & FD": "Secretary & FD",
  "Treasurer": "Treasurer.",
  "Treasurer & CA": "Treasurer & CA",
  "IPP & RRIRO": "IPP & RRIRO",
  "Club Advisor": "Advisor",
  "Jt. Secretary & CMD": "Jt. Secretary & CMD",
  "PDD & Editor": "PDD & Editor",
  "Jt. Editor": "Jt. Editor",
  "Sports Director – Indoor": "SD – Indoor",
  "Sports Director – Outdoor": "SD – Outdoor",
  "Club Service Director": "CSD",
  "Club Service Director (CSD)": "CSD",
  "Professional Assistance Officer": "PAO",
  "Professional Assistance Officer (PAO)": "PAO",
  "International Service Director": "ISD",
  "International Service Director (ISD)": "ISD",
  "PRO & SD": "PRO & SD",
  "PID & SD": "PID & SD",
  "Website Co-Ordinator": "Web Coordinator",
  "Website Co-ordinator": "Web Coordinator",
  "SAA & WRWC": "SAA & WRWC",
  "Sergeant At Arms": "SAA",
  "DEI Director": "DEI",
  "Professional Development Director": "PDD",
  "Membership Development Director": "CMD",
  "Membership Development Director (MDD)": "MDD",
  "World Rotaract Week Chairperson (WRWC)": "WRWC",
  "General Body Member": "GBM",
}[position] ?? position);
const demoContact = { instagram: "@member_demo", rotaryId: "RID-0001", phone: "+91 90000 00000" };

const MemberPhoto = ({ member }: { member: MemberDetails }) => (
  <div className="relative aspect-square shrink-0 overflow-hidden bg-gradient-to-br from-primary/90 via-primary to-rose-500">
    {member.image ? (
      <img src={member.image} alt={displayName(member.name)} className="h-full w-full object-cover" loading="lazy" decoding="async" />
    ) : (
      <div className="flex h-full w-full flex-col items-center justify-center text-primary-foreground">
        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm sm:mb-3 sm:h-14 sm:w-14"><Users className="h-5 w-5 sm:h-7 sm:w-7" /></div>
        <span className="text-2xl font-extrabold tracking-wide sm:text-3xl">{getInitials(member.name)}</span>
      </div>
    )}
  </div>
);

const MemberFooter = ({ member }: { member: MemberDetails }) => (
  <div className="flex min-h-[4.25rem] flex-col justify-center bg-card/40 p-2.5 backdrop-blur-md sm:min-h-[5.5rem] sm:p-3.5">
    <p className="mb-1 text-[9px] font-bold uppercase leading-tight tracking-[0.08em] text-primary sm:text-[10px] sm:tracking-wider">{shortPosition(member.position)}</p>
    <h3 className="line-clamp-2 text-[11px] font-semibold leading-tight sm:text-xs sm:leading-snug">{displayName(member.name)}</h3>
  </div>
);

const MemberCard = React.memo(({ member, index }: { member: MemberDetails; index: number }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.26, delay: (index % 5) * 0.05 }}
      className="relative h-auto w-full [perspective:1100px] sm:h-full"
    >
      <button
        type="button"
        aria-label={`${flipped ? "Show front of" : "Flip"} ${displayName(member.name)}'s member card`}
        aria-pressed={flipped}
        onClick={() => setFlipped((value) => !value)}
        className="group relative aspect-[0.7] min-h-0 w-full rounded-2xl text-left sm:aspect-auto sm:min-h-[19rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.65, type: "spring", stiffness: 180, damping: 22 }}
          style={{ transformStyle: "preserve-3d" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-background/50 shadow-sm [backface-visibility:hidden]">
            <MemberPhoto member={member} />
            <MemberFooter member={member} />
            <div className="absolute bottom-3 right-3 hidden items-center gap-1 rounded-full bg-black/55 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 sm:flex"><Rotate3D className="h-3 w-3" /> Flip</div>
          </div>
          <div className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border border-primary/30 bg-primary p-3 text-primary-foreground sm:p-5 shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground/70">Member profile</p>
              <h3 className="mt-2 text-base font-bold leading-tight sm:mt-3 sm:text-xl">{displayFirstName(member.name)}</h3>
              <p className="mt-1 text-[11px] font-medium leading-snug text-primary-foreground/80 sm:mt-2 sm:text-sm">{member.position}</p>
              <div className="mt-4 space-y-1.5 text-[10px] leading-tight text-primary-foreground/85 sm:mt-5 sm:text-[11px]">
                <p className="flex items-center gap-1.5"><SiInstagram className="h-3 w-3 shrink-0" aria-hidden="true" />{member.instagram ?? demoContact.instagram}</p>
                <p className="flex items-center gap-1.5"><Badge className="h-3 w-3 shrink-0" aria-hidden="true" />{member.rotaryId ?? demoContact.rotaryId}</p>
                <p className="flex items-center gap-1.5"><Phone className="h-3 w-3 shrink-0" aria-hidden="true" />{member.phone ?? demoContact.phone}</p>
              </div>
            </div>
            <img src={rotaractLogo} alt="Rotaract logo" className="absolute bottom-3 right-3 w-24 object-contain sm:bottom-4 sm:right-4 sm:w-28" />
          </div>
        </motion.div>
      </button>
    </motion.div>
  );
});

const Members = () => {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("memberFilter") ?? "all";
  const visible = useMemo(() => filter === "all" ? sections : sections.filter((section) => section.key === filter), [filter]);
  const categorizedMembers = useMemo(() => sections.reduce((acc, section) => { acc[section.key] = allMembers.filter((member) => member.category === section.key); return acc; }, {} as Record<string, MemberDetails[]>), []);

  return (
    <div className="min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mb-16 text-center">
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl">Our Team</h1>
          <p className="mx-auto max-w-none text-xl font-medium text-muted-foreground sm:whitespace-nowrap">Meet the dedicated members of Rotaract Club Of SCOP</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {visible.map((section, sectionIndex) => {
            const members = categorizedMembers[section.key] || [];
            return (
              <motion.section key={section.key} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.32, delay: sectionIndex * 0.08 }} className="mb-14 last:mb-0">
                <div className="mb-7"><h2 className="mb-2 text-2xl font-bold">{section.title}</h2><div className="inline-block"><div className="mb-2 h-0.5 w-full rounded-full bg-primary opacity-80" /><p className="text-sm text-muted-foreground">{section.subtitle}</p></div></div>
                <div className="grid grid-cols-2 items-start gap-3 sm:grid-cols-3 sm:items-stretch sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
                  {members.map((member, index) => <MemberCard key={member.name} member={member} index={index} />)}
                </div>
              </motion.section>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Members;

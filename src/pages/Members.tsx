import { AnimatePresence, motion } from "framer-motion";
import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Instagram, Mail, Rotate3D, Users } from "lucide-react";
import AmeetPhoto from "@/assets/Members/Ameet professional photo.jpg";
import AditiPhoto from "@/assets/Members/Aditi Gandhi.jpg";
import AmrutaPhoto from "@/assets/Members/Amruta Potdukhe.jpg";
import ChaitanyaPhoto from "@/assets/Members/Rtr. Chaitanya.jpg";
import ChaitraliPhoto from "@/assets/Members/Rtr. Chaitrali Dave.jpg";
import DhanashriPhoto from "@/assets/Members/Dhanashri professional photo.jpg";
import GeetaPhoto from "@/assets/Members/Rtr. Geeta wagh.jpg";
import GovindPhoto from "@/assets/Members/Govind professional photo.jpg";
import HarshadaPhoto from "@/assets/Members/Rtr Harshada.jpg";
import AryaShindePhoto from "@/assets/Members/Rtr. Arya Shinde.jpg";
import KushalPhoto from "@/assets/Members/Kushal Damore.jpg";
import MonikaPhoto from "@/assets/Members/Monika Kshirsagar.jpg";
import PragamaPhoto from "@/assets/Members/Rtr. Pragama Magotra.jpg";
import PrajaktaPhoto from "@/assets/Members/Rtr. Prajakta .jpg";
import PranjalPhoto from "@/assets/Members/Rtr. Pranjal landge.jpg";
import PrayagPhoto from "@/assets/Members/Rtr. prayag.jpg";
import PrernaPhoto from "@/assets/Members/Prerna Bhilare.jpg";
import RajadnyaPhoto from "@/assets/Members/Rajadnya Khandale.jpg";
import SaanaPhoto from "@/assets/Members/Rtr saana.jpg";
import ShubhamPhoto from "@/assets/Members/Rtr. Shubham pawar.png";
import ShubhankarPhoto from "@/assets/Members/Shubhankar Patil.jpg";
import YogirajPhoto from "@/assets/Members/Yogiraj professional photo.jpg";

interface MemberDetails {
  name: string;
  position: string;
  image?: string;
  category: "core" | "bod" | "general";
  bio?: string;
}

const allMembers: MemberDetails[] = [
  { name: "Arya Chavan", position: "President", category: "core", bio: "Leads the club with a clear focus on purposeful service and shared ownership." },
  { name: "Chaitrali Dave", position: "Vice President", image: ChaitraliPhoto, category: "core", bio: "Supports the club’s direction by turning ideas into thoughtful, coordinated action." },
  { name: "Amruta Potdukhe", position: "Secretary", image: AmrutaPhoto, category: "core", bio: "Keeps communication, planning, and follow-through moving with intention." },
  { name: "Shubham Pawar", position: "Treasurer", image: ShubhamPhoto, category: "core", bio: "Brings structure and responsibility to the systems that support our impact." },
  { name: "Pragama Magotra", position: "Immediate Past President", image: PragamaPhoto, category: "core", bio: "Carries forward institutional memory while helping the next team grow with confidence." },
  { name: "Prerna Bhilare", position: "Club Advisor", image: PrernaPhoto, category: "core", bio: "Offers perspective and continuity as the club moves between seasons of service." },
  { name: "Rajadnya Khandale", position: "Jt. Secretary and Community Service Director", image: RajadnyaPhoto, category: "bod", bio: "Connects administration with community-focused action and meaningful participation." },
  { name: "Govind Choudhary", position: "Editor and Jt. Public Image Director", image: GovindPhoto, category: "bod", bio: "Shapes the visual voice of the club and helps its stories travel further." },
  { name: "Yogiraj", position: "Sports Director – Indoor", image: YogirajPhoto, category: "bod" },
  { name: "Ameet Bhosale", position: "Sports Director – Outdoor", image: AmeetPhoto, category: "bod" },
  { name: "Monika Kshirsagar", position: "Club Service Director", image: MonikaPhoto, category: "bod" },
  { name: "Chaitanya Gandhare", position: "Professional Assistance Officer", image: ChaitanyaPhoto, category: "bod" },
  { name: "Shubhankar Patil", position: "International Service Director", image: ShubhankarPhoto, category: "bod" },
  { name: "Arya Shinde", position: "Public Relations Officer", image: AryaShindePhoto, category: "bod" },
  { name: "Kushal Damoor", position: "Sergeant At Arms and World Rotaract Week Chairperson", image: KushalPhoto, category: "bod" },
  { name: "Aditi Gandhi", position: "Diversity, Equity and Inclusion Director", image: AditiPhoto, category: "bod" },
  { name: "Harshada Shinde", position: "Jt. Public Relations Officer", image: HarshadaPhoto, category: "bod" },
  { name: "Prajakta Munde", position: "Interact Rotary Rotaract Relations Officer", image: PrajaktaPhoto, category: "bod" },
  { name: "Geeta Wagh", position: "Professional Development Director", image: GeetaPhoto, category: "bod" },
  { name: "Prayag Pokale", position: "Membership Development Director", image: PrayagPhoto, category: "bod" },
  { name: "Dhanashri Choudhari", position: "Public Image Director", image: DhanashriPhoto, category: "bod" },
  { name: "Onkar Deshpande", position: "General Body Member", category: "general" },
  { name: "Pranjal Landge", position: "General Body Member", image: PranjalPhoto, category: "general" },
  { name: "Saana Nitnaware", position: "General Body Member", image: SaanaPhoto, category: "general" },
  { name: "Nilesh More", position: "General Body Member", category: "general" },
  { name: "Sushant Chavan", position: "General Body Member", category: "general" },
];

const sections: { key: "core" | "bod" | "general"; title: string; subtitle: string }[] = [
  { key: "core", title: "Core Members", subtitle: "The executive leadership of our club" },
  { key: "bod", title: "Board of Directors", subtitle: "Directors driving each service avenue" },
  { key: "general", title: "General Body", subtitle: "The heartbeat of our community" },
];

const getInitials = (name: string) => name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase();
const displayName = (name: string) => name.startsWith("Rtr.") ? name : `Rtr. ${name}`;

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
    <p className="mb-1 text-[9px] font-bold uppercase leading-tight tracking-[0.08em] text-primary sm:text-[10px] sm:tracking-wider">{member.position}</p>
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
      className="relative h-full w-full [perspective:1100px]"
    >
      <button
        type="button"
        aria-label={`${flipped ? "Show front of" : "Flip"} ${displayName(member.name)}'s member card`}
        aria-pressed={flipped}
        onClick={() => setFlipped((value) => !value)}
        className="group relative min-h-[14rem] w-full rounded-2xl text-left sm:min-h-[19rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
              <h3 className="mt-2 text-base font-bold leading-tight sm:mt-3 sm:text-xl">{displayName(member.name)}</h3>
              <p className="mt-1 text-[11px] font-medium leading-snug text-primary-foreground/80 sm:mt-2 sm:text-sm">{member.position}</p>
            </div>
            <div className="flex items-center gap-2 self-end" aria-label="Member contact options">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground" title="Instagram profile placeholder"><Instagram className="h-4 w-4" aria-hidden="true" /></span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground" title="Email placeholder"><Mail className="h-4 w-4" aria-hidden="true" /></span>
            </div>
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
                <div className="grid grid-cols-2 items-stretch gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
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

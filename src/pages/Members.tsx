import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Phone, Instagram, Linkedin, X } from "lucide-react";

interface MemberDetails {
  name: string;
  position: string;
  image: string;
  category: "core" | "bod" | "general";
  phone?: string;
  instagramUrl?: string;
  instaHandle?: string;
  linkedinUrl?: string;
  linkedinHandle?: string;
}

const allMembers: MemberDetails[] = [
  { name: "Rtr. Pragama Magotra", position: "President", image: "https://i.ibb.co/3yp77QmS/Pragama.png", category: "core" },
  { name: "Rtr. Prerna Bhilare", position: "Secretary", image: "https://i.ibb.co/9m1Zxg8q/Prerna.png", category: "core" },
  { name: "Rtr. Pradnya Gaikar", position: "Vice President", image: "https://i.ibb.co/s921stS8/installation.png", category: "core" },
  { name: "Rtr. Arya Londhe", position: "Treasurer", image: "https://i.ibb.co/mrsKcX0H/1772863960494-1.png", category: "core" },
  { name: "Rtr. Vaishnavi Kharat", position: "IPP & Club Advisor", image: "https://i.ibb.co/cXFwjVZk/Whats-App-Image-2026-03-04-at-17-26-57.jpg", category: "core" },
  { name: "Rtr. Urvashi Chaudhari", position: "Sergeant-At-Arms", image: "https://i.ibb.co/6786pnT1/urvashi.png", category: "bod" },
  { name: "Rtr. Shubhangi Kumawat", position: "Club Service Director", image: "https://i.ibb.co/0jZLSFHg/Shubhangi.png", category: "bod" },
  { name: "Rtr. Prayag Pokale", position: "MDD", image: "https://i.ibb.co/fz2SWbfG/Prayag.jpg", category: "bod" },
  { name: "Rtr. Mrunal Potharkar", position: "CMD & Finance Director", image: "https://i.ibb.co/Q7JdkX4C/7b421d70-1bbf-11f1-aa9e-114d2a34bfc6.jpg", category: "bod" },
  { name: "Rtr. Vedanti Khardikar", position: "PDD", image: "https://i.ibb.co/tMJY7GLn/Vedanti.png", category: "bod" },
  { name: "Rtr. Arya Chavan", position: "PAO", image: "https://i.ibb.co/4ZjV3kN4/Arya-chavan.png", category: "bod" },
  { name: "Rtr. Amruta Potdukhe", position: "International Service Director", image: "https://i.ibb.co/VW3dDLh1/Amruta.jpg", category: "bod" },
  { name: "Rtr. Sushant Chavan", position: "PRO + Editor", image: "https://i.ibb.co/NnQbWxF1/Sushant.jpg", category: "bod" },
  { name: "Rtr. Chaitanya Jadhav", position: "Jt. PRO", image: "https://i.ibb.co/KdtFdkf/Chaitanya.png", category: "bod" },
  { name: "Rtr. Dhanashri Choudhari", position: "Public Image Officer", image: "https://i.ibb.co/LVDCy26/installation.png", category: "bod" },
  { name: "Rtr. Anushka Chaudhary", position: "Jt. PID", image: "https://i.ibb.co/q3gHzBTp/Anushka.png", category: "bod" },
  { name: "Rtr. Bhumi Sharma", position: "Sports Director", image: "https://i.ibb.co/MDxHc4jw/Bhumi.png", category: "bod" },
  { name: "Rtr. Aditi Gandhi", position: "RRRO & IRRO", image: "https://i.ibb.co/4RYmWnK2/Aditi-gandhi.png", category: "bod" },
  { name: "Rtr. Jagruti Dave", position: "DEI Representative", image: "https://i.ibb.co/MDLYdBwd/Jagruti.png", category: "bod" },
  { name: "Rtr. Palak Kumari", position: "WRWC", image: "https://i.ibb.co/60t3Jp1J/palak.jpg", category: "bod" },
  { name: "Rtr. Chaitrali Dave", position: "General Body Member", image: "https://i.ibb.co/v6GPxzSp/Gemini-Generated-Image-hkwumihkwumihkwu.png", category: "general" },
  { name: "Rtr. Pranjal Mate", position: "General Body Member", image: "https://i.ibb.co/cc8s1Fbk/Screenshot-20250705-160930-Pranjal-Mate.jpg", category: "general" },
  { name: "Rtr. Anjali Jagdale", position: "General Body Member", image: "https://i.ibb.co/yn43TRDh/Gemini-Generated-Image-c3yjzwc3yjzwc3yj.png", category: "general" },
  { name: "Rtr. Amit Bhosale", position: "General Body Member", image: "https://i.ibb.co/VWqw12TQ/Gemini-Generated-Image-j4amvj4amvj4amvj.png", category: "general" },
  { name: "Rtr. Yogiraj Apsingekar", position: "General Body Member", image: "https://i.ibb.co/sdVM3VZB/Picsart-25-08-28-18-09-50-014-Yogiraj-Apsingekar.jpg", category: "general" },
  { name: "Rtr. Milind Singh Rajput", position: "General Body Member", image: "https://i.ibb.co/FqCbCVPR/Gemini-Generated-Image-tc9m32tc9m32tc9m.png", category: "general" },
  { name: "Rtr. Priya Hangarge", position: "General Body Member", image: "https://i.ibb.co/7xkpsFGF/Gemini-Generated-Image-tle599tle599tle5.png", category: "general" },
  { name: "Rtr. Adnya Jadhav", position: "General Body Member", image: "https://i.ibb.co/wtV3h7V/f0437adb-3839-48de-8d96-08cfa85357c7.jpg", category: "general" },
  { name: "Rtr. Utkarsh Garde", position: "General Body Member", image: "https://i.ibb.co/qY0YCM4k/IMG-20250828-115734-Utkarsh-Garde.jpg", category: "general" },
  { name: "Rtr. Prerna Gade", position: "General Body Member", image: "https://i.ibb.co/BV3R09VP/SAVE-20250828-110804-Prerana-Gade.jpg", category: "general" },
  { name: "Rtr. Revati Kulal", position: "General Body Member", image: "https://i.ibb.co/1YjRvf01/Gemini-Generated-Image-qxviejqxviejqxvi.png", category: "general" },
  { name: "Rtr. Prathamesh", position: "General Body Member", image: "https://i.ibb.co/846yM3Gd/IMG-1101-pratham-dhatrak.jpg", category: "general" },
];

const sections: { key: "core" | "bod" | "general"; title: string; subtitle: string }[] = [
  { key: "core", title: "Core Members", subtitle: "The executive leadership of our club" },
  { key: "bod", title: "Board of Directors", subtitle: "Directors driving each service avenue" },
  { key: "general", title: "General Body", subtitle: "The heartbeat of our community" },
];

const filterOptions = [
  { key: "all", label: "All" },
  { key: "core", label: "Core" },
  { key: "bod", label: "BOD" },
  { key: "general", label: "GBM" },
];

const MemberCard = ({ member, index }: { member: MemberDetails, index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.26, delay: (index % 5) * 0.05 }}
      className="perspective-1000 w-full h-full will-change-transform will-change-opacity"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d cursor-pointer rounded-2xl transform-gpu will-change-transform"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front Face */}
        <div className="backface-hidden glass glass-lift rounded-2xl overflow-hidden group flex flex-col w-full h-full relative z-10 bg-background/50">
          <div className="aspect-square overflow-hidden relative shrink-0">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="p-3.5 flex flex-col justify-center flex-grow bg-card/40 backdrop-blur-md">
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1">{member.position}</p>
            <h3 className="text-xs font-semibold leading-snug line-clamp-2">{member.name}</h3>
          </div>
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 glass glass-strong rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-2xl z-0 overflow-hidden border border-primary/20 bg-card/90 backdrop-blur-xl">
          <div className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-foreground transition-colors">
             <X className="w-4 h-4" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-0.5 line-clamp-3 leading-tight">{member.position}</p>
          <h3 className="text-xs font-semibold mb-1.5">{member.name}</h3>
          
          <div className="space-y-1 w-full mt-1">
             <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-full">
                <Phone className="w-3 h-3 shrink-0" />
                <span className="truncate">{member.phone || "Not Provided"}</span>
             </div>
             <a href={member.instagramUrl || "#"} onClick={e => e.stopPropagation()} className="flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-white bg-black/5 dark:bg-white/5 hover:bg-primary px-3 py-1.5 rounded-full transition-colors w-full">
               <Instagram className="w-3 h-3 shrink-0" />
               <span className="truncate">{member.instaHandle || "Not Provided"}</span>
             </a>
             <a href={member.linkedinUrl || "#"} onClick={e => e.stopPropagation()} className="flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-white bg-black/5 dark:bg-white/5 hover:bg-primary px-3 py-1.5 rounded-full transition-colors w-full">
               <Linkedin className="w-3 h-3 shrink-0" />
               <span className="truncate">{member.linkedinHandle || "Not Provided"}</span>
             </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Members = () => {
  const [filter, setFilter] = useState("all");
  const visible = filter === "all" ? sections : sections.filter((s) => s.key === filter);

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Our Team</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">Meet the dedicated members of Rotaract Club Of  SCOP</p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          <div className="glass-pill rounded-full p-1.5 flex gap-1 relative z-0">
            {filterOptions.map((opt) => {
              const isActive = filter === opt.key;
              return (
                <button
                  key={opt.key}
                  onClick={() => setFilter(opt.key)}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 z-10 ${isActive ? "text-primary-foreground" : "text-foreground/65 hover:text-foreground"
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="members-filter-indicator"
                      className="absolute inset-0 bg-primary rounded-full shadow-sm -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {opt.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Sections */}
        <AnimatePresence mode="wait">
          {visible.map((section, sIdx) => {
            const members = allMembers.filter((m) => m.category === section.key);
            return (
              <motion.section
                key={section.key}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.32, delay: sIdx * 0.08 }}
                className="mb-14 last:mb-0"
              >
                <div className="mb-7">
                  <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
                  <div className="inline-block">
                    <div className="h-0.5 w-full bg-primary rounded-full mb-2 opacity-80" />
                    <p className="text-sm text-muted-foreground">{section.subtitle}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-stretch">
                  {members.map((member, i) => (
                    <MemberCard key={member.name} member={member} index={i} />
                  ))}
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

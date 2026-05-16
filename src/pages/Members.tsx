import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface MemberDetails {
  name: string;
  position: string;
  image: string;
  category: "core" | "bod" | "general";
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

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {members.map((member, i) => (
                    <motion.div
                      key={member.name}
                      initial={{ opacity: 0, scale: 0.94 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-20px" }}
                      transition={{ duration: 0.26, delay: (i % 5) * 0.05 }}
                      className="glass glass-lift rounded-2xl overflow-hidden group"
                    >
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-3.5">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1">{member.position}</p>
                        <h3 className="text-xs font-semibold leading-snug line-clamp-2">{member.name}</h3>
                      </div>
                    </motion.div>
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

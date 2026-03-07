import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
interface MemberDetails {
  name: string;
  position: string;
  image: string;
  category: "core" | "bod" | "general";
}

const allMembers: MemberDetails[] = [
  // Core Members
  { name: "Rtr. Pragama Magotra", position: "President", image: "https://i.ibb.co/3yp77QmS/Pragama.png&w=400&auto=format&fit=crop", category: "core" },
  { name: "Rtr. Prerna Bhilare", position: "Secretary", image: "https://i.ibb.co/9m1Zxg8q/Prerna.png&w=400&auto=format&fit=crop", category: "core" },
  { name: "Rtr. Pradnya Gaikar", position: "Vice President", image: "https://i.ibb.co/s921stS8/installation.png&w=400&auto=format&fit=crop", category: "core" },
  { name: "Rtr. Arya Londhe", position: "Treasurer", image: "https://i.ibb.co/bgSm9CXp/Arya-londhe.png&w=400&auto=format&fit=crop", category: "core" },
  { name: "Rtr. Vaishnavi Kharat", position: "IPP & Club Advisor", image: "https://i.ibb.co/cXFwjVZk/Whats-App-Image-2026-03-04-at-17-26-57.jpg&w=400&auto=format&fit=crop", category: "core" },

  // Board of Directors
  { name: "Rtr. Urvashi Chaudhari", position: "Sergeant-At-Arms (SAA)", image: "https://i.ibb.co/6786pnT1/urvashi.png&w=400&auto=format&fit=crop", category: "bod" },
  { name: "Rtr. Shubhangi Kumawat", position: "Club Service Director", image: "https://i.ibb.co/0jZLSFHg/Shubhangi.png&w=400&auto=format&fit=crop", category: "bod" },
  { name: "Rtr. Prayag Pokale", position: "MDD", image: "https://i.ibb.co/fz2SWbfG/Prayag.jpg&w=400&auto=format&fit=crop", category: "bod" },
  { name: "Rtr. Mrunal Potharkar", position: "Finance Director", image: "https://i.ibb.co/5gHWfsvP/installation.png&w=400&auto=format&fit=crop", category: "bod" },
  { name: "Rtr. Vedanti Khardikar", position: "PDD", image: "https://i.ibb.co/tMJY7GLn/Vedanti.png&w=400&auto=format&fit=crop", category: "bod" },
  { name: "Rtr. Arya Chavan", position: "PAO", image: "https://i.ibb.co/4ZjV3kN4/Arya-chavan.png&w=400&auto=format&fit=crop", category: "bod" },
  { name: "Rtr. Amruta Potdukhe", position: "International Service Director", image: "https://i.ibb.co/VW3dDLh1/Amruta.jpg&w=400&auto=format&fit=crop", category: "bod" },
  { name: "Rtr. Sushant Chavan", position: "PRO + Editor", image: "https://i.ibb.co/NnQbWxF1/Sushant.jpg&w=400&auto=format&fit=crop", category: "bod" },
  { name: "Rtr. Chaitanya Jadhav", position: "Jt. PRO", image: "https://i.ibb.co/KdtFdkf/Chaitanya.png&w=400&auto=format&fit=crop", category: "bod" },
  { name: "Rtr. Dhanashri Choudhari", position: "Public Image Officer", image: "https://i.ibb.co/LVDCy26/installation.png&w=400&auto=format&fit=crop", category: "bod" },
  { name: "Rtr. Anushka Chaudhary", position: "Jt. PID", image: "https://i.ibb.co/q3gHzBTp/Anushka.png&w=400&auto=format&fit=crop", category: "bod" },
  { name: "Rtr. Bhumi Sharma", position: "Sports Director", image: "https://i.ibb.co/MDxHc4jw/Bhumi.png&w=400&auto=format&fit=crop", category: "bod" },
  { name: "Rtr. Aditi Gandhi", position: "RRRO & IRRO", image: "https://i.ibb.co/4RYmWnK2/Aditi-gandhi.png&w=400&auto=format&fit=crop", category: "bod" },
  { name: "Rtr. Jagruti Dave", position: "DEI Representative", image: "https://i.ibb.co/MDLYdBwd/Jagruti.png&w=400&auto=format&fit=crop", category: "bod" },

  // General Body Members
  { name: "Rtr. Chaitrali Dave", position: "General Body Member", image: "https://i.ibb.co/v6GPxzSp/Gemini-Generated-Image-hkwumihkwumihkwu.png&w=400&auto=format&fit=crop", category: "general" },
  { name: "Rtr. Pranjal Mate", position: "General Body Member", image: "https://i.ibb.co/cc8s1Fbk/Screenshot-20250705-160930-Pranjal-Mate.jpg&w=400&auto=format&fit=crop", category: "general" },
  { name: "Rtr. Anjali Jagdale", position: "General Body Member", image: "https://i.ibb.co/yn43TRDh/Gemini-Generated-Image-c3yjzwc3yjzwc3yj.png&w=400&auto=format&fit=crop", category: "general" },
  { name: "Rtr. Amit Bhosale", position: "General Body Member", image: "https://i.ibb.co/VWqw12TQ/Gemini-Generated-Image-j4amvj4amvj4amvj.png&w=400&auto=format&fit=crop", category: "general" },
  { name: "Rtr. Yogiraj Apsingekar", position: "General Body Member", image: "https://i.ibb.co/sdVM3VZB/Picsart-25-08-28-18-09-50-014-Yogiraj-Apsingekar.jpg&w=400&auto=format&fit=crop", category: "general" },
  { name: "Rtr. Milind Singh Rajput", position: "General Body Member", image: "https://i.ibb.co/FqCbCVPR/Gemini-Generated-Image-tc9m32tc9m32tc9m.png&w=400&auto=format&fit=crop", category: "general" },
  { name: "Rtr. Priya Hangarge", position: "General Body Member", image: "https://i.ibb.co/7xkpsFGF/Gemini-Generated-Image-tle599tle599tle5.png&w=400&auto=format&fit=crop", category: "general" },
  { name: "Rtr. Adnya Jadhav", position: "General Body Member", image: "https://i.ibb.co/wtV3h7V/f0437adb-3839-48de-8d96-08cfa85357c7.jpg&w=400&auto=format&fit=crop", category: "general" },
  { name: "Rtr. Utkarsh Garde", position: "General Body Member", image: "https://i.ibb.co/BV3R09VP/SAVE-20250828-110804-Prerana-Gade.jpg&w=400&auto=format&fit=crop", category: "general" },
  { name: "Rtr. Prerna Gade", position: "General Body Member", image: "https://i.ibb.co/wtV3h7V/f0437adb-3839-48de-8d96-08cfa85357c7.jpg&w=400&auto=format&fit=crop", category: "general" },
  { name: "Rtr. Revati Kulal", position: "General Body Member", image: "https://i.ibb.co/1YjRvf01/Gemini-Generated-Image-qxviejqxviejqxvi.png&w=400&auto=format&fit=crop", category: "general" },
  { name: "Rtr. Prathamesh", position: "General Body Member", image: "https://i.ibb.co/846yM3Gd/IMG-1101-pratham-dhatrak.jpg&w=400&auto=format&fit=crop", category: "general" },
];

const sections: { key: "core" | "bod" | "general"; title: string }[] = [
  { key: "core", title: "Core Members" },
  { key: "bod", title: "Board of Directors" },
  { key: "general", title: "General Body Members" },
];

const filterOptions = [
  { key: "all", label: "All Members" },
  { key: "core", label: "Core Members" },
  { key: "bod", label: "Board of Directors" },
  { key: "general", label: "General Body" },
];

const Members = () => {
  const [filter, setFilter] = useState("all");

  const visibleSections = filter === "all" ? sections : sections.filter((s) => s.key === filter);

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 font-display">Our Team</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet the dedicated members RC SCOP
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filterOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setFilter(opt.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                filter === opt.key
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
        {visibleSections.map((section, sectionIndex) => {
          const members = allMembers.filter((m) => m.category === section.key);
          return (
            <motion.section
              key={section.key}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: sectionIndex * 0.1 }}
              className="mb-16 last:mb-0"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold font-display">{section.title}</h2>
                <div className="h-1 w-22 bg-primary rounded-full mt-3" />
              </div>

              {/* Members list */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {members.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.3, delay: (index % 5) * 0.06 }}
                  >
                    <Card className="shadow-lg overflow-hidden group">
                      <CardContent className="p-5">
                        <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <Badge className="mb-2 text-xs">{member.position}</Badge>
                        <h3 className="text-base font-semibold">{member.name}</h3>
                      </CardContent>
                    </Card>
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

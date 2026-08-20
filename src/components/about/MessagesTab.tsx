import { motion } from "framer-motion";
import drishtiPhoto from "@/assets/PHF_DRR_Drishti_Singh.webp";

export interface Leader {
  name: string;
  title: string;
  photo: string;
  message: string;
}

type CouncilPerson = Omit<Leader, "message"> & { club: string };

const photo = (slug: string) => `https://www.rotaractdistrict3131.org/_next/image?url=%2Fcouncil%2F${slug}.png&w=640&q=75`;
const person = (name: string, title: string, club: string, slug: string): CouncilPerson => ({ name, title, club, photo: photo(slug) });

const councilSections: { title: string; description: string; people: CouncilPerson[] }[] = [
  {
    title: "Core Council",
    description: "The district leadership team guiding administration, events, protocols, reporting, finance, and learning.",
    people: [
      person("PHF. DRR. Dr. Karishma Awari", "District Rotaract Representative", "Rotaract Club of Pune Shaniwarwada", "karishma-awari"),
      { ...person("PHF. PDRR. Drishti Singh", "District Learning Facilitator", "Rotaract Club of Humanitas", "harshvardhan-kale"), photo: drishtiPhoto },
      person("PHF. Rtr. Harshvardhan Kale", "District General Secretary", "Rotaract Club of Bavdhan Pioneers", "harshvardhan-kale"),
      person("Rtr. Suraj Surkutla", "District Secretary - Administration", "Rotaract Club of Pune Shaniwarwada", "suraj-surkutla"),
      person("Rtr. Hamid Shaikh", "District Secretary - Events", "Rotaract Club of Aundh Smartcity", "hamid-shaikh"),
      person("Rtr. Disha Daga", "District Secretary - Protocols", "Rotaract Club of Bibwewadi Pune", "disha-daga"),
      person("Rtr. Dr. Aishwarya Patil", "District Secretary - Reporting", "Rotaract Club of Pune Shaniwarwada", "aishwarya-patil"),
      person("PHF. Rtr. Sharvindu Jogdand", "District Treasurer", "Rotaract Club of Pune Warje", "sharvindu-jogdand"),
      person("Rtr. Dr. Ashlesha Deshpande", "District Club Advisor", "Rotaract Club of Pune Heritage", "ashlesha-deshpande"),
    ],
  },
  {
    title: "Zonal Representatives",
    description: "Connecting clubs, members, and initiatives across the district's zones.",
    people: [
      person("Rtr. Rohan Puri", "Zonal Advisor", "Rotaract Club of Khopoli", "rohan-puri"),
      person("Rtr. Aniket Sardar", "District Zonal Representative", "Rotaract Club of Khopoli", "aniket-sardar"),
      person("Rtr. Vedant Chirmade", "District Zonal Representative", "Rotaract Club of Pimpri", "vedant-chirmade"),
      person("Rtr. Vedant Chaudhari", "District Zonal Representative", "Rotaract Club of Pimpri", "vedant-chaudhari"),
      person("Rtr. Tisha Sancheti", "District Zonal Representative", "Rotaract Club of Pune Camp Next Gen", "tisha-sancheti"),
      person("Rtr. Pratham Pokharkar", "District Zonal Representative", "Rotaract Club of Pune Aurora", "pratham-pokharkar"),
      person("Rtr. Rajas Uchagaonkar", "District Zonal Representative", "Rotaract Club of Pune City Fortune", "rajas-uchagaonkar"),
      person("Rtr. Prem Bansode", "District Zonal Representative", "Rotaract Club of Daund College", "prem-bansode"),
      person("Rtr. Prerna Bhilare", "Assistant Zonal Representative", "Rotaract Club of Sinhgad College Of Pharmacy", "prerna-bhilare"),
      person("Rtr. Aditya Verma", "Assistant Zonal Representative", "Rotaract Club of Nigdi Pune", "aditya-verma"),
      person("Rtr. Shrushti Shirore", "Assistant Zonal Representative", "Rotaract Club of Pune Aurora", "shrushti-shirore"),
      person("Rtr. Sarthak Ambhore", "Assistant Zonal Representative", "Rotaract Club of Pimpri", "sarthak-ambhore"),
      person("Rtr. Rohit Kumbhar", "Assistant Zonal Representative", "Rotaract Club of Bavdhan Pioneers", "rohit-kumbhar"),
      person("Rtr. Sumedh Gite", "Assistant Zonal Representative", "Rotaract Club of Aundh Smartcity", "sumedh-gite"),
    ],
  },
  {
    title: "District Executive Council",
    description: "Specialist leaders delivering service, membership, public image, professional development, and district operations.",
    people: [
      person("Rtr. Samrudhi Khade", "District Director - Professional Development", "Rotaract Club of Pune Zenith", "samrudhi-khade"),
      person("Rtr. Jayesh Chavan", "District Director - Club Service", "Rotaract Club of Pune City Fortune", "jayesh-chavan"),
      person("PHF. Rtr. Aslam Dhanani", "District Director - Community Service", "Rotaract Club of Balewadi High Street", "aslam-dhanani"),
      person("Rtr. Vaishnavi Kedari", "District Co-Director - Community Service", "Rotaract Club of Symbiosis Skills and Professional University", "vaishnavi-kedari"),
      person("PHF. Rtr. Ishan Malawade", "District Director - International Service", "Rotaract Club of Vibrants", "ishan-malawade"),
      person("Rtr. Pranav Gandhi", "District Co-Director - International Service", "Rotaract Club of Bibwewadi Pune", "pranav-gandhi"),
      person("Rtr. Omkar Patil", "District Director - Membership Development", "Rotaract Club of Pune City Fortune", "omkar-patil"),
      person("Rtr. Chinmayee Bartakke", "District Director - Diversity, Equity & Inclusion", "Rotaract Club of Viman Nagar", "chinmayee-bartakke"),
      person("Rtr. Faizan Tamboli", "District Director - Communications", "Rotaract Club of Pune Shaniwarwada", "faizan-tamboli"),
      person("Rtr. Shrawani Shendkar", "District Director - Public Image", "Rotaract Club of Genba Sopanrao Moze College of Engineering", "shrawani-shendkar"),
      person("Rtr. Salvin Padvi", "District Officer - Chief Branding", "Rotaract Club of Pune Aurora", "salvin-padvi"),
      person("Rtr. Janhavi Yeole", "District Officer - Public Relations", "Rotaract Club of Pune Zenith", "janhavi-yeole"),
      person("Rtr. Shreeraj Nilkanth", "District Officer - Public Relations", "Rotaract Club of Panvel Industrial Town", "shreeraj-nilkanth"),
      person("Rtr. Sushant Chavan", "District Officer - Editing", "Rotaract Club of Sinhgad College Of Pharmacy", "sushant-chavan"),
      person("Rtr. Harshal Nikam", "District Officer - Editing", "Rotaract Club of Pune Heritage", "harshal-nikam"),
      person("Rtr. Abhishek Dixit", "District Officer - Editing", "Rotaract Club of Vibrants", "abhishek-dixit"),
      person("Rtr. Vageesha Karhadkar", "District Officer - Editing", "Rotaract Club of Magarpatta Trendsetters", "vageesha-karhadkar"),
      person("Rtr. Shreyas Pathak", "District Sergeant-at-Arms", "Rotaract Club of Pune Mideast", "shreyas-pathak"),
      person("Rtr. Snehal Jadhav", "District Sergeant-at-Arms", "Rotaract Club of Balewadi High Street", "snehal-jadhav"),
      person("Rtr. Pranav Pisal", "District Officer - Grants & RYLA", "Rotaract Club of Pimpri", "pranav-pisal"),
      person("Rtr. Adhishree Thakar", "District Officer - Rotary Rotaract Relations", "Rotaract Club of Pune Zenith", "adhishree-thakar"),
      person("Rtr. Prajwal Bande", "District Officer - Interact Rotaract Relations", "Rotaract Club of Daund College", "prajwal-bande"),
      person("Rtr. Gaurav Golecha", "District Officer - Professional Assistance", "Rotaract Club of Pune Samrajya", "gaurav-golecha"),
      person("Rtr. Talha Shaikh", "District Officer - Professional Assistance", "Rotaract Club of Aundh Smartcity", "talha-shaikh"),
      person("PHF. DRRE. Adv. Sattyajeet Karale Patil", "District Legal Advisor", "Rotaract Club of Pune Samrajya", "sattyajeet-karale-patil"),
      person("Rtr. Devsharan Singh", "District Coordinator - Website", "Rotaract Club of Aundh Smartcity", "devsharan-singh"),
      person("Rtr. Vedant Buge", "District Officer - Without Portfolio", "Rotaract Club of Pune Kalyani Nagar", "vedant-buge"),
      person("Rtr. Priya Bhagwani", "District Officer - Without Portfolio", "Rotaract Club of Nigdi Pune", "priya-bhagwani"),
      person("PHF. Rtr. Ameya Mhaske", "District Officer - Without Portfolio", "Rotaract Club of Pune Shaniwarwada", "ameya-mhaske"),
      person("PHF. Rtr. Madhu Pimprikar", "District Officer - Without Portfolio", "Rotaract Club of Pune Shaniwarwada", "madhu-pimprikar"),
    ],
  },
  {
    title: "Event Chairpersons",
    description: "Coordinating high-impact district events and fellowships.",
    people: [
      person("Rtr. Ashi Agarwal", "District Coordinator - Multi District Events", "Rotaract Club of Roar NIBM", "ashi-agarwal"),
      person("Rtr. Sanjana Pawar", "District Chairperson - World Rotaract Week", "Rotaract Club of Vibrants", "sanjana-pawar"),
    ],
  },
  {
    title: "Convenors",
    description: "Leading flagship events and experiences across the district.",
    people: [
      person("PHF. Rtr. Vansh Chawla", "District Convenor - District Sports Meet", "Rotaract Club of Pimpri", "vansh-chawla"),
      person("Rtr. Amruta Potdukhe", "District Convenor - DRR and Council Installation", "Rotaract Club of Sinhgad College of Pharmacy", "amruta-potdukhe"),
      person("Rtr. Digvijay Lad", "District Convenor - District Trek", "Rotaract Club of Pune City Fortune", "digvijay-lad"),
      person("Rtr. Vijeta Kulkarni", "District Convenor - District Culturals", "Rotaract Club of Pune Samrajya", "vijeta-kulkarni"),
    ],
  },
];

export const leaders: Leader[] = councilSections.flatMap((section) => section.people.map((member) => ({ ...member, message: `${member.title}\n${member.club}` })));

interface MessagesTabProps {
  onSelectLeader?: (leader: Leader) => void;
}

const MessagesTab = ({ onSelectLeader }: MessagesTabProps) => (
  <div className="mx-auto max-w-5xl space-y-16 sm:space-y-24">
    {councilSections.map((section, sectionIndex) => (
      <section key={section.title}>
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.35 }} className="mb-6 flex items-end justify-between gap-5">
          <div className="flex items-start gap-4">
            <div>
              <h3 className="text-lg font-medium text-foreground sm:text-xl">{section.title}</h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">{section.description}</p>
            </div>
          </div>
          <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{section.people.length} {section.people.length === 1 ? "leader" : "leaders"}</span>
        </motion.div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8 border-t border-border/70 py-6 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4">
          {section.people.map((member, index) => {
            const selected = { ...member, message: `${member.title}\n${member.club}` };
            return (
              <motion.button key={member.name} type="button" onClick={() => onSelectLeader?.(selected)} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-20px" }} transition={{ delay: (index % 8) * 0.035, duration: 0.3 }} className="group min-w-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4">
                <div className="relative h-20 w-20 rounded-full border border-border bg-background p-0.5 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/10 sm:h-24 sm:w-24">
                  <img src={member.photo} alt={member.name} height="460" width="460" loading="lazy" decoding="async" className="aspect-square h-full w-full rounded-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                  <svg aria-hidden="true" viewBox="0 0 100 100" className="pointer-events-none absolute -inset-1 h-[calc(100%+0.5rem)] w-[calc(100%+0.5rem)] -rotate-90 overflow-visible opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="stroke-primary [stroke-dasharray:295.3] [stroke-dashoffset:295.3] transition-[stroke-dashoffset] duration-1000 ease-out group-hover:[stroke-dashoffset:0]" />
                  </svg>
                </div>
                <span className="mt-3 block text-sm font-semibold leading-5 text-foreground transition-colors group-hover:text-primary">{member.name}</span>
                <span className="mt-1 block text-xs font-medium leading-5 text-primary">{member.title}</span>
                <span className="mt-0.5 block truncate text-xs leading-5 text-muted-foreground">{member.club}</span>
              </motion.button>
            );
          })}
        </div>
      </section>
    ))}
  </div>
);

export default MessagesTab;

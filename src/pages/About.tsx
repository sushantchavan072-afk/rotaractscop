import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTab from "@/components/about/OverviewTab";
import RotaryTab from "@/components/about/RotaryTab";
import DistrictTab from "@/components/about/DistrictTab";
import MessagesTab from "@/components/about/MessagesTab";
import CoreMembersTab from "@/components/about/CoreMembersTab";
import ThemeDialog from "@/components/about/ThemeDialog";
import LeaderDialog from "@/components/about/LeaderDialog";
import type { Leader } from "@/components/about/MessagesTab";

const tabItems = [
  { value: "overview", label: "Overview" },
  { value: "rotary", label: "Rotary International" },
  { value: "district", label: "Rotaract District 3131" },
  { value: "messages", label: "Meet the Leaders" },
  { value: "core", label: "From Core Members Desk" },
];

const tabContent: Record<string, React.ElementType> = {
  overview: OverviewTab,
  rotary: RotaryTab,
  district: DistrictTab,
  messages: MessagesTab,
  core: CoreMembersTab,
};

const About = () => {
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);
  const [isThemeDialogOpen, setIsThemeDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const getTabProps = (value: string) => {
    if (value === "overview") return { onOpenThemeDialog: () => setIsThemeDialogOpen(true) };
    if (value === "messages" || value === "core") return { onSelectLeader: setSelectedLeader };
    return {};
  };

  return (
    <div className="min-h-screen pt-20 sm:pt-28 pb-16">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">About Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
            Everything you need to know about Rotaract Club Of SCOP
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col gap-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="flex justify-center w-full"
          >
            <TabsList className="inline-flex h-auto items-center justify-start sm:justify-center rounded-full glass-pill border border-primary/10 dark:border-white/5 p-1.5 shadow-sm max-w-full overflow-x-auto scrollbar-hide">
              {tabItems.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="relative px-5 py-2.5 text-[14px] sm:text-[15px] font-medium rounded-full whitespace-nowrap transition-colors z-10 data-[state=active]:text-white text-muted-foreground hover:text-foreground shrink-0"
                >
                  {activeTab === tab.value && (
                    <motion.div
                      layoutId="about-tab-pill"
                      className="absolute inset-0 bg-primary rounded-full shadow-md -z-10"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </motion.div>

          <div className="flex-1 w-full max-w-5xl mx-auto min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: "easeOut" as const }}
              >
                {tabItems.map((tab) => (
                  <TabsContent key={tab.value} value={tab.value} className="mt-0">
                    {tab.value === activeTab && (() => {
                      const Component = tabContent[tab.value];
                      return <Component {...getTabProps(tab.value)} />;
                    })()}
                  </TabsContent>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </Tabs>
      </div>

      <ThemeDialog open={isThemeDialogOpen} onOpenChange={setIsThemeDialogOpen} />
    </div>
  );
};

export default About;

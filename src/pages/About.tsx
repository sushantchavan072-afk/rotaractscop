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

const tabContent: Record<string, React.FC<any>> = {
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
    <div className="min-h-screen py-20 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
            About Us
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Everything you need to know about Rotaract
          </motion.p>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col lg:flex-row gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="lg:w-72 shrink-0"
          >
            <TabsList className="flex flex-col h-auto w-full bg-card border border-border/50 rounded-xl p-2.5 gap-1.5 shadow-lg sticky top-24">
              {tabItems.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="w-full justify-start text-left px-5 py-3.5 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </motion.div>

          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: "easeOut" as const }}
              >
                {tabItems.map((tab) => (
                  <TabsContent key={tab.value} value={tab.value} className="mt-0" forceMount={tab.value === activeTab ? undefined : undefined}>
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
      <LeaderDialog leader={selectedLeader} onClose={() => setSelectedLeader(null)} />
    </div>
  );
};

export default About;

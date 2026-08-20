import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, Clock, MapPin, Phone, Mail, Calendar as CalendarIcon, Download } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" as const },
  }),
};

const Info = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const contactInfo = [
    { icon: MapPin, title: "Location", details: "Sinhgad College of Pharmacy, Vadgaon (Bk), Pune - 411041, Maharashtra, India" },
    { icon: Phone, title: "Phone", details: "+918888590902" },
    { icon: Mail, title: "Email", details: "rotaractscop@gmail.com" },
    { icon: Clock, title: "Meeting Times", details: "Every Tuesday, 5:00 PM - 6:30 PM" },
  ];

  const clubDetails = [
    {
      title: "Club Charter", items: [
        { label: "Club ID", value: "8826281" },
        { label: "Charter Date", value: "12 March 2024" },
        { label: "RI District", value: "3131" },
        { label: "Sponsor Club", value: "Rotary Club Of Pune Nanded City" },
      ]
    },
    {
      title: "Membership", items: [
        { label: "Active Members", value: "30+" },
        { label: "Board Members", value: "14" },
        { label: "Avenue", value: "7" },
        { label: "Age Range", value: "18-30 years" },
      ]
    },
  ];

  const faq = [
    { question: "What is Rotaract?", answer: "Rotaract is a global movement of young leaders who take action in their communities and beyond. We focus on leadership development, professional development, and service above self." },
    { question: "Who can join?", answer: "Any young professional or student aged 18-30 who is passionate about making a difference in their community can join our club." },
    { question: "What are the membership requirements?", answer: "To be a Member, Person must be a sinhgad institute student and should be committed to attending regular meetings, participating in service projects, and contributing to the club's mission of service and leadership development." },
    { question: "Are there membership fees?", answer: "Yes, there is a nominal annual membership fee that covers club operations, event costs, and Rotary International dues. Contact us for current rates." },
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Club Information</h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" as const }}
            className="text-xl text-muted-foreground max-w-none mx-auto sm:whitespace-nowrap"
          >
            Everything you need to know about our club, & how to get involved.
          </motion.p>
        </motion.div>

        {/* Contact Information */}
        <div className="mb-16">
          <motion.h2
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
            className="text-3xl font-bold mb-8"
          >Contact Us</motion.h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div key={index} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-30px" }} custom={index + 1}>
                  <Card className="shadow-lg h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{info.title}</h3>
                          <p className="text-muted-foreground">{info.details}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Club Details */}
        <div className="mb-16">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <motion.h2
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
              className="mb-0 text-3xl font-bold"
            >Club Details</motion.h2>
            <a href="/club-profile.html" download="Rotaract-SCOP-Club-Profile.html" className="inline-flex w-fit items-center gap-2 rounded-full border border-border/70 bg-background/60 px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/35 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4">
              <Download className="h-4 w-4 text-primary" /> Download club profile
            </a>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {clubDetails.map((section, index) => (
              <motion.div key={index} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-30px" }} custom={index + 1}>
                <Card className="shadow-lg h-full">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold mb-6">{section.title}</h3>
                    <div className="space-y-4">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex justify-between items-center pb-2 border-b last:border-0">
                          <span className="text-muted-foreground">{item.label}</span>
                          <span className="font-semibold">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="w-full text-left">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="mb-8 max-w-2xl text-left">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Need to know</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">A quick guide to joining, participating, and finding your place in Rotaract Club of SCOP.</p>
          </motion.div>
          <div className="border-t border-border/70">
            {faq.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <motion.div key={index} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-30px" }} custom={index + 1} onMouseEnter={() => setOpenFaq(index)} onMouseLeave={() => setOpenFaq((current) => current === index ? null : current)} className="border-b border-border/70">
                  <button type="button" aria-expanded={isOpen} onClick={() => setOpenFaq(isOpen ? null : index)} className="flex w-full items-center justify-between gap-6 py-5 text-left text-base font-medium text-foreground transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 sm:text-lg">
                    <span>{item.question}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden"><p className="max-w-3xl pb-5 text-sm leading-7 text-muted-foreground sm:text-base">{item.answer}</p></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;

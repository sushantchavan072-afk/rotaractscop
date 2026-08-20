import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";

const contactDetails = [
  { icon: Mail, label: "Email", value: "rotaractscop@gmail.com" },
  { icon: Phone, label: "Phone", value: "+91 88885 90902" },
  { icon: MapPin, label: "Location", value: "Sinhgad College of Pharmacy, Vadgaon (Bk), Pune" },
  { icon: Clock, label: "Meetings", value: "Every Tuesday, 5:00 PM – 6:30 PM" },
];

const Contact = () => (
  <div className="min-h-screen py-16">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.header initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mb-16 text-center">
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Contact Us</h1>
        <p className="mx-auto mt-5 max-w-3xl text-xl leading-8 text-muted-foreground sm:whitespace-nowrap">Have a question, an idea, or a reason to collaborate? We would love to hear from you.</p>
      </motion.header>

      <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
        <motion.aside initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45, delay: 0.1 }} className="rounded-3xl border border-border/70 bg-card/60 p-6 shadow-sm sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Find the right next step</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">Let’s make it meaningful.</h2>
          <p className="mt-4 leading-7 text-muted-foreground">Reach out about membership, sponsorship, event partnerships, or anything you would like to explore with Rotaract Club of SCOP.</p>
          <div className="mt-8 space-y-5">
            {contactDetails.map(({ icon: Icon, label, value }) => <div key={label} className="flex items-start gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon className="h-4 w-4" /></div><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">{label}</p><p className="mt-1 text-sm font-semibold leading-6 text-foreground">{value}</p></div></div>)}
          </div>
        </motion.aside>
        <ContactForm />
      </div>
    </div>
  </div>
);

export default Contact;

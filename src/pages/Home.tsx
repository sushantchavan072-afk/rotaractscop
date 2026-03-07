import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Users, Award, Heart, Globe } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";
import heroBg from "@/assets/hero-bg.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" as const },
  }),
};

const Home = () => {
  // stats removed as per user request

  const clubInfo = [
    { label: "Club ID", value: "8826281" },
    { label: "Charter Date", value: "12 March 2024" },
    { label: "RI District", value: "3131" },
    { label: "Sponsor Rotary", value: "Rotary Club Of Pune Nanded City" },
  ];

  const avenues = [
    { title: "Professional Development", desc: "Building careers through workshops, mentorship, and skill-building sessions.", icon: Award },
    { title: "Community Service", desc: "Meaningful impact through donation drives, awareness campaigns, and outreach.", icon: Heart },
    { title: "International Service", desc: "Connecting with clubs globally for cross-cultural exchange and collaboration.", icon: Globe },
    { title: "Club Service", desc: "Strengthening bonds through team bonding events, games, and celebrations.", icon: Users },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[85vh] sm:min-h-[92vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt="Rotaract Club of SCOP members"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.25) contrast(1.15) saturate(1.1)" }}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />

        {/* Ambient glow effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/12 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[80px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-20 w-full">
          <div className="flex flex-col items-center text-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-md rounded-full border border-primary/20 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <p className="text-sm font-semibold text-primary poppins">सेवा संगठन परिवर्तन</p>
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] text-white tracking-tight uppercase capitalize px-2 sm:px-0"
            >
              Rotaract Club Of
              <span className="block text-primary mt-1 sm:mt-2 text-xl sm:text-3xl md:text-4xl lg:text-5xl">Sinhgad College Of Pharmacy</span>
            </motion.h1>

            {/* Hero subtitle removed per user request */}


            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="flex flex-col sm:flex-row gap-3 mt-8"
            >
              <Link to="/join">
                <Button size="lg" className="gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all w-full sm:w-auto px-8">
                  Join Us
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/events">
                <Button variant="outline" size="lg" className="gap-2 bg-white/5 backdrop-blur-sm border-white/15 text-white hover:bg-white/10 w-full sm:w-auto px-8">
                  <Calendar className="w-5 h-5" />
                  Our Events
                </Button>
              </Link>
            </motion.div>

            {/* stats section removed per user request */}
          </div>
        </div>

        {/* Bottom fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* About Us Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="py-16 sm:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex justify-center relative"
            >
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-[60px] scale-75" />
              <img src={logo} alt="Rotaract Club Logo" className="w-52 h-52 sm:w-72 sm:h-72 object-contain drop-shadow-2xl relative z-10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-5"
            >
              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Who We Are</p>
                <h2 className="text-3xl sm:text-4xl font-bold leading-tight">Rotaract Club of SCOP</h2>
                <div className="h-1 w-58 bg-primary rounded-full mt-3" />
              </div>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                We are a dynamic, youth-led club under RID 3131, empowering students through meaningful community service, hands-on leadership, and strong professional development. Based at Sinhgad College of Pharmacy, we strive to create positive change in our community while building tomorrow's leaders.
              </p>
              <Link to="/about">
                <Button size="lg" className="gap-2 mt-4">
                  Read More
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Avenues Highlight */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="py-16 sm:py-20 bg-card/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">What We Do</p>
            <h2 className="text-3xl sm:text-4xl font-bold">Our Avenues of Service</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {avenues.map((avenue, index) => (
              <motion.div
                key={avenue.title}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
                className="group bg-card border border-border/50 rounded-xl p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <avenue.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-base mb-2">{avenue.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{avenue.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/avenue">
              <Button variant="outline" className="gap-2">
                View All Avenues
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Club Info Strip */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="py-12 sm:py-16 border-y border-border/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {clubInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
                className="text-center"
              >
                <p className="text-xs text-muted-foreground mb-1.5 uppercase tracking-widest">{info.label}</p>
                <p className="text-base sm:text-lg font-bold">{info.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Want to Make a 
              <span className="text-primary"> Difference?</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <Link to="/join">
                <Button size="lg" className="gap-2 shadow-lg shadow-primary/20 w-full sm:w-auto px-8">
                  Become A Member
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/members">
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-8">
                  Meet Our Team
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;

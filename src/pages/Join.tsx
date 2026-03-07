import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" as const },
  }),
};

const Join = () => {
  const benefits = [
    "Develop leadership and professional skills",
    "Network with like-minded young professionals",
    "Make a meaningful impact in the community",
    "Participate in local and international projects",
    "Access to Rotary International resources",
    "Build lasting friendships and connections",
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const form = e.currentTarget;

  const data = {
    firstName: (form.firstName as HTMLInputElement).value,
    lastName: (form.lastName as HTMLInputElement).value,
    email: (form.email as HTMLInputElement).value,
    phone: (form.phone as HTMLInputElement).value,
    age: (form.age as HTMLInputElement).value,
    collegeName: (form.collegeName as HTMLInputElement).value,
    branch: (form.branch as HTMLInputElement).value,
    occupation: (form.occupation as HTMLInputElement).value,
    message: (form.message as HTMLTextAreaElement).value,
    timestamp: new Date().toISOString()
  };

  try {
    const res = await fetch("https://sheetdb.io/api/v1/zp3euuhbbzs6w", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ data: [data] })
    });

    if (res.ok) {
      toast.success("Application submitted successfully!");
      form.reset();
    } else {
      toast.error("Submission failed");
    }
  } catch (error) {
    toast.error("Network error");
  }
};

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Join Rotaract</h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" as const }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Become part of our moveent to create a positive change.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Benefits Section */}
          <div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
              <Card className="shadow-lg mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Why Join Us?</h2>
                  <ul className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={index + 1}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}>
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">Membership Requirements</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>• Age between 18-30 years</p>
                    <p>• Commitment to service and leadership</p>
                    <p>• Ability to attend regular meetings</p>
                    <p>• Should Be a Sinhgad Institue Student</p>
                    <p>• Annual membership fee applies</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Application Form */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}>
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Membership Application</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" name="firstName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" name="lastName" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" name="phone" type="tel" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age *</Label>
                    <Input id="age" name="age" type="number" min="18" max="30" required />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="collegeName">College Name *</Label>
                      <Input id="collegeName" name="collegeName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="branch">Branch *</Label>
                      <Input id="branch" name="branch" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation/Student Status *</Label>
                    <Input id="occupation" name="occupation" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Why do you want to join Rotaract? *</Label>
                    <Textarea id="message" name="message" rows={4} required />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Submit Application
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Join;

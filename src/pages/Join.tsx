import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { CheckCircle, ArrowRight, User, GraduationCap, Heart, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const STEPS = [
  { label: "Welcome", icon: Heart },
  { label: "Personal", icon: User },
  { label: "Academic", icon: GraduationCap },
  { label: "Motivation", icon: Heart },
];

const slide = {
  hidden: (dir: number) => ({ opacity: 0, x: dir * 28 }),
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: (dir: number) => ({ opacity: 0, x: -dir * 28, transition: { duration: 0.22 } }),
};

const FieldGroup = ({ children, cols = 1 }: { children: React.ReactNode; cols?: number }) => (
  <div className={`grid gap-4 ${cols === 2 ? "sm:grid-cols-2" : ""}`}>
    {children}
  </div>
);

const Field = ({
  label, id, required, children,
}: { label: string; id?: string; required?: boolean; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <Label htmlFor={id} className="text-sm font-medium text-foreground/80">
      {label}{required && <span className="text-primary ml-0.5">*</span>}
    </Label>
    {children}
  </div>
);

const collegeGroups = [
  {
    campus: "Vadgaon (Bk) Campus",
    colleges: [
      "Sinhgad College of Engineering (SCOE)",
      "Sou. Venutai Chavan Polytechnic",
      "Smt. Kashibai Navale College of Engineering (SKNCOE)",
      "Sinhgad Institute of Management (MBA/MCA)",
      "SKN Sinhgad School of Business Management",
      "Sinhgad College of Pharmacy",
      "Sinhgad College of Architecture",
      "Smt. Kashibai Navale College of Architecture",
      "Sinhgad Dental College & Hospital",
      "NBN Sinhgad School of Engineering",
      "Sinhgad Law College",
      "Sinhgad College of Science (Junior & Senior)"
    ]
  },
  {
    campus: "Ambegaon Campus",
    colleges: [
      "NBN Sinhgad School of Engineering",
      "NBN Sinhgad School of Management Studies",
      "Sinhgad College of Science (Junior & Senior)",
      "Sinhgad Dental College & Hospital"
    ]
  },
  {
    campus: "Narhe Campus",
    colleges: [
      "Sinhgad Institute of Technology and Science (SITS)",
      "Sinhgad Institute of Management & Computer Application (SIMCA)",
      "Sinhgad Institute of Pharmacy",
      "Sinhgad College of Arts, Science & Commerce"
    ]
  },
  {
    campus: "Kondhwa Campus",
    colleges: [
      "Sinhgad Academy of Engineering (SAE)",
      "Sinhgad Institute of Business Administration & Research (SIBAR)",
      "Smt. Kashibai Navale College of Pharmacy",
      "Sinhgad College of Commerce",
      "Sinhgad College of Arts, Science & Commerce (Junior)"
    ]
  }
];

const Join = () => {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "", age: "",
    campus: "", collegeName: "", branch: "", occupation: "", message: "",
  });

  const set = (field: keyof typeof formData, value: string) =>
    setFormData((p) => ({ ...p, [field]: value }));

  const go = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formattedCollege = formData.campus && formData.campus !== "Other"
        ? `${formData.collegeName} — ${formData.campus}`
        : formData.collegeName;

      const data = {
        ...formData,
        collegeName: formattedCollege,
        timestamp: new Date().toISOString(),
      };
      const res = await fetch("https://sheetdb.io/api/v1/zp3euuhbbzs6w", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: [data] }),
      });
      if (res.ok) { toast.success("Application submitted!"); setDir(1); setStep(5); }
      else toast.error("Submission failed. Try again.");
    } catch { toast.error("Network error. Try again."); }
    finally { setIsSubmitting(false); }
  };

  const progress = Math.min(step, 4) / 4;

  return (
    <div className="min-h-screen pt-20 sm:pt-32 pb-10 sm:pb-16">
      <div className="max-w-2xl mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Join Rotaract</h1>
          <p className="text-muted-foreground text-sm">Membership Application · Rotaract Club Of SCOP</p>
        </motion.div>

        {step <= 4 && (
          <>
            {/* Step Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex items-center justify-between mb-6 px-1 sm:px-6"
            >
              {STEPS.map((s, i) => {
                const n = i + 1;
                const done = step > n;
                const active = step === n;
                return (
                  <div key={s.label} className="flex flex-col items-center gap-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${done ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30"
                      : active ? "bg-primary/15 border-2 border-primary text-primary"
                        : "bg-muted text-muted-foreground border border-border"
                      }`}>
                      {done ? <CheckCircle className="w-4 h-4" /> : n}
                    </div>
                    <span className={`text-[10px] font-medium hidden sm:block ${active ? "text-primary" : "text-muted-foreground"}`}>
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </motion.div>

            {/* Progress bar */}
            <div className="w-full h-1 bg-border rounded-full mb-8 overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              />
            </div>
          </>
        )}

        {/* Card */}
        <div className="glass-strong rounded-3xl overflow-hidden shadow-sm border border-black/5">
          <AnimatePresence mode="wait" custom={dir}>
            {step === 5 ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="p-10 text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center mb-5">
                  <CheckCircle className="w-9 h-9 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold mb-3">Application Received!</h2>
                <p className="text-muted-foreground text-sm max-w-sm mb-7 leading-relaxed">
                  Thank you for applying to join the Rotaract movement. Our team will review your application and reach out to you shortly.
                </p>
                <Link to="/">
                  <Button variant="outline" className="rounded-full">Return to Home</Button>
                </Link>
              </motion.div>
            ) : (
              <motion.form
                key={`step-${step}`}
                custom={dir}
                variants={slide}
                initial="hidden"
                animate="visible"
                exit="exit"
                onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); go(step + 1); }}
                className="p-6 sm:p-8 space-y-6"
              >
                {/* Step 1 — Welcome & Requirements */}
                {step === 1 && (
                  <>
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-8 h-8 text-primary" />
                      </div>
                      <h2 className="text-2xl font-extrabold mb-2">Welcome to the Movement</h2>
                      <p className="text-muted-foreground font-medium max-w-sm mx-auto leading-relaxed">
                        By joining us, you are taking the first step towards youth leadership and community impact.
                      </p>
                    </div>

                    <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10 mb-6">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Requirements</h3>
                      <ul className="space-y-2 text-[14px] text-muted-foreground font-medium">
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" /> Age between 18–30 years</li>
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" /> Commitment to service and leadership</li>
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" /> Ability to attend regular meetings</li>
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" /> Annual membership fee applies</li>
                      </ul>
                    </div>

                    <div className="glass-panel p-5 rounded-2xl border border-black/5 dark:border-white/5 bg-white/60 dark:bg-white/5 mb-6">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">Looking to Lead?</h3>
                      <p className="text-[13px] text-muted-foreground mb-4">If you are a new member eager to join or an existing member ready to take on a leadership role, apply here.</p>
                      <Link to="/bod-application">
                        <Button variant="outline" className="w-full text-primary border-primary/30 hover:bg-primary hover:text-white rounded-xl transition-colors">
                          Apply Here!
                        </Button>
                      </Link>
                    </div>
                  </>
                )}

                {/* Step 2 — Personal */}
                {step === 2 && (
                  <>
                    <div>
                      <h2 className="text-xl font-bold mb-1">Personal Details</h2>
                      <p className="text-sm text-muted-foreground">Tell us a bit about yourself.</p>
                    </div>
                    <FieldGroup cols={2}>
                      <Field label="First Name" id="firstName" required>
                        <Input id="firstName" required value={formData.firstName} onChange={(e) => set("firstName", e.target.value)} />
                      </Field>
                      <Field label="Last Name" id="lastName" required>
                        <Input id="lastName" required value={formData.lastName} onChange={(e) => set("lastName", e.target.value)} />
                      </Field>
                      <Field label="Email Address" id="email" required>
                        <Input id="email" type="email" required value={formData.email} onChange={(e) => set("email", e.target.value)} />
                      </Field>
                      <Field label="Phone Number" id="phone" required>
                        <Input id="phone" type="tel" required value={formData.phone} onChange={(e) => set("phone", e.target.value)} />
                      </Field>
                      <Field label="Age" id="age" required>
                        <Input id="age" type="number" min="18" max="30" required value={formData.age} onChange={(e) => set("age", e.target.value)} />
                      </Field>
                    </FieldGroup>
                  </>
                )}

                {/* Step 3 — Academic */}
                {step === 3 && (
                  <>
                    <div>
                      <h2 className="text-xl font-bold mb-1">Academic & Status</h2>
                      <p className="text-sm text-muted-foreground">What are you currently pursuing?</p>
                    </div>
                    <FieldGroup cols={2}>
                      <Field label="Campus" required>
                        <Select value={formData.campus} onValueChange={(v) => { set("campus", v); set("collegeName", ""); }}>
                          <SelectTrigger><SelectValue placeholder="Select campus" /></SelectTrigger>
                          <SelectContent position="popper" side="bottom" className="max-h-[250px]">
                            {collegeGroups.map(g => (
                              <SelectItem key={g.campus} value={g.campus}>{g.campus}</SelectItem>
                            ))}
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>

                      <Field label="College / Institution" required>
                        {formData.campus === "Other" ? (
                          <Input required placeholder="e.g. Modern College, Shivajinagar" value={formData.collegeName} onChange={(e) => set("collegeName", e.target.value)} />
                        ) : (
                          <Select
                            value={formData.collegeName}
                            onValueChange={(v) => set("collegeName", v)}
                            disabled={!formData.campus}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={formData.campus ? "Select college" : "Select campus first"} />
                            </SelectTrigger>
                            <SelectContent position="popper" side="bottom" className="max-h-[250px]">
                              {formData.campus && collegeGroups.find(g => g.campus === formData.campus)?.colleges.map(col => (
                                <SelectItem key={col} value={col}>{col}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </Field>
                    </FieldGroup>
                    <FieldGroup cols={2}>
                      <Field label="Branch / Specialisation" id="branch" required>
                        <Input id="branch" required value={formData.branch} onChange={(e) => set("branch", e.target.value)} />
                      </Field>
                      <Field label="Occupation / Status" id="occupation" required>
                        <Input id="occupation" placeholder="e.g. Student, Working" required value={formData.occupation} onChange={(e) => set("occupation", e.target.value)} />
                      </Field>
                    </FieldGroup>
                  </>
                )}

                {/* Step 4 — Motivation */}
                {step === 4 && (
                  <>
                    <div>
                      <h2 className="text-xl font-bold mb-1">Your Motivation</h2>
                      <p className="text-sm text-muted-foreground">Why do you want to join our club?</p>
                    </div>
                    <Field label="Statement of Purpose" required>
                      <Textarea
                        placeholder="Tell us what inspires you to join the Rotaract movement..."
                        required
                        value={formData.message}
                        onChange={(e) => set("message", e.target.value)}
                        rows={6}
                        className="resize-none"
                      />
                    </Field>
                  </>
                )}

                {/* Footer Controls */}
                <div className="pt-4 flex items-center justify-between border-t border-black/5 mt-8">
                  {step > 1 ? (
                    <Button type="button" variant="ghost" onClick={() => go(step - 1)} className="rounded-full gap-2 px-6 hover:bg-muted">
                      <ChevronLeft className="w-4 h-4" /> Back
                    </Button>
                  ) : (
                    <div className="pl-2">
                      <span className="text-xs font-medium text-muted-foreground hidden sm:block">
                        For General Body Member Applications
                      </span>
                    </div>
                  )}

                  <Button type="submit" disabled={isSubmitting} className="rounded-full gap-2 px-8 shadow-md">
                    {isSubmitting ? "Submitting..." : step === 4 ? "Submit Application" : "Continue"}
                    {!isSubmitting && step !== 4 && <ArrowRight className="w-4 h-4 ml-1" />}
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Join;

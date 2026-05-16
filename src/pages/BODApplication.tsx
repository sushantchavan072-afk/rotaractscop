import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle, ChevronLeft, ChevronRight, Send, User, GraduationCap, Star, Briefcase, Layers, FileText, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
const STEPS = [
  { label: "Personal", icon: User },
  { label: "Academic", icon: GraduationCap },
  { label: "Experience", icon: Star },
  { label: "Position", icon: Briefcase },
  { label: "Skills", icon: Layers },
  { label: "Statement", icon: FileText },
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

export default function BODApplication() {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "", dob: "", email: "", mobile: "", address: "", gender: "",
    college: "", campus: "", course: "", branch: "", currentYear: "", expectedGraduation: "",
    memberSince: "N/A", eventsParticipated: "N/A", previousRoles: "", notableContributions: "",
    positionCategory: "", positionApplied: "", alternatePosition: "",
    avenues: [] as string[], coreSkills: "", toolsSoftware: "", languages: "",
    linkedinUrl: "", availability: "",
    whyBod: "", vision: "", referral: "", declaration: false,
  });

  const set = (field: keyof typeof formData, value: string | boolean) =>
    setFormData((p) => ({ ...p, [field]: value }));

  const toggleAvenue = (a: string) =>
    setFormData((p) => ({
      ...p,
      avenues: p.avenues.includes(a) ? p.avenues.filter((x) => x !== a) : [...p.avenues, a],
    }));

  const go = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.declaration) {
      toast.error("Please agree to the declaration.");
      return;
    }
    setIsSubmitting(true);
    try {
      const formattedCollege = formData.campus && formData.campus !== "Other"
        ? `${formData.college} — ${formData.campus}`
        : formData.college;

      const sheetPayload = {
        "Timestamp": new Date().toLocaleString(),
        "Full Name": formData.fullName,
        "Email": formData.email,
        "Phone": `'${formData.mobile}`,
        "Date of Birth": formData.dob,
        "Gender": formData.gender,
        "Address": formData.address,
        "College": formattedCollege,
        "Campus": formData.campus,
        "Course": formData.course,
        "Branch": formData.branch,
        "Current Year": formData.currentYear,
        "Member Since": formData.memberSince,
        "Events Participated": formData.eventsParticipated,
        "Previous Roles": formData.previousRoles,
        "Notable-Contributions": formData.notableContributions,
        "Primary Position": formData.positionApplied,
        "Alternate Position": formData.alternatePosition,
        "Avenues of Intrest": formData.avenues.join(", "),
        "Core Skills": formData.coreSkills,
        "Tools & Software": formData.toolsSoftware,
        "Languages": formData.languages,
        "LinkedIn URL": formData.linkedinUrl,
        "Availability": formData.availability,
        "Why BOD": formData.whyBod,
        "Vision": formData.vision,
        "Referral": formData.referral,
        "Declaration": formData.declaration ? "Yes" : "No"
      };

      const res = await fetch("https://sheetdb.io/api/v1/m70l6i2ya322p", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: [sheetPayload] }),
      });
      if (res.ok) { toast.success("Application submitted!"); setDir(1); setStep(7); }
      else toast.error("Submission failed. Try again.");
    } catch { toast.error("Network error. Try again."); }
    finally { setIsSubmitting(false); }
  };

  const positionCategories = [
    {
      category: "Core Board",
      roles: [
        "Secretary",
        "Treasurer",
        "Sergeant At Arms"
      ]
    },
    {
      category: "Directors",
      roles: [
        "Professional Development Director",
        "Community Service Director",
        "Club Service Director",
        "International Service Director",
        "Public Image Director",
        "Membership Development Director"
      ]
    },
    {
      category: "Officers & Chairs",
      roles: [
        "Editor",
        "Public Relations Officer",
        "Professional Assistance Officer",
        "Rotary Rotaract Relationships Officer",
        "Interact Rotaract Relationships Officer",
        "World Rotaract Week Chairperson",
        "Diversity Equity & Inclusivity Representative"
      ]
    }
  ];
  const positions = positionCategories.flatMap(g => g.roles);
  const avenuesList = ["Club Service", "Community Service", "Professional Dev.", "International Service", "Editorial & Design", "Social Media", "Finance & Admin", "Events & Logistics"];

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
  const progress = Math.min(step, 6) / 6;

  return (
    <div className="min-h-screen pt-20 sm:pt-28 pb-16">

      <div className="max-w-2xl mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-center mb-6 sm:mb-10"
        >
          <h1 className="text-[24px] min-[375px]:text-[26px] sm:text-4xl font-extrabold sm:font-bold mb-2 tracking-tight whitespace-nowrap">Membership Application</h1>
          <p className="text-muted-foreground text-sm">By joining us, you are taking the first step towards youth leadership & impact.</p>
        </motion.div>

        {step <= 6 && (
          <>
            {/* Step Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex items-center justify-between mb-6 px-1"
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
        <div className="glass-strong rounded-3xl overflow-hidden">
          <AnimatePresence mode="wait" custom={dir}>
            {step === 7 ? (
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
                  Thank you for applying. We'll be in touch about next steps via email.
                </p>
                <Button variant="outline" onClick={() => window.location.reload()}>Return Home</Button>
              </motion.div>
            ) : (
              <motion.form
                key={`step-${step}`}
                custom={dir}
                variants={slide}
                initial="hidden"
                animate="visible"
                exit="exit"
                onSubmit={step === 6 ? handleSubmit : (e) => { e.preventDefault(); go(step + 1); }}
                className="p-6 sm:p-8 space-y-6"
              >
                {/* Step 1 — Personal */}
                {step === 1 && (
                  <>
                    <div>
                      <h2 className="text-xl font-bold mb-1">Personal Information</h2>
                      <p className="text-sm text-muted-foreground">Your contact details for correspondence.</p>
                    </div>
                    <FieldGroup cols={2}>
                      <Field label="Full Name" id="fullName" required>
                        <Input id="fullName" required value={formData.fullName} onChange={(e) => set("fullName", e.target.value)} />
                      </Field>
                      <Field label="Date of Birth" id="dob" required>
                        <Input id="dob" type="date" required value={formData.dob} onChange={(e) => set("dob", e.target.value)} />
                      </Field>
                      <Field label="Email Address" id="email" required>
                        <Input id="email" type="email" required value={formData.email} onChange={(e) => set("email", e.target.value)} />
                      </Field>
                      <Field label="Gender" required>
                        <Select value={formData.gender} onValueChange={(v) => set("gender", v)}>
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            {["Male", "Female", "Other", "Prefer not to say"].map((g) => (
                              <SelectItem key={g} value={g}>{g}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                      <Field label="Mobile Number" id="mobile" required>
                        <Input id="mobile" type="tel" required value={formData.mobile} onChange={(e) => set("mobile", e.target.value)} />
                      </Field>
                      <Field label="Address" id="address" required>
                        <Textarea id="address" required value={formData.address} onChange={(e) => set("address", e.target.value)} rows={2} className="resize-none" />
                      </Field>
                    </FieldGroup>
                  </>
                )}

                {/* Step 2 — Academic */}
                {step === 2 && (
                  <>
                    <div>
                      <h2 className="text-xl font-bold mb-1">Academic Details</h2>
                      <p className="text-sm text-muted-foreground">Your current academic standing.</p>
                    </div>
                    <FieldGroup cols={2}>
                      <Field label="Campus" required>
                        <Select value={formData.campus} onValueChange={(v) => { set("campus", v); set("college", ""); }}>
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
                          <Input required placeholder="e.g. Modern College, Shivajinagar" value={formData.college} onChange={(e) => set("college", e.target.value)} />
                        ) : (
                          <Select
                            value={formData.college}
                            onValueChange={(v) => set("college", v)}
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
                      <Field label="Course / Programme" id="course" required>
                        <Input id="course" required value={formData.course} onChange={(e) => set("course", e.target.value)} />
                      </Field>
                      <Field label="Specialisation / Branch" id="branch" required>
                        <Input id="branch" required value={formData.branch} onChange={(e) => set("branch", e.target.value)} />
                      </Field>
                      <Field label="Current Year" required>
                        <Select value={formData.currentYear} onValueChange={(v) => set("currentYear", v)}>
                          <SelectTrigger><SelectValue placeholder="Select year" /></SelectTrigger>
                          <SelectContent>
                            {["First Year", "Second Year", "Third Year", "Fourth Year", "Postgraduate"].map((y) => (
                              <SelectItem key={y} value={y}>{y}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                      <Field label="Expected Graduation" id="expectedGraduation" required>
                        <Input id="expectedGraduation" type="number" min="2024" max="2030" required value={formData.expectedGraduation} onChange={(e) => set("expectedGraduation", e.target.value)} />
                      </Field>
                    </FieldGroup>
                  </>
                )}

                {/* Step 3 — Experience */}
                {step === 3 && (
                  <>
                    <div>
                      <h2 className="text-xl font-bold mb-1">Rotaract Experience</h2>
                      <p className="text-sm text-muted-foreground">Your history and involvement.</p>
                    </div>
                    <FieldGroup cols={2}>
                      <Field label="Member Since (Year/Month)" id="memberSince" required>
                        <Input id="memberSince" placeholder="e.g. 2023/07" required value={formData.memberSince} onChange={(e) => set("memberSince", e.target.value)} />
                      </Field>
                      <Field label="Events Participated (Approx)" id="eventsParticipated" required>
                        <Input id="eventsParticipated" required value={formData.eventsParticipated} onChange={(e) => set("eventsParticipated", e.target.value)} />
                      </Field>
                    </FieldGroup>
                    <Field label="Previous Roles" required>
                      <Select value={formData.previousRoles} onValueChange={(v) => set("previousRoles", v)}>
                        <SelectTrigger><SelectValue placeholder="Select highest role" /></SelectTrigger>
                        <SelectContent>
                          {["None — First Role", "Club Member", "Avenue Lead", "Co-Avenue Lead", "Event Head", "Joint Secretary", "Secretary", "Treasurer", "District Role"].map((r) => (
                            <SelectItem key={r} value={r}>{r}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Notable Contributions">
                      <Textarea
                        placeholder="Briefly describe your significant contributions..."
                        value={formData.notableContributions}
                        onChange={(e) => set("notableContributions", e.target.value)}
                        rows={3}
                        className="resize-none"
                      />
                    </Field>
                  </>
                )}

                {/* Step 4 — Position */}
                {step === 4 && (
                  <>
                    <div>
                      <h2 className="text-xl font-bold mb-1">Position Applied For</h2>
                      <p className="text-sm text-muted-foreground">Choose based on your strengths.</p>
                    </div>
                    <FieldGroup cols={2}>
                      <Field label="Position Category" required>
                        <Select value={formData.positionCategory} onValueChange={(v) => { set("positionCategory", v); set("positionApplied", ""); }}>
                          <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                          <SelectContent>
                            {positionCategories.map(g => (
                              <SelectItem key={g.category} value={g.category}>{g.category}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                      <Field label="Primary Role" required>
                        <Select
                          value={formData.positionApplied}
                          onValueChange={(v) => set("positionApplied", v)}
                          disabled={!formData.positionCategory}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={formData.positionCategory ? "Select role" : "Select category first"} />
                          </SelectTrigger>
                          <SelectContent>
                            {formData.positionCategory && positionCategories.find(g => g.category === formData.positionCategory)?.roles.map(r => (
                              <SelectItem key={r} value={r}>{r}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                    </FieldGroup>
                    <Field label="Alternate Position (Optional)">
                      <Select value={formData.alternatePosition} onValueChange={(v) => set("alternatePosition", v)}>
                        <SelectTrigger><SelectValue placeholder="Select alternate" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="None">None</SelectItem>
                          {positions.map((pos) => <SelectItem key={`alt-${pos}`} value={pos}>{pos}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </Field>
                  </>
                )}

                {/* Step 5 — Skills */}
                {step === 5 && (
                  <>
                    <div>
                      <h2 className="text-xl font-bold mb-1">Skills & Avenues</h2>
                      <p className="text-sm text-muted-foreground">Where your strengths lie.</p>
                    </div>
                    <Field label="Avenues of Interest">
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        {avenuesList.map((av) => (
                          <label
                            key={av}
                            className={`flex items-center gap-2 p-3 rounded-xl border text-xs cursor-pointer transition-all ${formData.avenues.includes(av)
                              ? "border-primary bg-primary/6 text-primary"
                              : "border-border hover:border-primary/30"
                              }`}
                          >
                            <Checkbox
                              id={`av-${av}`}
                              checked={formData.avenues.includes(av)}
                              onCheckedChange={() => toggleAvenue(av)}
                              className="shrink-0"
                            />
                            {av}
                          </label>
                        ))}
                      </div>
                    </Field>
                    <FieldGroup cols={2}>
                      <Field label="Core Skills" id="coreSkills" required>
                        <Input id="coreSkills" placeholder="Leadership, Design…" required value={formData.coreSkills} onChange={(e) => set("coreSkills", e.target.value)} />
                      </Field>
                      <Field label="Tools / Software">
                        <Input placeholder="Figma, Excel…" value={formData.toolsSoftware} onChange={(e) => set("toolsSoftware", e.target.value)} />
                      </Field>
                      <Field label="Languages Known" id="languages" required>
                        <Input id="languages" required value={formData.languages} onChange={(e) => set("languages", e.target.value)} />
                      </Field>
                      <Field label="LinkedIn Profile URL">
                        <Input type="url" placeholder="https://linkedin.com/in/..." value={formData.linkedinUrl} onChange={(e) => set("linkedinUrl", e.target.value)} />
                      </Field>
                    </FieldGroup>
                    <Field label="Weekly Availability" required>
                      <Select value={formData.availability} onValueChange={(v) => set("availability", v)}>
                        <SelectTrigger><SelectValue placeholder="Hours per week" /></SelectTrigger>
                        <SelectContent>
                          {["2–4 hrs/week", "5–8 hrs/week", "8–12 hrs/week", "12+ hrs/week"].map((h) => (
                            <SelectItem key={h} value={h}>{h}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  </>
                )}

                {/* Step 6 — Statement */}
                {step === 6 && (
                  <>
                    <div>
                      <h2 className="text-xl font-bold mb-1">Statement & Declaration</h2>
                      <p className="text-sm text-muted-foreground">Be concise, genuine, and specific.</p>
                    </div>
                    <Field label="Why do you want to Join Rotaract?" id="whyBod" required>
                      <Textarea id="whyBod" required rows={3} value={formData.whyBod} onChange={(e) => set("whyBod", e.target.value)} className="resize-none" />
                    </Field>
                    <Field label="Vision for the Club / Your Avenue" id="vision" required>
                      <Textarea id="vision" required rows={3} value={formData.vision} onChange={(e) => set("vision", e.target.value)} className="resize-none" />
                    </Field>
                    <Field label="Referral (if any)" id="referral">
                      <Input id="referral" placeholder="Name of person who referred you" value={formData.referral} onChange={(e) => set("referral", e.target.value)} />
                    </Field>

                    {/* Declaration */}
                    <div className="rounded-2xl border border-primary/15 bg-primary/4 p-5">
                      <h3 className="font-semibold text-sm mb-2">Declaration</h3>
                      <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                        I hereby declare all information furnished is true, correct, and complete. I understand
                        any misrepresentation may result in disqualification. I commit to upholding the values
                        and ethics of Rotaract.
                      </p>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <Checkbox
                          id="declaration"
                          checked={formData.declaration}
                          onCheckedChange={(c) => set("declaration", c as boolean)}
                          className="mt-0.5 shrink-0"
                        />
                        <span className="text-xs font-medium leading-relaxed">
                          I agree to the above declaration and confirm all information is accurate.
                          <span className="text-primary ml-0.5">*</span>
                        </span>
                      </label>
                    </div>
                  </>
                )}

                {/* Navigation */}
                <div className="flex justify-between items-center pt-4 border-t border-border/50">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => go(step - 1)}
                    disabled={step === 1 || isSubmitting}
                    className="gap-1.5"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </Button>

                  {step < 6 ? (
                    <Button type="submit" className="gap-1.5 px-6">
                      Continue <ChevronRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting || !formData.declaration}
                      className="gap-1.5 px-6"
                    >
                      {isSubmitting ? "Submitting…" : "Submit"}
                      {!isSubmitting && <Send className="w-4 h-4" />}
                    </Button>
                  )}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

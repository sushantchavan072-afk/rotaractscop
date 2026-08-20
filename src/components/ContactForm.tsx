import { CheckCircle2, ChevronDown, Loader2, Send } from "lucide-react";
import { FormEvent, useState } from "react";

interface FormValues {
  name: string;
  email: string;
  enquiryType: string;
  message: string;
}

const initialValues: FormValues = { name: "", email: "", enquiryType: "Membership", message: "" };

const ContactForm = () => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const updateValue = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (status !== "idle") setStatus("idle");
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    if (!values.name.trim() || !values.email.trim() || !values.message.trim()) {
      setStatus("error");
      setErrorMessage("Please complete your name, email, and message before submitting.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("sending");
    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

    if (endpoint) {
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, submittedAt: new Date().toISOString() }),
        });
        if (!response.ok) throw new Error("Request failed");
        setValues(initialValues);
        setStatus("success");
        return;
      } catch {
        setStatus("error");
        setErrorMessage("We could not send your enquiry right now. Please email rotaractscop@gmail.com directly.");
        return;
      }
    }

    const subject = encodeURIComponent(`${values.enquiryType} enquiry from ${values.name}`);
    const body = encodeURIComponent(`Name: ${values.name}\nEmail: ${values.email}\nEnquiry type: ${values.enquiryType}\n\n${values.message}`);
    window.location.href = `mailto:rotaractscop@gmail.com?subject=${subject}&body=${body}`;
    setValues(initialValues);
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="flex min-h-[22rem] flex-col items-center justify-center rounded-3xl border border-emerald-500/20 bg-emerald-50/70 p-8 text-center dark:bg-emerald-950/20">
        <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-300" />
        <h3 className="mt-5 text-2xl font-bold text-foreground">Enquiry ready to send</h3>
        <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">Your email client should now be open with the enquiry prepared. If it did not open, email us directly at rotaractscop@gmail.com.</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-6 text-sm font-bold text-primary hover:underline">Send another enquiry</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-border/70 bg-card/60 p-6 shadow-sm sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold text-foreground">Your name<input value={values.name} onChange={(event) => updateValue("name", event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-border/70 bg-background/70 px-4 text-sm font-normal outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground/60 focus:border-primary/45 focus:ring-2 focus:ring-primary/10 focus-visible:outline-none" placeholder="Enter your name" /></label>
        <label className="text-sm font-semibold text-foreground">Email address<input type="email" value={values.email} onChange={(event) => updateValue("email", event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-border/70 bg-background/70 px-4 text-sm font-normal outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground/60 focus:border-primary/45 focus:ring-2 focus:ring-primary/10 focus-visible:outline-none" placeholder="you@example.com" /></label>
        <label className="text-sm font-semibold text-foreground sm:col-span-2">What would you like to discuss?<span className="relative mt-2 block"><select value={values.enquiryType} onChange={(event) => updateValue("enquiryType", event.target.value)} className="h-12 w-full appearance-none rounded-xl border border-border/70 bg-background/70 px-4 pr-11 text-sm font-normal outline-none transition-[border-color,box-shadow] focus:border-primary/45 focus:ring-2 focus:ring-primary/10 focus-visible:outline-none"><option>Membership</option><option>Sponsorship</option><option>Event partnership</option><option>General enquiry</option></select><ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /></span></label>
        <label className="text-sm font-semibold text-foreground sm:col-span-2">Message<textarea value={values.message} onChange={(event) => updateValue("message", event.target.value)} className="mt-2 min-h-32 w-full resize-y rounded-xl border border-border/70 bg-background/70 px-4 py-3 text-sm font-normal outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground/60 focus:border-primary/45 focus:ring-2 focus:ring-primary/10 focus-visible:outline-none" placeholder="Tell us how we can help..." /></label>
      </div>
      {status === "error" && <p role="alert" className="mt-4 text-sm font-medium text-destructive">{errorMessage}</p>}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs leading-5 text-muted-foreground">We will use your details only to respond to this enquiry.</p><button type="submit" disabled={status === "sending"} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 disabled:cursor-wait disabled:opacity-70">{status === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" />Sending...</> : <><Send className="h-4 w-4" />Send enquiry</>}</button></div>
    </form>
  );
};

export default ContactForm;

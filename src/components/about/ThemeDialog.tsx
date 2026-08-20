import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import reignLogo from "@/assets/REIGN.png";

interface ThemeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ThemeDialog = ({ open, onOpenChange }: ThemeDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <img src={reignLogo} alt="REIGN theme logo for RIY 2026–27" className="mx-auto mb-3 h-44 w-auto max-w-[18rem] object-contain sm:h-52" />
        <DialogTitle className="text-center text-3xl font-black">REIGN</DialogTitle>
      </DialogHeader>
      <div className="rounded-2xl bg-primary/5 border border-primary/15 p-6 sm:p-8 text-center">
        <p className="text-xl font-bold text-primary mb-4">Rotaract Empowering Individuals for Growth and Networking</p>
        <p className="text-muted-foreground leading-relaxed">
          In RIY 2026–27, we empower every Rotaractor to grow as a leader, serve communities with purpose, strengthen professional skills, and build meaningful networks across RID 3131.
        </p>
      </div>
    </DialogContent>
  </Dialog>
);

export default ThemeDialog;

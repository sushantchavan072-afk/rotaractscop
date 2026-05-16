import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Leader } from "./MessagesTab";

interface LeaderDialogProps {
  leader: Leader | null;
  onClose: () => void;
}

const LeaderDialog = ({ leader, onClose }: LeaderDialogProps) => (
  <Dialog open={!!leader} onOpenChange={() => onClose()}>
    <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
      {leader && (
        <>
          <div className="relative -mx-6 -mt-6 mb-6">
            <div className="relative h-60 overflow-hidden">
              <img
                src={leader.photo}
                alt={leader.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-background shadow-xl">
                  <img
                    src={leader.photo}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <DialogTitle className="text-3xl font-bold text-foreground">
                    {leader.name}
                  </DialogTitle>
                  <p className="text-xl text-primary font-semibold mt-1">
                    {leader.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="prose prose-lg max-w-none">
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
              {leader.message}
            </p>
          </div>
        </>
      )}
    </DialogContent>
  </Dialog>
);

export default LeaderDialog;

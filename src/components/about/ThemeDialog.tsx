import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ThemeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const themes = [
  {
    title: "सेवा",
    description:
      "सेवा ही निःस्वार्थ सेवा आणि समुदाय कल्याणासाठी आमची अढळ वचनबद्धता दर्शवते. ती रोटरॅक्टच्या खऱ्या भावनेला रूप देते, जिथे आम्ही अर्थपूर्ण कृतीद्वारे सामाजिक आव्हानांना तोंड देण्यासाठी स्वतःला समर्पित करतो.",
    tagline: "सेवा ही केवळ कृती नाही, तर ती गतिमान भक्ती आहे.",
    gradient: "from-primary/10 to-primary/5",
    border: "border-primary/20",
  },
  {
    title: "संगठन",
    description:
      "संघटना सामूहिक प्रयत्न आणि संघटित सहकार्याच्या शक्तीवर भर देते. जेव्हा विविध व्यक्ती एका सामायिक उद्देशाने एकत्र येतात तेव्हा अर्थपूर्ण बदल घडतात यावर आमचा विश्वास आहे.",
    tagline:
      "संघटना अशी जागा आहे जिथे 'मी' 'आम्ही' बनतो आणि 'आम्ही' अटळ बनतो.",
    gradient: "from-accent/30 to-accent/10",
    border: "border-accent/30",
  },
  {
    title: "परिवर्तन",
    description:
      "परिवर्तन म्हणजे समाजात सकारात्मक परिवर्तनासाठी उत्प्रेरेक बनण्याची आमची वचनबद्धता दर्शवते. हे जीवन सुधारणारे आणि समुदायांना बळकटी देणारे मोजता येण्याजोगे, शाश्वत बदल घडवून आणण्याचे आमचे स्वप्न प्रतिबिंबित करते.",
    tagline:
      "परिवर्तन हा शेवट नाही तर काहीतरी चांगले करण्याची सुरुवात आहे.",
    gradient: "from-secondary/30 to-secondary/10",
    border: "border-secondary/30",
  },
];

const ThemeDialog = ({ open, onOpenChange }: ThemeDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-3xl font-bold text-center mb-6">
          सेवा संगठन परिवर्तन
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        {themes.map((t) => (
          <div
            key={t.title}
            className={`bg-gradient-to-br ${t.gradient} rounded-xl p-6 border ${t.border}`}
          >
            <h3 className="text-2xl font-bold text-primary mb-4">{t.title}</h3>
            <p className="text-foreground leading-relaxed mb-4">
              {t.description}
            </p>
            <p className="text-primary font-semibold italic">{t.tagline}</p>
          </div>
        ))}
      </div>
    </DialogContent>
  </Dialog>
);

export default ThemeDialog;

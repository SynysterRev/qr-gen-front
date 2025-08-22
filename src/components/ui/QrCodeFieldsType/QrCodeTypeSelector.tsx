import { QR_TYPES } from "@/lib/constants/qr";
import { QrCodeType, QrCodeTypeSelectorProps } from "@/lib/types/qr";
import { Globe, FileText, Wifi, Contact, Mail, MessageSquare } from "lucide-react";

const ICONS: Record<QrCodeType, React.ReactNode> = {
  website: <Globe className="w-6 h-6 mb-1" />,
  text: <FileText className="w-6 h-6 mb-1" />,
  wifi: <Wifi className="w-6 h-6 mb-1" />,
  contact: <Contact className="w-6 h-6 mb-1" />,
  email: <Mail className="w-6 h-6 mb-1" />,
  sms: <MessageSquare className="w-6 h-6 mb-1" />,
};


export default function QrCodeTypeSelector({ type, onChange }: QrCodeTypeSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      {QR_TYPES.map((t) => (
        <button
          key={t.value}
          type="button"
          className={`flex flex-col items-center justify-center p-4 transition rounded-lg border border-gray-200 text-sm cursor-pointer ${type === t.value
            ? "bg-pink-300 text-white"
            : "hover:bg-gray-200"
            }`}
          onClick={() => onChange(t.value)}
        >
          {ICONS[t.value]}
          <span className="text-sm font-medium">{t.label}</span>
        </button>
      ))}
    </div>
  );
}
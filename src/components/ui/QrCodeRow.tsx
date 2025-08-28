
import { useModals } from '@/app/contexts/ModalContext';
import useModal from '@/hooks/useModal';
import { QrCodeType, QrData, QrModalSection } from '@/lib/types/qr';
import { capitalizeFirstLetter, formatLocalDate } from '@/lib/utils/utils';
import { QrCode, Ellipsis, Check, Eye, Edit, Download, Trash, ChartColumn, Globe, FileText, Wifi, Contact, Mail, MessageSquare } from 'lucide-react';

interface QrElementData {
    qr: QrData;
    isSelected: boolean;
    onChange: (id: string) => void;
};

const DISPLAY_INFO: Record<QrCodeType, {
    icon: React.ReactNode;
    name: string;
    bgColor: string;
    color: string;
}> = {
    website: {
        icon: <Globe className="w-4 h-4" />,
        name: "Website",
        bgColor: "bg-blue-100",
        color: "text-blue-700"
    },
    text: {
        icon: <FileText className="w-4 h-4" />,
        name: "Text",
        bgColor: "bg-orange-100", 
        color: "text-orange-700"
    },
    wifi: {
        icon: <Wifi className="w-4 h-4" />,
        name: "WiFi Network",
        bgColor: "bg-emerald-100",
        color: "text-emerald-700"
    },
    contact: {
        icon: <Contact className="w-4 h-4" />,
        name: "Contact Card",
        bgColor: "bg-violet-100", 
        color: "text-violet-700"
    },
    email: {
        icon: <Mail className="w-4 h-4" />,
        name: "Email",
        bgColor: "bg-cyan-100", 
        color: "text-cyan-700"
    },
    sms: {
        icon: <MessageSquare className="w-4 h-4" />,
        name: "SMS",
        bgColor: "bg-fuchsia-100", 
        color: "text-fuchsia-600"
    },
};

export default function QrCodeRow({
    qr,
    isSelected,
    onChange,
}: QrElementData) {

    const creationDate = formatLocalDate(qr.createdAt.toString());

    const { openQrInfoModal, openEditQrModal } = useModals();
    const { isOpen, openModal, closeModal } = useModal();

    const selectOption = (qr: any, section: QrModalSection) => {
        closeModal();
        openQrInfoModal(qr, section);
    }

    return (
        <>
            <tr className="border-t border-t-gray-200 hover:bg-gray-100/50 transition-colors">
                <td className="py-6 flex justify-center items-center">
                    <div className="relative">
                        <input
                            type="checkbox"
                            className="block appearance-none h-4 w-4 rounded-full border border-purple-600 checked:bg-purple-600 checked:border-purple-600 cursor-pointer"
                            checked={isSelected}
                            onChange={() => onChange(qr.id)} />
                        {isSelected && (
                            <Check className="w-4 h-4 text-white absolute top-0 left-0 pointer-events-none" />
                        )}
                    </div>
                </td>
                <td className="px-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-purple-600/10">
                            <QrCode className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="flex items-center justify-center gap-1">
                            <span className={`mt-1 ${DISPLAY_INFO[qr.type].color}`}>{DISPLAY_INFO[qr.type].icon}</span>
                            <span className="font-medium text-base">{qr.title}</span>
                        </div>
                    </div>
                </td>
                <td className="px-4">
                    <div className={`p-1 px-2.5 rounded-2xl inline-flex items-center ${DISPLAY_INFO[qr.type].bgColor}`}>
                        <p className={`text-sm font-semibold ${DISPLAY_INFO[qr.type].color}`}>{DISPLAY_INFO[qr.type].name}</p>
                    </div>
                </td>
                <td className="px-4">
                    {qr.scanCount}
                </td>
                <td className="px-4">
                    {creationDate}
                </td>
                <td className="px-4">
                    <div className="relative inline-block">
                        <button
                            type="button"
                            className="rounded-xl p-2 inline-flex items-center justify-center cursor-pointer
                            transition-all duration-300 hover:border-border/50 hover:bg-border"
                            id="options-menu"
                            aria-expanded={isOpen}
                            aria-haspopup="true"
                            onClick={openModal}>
                            <Ellipsis />
                        </button>
                        <div className={`origin-top-right absolute right-0 ${isOpen ? 'block z-50' : 'hidden'}`}>
                            <div
                                className="fixed inset-0 z-40"
                                onClick={closeModal}
                            ></div>
                            <div
                                className="relative z-50 mt-2 rounded-md shadow-lg bg-white ring-1 ring-gray-300 ring-opacity-5 focus:outline-none px-1"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="options-menu">
                                <div className="py-1" role="none">
                                    <button
                                        type="button"
                                        className="w-full text-gray-700 rounded-xl px-2 py-2 text-sm cursor-pointer 
                                    hover:bg-gray-100 text-start flex items-center gap-2"
                                        role="menuitem"
                                        onClick={() => selectOption(qr, "overview")}
                                    >
                                        <Eye className="w-4 h-4" />
                                        View</button>
                                    <button
                                        type="button"
                                        className="w-full text-gray-700 rounded-xl px-2 py-2 text-sm cursor-pointer 
                                    hover:bg-gray-100 text-start flex items-center gap-2"
                                        role="menuitem"
                                        onClick={() => selectOption(qr, "analytics")}
                                    >
                                        <ChartColumn className="w-4 h-4" />
                                        Analytics</button>
                                    <button
                                        type="button"
                                        className="w-full text-gray-700 rounded-xl px-2 py-2 text-sm cursor-pointer 
                                    hover:bg-gray-100 text-start flex items-center gap-2"
                                        role="menuitem"
                                        onClick={() => {
                                            closeModal();
                                            openEditQrModal(qr);
                                        }}
                                    >
                                        <Edit className="w-4 h-4" />
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="w-full text-gray-700 rounded-xl px-2 py-2 text-sm cursor-pointer 
                                    hover:bg-gray-100 text-start flex items-center gap-2"
                                        role="menuitem"
                                        onClick={() => selectOption(qr, "download")}
                                    >
                                        <Download className="w-4 h-4" />
                                        Download</button>
                                    <button
                                        type="button"
                                        className="w-full text-red-500 rounded-xl px-2 py-2 text-sm cursor-pointer
                                        hover:bg-red-100 text-start flex items-center gap-2"
                                        role="menuitem"
                                        onClick={() => selectOption(qr, "settings")}
                                    >
                                        <Trash className="w-4 h-4" />
                                        Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        </>
    );
}
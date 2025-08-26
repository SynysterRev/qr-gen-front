
import { useModals } from '@/app/contexts/ModalContext';
import useModal from '@/hooks/useModal';
import { QrData, QrModalSection } from '@/lib/types/qr';
import { formatLocalDate } from '@/lib/utils/utils';
import { QrCode, Ellipsis, Check, Eye, Edit, Download, Trash, ChartColumn } from 'lucide-react';

interface QrElementData {
    qr: QrData;
    isSelected: boolean;
    onChange: (id: string) => void;
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
                        <div>
                            <p className="font-medium">{qr.title}</p>
                            <p className="text-sm text-muted-foreground">{qr.data}</p>
                        </div>
                    </div>
                </td>
                <td className="px-4">
                    <div className="p-1 px-2.5 rounded-2xl bg-purple-100 inline-flex items-center">
                        <p className="text-sm font-semibold text-purple-800">URL</p>
                    </div>
                </td>
                <td className="px-4">
                    {qr.scanCount}
                </td>
                <td className="px-4">
                    <div className="p-1 px-2.5 rounded-2xl bg-green-100 inline-flex items-center">
                        <p className="text-sm font-semibold text-green-800">Active</p>
                    </div>
                </td>
                <td className="px-4">
                    {creationDate}
                </td>
                <td className="px-4">
                    2 hours ago
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
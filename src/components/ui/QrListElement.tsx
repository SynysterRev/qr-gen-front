import { QrResponse } from '@/lib/types/qr';
import { formatLocalDate } from '@/lib/utils/utils';
import { QrCode, Ellipsis, Check } from 'lucide-react';

interface QrElementData {
    qr: QrResponse;
    isSelected: boolean;
    onChange: (id: string) => void
};

export default function QrListElement({
    qr,
    isSelected,
    onChange
}: QrElementData) {

    const creationDate = formatLocalDate(qr.createdAt.toString());

    return (
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
                        <p className="text-sm text-muted-foreground">{qr.url}</p>
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
                <button type="button" className="transition-all duration-300 rounded-xl hover:border-border/50 hover:bg-border p-2 inline-flex items-center justify-center">
                    <Ellipsis />
                </button>
            </td>
        </tr>
    );
}
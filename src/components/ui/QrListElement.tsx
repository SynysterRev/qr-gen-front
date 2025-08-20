import { QrCode, Ellipsis } from 'lucide-react';

export default function QrListElement() {
    return (
        <tr className="border-t border-t-gray-200 hover:bg-gray-100/50 transition-colors">
            <td className="py-8 flex justify-center items-center">
                <input type="checkbox" className="appearance-none h-4 w-4 rounded-full text-purple-600 border border-purple-600" />
            </td>
            <td className="px-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-purple-600/10">
                        <QrCode className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                        <p className="font-medium">Business Card QR</p>
                        <p className="text-sm text-muted-foreground">https://qr.example.com/business-card</p>
                    </div>
                </div>
            </td>
            <td className="px-4">
                <div className="p-1 px-2.5 rounded-2xl bg-purple-100 inline-flex items-center">
                    <p className="text-sm font-semibold text-purple-800">vCard</p>
                </div>
            </td>
            <td className="px-4">
                1247
            </td>
            <td className="px-4">
                <div className="p-1 px-2.5 rounded-2xl bg-green-100 inline-flex items-center">
                    <p className="text-sm font-semibold text-green-800">Active</p>
                </div>
            </td>
            <td className="px-4">
                2024-01-15
            </td>
            <td className="px-4">
                2 hours ago
            </td>
            <td className="px-4">
                <button type="button" className="transition-all duration-300 rounded-xl hover:border-border/50 hover:bg-border p-2 inline-flex items-center justify-cente">
                    <Ellipsis />
                </button>
            </td>
        </tr>
    );
}
"use client";

import { Check } from 'lucide-react';
import QrListElement from './QrListElement';
import { useState } from 'react';

export default function QrCodeList() {
    const [checked, setChecked] = useState(false);

    return (
        <table className="w-full text-sm">
            <thead>
                <tr className="hover:bg-gray-100/50 transition-colors">
                    <th className="h-12 flex justify-center items-center">
                        <div className="relative">
                            <input
                                id="check-all-qr"
                                type="checkbox"
                                className="appearance-none h-4 w-4 rounded-full border border-purple-600 checked:bg-purple-600 checked:border-purple-600 cursor-pointer"
                                checked={checked}
                                onChange={(e) => setChecked(e.target.checked)}
                            />
                            {checked && (
                                <Check className="w-4 h-4 text-white absolute top-0 left-0 pointer-events-none" />
                            )}
                        </div>
                    </th>
                    <th className="text-muted-foreground font-medium h-12 px-4 text-left align-middle">QR Code</th>
                    <th className="text-muted-foreground font-medium h-12 px-4 text-left align-middle">Type</th>
                    <th className="text-muted-foreground font-medium h-12 px-4 text-left align-middle">Scans</th>
                    <th className="text-muted-foreground font-medium h-12 px-4 text-left align-middle">Status</th>
                    <th className="text-muted-foreground font-medium h-12 px-4 text-left align-middle">Created</th>
                    <th className="text-muted-foreground font-medium h-12 px-4 text-left align-middle">Last Scan</th>
                    <th className="text-muted-foreground font-medium h-12 px-4 text-left align-middle">Action</th>
                </tr>
            </thead>
            <tbody>
                <QrListElement />
                <QrListElement />
            </tbody>
        </table>
    );
}
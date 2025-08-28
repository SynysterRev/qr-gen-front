import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { RecentScan } from '@/lib/types/qr';

const RecentScans = ({ scans }: { scans: RecentScan[] }) => {
    if (!scans || scans.length === 0) {
        return null;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-2 mb-4">
                <Clock size={20} className="text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-800">Recent Scans</h2>
            </div>
            <div className="space-y-4">
                {scans.map((scan, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-start space-x-2">
                            <MapPin size={16} className="text-gray-400 mt-1" />
                            <div>
                                <p className="font-medium text-gray-800">{scan.country}</p>
                                <p className="text-sm text-gray-500">{scan.deviceType}</p>
                            </div>
                        </div>
                        <span className="text-sm text-gray-500 flex-shrink-0">
                            {formatDistanceToNow(parseISO(scan.scannedAt.toString()), { addSuffix: true })}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentScans;
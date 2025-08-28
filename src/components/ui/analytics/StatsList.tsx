import { BasicStats } from '@/lib/types/qr';
import React from 'react';

const StatsList = ({ title, IconComponent, data }: { title: string, IconComponent: React.ElementType, data: BasicStats[] }) => {
    if (!data || data.length === 0) {
        return "No data available";
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
            <div className="flex items-center space-x-2 mb-4">
                <IconComponent className="w-5 h-5" />
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            </div>
            <div className="space-y-4">
                {data.map((country, index) => (
                    <div key={index} className="flex flex-col">
                        <div className="flex justify-between items-center mb-1 text-gray-700">
                            <span className="font-medium">{country.name}</span>
                            <span className="text-sm font-normal">
                                {country.count}
                                {/* ({country.percentage.toFixed(0)}%) */}
                            </span>
                        </div>
                        {/* <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-purple-600 h-2.5 rounded-full"
                style={{ width: `${country.percentage}%` }}
              ></div>
            </div> */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatsList;
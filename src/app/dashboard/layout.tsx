"use client";

import Sidebar from "@/components/layout/Sidebar";
import { PanelLeft } from 'lucide-react';
import { useState } from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="flex">
            <Sidebar isOpen={isOpen} />
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
            <div className={`flex flex-col flex-1 transition-all duration-300 ${isOpen ? "ml-64" : "ml-0"}`}>
                <div className="border-b-1 border-gray-300 backdrop-blur sticky top-0 z-50 p-4 h-16.5 flex items-start">
                    <button type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="transition-all duration-300 rounded-lg hover:border-border/50 hover:bg-pink-100 p-2">
                        <PanelLeft className="w-4 h-4" />
                    </button>
                </div>
                <main className="flex-1 p-4">{children}</main>
            </div>
        </div>
    );
}
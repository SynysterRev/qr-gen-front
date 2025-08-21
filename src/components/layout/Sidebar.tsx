import { useActiveLink } from '@/hooks/useActiveLink';
import { ChartColumn, QrCode, User, House, LogOut } from 'lucide-react';
import Link from 'next/link';

interface SidebarData {
    isOpen: boolean;
}

export default function Sidebar({ isOpen = true }: SidebarData) {
    const { isActiveLink } = useActiveLink();

    return (
        <>
            <div className={`${isOpen ? "translate-x-0" : "-translate-x-full"} w-64 h-svh bg-white fixed flex flex-col transition-all duration-300`}>
                <Link href="/" className="flex p-4 border-b border-gray-200 mb-2">
                    {/* Add icon here */}
                    <span className="bg-gradient-to-r from-blue-600 via-primary to-pink-600 bg-clip-text text-transparent font-bold text-2xl leading-snug">QRForge</span>
                </Link>

                <div className="flex flex-col flex-1">
                    <div className="p-2 w-full">
                        <p className="text-muted-foreground text-xs text-left font-medium px-2">Overview</p>
                        <ul className="w-full flex flex-col gap-1 my-2">
                            <li className="flex text-sm">
                                <Link href="" className={`flex items-center gap-2 w-full transition-all duration-300 rounded-lg hover:border-border/50 hover:bg-pink-50 p-2 h-8
                                    ${isActiveLink("/dashboard/analytics") ? "bg-pink-50" : ""}`
                                }>
                                    <ChartColumn className="w-4 h-4" />
                                    Analytics
                                </Link>
                            </li>
                            <li className="flex text-sm">
                                <Link href="/dashboard/qr-management" className={`flex items-center gap-2 w-full transition-all duration-300 rounded-lg hover:border-border/50 hover:bg-pink-50 p-2 h-8
                                ${isActiveLink("/dashboard/qr-management") ? "bg-pink-50" : ""}`}>
                                    <QrCode className="w-4 h-4" />
                                    QR Codes
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="p-2 w-full">
                        <p className="text-muted-foreground text-xs text-left font-medium px-2">Account</p>
                        <ul className="w-full flex flex-col gap-1 my-2">
                            <li className="flex text-sm">
                                <Link href="" className={`flex items-center gap-2 w-full transition-all duration-300 rounded-lg hover:border-border/50 hover:bg-pink-50 p-2 h-8
                                ${isActiveLink("/dashboard/profile") ? "bg-pink-50" : ""}`}>
                                    <User className="w-4 h-4" />
                                    Profile
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col border-t border-gray-200">
                    <div className="p-2 w-full">
                        <ul className="w-full flex flex-col gap-1 my-2">
                            <li className="flex text-sm">
                                <Link href="" className="flex items-center gap-2 w-full transition-all duration-300 rounded-lg hover:border-border/50 hover:bg-pink-50 p-2 h-8">
                                    <House className="w-4 h-4" />
                                    Back to Home
                                </Link>
                            </li>
                            <li className="flex text-sm">
                                <button type="button" className="flex items-center gap-2 w-full transition-all duration-300 rounded-lg hover:border-border/50 hover:bg-pink-50 p-2 h-8">
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
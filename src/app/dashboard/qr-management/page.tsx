import Card from '@/components/ui/Card';
import CreateQrFormModal from '@/components/ui/CreateQrFormModal';
import QrCodeList from '@/components/ui/QrCodeList';
import { Plus } from 'lucide-react';
import { QrCode, Calendar, Eye, TrendingUp, Search } from 'lucide-react';

export default function QrManagement() {

    const details = [{
        id: 1,
        title: "Total QR Codes",
        icon: QrCode,
        iconColor: "text-purple-600"
    }, {
        id: 2,
        title: "Total Scans",
        icon: Eye,
        iconColor: "text-blue-500"
    }, {
        id: 3,
        title: "Active QR Codes",
        icon: TrendingUp,
        iconColor: "text-green-500"
    }, {
        id: 4,
        title: "Avg. Scans/QR",
        icon: Calendar,
        iconColor: "text-orange-500"
    }]

    return (
        <>
            <div className="container max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <div className="space-y-2">
                        <h1 className="font-bold text-3xl text-start">QR Code Management</h1>
                        <p className="text-muted-foreground text-lg">Manage, edit, and track all your QR codes</p>
                    </div>
                    <button type="submit" className="px-4 text-center rounded-xl h-10 text-white text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 
                    cursor-pointer inline-flex items-center justify-center gap-2">
                        <Plus className="h-4 w-4 mt-0.5" />
                        Create New QR
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-8">
                    {details.map((detail) => {
                        const Icon = detail.icon;
                        return (
                            <Card key={detail.id} className="border-1 border-gray-300 p-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium text-sm text-muted-foreground">{detail.title}</p>
                                        <p className="text-2xl font-bold">6</p>
                                    </div>
                                    <Icon className={`h-8 w-8 ${detail.iconColor}`} />
                                </div>
                            </Card>
                        );
                    })}
                </div>
                <Card className="p-6 mb-6">
                    <div className="flex items-center">
                        <div className="relative max-w-md flex-1">
                            <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                            <input type="text" placeholder="Search QR codes..." className="border border-gray-300 w-full rounded-xl h-10 pl-10" />
                        </div>
                    </div>
                </Card>
                <Card className="p-6 mb-6">
                    <h2 className="font-semibold text-2xl mb-4">Your QR Codes</h2>
                    <QrCodeList />
                </Card>
            </div>
            <CreateQrFormModal />
        </>
    );
}
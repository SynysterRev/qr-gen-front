import { modalSections, QrData, QrModalSection } from "@/lib/types/qr";
import { useState } from "react";
import Modal from "./Modal";
import QrPreview from "./QrPreview";
import { formatLocalDate } from "@/lib/utils/utils";
import { useModals } from "@/app/contexts/ModalContext";

export default function QrInfoModal({
    qr,
    initialSection,
    isOpen,
    onClose,
}: {
    qr: QrData;
    isOpen: boolean;
    initialSection: QrModalSection;
    onClose: () => void;
}) {
    const [section, setSection] = useState(initialSection);
    const { openDeleteQrModal, openEditQrModal } = useModals();
    const creationDate = formatLocalDate(qr.createdAt.toString())

    const handleOpenEditModal = (qr: QrData) => {
        onClose();
        openEditQrModal(qr);
    }

    const handleOpenDeleteModal = (qr: QrData) => {
        onClose();
        openDeleteQrModal(qr);
    }

    return (
        <>
            <Modal onClose={onClose} isOpen={isOpen} title={qr?.title}>
                <div className="flex gap-4 mb-4 rounded-xl bg-gray-100 p-1">
                    {modalSections.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setSection(tab as QrModalSection)}
                            className={`pb-2 px-2 py-1 ${section === tab
                                ? "bg-white rounded-xl font-semibold text-primary"
                                : "text-gray-500 hover:text-gray-700 cursor-pointer"
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div>
                    {section === "overview" && (
                        <div>
                            {/* <QrPreview /> */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-muted-foreground text-sm">Name</p>
                                    <p>{qr.title}</p>
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <p className="text-muted-foreground text-sm">Type</p>
                                    <p>1</p>
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <p className="text-muted-foreground text-sm">Total Scans</p>
                                    <p>{qr.scanCount}</p>
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <p className="text-muted-foreground text-sm">Created</p>
                                    <p>{creationDate}</p>
                                </div>
                                <div className="flex flex-col col-span-2 space-y-1">
                                    <p className="text-muted-foreground text-sm">Content</p>
                                    <div className="rounded-xl bg-gray-100 py-2 px-4">
                                        {qr.data}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {section === "analytics" && (
                        <div>
                            <p><strong>Scan Count:</strong> {qr.scanCount}</p>
                            <p>Graphique ou stats à mettre ici 📊</p>
                        </div>
                    )}

                    {section === "settings" && (
                        <div className="flex flex-col gap-2">
                            <button className="px-4 py-2 bg-primary text-white rounded-xl cursor-pointer transition-all group duration-300 hover:shadow-[var(--shadow-elegant)] 
                    hover:bg-primary/90 bg-gradient-to-r from-primary to-primary-glow"
                                onClick={() => handleOpenEditModal(qr)}
                            >
                                Edit
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-xl cursor-pointer transition-all group duration-300 hover:shadow-[var(--shadow-elegant)] 
                    hover:bg-red-500/90 bg-gradient-to-r from-red-500 to-red-glow"
                                onClick={() => handleOpenDeleteModal(qr)}
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </Modal>
        </>
    );
}

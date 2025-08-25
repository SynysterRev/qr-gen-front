import { QrModalSection } from "@/lib/types/qr";
import { useState } from "react";

export default function useQrInfoModal() {
    const [modalInfoState, setModalInfoState] = useState<{
        qr: any | null;
        section: QrModalSection | null;
    }>({ qr: null, section: null });

    const openQrInfoModal = (qr: any, section: QrModalSection) => {
        setModalInfoState({ qr, section });
    }

    const closeQrInfoModal = () => setModalInfoState({ qr: null, section: null });

    return {
        modalInfoState,
        openQrInfoModal,
        closeQrInfoModal
    }
}
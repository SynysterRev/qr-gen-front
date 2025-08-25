import { QrData } from "./qr";

export interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose?: () => void;
    title?: string;
}

export interface CreateQrFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: QrData) => void;
}
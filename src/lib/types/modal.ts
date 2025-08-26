import { QrData } from "./qr";

export interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose?: () => void;
    title?: string;
}

export type formMode = "create" | "edit";

export interface QrFormModalProps {
    mode: formMode;
    isOpen: boolean;
    isCreating: boolean;
    onClose: () => void;
    onSubmit: (data: QrData) => void;
    initialData?: Partial<QrData>;
}
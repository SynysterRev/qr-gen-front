import { ModalProps } from "@/lib/types/modal";
import Card from "./Card";

export default function Modal({ children, isOpen, onClose, title }: ModalProps) {
    if (!isOpen) return null;
    return (
        <>
            <div
                className="fixed inset-0 z-50 bg-black/80"
                onClick={onClose}
            ></div>
            <Card className="fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 bg-background p-6 shadow-lg duration-200 max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between">
                    {title && <h2 className="text-lg font-semibold leading-none tracking-tight">{title}</h2>}
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 cursor-pointer"
                    >
                        ✕
                    </button>
                </div>
                {children}
            </Card >
        </>
    )
}




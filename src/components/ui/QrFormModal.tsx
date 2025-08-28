"use client";

import { Palette } from "lucide-react";
import Modal from "./Modal";
import QrForm from "../forms/QrForm";
import { QrFormModalProps } from "@/lib/types/modal";

export default function QrFormModal({
    mode,
    isOpen,
    isCreating,
    onClose,
    onSubmit,
    initialData
}: QrFormModalProps) {
    
    return (
        <>
            <Modal title={`${mode == "create" ? "Create New QR Code" : "Edit QR Code"}`} isOpen={isOpen} onClose={onClose}>
                <div className="flex items-center space-x-2 mb-4">
                    <Palette className="text-primary" />
                    <h3 className="text-2xl font-bold">Customize Your QR Code</h3>
                </div>
                <div className="flex flex-col space-y-4">
                    <h4 className="text-lg font-semibold leading-none tracking-tight">Basic Information</h4>
                </div>
                <QrForm onSubmit={onSubmit} isCreating={isCreating} initialData={initialData} mode={mode}/>
            </Modal>
        </>
    )
}
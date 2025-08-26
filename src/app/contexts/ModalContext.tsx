"use client";

import { QrData, QrModalSection } from '@/lib/types/qr';
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types pour tes différents modals
interface QrInfoModalState {
    isOpen: boolean;
    qr: QrData | null;
    section?: QrModalSection;
}

interface SimpleQrModalState {
    isOpen: boolean;
    qr?: QrData | null;
}

interface SimpleModalState {
    isOpen: boolean;
}


interface ModalContextType {
    // États des modals
    createQrModal: SimpleModalState;
    qrInfoModal: QrInfoModalState;
    editQrModal: SimpleQrModalState;
    deleteQrModal: SimpleQrModalState;
    duplicateQrModal: SimpleQrModalState;

    // Actions pour ouvrir les modals
    openCreateQrModal: () => void;
    openQrInfoModal: (qr: QrData, section?: QrModalSection) => void;
    openEditQrModal: (qr: QrData) => void;
    openDeleteQrModal: (qr: QrData) => void;
    openDuplicateQrModal: (qr: QrData) => void;

    // Actions pour fermer les modals
    closeCreateQrModal: () => void;
    closeQrInfoModal: () => void;
    closeEditQrModal: () => void;
    closeDeleteQrModal: () => void;
    closeDuplicateQrModal: () => void;

    // Fermer tous les modals d'un coup (optionnel)
    closeAllModals: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Provider Component
export function ModalProvider({ children }: { children: ReactNode }) {
    // États des modals
    const [createQrModal, setCreateQrModal] = useState<SimpleQrModalState>({
        isOpen: false,
    });
    const [qrInfoModal, setQrInfoModal] = useState<QrInfoModalState>({
        isOpen: false,
        qr: null,
        section: 'overview'
    });
    const [editQrModal, setEditQrModal] = useState<SimpleQrModalState>({
        isOpen: false,
        qr: null
    });
    const [deleteQrModal, setDeleteQrModal] = useState<SimpleQrModalState>({
        isOpen: false,
        qr: null
    });
    const [duplicateQrModal, setDuplicateQrModal] = useState<SimpleQrModalState>({
        isOpen: false,
        qr: null
    });

    // Actions pour ouvrir
    const openCreateQrModal = () =>
        setCreateQrModal({ isOpen: true });
    const openQrInfoModal = (qr: QrData, section?: QrModalSection) =>
        setQrInfoModal({ isOpen: true, qr, section });
    const openEditQrModal = (qr: QrData) =>
        setEditQrModal({ isOpen: true, qr });
    const openDeleteQrModal = (qr: QrData) =>
        setDeleteQrModal({ isOpen: true, qr });
    const openDuplicateQrModal = (qr: QrData) =>
        setDuplicateQrModal({ isOpen: true, qr });

    // Actions pour fermer
    const closeCreateQrModal = () =>
        setCreateQrModal({ isOpen: false });
    const closeQrInfoModal = () =>
        setQrInfoModal({ isOpen: false, qr: null, section: undefined });
    const closeEditQrModal = () =>
        setEditQrModal({ isOpen: false, qr: null });
    const closeDeleteQrModal = () =>
        setDeleteQrModal({ isOpen: false, qr: null });
    const closeDuplicateQrModal = () =>
        setDuplicateQrModal({ isOpen: false, qr: null });

    // Fermer tous les modals
    const closeAllModals = () => {
        setCreateQrModal({ isOpen: false });
        setQrInfoModal({ isOpen: false, qr: null, section: undefined });
        setEditQrModal({ isOpen: false, qr: null });
        setDeleteQrModal({ isOpen: false, qr: null });
        setDuplicateQrModal({ isOpen: false, qr: null });
    };

    const value: ModalContextType = {
        // États
        createQrModal,
        qrInfoModal,
        editQrModal,
        deleteQrModal,
        duplicateQrModal,

        // Actions open
        openCreateQrModal,
        openQrInfoModal,
        openEditQrModal,
        openDeleteQrModal,
        openDuplicateQrModal,

        // Actions close
        closeCreateQrModal,
        closeQrInfoModal,
        closeEditQrModal,
        closeDeleteQrModal,
        closeDuplicateQrModal,

        // Utils
        closeAllModals
    };

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    );
}

// Hook personnalisé pour utiliser le context
export function useModals() {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModals must be used within a ModalProvider');
    }
    return context;
}
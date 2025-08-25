import { useState } from "react";

export default function useModal(initialOpen = false) {
    const [isOpen, setIsOpen] = useState(initialOpen);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const toggleModal = () => setIsOpen(!isOpen);

    return { isOpen, openModal, closeModal, toggleModal };
}
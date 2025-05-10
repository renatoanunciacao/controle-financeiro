import React, { ReactNode } from 'react'
import { CloseButton, ModalContent, Overlay } from './styles';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <Overlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose}>×</CloseButton>
                {children}
            </ModalContent>
        </Overlay>
    )
}

export default Modal;

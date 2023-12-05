'use client';

import React, { createContext, useContext, useState } from 'react';
import SignInModal from '~/components/Modals/SignInModal';
import SignUpModal from '~/components/Modals/SignUpModal';

type ModalContextType = {
  modalState: {
    isOpen: boolean;
    modalType: () => JSX.Element;
  };
  openModal: (modalType: string) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

const modalComponents: { [key: string]: () => JSX.Element } = {
  signup: SignUpModal,
  signin: SignInModal,
};

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    modalType: () => null as unknown as JSX.Element,
  });

  const openModal = (modalType: string) => {
    setModalState({ isOpen: true, modalType: modalComponents[modalType] });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      modalType: () => null as unknown as JSX.Element,
    });
  };

  return (
    <ModalContext.Provider value={{ modalState, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

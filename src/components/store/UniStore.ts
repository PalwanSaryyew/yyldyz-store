import { create } from 'zustand';

interface StoreState {
    count: number;
    increment: () => void;
}

interface ModalState {
    isOpen: boolean;
    toogle: () => void;
}

export const useStore = create<StoreState>((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
}));

export const useHandleModal = create<ModalState>((set) => ({
    isOpen: false,
    toogle: () => set((state) => ({ isOpen: !state.isOpen })),
}));



import { create } from "zustand";

interface ModalState {
   isOpen: boolean;
   toogle: () => void;
}

export const useHandleModal = create<ModalState>((set) => ({
   isOpen: false,
   toogle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export interface CartItemState {
   item: {
      id: number;
      product: string;
      amount: number;
      receiver: string;
      currency: string;
      total: number;
   } | null;
   add: (item: CartItemState["item"]) => void;
}
export const useCartItem = create<CartItemState>((set) => ({
   item: null,
   add: (item: CartItemState["item"]) => set(() => ({ item: item })),
}));

interface CurrencyState {
   currency: "TMT" | "USDT" | "TON";
   change: (currency: CurrencyState["currency"]) => void;
}

export const useCurrency = create<CurrencyState>((set) => ({
   currency: "TMT",
   change: (currency) => set(() => ({ currency: currency })),
}));

interface WhichIsOpenState {
   opened: number;
   change: (indx: WhichIsOpenState["opened"]) => void;
}
export const useWhicIsOpen = create<WhichIsOpenState>((set) => ({
   opened: 0,
   change: (indx) => set(() => ({ opened: indx })),
}));

interface UserState {
   user: {
      id: number;
      username: string;
      photo_url: string;
   } | null;
   add: (item: UserState["user"]) => void;
}
export const useUser = create<UserState>((set) => ({
   user: null,
   add: (user: UserState["user"]) => set(() => ({ user: user })),
}));

import { create } from "zustand";

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

export interface CartItemState {
   item: {
      id: number
      product: string;
      amount: number;
      receiver: string;
      currency: string;
      total: number;
   };
   add: (item: CartItemState["item"]) => void;
}
export const useCartItem = create<CartItemState>((set) => ({
   item: {
      id: 1,
      product: "Star",
      amount: 260,
      receiver: "Emeki",
      currency: 'TON',
      total: 0.3124,
   },
   add: (item: CartItemState["item"]) => set((state) => ({ ...state, item })),
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
      id: string;
      username: string;
      photo_url: string;
   };
   add: (item: UserState["user"]) => void;
}
export const useUser = create<UserState>((set) => ({
   user: {
      id: "",
      username: "boca",
      photo_url: "",
   },
   add: (user: UserState["user"]) => set((state) => ({ ...state, user })),
}));

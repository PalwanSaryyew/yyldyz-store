import { cmcApi } from "@/lib/fetchs";
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

interface CoinPriceState {
   coin: string;
   price: number;
   priceChanger: (state: CoinPriceState) => Promise<void>;
}

export const useCoinPrice = create<CoinPriceState>((set) => ({
   coin: "TON",
   price: 0,
   priceChanger: async (state: CoinPriceState) => {
      set((state) => ({ ...state, coin: state.coin }));
      const price = (await cmcApi(state.coin)) ?? 0;
      set((state) => ({ ...state, price }));
   },
}));

interface CartItemState {
   item: {
      haryt: string;
      sany: number;
      kime: string;
      jemi: number;
   };
   add: (item: CartItemState["item"]) => void;
}
export const useCartItem = create<CartItemState>((set) => ({
   item: {
      haryt: "Star",
      sany: 260,
      kime: "Emeki",
      jemi: 0.3124,
   },
   add: (item: CartItemState["item"]) => set((state) => ({ ...state, item })),
}));

interface CurrencyState {
   currency: "TMT" | "USDT" | "TON";
   change: (currency: CurrencyState['currency']) => void;
}

export const useCurrency = create<CurrencyState>((set) => ({
   currency: "TMT",
   change: (currency) => set(() => ({ currency: currency })),
}));

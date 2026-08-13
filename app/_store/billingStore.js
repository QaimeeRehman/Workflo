import { create } from "zustand";

export const useBillingStore = create((set) => ({
  customer: null,
  items: [],
  discount: 0,
  paymentType: "cash", // cash // partial // credit
  amountReceived: 0,
  saleType: "customer",

  setCustomer: (customer) =>
    set({
      customer,
    }),
  setDiscount: (discount) => set({ discount }),
  setPaymentType: (paymentType) => set({ paymentType }),
  setAmountReceived: (amount) => set({ amountReceived: Number(amount) }),
  setSaleType: (saleType) => set({ saleType }),
  setItems: (items) => {
    set({
      items,
    });
  },
  addItem: (item) => {
    set((state) => ({
      items: [...state.items, item],
    }));
  },
  removeItem: (itemId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    })),
  clearBill: () =>
    set({
      customer: null,
      items: [],
      discount: 0,
      paymentType: "cash",
    }),
}));

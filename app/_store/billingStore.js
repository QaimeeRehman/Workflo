import { create } from "zustand";

export const useBillingStore = create((set) => ({
  customer: null,

  setCustomer: (customer) =>
    set({
      customer,
    }),
}));

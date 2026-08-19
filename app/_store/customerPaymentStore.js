import { create } from "zustand";

export const useCustomerPaymentStore = create((set) => ({
  customer: null,

  setCustomer: (customer) =>
    set({
      customer,
    }),
}));

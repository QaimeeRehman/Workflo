import { create } from "zustand";

export const useCustomerPaymentStore = create((set) => ({
  customer: null,
  bill: null,

  setCustomer: (customer) =>
    set({
      customer,
      bill: null,
    }),

  setBill: (bill) =>
    set({
      bill,
    }),

  clearPayment: () =>
    set({
      customer: null,
      bill: null,
    }),
}));

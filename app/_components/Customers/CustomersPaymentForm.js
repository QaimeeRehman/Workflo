"use client";
import { Banknote } from "lucide-react";
import PaymentCustomerSearch from "./PaymentCustomerSearch";
import Link from "next/link";
import { useCustomerPaymentStore } from "@/app/_store/customerPaymentStore";
import { useState } from "react";
import { receiveCustomerPaymentAction } from "@/app/dashboard/customers/action";
import toast from "react-hot-toast";

function CustomersPaymentForm({ customers }) {
  const selectedCustomer = useCustomerPaymentStore((state) => state.customer);
  const setCustomer = useCustomerPaymentStore((state) => state.setCustomer);
  const [payment, setPayment] = useState("");
  const remainingOutstanding = selectedCustomer?.outstanding - payment;

  async function handleSubmit(formData) {
    try {
      const data = await receiveCustomerPaymentAction(formData);
      toast.success(`Amount Received: ${data.payment_amount}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setCustomer(null);
      setPayment("");
    }
  }
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-2">
        <Banknote size={20} className="text-primary-600" />

        <h2 className="font-semibold text-slate-800">Payment Information</h2>
      </div>

      <form action={handleSubmit} className="space-y-6">
        {selectedCustomer && (
          <input type="hidden" name="customerId" value={selectedCustomer.id} />
        )}
        {/* Customer */}
        <PaymentCustomerSearch customers={customers} />

        {/* Outstanding */}
        <div className="rounded-xl border border-red-100 bg-red-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-red-500">
            Current Outstanding
          </p>

          {selectedCustomer && (
            <p className="mt-1 text-2xl font-bold text-red-700">
              Rs. {selectedCustomer?.outstanding?.toLocaleString()}
            </p>
          )}

          <p className="mt-1 text-sm text-red-600">
            Select a customer to view their outstanding balance.
          </p>
        </div>

        {/* Payment amount */}
        <div>
          <label
            htmlFor="amount"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Payment Amount
          </label>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500">
              Rs.
            </span>

            <input
              value={payment}
              onChange={(e) => setPayment(Number(e.target.value))}
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              min="0"
              //   max={selectedCustomer?.outstanding}
              placeholder="0.00"
              className="w-full rounded-lg border border-slate-300 py-3 pl-12
                  pr-4 text-slate-800 outline-none transition
                  focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            />
          </div>
        </div>

        {/* Payment method */}
        <div>
          <label
            htmlFor="payment_method"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Payment Method
          </label>

          <select
            id="payment_method"
            name="payment_method"
            defaultValue="cash"
            className="w-full rounded-lg border border-slate-300 bg-white
                px-4 py-3 text-slate-700 outline-none transition
                focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          >
            <option value="cash">Cash</option>
            <option value="bank">Bank</option>
            <option value="cheque">Cheque</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label
            htmlFor="payment_date"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Payment Date
          </label>

          <input
            id="payment_date"
            name="payment_date"
            type="date"
            className="w-full rounded-lg border border-slate-300 px-4 py-3
                text-slate-700 outline-none transition
                focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          />
        </div>

        {/* Notes */}
        <div>
          <label
            htmlFor="notes"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Notes
          </label>

          <textarea
            id="notes"
            name="notes"
            rows={3}
            placeholder="Optional payment notes..."
            className="w-full resize-none rounded-lg border border-slate-300
                px-4 py-3 text-slate-700 outline-none transition
                placeholder:text-slate-400
                focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          />
        </div>

        {/* Payment summary */}
        {selectedCustomer && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Current Outstanding</span>

              <span className="font-medium text-slate-800">
                Rs. {selectedCustomer.outstanding.toLocaleString()}
              </span>
            </div>

            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-slate-500">Payment</span>

              <span className="font-medium text-slate-800">
                Rs. {payment.toLocaleString() || "0.00"}
              </span>
            </div>

            <div className="my-3 border-t border-slate-200" />

            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">
                Remaining Outstanding
              </span>

              <span className="text-lg font-bold text-red-600">
                Rs. {remainingOutstanding || "0.00"}
              </span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 border-t border-slate-100 pt-6">
          <Link
            href="/customers"
            className="rounded-lg border border-slate-300 px-5 py-2.5
                text-sm font-medium text-slate-700 transition
                hover:bg-slate-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="rounded-lg bg-primary-500 px-5 py-2.5
                text-sm font-medium text-white transition
                hover:bg-primary-900"
          >
            Receive Payment
          </button>
        </div>
      </form>
    </div>
  );
}

export default CustomersPaymentForm;

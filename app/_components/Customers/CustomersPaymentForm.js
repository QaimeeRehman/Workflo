"use client";

import { Banknote } from "lucide-react";
import PaymentCustomerSearch from "./PaymentCustomerSearch";
import PaymentBillSelect from "./PaymentBillSelect";
import Link from "next/link";
import { useCustomerPaymentStore } from "@/app/_store/customerPaymentStore";
import { useEffect, useState } from "react";
import {
  getCustomerOutstandingBillsAction,
  receiveCustomerPaymentAction,
} from "@/app/dashboard/customers/action";
import toast from "react-hot-toast";

function CustomersPaymentForm({ customers }) {
  const selectedCustomer = useCustomerPaymentStore((state) => state.customer);

  const selectedBill = useCustomerPaymentStore((state) => state.bill);

  const setCustomer = useCustomerPaymentStore((state) => state.setCustomer);

  const setBill = useCustomerPaymentStore((state) => state.setBill);

  const [payment, setPayment] = useState("");
  const [bills, setBills] = useState([]);
  const [loadingBills, setLoadingBills] = useState(false);

  useEffect(() => {
    if (!selectedCustomer) {
      setBills([]);
      return;
    }
    async function loadBills() {
      try {
        setLoadingBills(true);

        const data = await getCustomerOutstandingBillsAction(
          selectedCustomer.id,
        );

        setBills(data);
      } catch (error) {
        toast.error(error.message);
        setBills([]);
      } finally {
        setLoadingBills(false);
      }
    }

    loadBills();
  }, [selectedCustomer, setBill]);

  const billOutstanding = Number(selectedBill?.outstanding ?? 0);

  const paymentAmount = Number(payment || 0);

  const remainingOutstanding = Math.max(0, billOutstanding - paymentAmount);

  async function handleSubmit(formData) {
    if (!selectedCustomer) {
      toast.error("Please select a customer");
      return;
    }

    if (!selectedBill) {
      toast.error("Please select an outstanding bill");
      return;
    }

    if (!paymentAmount || paymentAmount <= 0) {
      toast.error("Enter a valid payment amount");
      return;
    }

    if (paymentAmount > billOutstanding) {
      toast.error("Payment cannot exceed bill outstanding");
      return;
    }

    try {
      const data = await receiveCustomerPaymentAction(formData);

      toast.success(
        `Amount Received: Rs. ${Number(
          data?.amount_paid ?? paymentAmount,
        ).toLocaleString()}`,
      );

      setCustomer(null);
      setPayment("");
      setBills([]);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-2">
        <Banknote size={20} className="text-primary-600" />

        <h2 className="font-semibold text-slate-800">Payment Information</h2>
      </div>

      <form action={handleSubmit} className="space-y-6">
        {/* Customer ID */}
        {selectedCustomer && (
          <input type="hidden" name="customerId" value={selectedCustomer.id} />
        )}

        {/* Bill ID */}
        {selectedBill && (
          <input type="hidden" name="billId" value={selectedBill.id} />
        )}

        {/* Customer */}
        <PaymentCustomerSearch customers={customers} />

        {/* Customer Outstanding */}
        {selectedCustomer && (
          <div className="rounded-xl border border-red-100 bg-red-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-red-500">
              Customer Outstanding
            </p>

            <p className="mt-1 text-2xl font-bold text-red-700">
              Rs. {Number(selectedCustomer.outstanding ?? 0).toLocaleString()}
            </p>
          </div>
        )}

        {/* Bills */}
        {selectedCustomer && (
          <>
            {loadingBills ? (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">
                  Loading outstanding bills...
                </p>
              </div>
            ) : (
              <PaymentBillSelect
                bills={bills}
                onBillSelect={() => setPayment("")}
              />
            )}
          </>
        )}

        {/* Payment amount */}
        {selectedBill && (
          <>
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
                  onChange={(e) => setPayment(e.target.value)}
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  max={billOutstanding}
                  placeholder="0.00"
                  className="w-full rounded-lg border border-slate-300 py-3 pl-12
                    pr-4 text-slate-800 outline-none transition
                    focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
              </div>

              <p className="mt-1 text-xs text-slate-500">
                Maximum payment: Rs. {billOutstanding.toLocaleString()}
              </p>
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
                defaultValue={new Date().toISOString().split("T")[0]}
                className="w-full rounded-lg border border-slate-300 px-4 py-3
                  text-slate-700 outline-none transition
                  focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
              />
            </div>

            {/* Reference */}
            <div>
              <label
                htmlFor="reference"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Reference
              </label>

              <input
                id="reference"
                name="reference"
                type="text"
                defaultValue={selectedBill?.invoice_number ?? ""}
                placeholder="Optional reference..."
                className="w-full rounded-lg border border-slate-300 px-4 py-3
                  text-slate-700 outline-none transition
                  placeholder:text-slate-400
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
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Invoice</span>

                <span className="font-medium text-slate-800">
                  {selectedBill.invoice_number}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-slate-500">Bill Outstanding</span>

                <span className="font-medium text-slate-800">
                  Rs. {billOutstanding.toLocaleString()}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-slate-500">Payment</span>

                <span className="font-medium text-slate-800">
                  Rs. {paymentAmount.toLocaleString()}
                </span>
              </div>

              <div className="my-3 border-t border-slate-200" />

              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">
                  Remaining Outstanding
                </span>

                <span className="text-lg font-bold text-red-600">
                  Rs. {remainingOutstanding.toLocaleString()}
                </span>
              </div>
            </div>
          </>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 border-t border-slate-100 pt-6">
          <Link
            href="/dashboard/customers"
            className="rounded-lg border border-slate-300 px-5 py-2.5
              text-sm font-medium text-slate-700 transition
              hover:bg-slate-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={!selectedCustomer || !selectedBill}
            className="rounded-lg bg-primary-500 px-5 py-2.5
              text-sm font-medium text-white transition
              hover:bg-primary-900
              disabled:cursor-not-allowed disabled:opacity-50"
          >
            Receive Payment
          </button>
        </div>
      </form>
    </div>
  );
}

export default CustomersPaymentForm;

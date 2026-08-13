"use client";

import { roundMoney } from "@/app/_lib/helper";
import { useBillingStore } from "@/app/_store/billingStore";
import { createBill } from "@/app/billing/action";
import toast from "react-hot-toast";

function BillingPayment({ total, subtotal }) {
  const paymentType = useBillingStore((state) => state.paymentType);
  const amountReceived = useBillingStore((state) => state.amountReceived);
  const saleType = useBillingStore((state) => state.saleType);
  const customer = useBillingStore((state) => state.customer);
  const items = useBillingStore((state) => state.items);
  const setPaymentType = useBillingStore((state) => state.setPaymentType);
  const setAmountReceived = useBillingStore((state) => state.setAmountReceived);
  const setCustomer = useBillingStore((state) => state.setCustomer);
  const setDiscount = useBillingStore((state) => state.setDiscount);
  const setItems = useBillingStore((state) => state.setItems);
  const discount = useBillingStore((state) => state.discount);

  const received = amountReceived === "" ? 0 : Number(amountReceived) || 0;
  const remaining = Math.max(0, total - received);
  const change = paymentType === "cash" ? Math.max(0, received - total) : 0;

  function handlePaymentTypeChange(type) {
    setPaymentType(type);

    // Credit means nothing is paid now
    if (type === "credit") {
      setAmountReceived(0);
    }

    // When switching to cash/partial,
    // start with an empty amount
    if (type === "cash" || type === "partial") {
      setAmountReceived("");
    }
  }

  async function handleSubmit() {
    try {
      const received = Number(amountReceived) || 0;

      if (paymentType === "cash" && received < total) return;

      const billData = {
        customer_id: customer?.id ?? null,
        sale_type: customer ? "customer" : "cash_sale",

        items: items.map((item) => ({
          product_id: item.product_id,
          category: item.category,
          quantity: item.quantity,
          unit: item.unit,
          quantity_boxes: item.quantity_boxes,
        })),

        discount: discount,

        payment_type: paymentType,
        amount_paid: received,
      };

      const result = await createBill(billData);
      toast.success(
        `Invoice ${result.bill.invoice_number} created successfully`,
      );

      setCustomer(null);
      setItems([]);
      setDiscount(0);
      setPaymentType("cash");
      setAmountPaid(0);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="mt-6 border-t border-slate-200 pt-5">
      {/* Payment Type */}
      <p className="mb-3 text-sm font-medium text-slate-700">Payment Type</p>

      <div className="grid grid-cols-3 gap-3">
        {/* Cash */}
        <button
          type="button"
          onClick={() => handlePaymentTypeChange("cash")}
          className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${
            paymentType === "cash"
              ? "border-primary-500 bg-primary-50 text-primary-700"
              : "border-slate-300 text-slate-700 hover:bg-slate-50"
          }`}
        >
          Cash
        </button>

        {/* Partial */}
        <button
          type="button"
          onClick={() => handlePaymentTypeChange("partial")}
          className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${
            paymentType === "partial"
              ? "border-primary-500 bg-primary-50 text-primary-700"
              : "border-slate-300 text-slate-700 hover:bg-slate-50"
          }`}
        >
          Partial
        </button>

        {/* Credit */}
        <button
          type="button"
          onClick={() => handlePaymentTypeChange("credit")}
          className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${
            paymentType === "credit"
              ? "border-primary-500 bg-primary-50 text-primary-700"
              : "border-slate-300 text-slate-700 hover:bg-slate-50"
          }`}
        >
          Credit
        </button>
      </div>

      {/* CASH */}
      {paymentType === "cash" && (
        <div className="mt-5">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Amount Received
          </label>

          <input
            type="number"
            min="0"
            value={amountReceived || ""}
            onChange={(e) => setAmountReceived(e.target.value)}
            placeholder="Enter amount received"
            className="w-full rounded-lg border border-slate-300 px-4 py-3
              text-sm outline-none transition
              focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          />

          {/* Total */}
          {/* <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-slate-500">Bill Total</span>

            <span className="font-medium text-slate-800">
              Rs. {total.toLocaleString("en-PK")}
            </span>
          </div> */}

          {/* Insufficient */}
          {received > 0 && received < total && (
            <div className="mt-3 flex items-center justify-between rounded-lg bg-red-50 px-4 py-3">
              <span className="text-sm text-red-600">Amount Remaining</span>

              <span className="font-semibold text-red-700">
                Rs. {remaining.toLocaleString("en-PK")}
              </span>
            </div>
          )}

          {/* Fully Paid / Change */}
          {received >= total && (
            <div className="mt-3 flex items-center justify-between rounded-lg bg-green-50 px-4 py-3">
              <span className="text-sm text-green-600">Change</span>

              <span className="font-semibold text-green-700">
                Rs. {change.toLocaleString("en-PK")}
              </span>
            </div>
          )}
        </div>
      )}

      {/* PARTIAL */}
      {paymentType === "partial" && (
        <div className="mt-5">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Amount Paid Now
          </label>

          <input
            type="number"
            min="0"
            max={total}
            value={amountReceived || ""}
            onChange={(e) => {
              const value = e.target.value;

              if (value === "") {
                setAmountReceived("");
                return;
              }

              const amount = Number(value);

              // Don't allow more than bill total
              setAmountReceived(Math.min(amount, total));
            }}
            placeholder="Enter amount paid"
            className="w-full rounded-lg border border-slate-300 px-4 py-3
              text-sm outline-none transition
              focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          />

          <div className="mt-4 space-y-3 rounded-lg bg-slate-50 p-4">
            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Bill Total</span>

              <span className="font-medium text-slate-800">
                Rs. {total.toLocaleString("en-PK")}
              </span>
            </div>

            {/* Paid */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Paid Now</span>

              <span className="font-medium text-green-700">
                Rs. {received.toLocaleString("en-PK")}
              </span>
            </div>

            <div className="border-t border-slate-200 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">
                  Remaining
                </span>

                <span className="font-semibold text-amber-700">
                  Rs. {remaining.toLocaleString("en-PK")}
                </span>
              </div>
            </div>
          </div>

          {received === 0 && (
            <p className="mt-2 text-xs text-slate-500">
              Enter the amount the customer is paying now.
            </p>
          )}

          {received === total && (
            <p className="mt-2 text-xs text-green-600">
              Full amount paid. This bill will be marked as paid.
            </p>
          )}
        </div>
      )}

      {/* CREDIT */}
      {paymentType === "credit" && (
        <div className="mt-5 rounded-lg bg-amber-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-amber-700">Amount Paid Now</span>

            <span className="font-semibold text-amber-800">Rs. 0</span>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-amber-200 pt-3">
            <span className="text-sm font-medium text-amber-700">
              Credit Amount
            </span>

            <span className="font-semibold text-amber-800">
              Rs. {total.toLocaleString("en-PK")}
            </span>
          </div>

          <p className="mt-2 text-xs text-amber-600">
            The full bill amount will be added to the customer&apos;s
            outstanding balance.
          </p>
        </div>
      )}

      <button
        type="button"
        disabled={saleType === "customer" && !customer && items.length === 0}
        onClick={handleSubmit}
        className="mt-7 w-full rounded-lg bg-primary-500 px-5 py-3.5 font-medium text-white transition hover:bg-primary-900 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Create Bill
      </button>
    </div>
  );
}

export default BillingPayment;

"use client";

import { createExpenseAction } from "@/app/dashboard/expenses/action";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function ExpenseForm() {
  const router = useRouter();
  async function handleSubmit(formData) {
    const result = await createExpenseAction(formData);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success("Expense created successfully");
    router.replace("/dashboard/expenses");
  }
  return (
    <form
      action={handleSubmit}
      className="rounded-xl bg-white p-6 shadow-[0_0_6px_0_rgba(0,0,0,0.12)]"
    >
      <h2 className="mb-6 text-xl font-semibold text-slate-800">
        Expense Information
      </h2>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Amount */}
        <div>
          <label
            htmlFor="amount"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Amount <span className="text-red-500">*</span>
          </label>

          <input
            id="amount"
            name="amount"
            type="number"
            min="0"
            step="0.01"
            placeholder="Rs. 0.00"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-primary-500"
          />
        </div>

        {/* Expense Date */}
        <div>
          <label
            htmlFor="expense_date"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Expense Date <span className="text-red-500">*</span>
          </label>

          <input
            id="expense_date"
            name="expense_date"
            type="date"
            defaultValue={new Date().toISOString().split("T")[0]}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-primary-500"
          />
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Category <span className="text-red-500">*</span>
          </label>

          <select
            id="category"
            name="category"
            required
            defaultValue=""
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-700 outline-none focus:border-primary-500"
          >
            <option value="" disabled>
              Select category
            </option>

            <option value="rent">Rent</option>
            <option value="utilities">Utilities</option>
            <option value="transport">Transport</option>
            <option value="fuel">Fuel</option>
            <option value="salaries">Salaries</option>
            <option value="office-supplies">Office Supplies</option>
            <option value="maintenance">Maintenance</option>
            <option value="telephone-internet">Telephone / Internet</option>
            <option value="taxes">Taxes / Government</option>
            <option value="bank-charges">Bank Charges</option>
            <option value="miscellaneous">Miscellaneous</option>
          </select>
        </div>

        {/* Payment Method */}
        <div>
          <label
            htmlFor="payment_method"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Payment Method <span className="text-red-500">*</span>
          </label>

          <select
            id="payment_method"
            name="payment_method"
            required
            defaultValue="cash"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-700 outline-none focus:border-primary-500"
          >
            <option value="cash">Cash</option>
            <option value="bank">Bank</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            rows={4}
            placeholder="Describe the expense..."
            className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-primary-500"
          />
        </div>

        {/* Reference */}
        <div className="md:col-span-2">
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
            placeholder="Invoice number, receipt number, etc."
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-primary-500"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex justify-end gap-3 border-t border-slate-200 pt-6">
        <Link
          href="/expenses"
          className="rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Cancel
        </Link>

        <button
          type="submit"
          className="rounded-lg bg-primary-500 px-6 py-3 font-medium text-white transition hover:bg-primary-900"
        >
          Save Expense
        </button>
      </div>
    </form>
  );
}

export default ExpenseForm;

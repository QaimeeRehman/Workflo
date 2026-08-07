"use client";

import { createCustomerAction } from "@/app/customers/action";
import NewCustomerFormActions from "./NewCustomerFormActions";
import toast from "react-hot-toast";

function NewCustomerForm() {
  async function handleFormSubmit(formData) {
    const data = await createCustomerAction(formData);

    if (data) toast.success("Customer created successfully");
    if (!data) toast.error("Customer has not been created");
  }
  return (
    <form
      action={handleFormSubmit}
      className="space-y-8 rounded-2xl bg-white p-8 shadow-[0_0_8px_0_rgba(0,0,0,0.3)] "
    >
      {/* Personal Information */}
      <div>
        <h2 className="mb-5 text-xl font-semibold text-slate-800">
          Personal Information
        </h2>

        <div className="grid grid-cols-4 gap-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Full Name
            </label>

            <input
              required
              name="fullName"
              type="text"
              placeholder="Enter full name"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Phone Number
            </label>

            <input
              required
              name="phone"
              type="text"
              placeholder="03XXXXXXXXX"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              CNIC
            </label>

            <input
              required
              name="cnic"
              type="text"
              placeholder="xxxxx-xxxxxxx-x"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Area
            </label>

            <select
              name="area"
              defaultValue="markeet"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
            >
              <option value="markeet">Market</option>
              <option value="tando bagho road">Tando Bagho Road</option>
              <option value="yousafabad">Yousafabad</option>
              <option value="jillani mohallah">Jillani Mohallah</option>
            </select>
          </div>
        </div>
      </div>

      {/* Business Information */}
      <div>
        <h2 className="mb-5 text-xl font-semibold text-slate-800">
          Business Information
        </h2>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Sale Type
            </label>

            <select
              name="saleType"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
            >
              <option value="retail">Retail</option>
              <option value="wholesale">Wholesale</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Tax Category
            </label>

            <select
              name="taxCategory"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
            >
              <option value="non-filer">Non-Filer</option>
              <option value="filer">Filer</option>
            </select>
          </div>
        </div>
      </div>

      {/* Actions */}
      <NewCustomerFormActions />
    </form>
  );
}

export default NewCustomerForm;

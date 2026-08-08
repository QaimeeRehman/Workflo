"use client";

import {
  createCustomerAction,
  updateCustomerAction,
} from "@/app/customers/action";
import NewCustomerFormActions from "./NewCustomerFormActions";
import toast from "react-hot-toast";

function NewCustomerForm({ customer }) {
  async function handleFormSubmitCreateCustomer(formData) {
    const { data, error } = await createCustomerAction(formData);

    if (!data) {
      toast.error(error.details);
      return;
    }

    toast.success("Customer created successfully");
  }
  async function handleFormSubmitUpdateCustomer(formData) {
    const { data, error } = await updateCustomerAction(formData);
    console.log(data, error);
    if (!data) {
      toast.error(error.details);
      return;
    }

    toast.success("Customer updated successfully");
  }
  return (
    <form
      action={
        customer
          ? handleFormSubmitUpdateCustomer
          : handleFormSubmitCreateCustomer
      }
      className="space-y-8 rounded-2xl bg-white p-8 shadow-[0_0_8px_0_rgba(0,0,0,0.3)] "
    >
      {/* Personal Information */}
      <div>
        <h2 className="mb-5 text-xl font-semibold text-slate-800">
          Personal Information
        </h2>

        <div className="grid grid-cols-4 gap-6">
          <input type="hidden" value={customer?.id} name="id" />
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Full Name
            </label>

            <input
              required
              defaultValue={customer?.fullName ?? ""}
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
              defaultValue={customer?.phone ?? ""}
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
              defaultValue={customer?.cnic ?? ""}
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
              defaultValue={customer?.area ?? ""}
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
              defaultValue={customer?.saleType ?? ""}
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
              defaultValue={customer?.taxCategory ?? ""}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
            >
              <option value="non-filer">Non-Filer</option>
              <option value="filer">Filer</option>
            </select>
          </div>
        </div>
      </div>

      {/* Actions */}
      <NewCustomerFormActions customerId={customer?.id} />
    </form>
  );
}

export default NewCustomerForm;

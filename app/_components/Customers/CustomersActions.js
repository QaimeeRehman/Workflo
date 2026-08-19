"use client";

import { deleteCustomerAction } from "@/app/dashboard/customers/action";
import toast from "react-hot-toast";
import Link from "next/link";

function CustomersActions({ customerId }) {
  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this customer")) return;

    const error = await deleteCustomerAction(Number(customerId));
    if (error) {
      toast.error(error.message);
    }
    toast.success("Customer Deleted Successfully");
  }
  return (
    <td className="px-6 py-4">
      <div className="flex justify-center gap-2">
        <Link
          href={`/dashboard/customers/${customerId}`}
          className="rounded-md bg-slate-200 px-3 py-1 hover:bg-slate-300"
        >
          View
        </Link>

        <Link
          href={`/dashboard/customers/${customerId}/edit`}
          className="rounded-md bg-primary-500 px-3 py-1 text-white hover:bg-primary-900"
        >
          Edit
        </Link>

        <button
          onClick={handleDelete}
          className="rounded-md bg-red-500 px-3 py-1 text-white hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </td>
  );
}

export default CustomersActions;

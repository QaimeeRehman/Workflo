"use client";

import { deleteCustomer } from "@/app/customers/action";
import toast from "react-hot-toast";
import Link from "next/link";

function CustomersActions({ customerId }) {
  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this customer")) return;

    const error = await deleteCustomer(Number(customerId));
    if (error) {
      toast.error(error.message);
    }
    toast.success("Customer Deleted Successfully");
  }
  return (
    <td className="px-6 py-4">
      <div className="flex justify-center gap-2">
        <Link
          href={`/customers/${customerId}`}
          className="rounded-md bg-slate-100 px-3 py-1 hover:bg-slate-200"
        >
          View
        </Link>

        <Link
          href={`/customers/${customerId}/edit`}
          className="rounded-md bg-yellow-100 px-3 py-1 text-yellow-700 hover:bg-yellow-200"
        >
          Edit
        </Link>

        <button
          onClick={handleDelete}
          className="rounded-md bg-red-100 px-3 py-1 text-red-700 hover:bg-red-200"
        >
          Delete
        </button>
      </div>
    </td>
  );
}

export default CustomersActions;

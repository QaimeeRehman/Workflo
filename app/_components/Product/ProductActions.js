"use client";

import { deleteProductAction } from "@/app/dashboard/products/action";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
function PricingActions({ product }) {
  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this product")) return;

    const error = await deleteProductAction(Number(product.id));
    if (error) {
      toast.error(error.message);
    }

    toast.success("Product Deleted Successfully");
  }
  return (
    <div className="flex justify-end gap-2">
      <Link
        href={`/dashboard/products/${product.id}`}
        className="flex items-center gap-2 rounded-md bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
      >
        <Eye size={16} />
        View
      </Link>
      <Link
        href={`/dashboard/products/${product.id}/edit`}
        className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-200"
      >
        <Pencil size={16} />
        Edit
      </Link>
      <button
        onClick={handleDelete}
        className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-white bg-red-500 transition hover:bg-red-800"
      >
        <Trash2 size={16} />
        Delete
      </button>
    </div>
  );
}

export default PricingActions;

"use client";

import { useState, useTransition } from "react";
import { Package, Plus, Pencil, X, Trash2 } from "lucide-react";
import SettingsCard from "./SettingsCard";
import {
  createProductTypesAction,
  deleteProductTypesAction,
  updateProductTypesAction,
} from "@/app/dashboard/settings/action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ProductTypeModal from "./ProductTypeModal";

function ProductTypesSettings({ productTypesDb }) {
  const productTypes = productTypesDb ?? [];

  const [showModal, setShowModal] = useState(false);
  const [editingType, setEditingType] = useState(null);

  const [saved, setSaved] = useState();
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const openAddModal = () => {
    setEditingType(null);
    setShowModal(true);
  };

  const openEditModal = (productType) => {
    setEditingType(productType);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingType(null);
  };

  const handleSave = (productType) => {
    if (editingType) {
      setSaved(false);
      startTransition(async () => {
        try {
          await updateProductTypesAction(productType);
          setSaved(true);
          toast.success("Saved settings successfully");
          router.refresh();
        } catch (error) {
          toast.error("Setting couldn't be saved");
          console.log(error);
        }
      });
    } else {
      setSaved(false);
      startTransition(async () => {
        try {
          await createProductTypesAction(productType);
          setSaved(true);
          toast.success("Saved settings successfully");
          router.refresh();
        } catch (error) {
          toast.error("Setting couldn't be saved");
          console.log(error);
        }
      });
    }

    closeModal();
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product type?",
    );

    if (!confirmed) return;
    console.log(id);

    startTransition(async () => {
      try {
        await deleteProductTypesAction(id);
        toast.success("Product Type deleted successfully");
        router.refresh();
      } catch (error) {
        toast.error("Failed to delete product type");
      }
    });
  };

  return (
    <>
      <SettingsCard
        title="Product Types"
        description="Manage the types of products available in Workflo."
        saved={saved}
      >
        <div className="space-y-5">
          {/* Header Action */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={openAddModal}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 active:bg-slate-950"
            >
              <Plus size={16} />
              Add Product Type
            </button>
          </div>

          {/* Table */}
          <div className="hidden overflow-hidden rounded-lg border border-slate-200 md:block">
            <table className="w-full text-left">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-slate-500">
                    Product Type
                  </th>

                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-slate-500">
                    Categories
                  </th>

                  <th className="w-28 px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 bg-white">
                {productTypes.map((productType) => (
                  <tr
                    key={productType.id}
                    className="transition hover:bg-slate-50/70"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                          <Package size={17} />
                        </div>

                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            {productType.label}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-400">
                            {productType.value}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {productType.default_categories?.map((category) => (
                          <span
                            key={category}
                            className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => openEditModal(productType)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                          aria-label={`Edit ${productType.label}`}
                        >
                          <Pencil size={15} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(productType.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                          aria-label={`Delete ${productType.label}`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SettingsCard>

      {showModal && (
        /* -------------------------------------------------------------------------- */
        /* Modal                                                                      */
        /* -------------------------------------------------------------------------- */
        <ProductTypeModal
          productType={editingType}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}
    </>
  );
}

export default ProductTypesSettings;

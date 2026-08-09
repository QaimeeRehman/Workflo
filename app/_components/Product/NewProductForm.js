"use client";
import { createNewProductAction } from "@/app/products/action";
import Link from "next/link";
import toast from "react-hot-toast";
import CRUDButton from "../CRUDButton";
import { useState } from "react";

function NewProductForm() {
  const [productType, setProductType] = useState("");
  let categories = [];

  if (productType === "biscuit") categories = ["TP", "SP", "MP", "HR"];
  if (productType === "cake") categories = ["CAKE"];

  async function handleSubmit(formData) {
    const { data, error } = await createNewProductAction(formData);

    if (!data) {
      toast.error(error.message);
      return;
    }

    toast.success("Product Added Successfully");
  }
  return (
    <form action={handleSubmit} className="rounded-2xl bg-white p-8 shadow">
      {/* Basic Information */}
      <div>
        <h2 className="text-xl font-semibold text-slate-800">
          Basic Information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Enter the basic details of the product.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-6">
          {/* Product Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Product Name
            </label>

            <input
              required
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Sooper"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            />
          </div>

          {/* Product Type */}
          <div>
            <label
              htmlFor="type"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Product Type
            </label>

            <select
              id="type"
              name="type"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            >
              <option value="">Select product type</option>
              <option value="biscuit">Biscuit</option>
              <option value="cake">Cake</option>
            </select>

            <p className="mt-2 text-xs text-slate-500">
              Biscuits use TP, SP, MP and HR pricing. Cakes use their own
              pricing structure.
            </p>
          </div>

          {/* Company */}
          <div>
            <label
              htmlFor="company"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Company
            </label>

            <input
              id="company"
              name="company"
              type="text"
              defaultValue="ebm"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            />
          </div>
        </div>
      </div>

      {categories.length > 0 && (
        <section className="rounded-2xl bg-white shadow">
          {/* Header */}
          <div className="border-b p-6">
            <h2 className="text-xl font-semibold text-slate-800">Packaging</h2>

            <p className="mt-1 text-sm text-slate-500">
              Configure the packaging for each pricing category.
            </p>
          </div>

          <div className="p-6">
            <div className="overflow-hidden rounded-xl border border-slate-200">
              {/* Table header */}
              <div className="grid grid-cols-3 bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-600">
                <div>Category</div>
                <div>Units per Box</div>
                <div>Boxes per Carton</div>
              </div>

              {categories.map((category) => (
                <div
                  key={category}
                  className="grid grid-cols-3 items-end gap-6 border-t border-slate-200 px-5 py-5"
                >
                  {/* Category */}
                  <div>
                    <span className="inline-flex rounded-lg bg-primary-100 px-3 py-2 text-sm font-bold text-primary-700">
                      {category}
                    </span>
                  </div>

                  {/* Units per box */}
                  <div>
                    <label
                      htmlFor={`${category}-units`}
                      className="mb-2 block text-xs font-medium text-slate-500"
                    >
                      Units per Box
                    </label>

                    <input
                      id={`${category}-units`}
                      name={`${category.toLowerCase()}_units_per_box`}
                      type="number"
                      min="1"
                      placeholder="e.g. 12"
                      required
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                    />
                  </div>

                  {/* Boxes per carton */}
                  <div>
                    <label
                      htmlFor={`${category}-carton`}
                      className="mb-2 block text-xs font-medium text-slate-500"
                    >
                      Boxes per Carton
                    </label>

                    <input
                      id={`${category}-carton`}
                      name={`${category.toLowerCase()}_boxes_per_carton`}
                      type="number"
                      min="1"
                      placeholder="e.g. 8"
                      required
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Actions */}
      <div className="mt-8 flex justify-end gap-3 border-t border-gray-300 pt-6">
        <Link
          href="/products"
          className="rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Cancel
        </Link>

        <CRUDButton>Create Product</CRUDButton>
      </div>
    </form>
  );
}

export default NewProductForm;

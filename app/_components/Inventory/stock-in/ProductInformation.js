"use client";

import { toCapitalize } from "@/app/_lib/helper";

function ProductInformation({
  products,
  selectedProduct,
  productId,
  category,
  onProductChange,
  onCategoryChange,
}) {
  return (
    <>
      {/* Product */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Product
        </label>

        <select
          value={productId}
          onChange={(e) => onProductChange(e.target.value)}
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-3
                  text-slate-800 outline-none transition
                  focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
        >
          <option value="">Select product</option>
          {products.map((product) => (
            <option value={product.id} key={product.id}>
              {toCapitalize(product.name)}
            </option>
          ))}
        </select>
      </div>

      {/* Category */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Category
        </label>

        <select
          required
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-3
                  text-slate-800 outline-none transition
                  focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
        >
          <option value="">Select category</option>
          {selectedProduct?.type === "biscuit" && (
            <>
              <option value="tp">TP</option>
              <option value="sp">SP</option>
              <option value="mp">MP</option>
              <option value="hr">HR</option>
            </>
          )}
          {selectedProduct?.type === "cake" && (
            <>
              <option value="cake">Cake</option>
            </>
          )}
        </select>
      </div>
    </>
  );
}

export default ProductInformation;

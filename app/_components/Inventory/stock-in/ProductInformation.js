"use client";

import { toCapitalize } from "@/app/_lib/helper";

function ProductInformation({
  products,
  productTypes,
  selectedProduct,
  productId,
  category,
  onProductChange,
  onCategoryChange,
}) {
  const selectedType = productTypes.find(
    (type) => type.value === selectedProduct?.type,
  );
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
          {selectedType?.default_categories.map((category) => {
            const value = category.toLowerCase();
            return (
              <option value={value} key={value}>
                {category.toUpperCase()}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
}

export default ProductInformation;

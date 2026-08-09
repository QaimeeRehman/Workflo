function ProductInfo({ product }) {
  return (
    <section className="rounded-2xl bg-white p-7 shadow">
      <div className="border-b pb-5">
        <h2 className="text-xl font-semibold text-slate-800">
          Product Information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Basic information about this product.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-4 gap-6">
        {/* Product Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Product Name
          </label>

          <input
            id="name"
            name="name"
            defaultValue={product.name}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          />
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
            defaultValue={product.company}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          />
        </div>

        {/* Type */}
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
            disabled
            defaultValue={product.type}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 disabled:cursor-not-allowed"
          >
            <option value="biscuit">Biscuit</option>
            <option value="cake">Cake</option>
          </select>

          <p className="mt-2 text-xs text-slate-500">
            Changing the product type also changes its pricing structure.
          </p>
        </div>

        {/* Active */}
        {/* <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Status
              </label>

              <label className="flex h-[50px] cursor-pointer items-center gap-3 rounded-lg border border-slate-300 px-4">
                <input
                  type="checkbox"
                  name="active"
                  defaultChecked={product.active}
                  className="h-4 w-4 accent-primary-500"
                />

                <span className="text-sm font-medium text-slate-700">
                  Product is active
                </span>
              </label>
            </div> */}
      </div>
    </section>
  );
}

export default ProductInfo;

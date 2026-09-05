import { Plus, X } from "lucide-react";
import { useState } from "react";

function ProductTypeModal({ productType, onClose, onSave }) {
  const [label, setLabel] = useState(productType?.label ?? "");

  const [categories, setCategories] = useState(
    productType?.default_categories ?? [],
  );

  const [categoryInput, setCategoryInput] = useState("");

  const isEditing = Boolean(productType);

  const addCategory = () => {
    const category = categoryInput.trim().toUpperCase();

    if (!category) return;

    if (categories.includes(category)) {
      setCategoryInput("");
      return;
    }

    setCategories((current) => [...current, category]);
    setCategoryInput("");
  };

  const removeCategory = (category) => {
    setCategories((current) => current.filter((item) => item !== category));
  };

  const generateValue = (value) => {
    return value.trim().toLowerCase().replace(/\s+/g, "-");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanLabel = label.trim();

    if (!cleanLabel) return;

    onSave({
      id: productType?.id,
      label: cleanLabel,
      value: productType?.value ?? generateValue(cleanLabel),
      default_categories: categories,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-xl">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              {isEditing ? "Edit Product Type" : "Add Product Type"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Define the product type and its available categories.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-5 px-5 py-5">
            {/* Product Type Name */}
            <div>
              <label
                htmlFor="product-type-name"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Product Type Name
              </label>

              <input
                id="product-type-name"
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="e.g. Soap"
                autoFocus
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              />
            </div>

            {/* Value Preview */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Value
              </label>

              <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-500">
                {productType?.value || generateValue(label) || "product-type"}
              </div>

              <p className="mt-1.5 text-xs text-slate-400">
                Automatically generated from the product type name.
              </p>
            </div>

            {/* Categories */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                {isEditing ? "Available Categories" : "Default Categories"}
              </label>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCategory();
                    }
                  }}
                  placeholder="e.g. PIECE"
                  className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 uppercase outline-none transition placeholder:text-slate-400 placeholder:normal-case focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                />

                <button
                  type="button"
                  onClick={addCategory}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  <Plus size={16} />
                  Add
                </button>
              </div>

              {categories.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <span
                      key={category}
                      className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-700"
                    >
                      {category}

                      <button
                        type="button"
                        onClick={() => removeCategory(category)}
                        className="text-slate-400 hover:text-slate-700"
                      >
                        <X size={13} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50/50 px-5 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!label.trim()}
              className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isEditing ? "Save Changes" : "Add Product Type"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductTypeModal;

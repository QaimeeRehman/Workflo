import { toCapitalize } from "@/app/_lib/helper";
import { useBillingStore } from "@/app/_store/billingStore";
import { Plus, ShoppingCart } from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

function BillingProduct({ products, inventory, packagings }) {
  const customer = useBillingStore((state) => state.customer);
  const saleType = useBillingStore((state) => state.saleType);
  const addItem = useBillingStore((state) => state.addItem);
  const items = useBillingStore((state) => state.items);
  const [productId, setProductId] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("box");
  const selectedProduct = products.find(
    (product) => String(product.id) === String(productId),
  );

  const selectedPackaging = packagings.find(
    (packaging) =>
      selectedProduct?.id === packaging.product_id &&
      category === packaging.category,
  );
  const inventoryMap = new Map();

  inventory.forEach((item) => {
    if (item.quantity_boxes > 0) {
      inventoryMap.set(`${item.product_id}-${item.category}`, item);
    }
  });
  const availableCategories = inventory
    .filter(
      (item) =>
        item.product_id === selectedProduct?.id &&
        Number(item.quantity_boxes) > 0,
    )
    .map((item) => item.category);

  const currentPrice = useMemo(() => {
    if (!selectedProduct || !category) return 0;

    if (saleType === "customer" && !customer) return 0;

    const saleTypeValue =
      saleType === "cash_sale" ? "retail" : customer.saleType;

    const taxCategory =
      saleType === "cash_sale" ? "non_filer" : customer.taxCategory;
    console.log(saleTypeValue, taxCategory);
    const pricingRow = selectedProduct.product_pricing?.find(
      (pricing) =>
        pricing.category === category &&
        pricing.sale_type === saleTypeValue &&
        pricing.tax_category === taxCategory,
    );

    return Number(pricingRow?.price ?? 0);
  }, [selectedProduct, category, customer, saleType]);
  const selectedInventory = inventory.find(
    (item) =>
      String(item?.product_id) === String(selectedProduct?.id) &&
      item.category === category,
  );

  const stockBoxes = Number(selectedInventory?.quantity_boxes ?? 0);

  const boxesPerCarton = Number(selectedPackaging?.boxes_per_carton ?? 0);

  const billBoxes = items
    .filter(
      (item) =>
        String(item.product_id) === String(selectedProduct?.id) &&
        item.category === category,
    )
    .reduce((sum, item) => sum + Number(item.quantity_boxes), 0);

  const remainingBoxes = Math.max(0, stockBoxes - billBoxes);

  const remainingCartons =
    boxesPerCarton > 0 ? Math.floor(remainingBoxes / boxesPerCarton) : 0;
  function handleAddItem() {
    if (!customer && saleType === "customer") {
      toast.error("Please select a customer first.");
      return;
    }
    if (!productId || !category || !quantity) {
      toast.error("Please complete product information.");
      return;
    }
    const quantityNumber = Number(quantity);
    if (!Number.isInteger(quantityNumber) || quantityNumber <= 0) {
      toast.error("Quantity must be a positive integer.");
      return;
    }
    if (!currentPrice) {
      toast.error("Price is not available.");
      return;
    }

    if (!selectedPackaging) {
      toast.error("Packaging is not set for this product");
    }
    const quantityBoxes =
      unit === "carton"
        ? quantityNumber * selectedPackaging.boxes_per_carton
        : quantityNumber;
    const newItem = {
      id: crypto.randomUUID(),
      product_id: selectedProduct.id,
      product_name: selectedProduct.name,
      category,
      quantity: quantityNumber,
      unit,
      quantity_boxes: quantityBoxes,
      price_per_box: currentPrice,
      total: quantityBoxes * currentPrice,
    };
    addItem(newItem);
    setProductId("");
    setCategory("");
    setQuantity("");
    setUnit("box");
  }

  return (
    <section className="rounded-xl bg-white p-6 shadow">
      <div className="mb-5 flex items-center gap-2">
        <ShoppingCart size={19} className="text-primary-600" />

        <h2 className="font-semibold text-slate-800">Add Product</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Product */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Product
          </label>

          <select
            value={productId}
            onChange={(e) => {
              setProductId(e.target.value);
              setCategory("");
            }}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          >
            <option value="">Select product</option>

            {products.map((product) => {
              const productCategories = inventory
                .filter(
                  (item) =>
                    String(item.product_id) === String(product.id) &&
                    Number(item.quantity_boxes) > 0,
                )
                .map((item) => item.category);
              const isAvailable = productCategories.length > 0;
              return (
                <option
                  disabled={!isAvailable}
                  key={product.id}
                  value={product.id}
                >
                  {toCapitalize(product.name)}
                  {!isAvailable ? "- Out of Stock" : ""}
                </option>
              );
            })}
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block  text-sm font-medium text-slate-700">
            Category
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={!selectedProduct}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-700 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 disabled:bg-slate-100"
          >
            <option value="">Select category</option>

            {availableCategories.map((category) => (
              <option key={category} value={category}>
                {category.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity */}
        <div>
          <div className="flex items-center justify-between">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Quantity
            </label>

            {selectedInventory && (
              <span className="text-xs font-medium text-slate-500">
                Available:{" "}
                {unit === "box"
                  ? `${remainingBoxes} boxes`
                  : `${Math.trunc(remainingCartons)} carton`}
              </span>
            )}
          </div>

          <input
            type="number"
            min="1"
            max={
              unit === "box" ? remainingBoxes || stockBoxes : remainingCartons
            }
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          />

          {Number(quantity) >
            (unit === "box" ? remainingBoxes : remainingCartons) && (
            <p className="mt-1 text-sm text-red-600">
              Only{" "}
              {unit === "box"
                ? `${remainingBoxes} boxes`
                : `${remainingCartons} carton`}{" "}
              available in stock.
            </p>
          )}
        </div>

        {/* Unit */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Unit
          </label>

          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-700 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          >
            <option value="box">Box</option>
            <option value="carton">Carton</option>
          </select>
        </div>
      </div>

      {/* Price */}
      {selectedProduct && category && (
        <div className="mt-4 rounded-lg bg-slate-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Selling price</span>

            <span className="font-semibold text-slate-800">
              Rs. {currentPrice.toLocaleString("en-PK")}
              <span className="ml-1 text-sm font-normal text-slate-500">
                / box
              </span>
            </span>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={handleAddItem}
        className="mt-5 flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-3 text-sm font-medium text-red transition hover:bg-primary-700"
      >
        <Plus size={17} />
        Add item to Bill
      </button>
    </section>
  );
}

export default BillingProduct;

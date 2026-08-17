"use client";

import ProductInformation from "./ProductInformation";
import QuantityInformation from "./QuantityInformation";
import CostInformation from "./CostInformation";

function StockItem({
  item,
  itemIndex,
  products,
  packaging,
  productTypes,
  updateItem,
  onRemove,
}) {
  const selectedProduct = products.find(
    (product) => String(product.id) === String(item.productId),
  );

  const selectedPackaging = packaging.find(
    (pack) =>
      String(pack.product_id) === String(item.productId) &&
      pack.category === item.category,
  );

  const quantity = Number(item.quantity) || 0;

  const quantityBoxes =
    item.unit === "carton"
      ? quantity * (selectedPackaging?.boxes_per_carton || 0)
      : quantity;

  const totalCost = quantityBoxes * Number(item.costPerBox || 0);

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-slate-800">Stock Item</h3>
          <p className="mt-1 text-xs text-slate-500">
            Enter the product and quantity received.
          </p>
        </div>

        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            Remove
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-5">
        {/* Product and Category */}
        <ProductInformation
          products={products}
          selectedProduct={selectedProduct}
          productTypes={productTypes}
          productId={item.productId}
          category={item.category}
          onProductChange={(value) => updateItem(itemIndex, "productId", value)}
          onCategoryChange={(value) => updateItem(itemIndex, "category", value)}
        />

        {/* Quantity and Unit */}
        <QuantityInformation
          unit={item.unit}
          quantity={item.quantity}
          onUnitChange={(value) => updateItem(itemIndex, "unit", value)}
          onQuantityChange={(value) => updateItem(itemIndex, "quantity", value)}
        />

        {/* Cost Information */}
        <CostInformation
          costPerBox={item.costPerBox}
          onCostPerBoxChange={(value) =>
            updateItem(itemIndex, "costPerBox", value)
          }
          totalCost={totalCost}
          quantityBoxes={quantityBoxes}
        />

        {/* Packaging / quantity summary */}
        {selectedPackaging && (
          <div className="mt-5 rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700">Packaging</p>

                <p className="mt-1 text-xs text-slate-500">
                  {selectedPackaging.boxes_per_carton} boxes per carton
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-slate-500">Stock to be added</p>

                <p className="text-lg font-bold text-slate-800">
                  {quantityBoxes} boxes
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StockItem;

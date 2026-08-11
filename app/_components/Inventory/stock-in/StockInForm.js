"use client";

import { useState } from "react";
import CostInformation from "./CostInformation";
import ProductInformation from "./ProductInformation";
import QuantityInformation from "./QuantityInformation";
import StockInActions from "./StockInActions";
import StockNotes from "./StockNotes";
import SupplierInvoiceInformation from "./SupplierInvoiceInformation";
import { stockInFormAction } from "@/app/inventory/action";
import StockItems from "./StockItems";

function StockInForm({ products, packaging }) {
  const [items, setItems] = useState([
    {
      productId: "",
      category: "",
      quantity: "",
      unit: "carton",
      costPerBox: "",
    },
  ]);

  function addItem(newItem) {
    setItems((prev) => [
      ...prev,
      {
        productId: "",
        category: "",
        quantity: "",
        unit: "carton",
        costPerBox: "",
      },
    ]);
  }

  function removeItem(index) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function updateItem(index, field, value) {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  }

  const handleSubmit = stockInFormAction.bind(null, items);

  return (
    <form action={handleSubmit} className="rounded-xl bg-white shadow">
      {/* Supplier Invoice Information */}
      <SupplierInvoiceInformation />
      {/* StockIn Items */}
      <StockItems
        products={products}
        packaging={packaging}
        items={items}
        updateItem={updateItem}
        removeItem={removeItem}
      />
      <StockNotes />

      <StockInActions addItem={addItem} />
    </form>
  );
}

export default StockInForm;

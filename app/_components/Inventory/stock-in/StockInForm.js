"use client";

import { stockInFormAction } from "@/app/dashboard/inventory/action";
import { useState } from "react";
import toast from "react-hot-toast";
import StockInActions from "./StockInActions";
import StockItems from "./StockItems";
import StockNotes from "./StockNotes";
import SupplierInvoiceInformation from "./SupplierInvoiceInformation";

function StockInForm({ products, packaging, productTypes }) {
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

  async function handleSubmit(formData) {
    const result = await stockInFormAction(items, formData);

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    setItems([
      {
        productId: "",
        category: "",
        quantity: "",
        unit: "carton",
        costPerBox: "",
      },
    ]);

    toast.success("Stock added successfully");
  }
  // const handleSubmit = stockInFormAction.bind(null, items);

  return (
    <form action={handleSubmit} className="rounded-xl bg-white shadow">
      {/* Supplier Invoice Information */}
      <SupplierInvoiceInformation />
      {/* StockIn Items */}
      <StockItems
        products={products}
        packaging={packaging}
        productTypes={productTypes}
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

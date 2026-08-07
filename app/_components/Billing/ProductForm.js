"use client";

import { useState } from "react";

function ProductForm() {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [category, setCategory] = useState("noValue");
  const [quantity, setQuantity] = useState(0);
  return (
    <form className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">Add Product</h2>

      <div className="grid grid-cols-6 gap-4">
        <input
          name="productName"
          type="text"
          placeholder="Product name"
          className="rounded-lg border px-4 py-3"
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        />

        <select name="unit" className="rounded-lg border px-4 py-3" value="box">
          <option value="carton">Carton</option>
          <option value="box">Box</option>
        </select>

        <select
          name="category"
          className="rounded-lg border px-4 py-3"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="noValue">Category</option>
          <option value="tp">TP</option>
          <option value="sp">SP</option>
          <option value="mp">MP</option>
          <option value="hr">HR</option>
        </select>

        <input
          type="number"
          placeholder="Qty"
          className="rounded-lg border px-4 py-3"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        {/* Price will come from database after fetching category */}
        <input
          disabled
          value="322.78"
          className="rounded-lg border bg-slate-100 px-4 py-3"
        />

        <button className="rounded-lg bg-green-600 text-white hover:bg-green-700">
          Add
        </button>
      </div>
    </form>
  );
}

export default ProductForm;

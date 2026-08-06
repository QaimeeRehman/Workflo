function ProductForm() {
  return (
    <form className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">Add Product</h2>

      <div className="grid grid-cols-6 gap-4">
        <input
          name="productName"
          type="text"
          placeholder="Product name"
          className="rounded-lg border px-4 py-3"
        />

        <select name="unit" className="rounded-lg border px-4 py-3" value="box">
          <option value="carton">Carton</option>
          <option value="box">Box</option>
        </select>

        <select className="rounded-lg border px-4 py-3" value="noValue">
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
        />

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

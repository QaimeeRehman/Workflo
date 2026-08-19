import ProductTableRow from "./ProductTableRow";

function PricingTable({ products }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-[0_0_6px_0_rgba(0,0,0,0.12)]">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr className="border-b">
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              ID
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Product
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Type
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Company
            </th>

            <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <ProductTableRow product={product} key={product.id} />
            // <Proproduct={product} key={product.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PricingTable;

import BillInvoice from "../_components/BillInvoice";
import BillInvoiceActions from "../_components/BillInvoiceActions";
import BillInvoiceSummary from "../_components/BillInvoiceSummary";
import CustomerInfo from "../_components/CustomerInfo";
import CustomerSearch from "../_components/CustomerSearch";
import ProductForm from "../_components/ProductForm";

const bill = [
  { product: "sooper", category: "tp", Qty: 10, price: 322.78, total: 3227.8 },
];

function page() {
  return (
    <div className="mx-auto  p-8">
      <h1 className="mb-6 text-3xl font-bold text-slate-800">New Invoice</h1>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Side */}
        <div className="col-span-8 space-y-6">
          {/* Customer */}
          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">Customer</h2>

            {/* Customer Search */}
            <CustomerSearch />

            {/* Customer Info */}
            <CustomerInfo />
          </div>

          {/* Product */}
          <ProductForm />
          {/* Invoice */}
          <BillInvoice bill={bill} />
        </div>

        {/* Right Side */}
        <div className="col-span-4">
          {/* Bill Invoice Summary */}
          <div className="sticky top-6 rounded-xl bg-white p-6 shadow">
            <BillInvoiceSummary />
            {/* Bill Invoice Actions */}
            <BillInvoiceActions />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;

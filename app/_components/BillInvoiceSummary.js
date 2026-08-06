function BillInvoiceSummary() {
  return (
    <>
      <h2 className="mb-6 text-xl font-semibold">Invoice Summary</h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Items</span>
          <span>15</span>
        </div>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>Rs. 5,477.80</span>
        </div>

        <div className="flex justify-between">
          <span>Discount</span>
          <span>Rs. 0</span>
        </div>

        <hr />

        <div className="flex justify-between text-2xl font-bold">
          <span>Total</span>
          <span>Rs. 5,477.80</span>
        </div>
      </div>
    </>
  );
}

export default BillInvoiceSummary;

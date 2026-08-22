"use client";

import { format } from "date-fns";

function BillingPrintableInvoice({ bill, items }) {
  if (!bill) return null;

  const {
    invoice_number,
    created_at,
    customer,
    subtotal,
    discount,
    total,
    payment_type,
    change = 0,
  } = bill;

  console.log(bill);

  const isWalkIn = !customer;

  const totalAmount = Number(total ?? 0);
  const amountPaid = Number(bill.amount_paid ?? 0);

  const remainingAmount = Math.max(
    0,
    Number((totalAmount - amountPaid).toFixed(2)),
  );
  console.log(bill);
  return (
    <div id="printable-invoice" className="invoice-print">
      {/* Header */}
      <div className="invoice-header">
        <div>
          <h1 className="invoice-logo">WORKFLO</h1>
          <p className="invoice-business">AL NOOR TRADERS</p>
        </div>

        <div className="invoice-title">
          <h2>INVOICE</h2>
          <p>{invoice_number}</p>
        </div>
      </div>

      {/* Invoice Information */}
      <div className="invoice-info">
        <div>
          <p className="invoice-label">BILL TO</p>

          <p className="invoice-customer">
            {isWalkIn ? "Walk-in Customer" : customer.fullName}
          </p>

          {customer?.phone && <p>{customer.phone}</p>}
          {customer?.CNIC && <p>{customer.CNIC}</p>}
        </div>

        <div className="invoice-meta">
          <div>
            <span>Date</span>
            <strong>{format(new Date(created_at), "dd MMM yyyy")}</strong>
          </div>

          <div>
            <span>Time</span>
            <strong>{format(new Date(created_at), "hh:mm a")}</strong>
          </div>
        </div>
      </div>

      {/* Items */}
      <table className="invoice-items">
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Category</th>
            <th>Qty</th>
            <th>Price / Box</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => (
            <tr key={item.id ?? `${item.product_id}-${index}`}>
              <td>{index + 1}</td>

              <td>
                <strong>{item.product_name}</strong>
              </td>

              <td>{item.category?.toUpperCase()}</td>

              <td>{Number(item.quantity_boxes)}</td>

              <td>Rs. {Number(item.price_per_box).toLocaleString()}</td>

              <td>Rs. {Number(item.total).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Bottom Section */}
      <div className="invoice-bottom">
        {/* Payment */}
        <div className="invoice-payment">
          <p className="invoice-label">PAYMENT</p>

          <div className="payment-row">
            <span>Method</span>
            <strong>
              {payment_type === "cash"
                ? "Cash"
                : payment_type === "partial"
                  ? "Partial Payment"
                  : "Credit"}
            </strong>
          </div>

          <div className="payment-row">
            <span>Amount Paid</span>
            <strong>Rs. {bill.amount_paid}</strong>
          </div>

          {!isWalkIn && (
            <div className="payment-row">
              <span>Remaining</span>
              <strong>Rs. {remainingAmount.toLocaleString()}</strong>
            </div>
          )}

          {payment_type === "cash" && (
            <div className="payment-row">
              <span>Change</span>
              <strong>Rs. {Number(change).toLocaleString()}</strong>
            </div>
          )}
        </div>

        {/* Totals */}
        <div className="invoice-totals">
          <div>
            <span>Subtotal</span>
            <strong>Rs. {Number(subtotal).toLocaleString()}</strong>
          </div>

          <div>
            <span>Discount</span>
            <strong>Rs. {Number(discount).toLocaleString()}</strong>
          </div>

          <div className="invoice-grand-total">
            <span>Total</span>
            <strong>Rs. {Number(total).toLocaleString()}</strong>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="invoice-footer">
        <p>Thank you for your business!</p>
        <span>Powered by Workflo</span>
      </div>
    </div>
  );
}

export default BillingPrintableInvoice;

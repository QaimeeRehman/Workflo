"use client";

import toast from "react-hot-toast";

function BillInvoiceActions({ bill }) {
  function handlePrint() {
    window.print();
  }
  function handleWhatsapp() {
    if (!bill.customer) {
      toast.error("Whatsapp can only be send to registered customer");
    }
    const publicBillUrl = `${window.location.origin}/bills/${bill.public_token}`;
    const pkphoneformat = "92" + bill.customer.whatsapp_phone.slice(1);
    const message = `Assalam-o-Alaikum ${bill.customer.fullName},
    Your invoice ${bill.invoice_number} from Al Noor Traders is ready.

    Total: Rs. ${bill.total}
    Paid: Rs. ${bill.amount_paid}
    Remaining: Rs. ${bill.total - bill.amount_paid}

    View your bill:
    ${publicBillUrl}

    Thank you for your business.
        `;

    const whatsappUrl = `https://wa.me/${pkphoneformat}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  }
  return (
    <div className="no-print flex gap-3">
      <button
        type="button"
        onClick={handlePrint}
        className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
      >
        🖨 Print
      </button>

      <button
        onClick={handleWhatsapp}
        type="button"
        className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
      >
        WhatsApp
      </button>

      {/* <button
        type="button"
        className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
      >
        Email
      </button> */}
    </div>
  );
}

export default BillInvoiceActions;

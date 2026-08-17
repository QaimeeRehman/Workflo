// import Link from "next/link";
// import {
//   getBillByInvoiceNumber,
//   getBillItemsByBillId,
// } from "@/app/_lib/dataService";
// import BillingPrintableInvoice from "@/app/_components/Billing/BillingPrintableInvoice";
// import BillInvoiceActions from "@/app/_components/Billing/BillInvoiceActions";
// import { toCapitalize } from "@/app/_lib/helper";

// function formatMoney(value) {
//   return `Rs. ${Number(value).toLocaleString("en-PK", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   })}`;
// }

// async function Page({ params }) {
//   const { invoiceNumber } = await params;

//   const bill = await getBillByInvoiceNumber(invoiceNumber);
//   const items = await getBillItemsByBillId(bill.id);

//   const amountPaid =
//     bill.payment_type === "credit" ? 0 : Number(bill.amount_paid ?? bill.total);

//   const change =
//     bill.payment_type === "cash"
//       ? Math.max(0, amountPaid - Number(bill.total))
//       : 0;
//   console.log(bill);

//   return (
//     <div className="min-h-full min-w-[80vw] space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between print:hidden">
//         <div>
//           <Link
//             href="/billing"
//             className="text-sm font-medium text-slate-500 hover:text-primary-600"
//           >
//             ← Back to Billing
//           </Link>

//           <h1 className="mt-2 text-2xl font-bold text-slate-800">
//             Invoice {bill.invoice_number}
//           </h1>

//           <p className="mt-1 text-sm text-slate-500">
//             Bill created successfully
//           </p>
//         </div>

//         <BillInvoiceActions />
//       </div>

//       {/* <BillingPrintableInvoice bill={bill} items={items} /> */}

//       {/* Invoice */}
//       <div
//         id="invoice"
//         className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow-sm print:max-w-none print:rounded-none print:p-0 print:shadow-none"
//       >
//         {/* Invoice Header */}
//         <div className="flex items-start justify-between border-b border-slate-200 pb-7">
//           <div>
//             <h2 className="text-3xl font-extrabold tracking-wide text-slate-900">
//               WORKFLO
//             </h2>

//             <p className="mt-1 text-sm font-medium text-slate-500">
//               AL NOOR TRADERS
//             </p>
//           </div>

//           <div className="text-right">
//             <h3 className="text-3xl font-bold tracking-wide text-slate-800">
//               INVOICE
//             </h3>

//             <p className="mt-2 text-sm font-semibold text-primary-600">
//               {bill.invoice_number}
//             </p>
//           </div>
//         </div>

//         {/* Customer + Date */}
//         <div className="flex justify-between border-b border-slate-200 py-7">
//           <div>
//             <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
//               Bill To
//             </p>

//             <p className="text-base font-bold text-slate-800">
//               {bill.customer?.fullName ?? "Walk-in Customer"}
//             </p>

//             {bill.customer?.saleType && (
//               <p className="mt-1 text-sm text-slate-500">
//                 {toCapitalize(bill.customer.saleType)} &mdash;{" "}
//                 {toCapitalize(bill.customer.taxCategory)}
//               </p>
//             )}
//             {bill.customer?.phone && (
//               <p className="mt-1 text-sm text-slate-500">
//                 Phone: {bill.customer.phone}
//               </p>
//             )}

//             {bill.customer?.cnic && (
//               <p className="mt-1 text-sm text-slate-500">
//                 CNIC: {bill.customer.cnic}
//               </p>
//             )}
//           </div>

//           <div className="text-right">
//             <div>
//               <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
//                 Invoice Date
//               </p>

//               <p className="mt-1 text-sm font-semibold text-slate-700">
//                 {new Date(bill.created_at).toLocaleDateString("en-PK", {
//                   day: "2-digit",
//                   month: "short",
//                   year: "numeric",
//                 })}
//               </p>
//             </div>

//             <div className="mt-4">
//               <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
//                 Time
//               </p>

//               <p className="mt-1 text-sm font-semibold text-slate-700">
//                 {new Date(bill.created_at).toLocaleTimeString("en-PK", {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 })}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Items */}
//         <div className="mt-7 overflow-hidden rounded-lg border border-slate-200">
//           <table className="w-full text-left text-sm">
//             <thead className="bg-slate-50">
//               <tr className="border-b border-slate-200">
//                 <th className="px-4 py-3 font-semibold text-slate-600">#</th>

//                 <th className="px-4 py-3 font-semibold text-slate-600">
//                   Product
//                 </th>

//                 <th className="px-4 py-3 font-semibold text-slate-600">
//                   Category
//                 </th>

//                 <th className="px-4 py-3 text-right font-semibold text-slate-600">
//                   Qty
//                 </th>

//                 <th className="px-4 py-3 text-right font-semibold text-slate-600">
//                   Price / Box
//                 </th>

//                 <th className="px-4 py-3 text-right font-semibold text-slate-600">
//                   Total
//                 </th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-slate-100">
//               {items.map((item, index) => (
//                 <tr key={item.id}>
//                   <td className="px-4 py-4 text-slate-500">{index + 1}</td>

//                   <td className="px-4 py-4 font-semibold text-slate-800">
//                     {item.product_name}
//                   </td>

//                   <td className="px-4 py-4 uppercase text-slate-500">
//                     {item.category}
//                   </td>

//                   <td className="px-4 py-4 text-right font-medium text-slate-700">
//                     {Number(item.quantity_boxes)}
//                   </td>

//                   <td className="px-4 py-4 text-right text-slate-600">
//                     {formatMoney(item.price_per_box)}
//                   </td>

//                   <td className="px-4 py-4 text-right font-semibold text-slate-800">
//                     {formatMoney(item.total)}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Bottom */}
//         <div className="mt-8 flex justify-between gap-12">
//           {/* Payment */}
//           <div className="w-1/2">
//             <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
//               Payment
//             </p>

//             <div className="mt-3 space-y-2 text-sm">
//               <div className="flex justify-between border-b border-slate-100 pb-2">
//                 <span className="text-slate-500">Method</span>

//                 <span className="font-semibold capitalize text-slate-700">
//                   {bill.payment_type === "cash" && "Paid in Cash"}
//                   {bill.payment_type === "partial" && "Partially Paid"}
//                   {bill.payment_type === "credit" && "Credit Sale"}
//                 </span>
//               </div>

//               <div className="flex justify-between border-b border-slate-100 pb-2">
//                 <span className="text-slate-500">Amount Paid</span>

//                 <span className="font-semibold text-slate-700">
//                   {formatMoney(amountPaid)}
//                 </span>
//               </div>

//               {bill.payment_type === "cash" && (
//                 <div className="flex justify-between">
//                   <span className="text-slate-500">Change</span>

//                   <span className="font-semibold text-slate-700">
//                     {formatMoney(change)}
//                   </span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Totals */}
//           <div className="w-80">
//             <div className="flex justify-between py-2 text-sm">
//               <span className="text-slate-500">Subtotal</span>

//               <span className="font-medium text-slate-700">
//                 {formatMoney(bill.subtotal)}
//               </span>
//             </div>

//             <div className="flex justify-between py-2 text-sm">
//               <span className="text-slate-500">Discount</span>

//               <span className="font-medium text-slate-700">
//                 {formatMoney(bill.discount)}
//               </span>
//             </div>

//             <div className="mt-2 flex justify-between border-t-2 border-slate-800 py-4">
//               <span className="text-lg font-bold text-slate-800">Total</span>

//               <span className="text-lg font-bold text-slate-900">
//                 {formatMoney(bill.total)}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="mt-16 border-t border-slate-200 pt-5 text-center">
//           <p className="text-sm font-semibold text-slate-700">
//             Thank you for your business!
//           </p>

//           <p className="mt-1 text-xs text-slate-400">Powered by Workflo</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Page;

import Link from "next/link";
import {
  getBillByInvoiceNumber,
  getBillItemsByBillId,
} from "@/app/_lib/dataService";
import InvoiceA5Wrapper from "@/app/_components/Billing/InvoiceA5Wrapper";
import BillInvoiceActions from "@/app/_components/Billing/BillInvoiceActions";
import { toCapitalize } from "@/app/_lib/helper";

function formatMoney(value) {
  return `Rs. ${Number(value).toLocaleString("en-PK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

async function Page({ params }) {
  const { invoiceNumber } = await params;
  // console.log(invoiceNumber);
  const bill = await getBillByInvoiceNumber(invoiceNumber);
  const items = await getBillItemsByBillId(bill.id);
  console.log(bill);
  const amountPaid =
    bill.payment_type === "credit" ? 0 : Number(bill.amount_paid ?? bill.total);

  const change =
    bill.payment_type === "cash"
      ? Math.max(0, amountPaid - Number(bill.total))
      : 0;

  return (
    <div className="min-h-full min-w-[80vw] space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between print:hidden">
        <div>
          <Link
            href="/billing"
            className="text-sm font-medium text-slate-500 hover:text-primary-600"
          >
            ← Back to Billing
          </Link>

          <h1 className="mt-2 text-2xl font-bold text-slate-800">
            Invoice {bill.invoice_number}
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Bill created successfully
          </p>
        </div>

        <BillInvoiceActions />
      </div>

      {/* Invoice — auto-scales to fit A5 */}
      <InvoiceA5Wrapper watch={items.length}>
        {/* Invoice Header */}
        <div className="flex items-start justify-between border-b border-slate-200 pb-7">
          <div>
            <h2 className="text-3xl font-extrabold tracking-wide text-slate-900">
              WORKFLO
            </h2>
            <p className="mt-1 text-sm font-medium text-slate-500">
              AL NOOR TRADERS
            </p>
          </div>

          <div className="text-right">
            <h3 className="text-3xl font-bold tracking-wide text-slate-800">
              INVOICE
            </h3>
            <p className="mt-2 text-sm font-semibold text-primary-600">
              {bill.invoice_number}
            </p>
          </div>
        </div>

        {/* Customer + Date */}
        <div className="flex justify-between border-b border-slate-200 py-7">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              Bill To
            </p>
            <p className="text-base font-bold text-slate-800">
              {bill.customer?.fullName ?? "Walk-in Customer"}
            </p>
            {bill.customer?.saleType && (
              <p className="mt-1 text-sm text-slate-500">
                {toCapitalize(bill.customer.saleType)} &mdash;{" "}
                {toCapitalize(bill.customer.taxCategory)}
              </p>
            )}
            {bill.customer?.phone && (
              <p className="mt-1 text-sm text-slate-500">
                Phone: {bill.customer.phone}
              </p>
            )}
            {bill.customer?.cnic && (
              <p className="mt-1 text-sm text-slate-500">
                CNIC: {bill.customer.cnic}
              </p>
            )}
          </div>

          <div className="text-right">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Invoice Date
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-700">
                {new Date(bill.created_at).toLocaleDateString("en-PK", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="mt-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Time
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-700">
                {new Date(bill.created_at).toLocaleTimeString("en-PK", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="mt-7 overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200">
                <th className="px-4 py-3 font-semibold text-slate-600">#</th>
                <th className="px-4 py-3 font-semibold text-slate-600">
                  Product
                </th>
                <th className="px-4 py-3 font-semibold text-slate-600">
                  Category
                </th>
                <th className="px-4 py-3 text-right font-semibold text-slate-600">
                  Qty
                </th>
                <th className="px-4 py-3 text-right font-semibold text-slate-600">
                  Price / Box
                </th>
                <th className="px-4 py-3 text-right font-semibold text-slate-600">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item, index) => (
                <tr key={item.id}>
                  <td className="px-4 py-4 text-slate-500">{index + 1}</td>
                  <td className="px-4 py-4 font-semibold text-slate-800">
                    {toCapitalize(item.product_name)}
                  </td>
                  <td className="px-4 py-4 uppercase text-slate-500">
                    {item.category}
                  </td>
                  <td className="px-4 py-4 text-right font-medium text-slate-700">
                    {Number(item.quantity_boxes)}
                  </td>
                  <td className="px-4 py-4 text-right text-slate-600">
                    {formatMoney(item.price_per_box)}
                  </td>
                  <td className="px-4 py-4 text-right font-semibold text-slate-800">
                    {formatMoney(item.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex justify-between gap-12">
          <div className="w-1/2">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Payment
            </p>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Method</span>
                <span className="font-semibold capitalize text-slate-700">
                  {bill.payment_type === "cash" && "Paid in Cash"}
                  {bill.payment_type === "partial" && "Partially Paid"}
                  {bill.payment_type === "credit" && "Credit Sale"}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Amount Paid</span>
                <span className="font-semibold text-slate-700">
                  {formatMoney(amountPaid)}
                </span>
              </div>
              {bill.payment_type === "cash" && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Change</span>
                  <span className="font-semibold text-slate-700">
                    {formatMoney(change)}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="w-80">
            <div className="flex justify-between py-2 text-sm">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-medium text-slate-700">
                {formatMoney(bill.subtotal)}
              </span>
            </div>
            <div className="flex justify-between py-2 text-sm">
              <span className="text-slate-500">Discount</span>
              <span className="font-medium text-slate-700">
                {formatMoney(bill.discount)}
              </span>
            </div>
            <div className="mt-2 flex justify-between border-t-2 border-slate-800 py-4">
              <span className="text-lg font-bold text-slate-800">Total</span>
              <span className="text-lg font-bold text-slate-900">
                {formatMoney(bill.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 border-t border-slate-200 pt-5 text-center">
          <p className="text-sm font-semibold text-slate-700">
            Thank you for your business!
          </p>
          <p className="mt-1 text-xs text-slate-400">Powered by Workflo</p>
        </div>
      </InvoiceA5Wrapper>
    </div>
  );
}

export default Page;

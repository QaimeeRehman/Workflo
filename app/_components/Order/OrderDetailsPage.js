// "use client";

// import {
//   ArrowLeft,
//   Check,
//   CheckCircle2,
//   Clock3,
//   Package,
//   Phone,
//   MapPin,
//   FileText,
//   Loader2,
//   XCircle,
//   CalendarDays,
//   Boxes,
// } from "lucide-react";
// import Link from "next/link";
// import {
//   formatDate,
//   formatMoney,
//   getInitials,
//   toCapitalize,
// } from "@/app/_lib/helper";
// import { confirmOrder } from "@/app/dashboard/orders/action";
// import toast from "react-hot-toast";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// const statusConfig = {
//   pending: {
//     label: "Pending",
//     icon: Clock3,
//     className: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
//   },

//   confirmed: {
//     label: "Confirmed",
//     icon: CheckCircle2,
//     className: "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200",
//   },

//   processing: {
//     label: "Processing",
//     icon: Loader2,
//     className: "bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200",
//   },

//   completed: {
//     label: "Completed",
//     icon: CheckCircle2,
//     className:
//       "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
//   },

//   cancelled: {
//     label: "Cancelled",
//     icon: XCircle,
//     className: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200",
//   },
// };

// function OrderDetailsPage({ order }) {
//   const router = useRouter();
//   const [confirming, setConfirming] = useState(false);

//   async function handleConfirmOrder() {
//     if (confirming) return;

//     setConfirming(true);

//     try {
//       const result = await confirmOrder(order.id);

//       if (!result.success) {
//         toast.error(result.error || "Failed to confirm order");
//         return;
//       }

//       toast.success(
//         `Order ${result.order.order_number} confirmed successfully`,
//       );

//       router.refresh();
//     } catch (error) {
//       console.log("handleConfirmOrder", error);
//       toast.error("Something went wrong while confirming order.");
//     } finally {
//       setConfirming(false);
//     }
//   }

//   return (
//     <div className="min-h-full bg-gray-50/50 p-4 sm:p-6 lg:p-8">
//       <div className="mx-auto max-w-6xl">
//         {/* Header */}
//         <div className="mb-6">
//           <Link
//             href="/dashboard/orders"
//             className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
//           >
//             <ArrowLeft size={16} />
//             Back to Orders
//           </Link>

//           <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//             <div>
//               <div className="flex flex-wrap items-center gap-3">
//                 <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
//                   {order.order_number}
//                 </h1>

//                 <StatusBadge status={order.status} />
//               </div>

//               <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
//                 <span className="inline-flex items-center gap-1.5">
//                   <CalendarDays size={15} />
//                   {formatDate(order.created_at)}
//                 </span>

//                 <span className="inline-flex items-center gap-1.5">
//                   <Boxes size={15} />
//                   {order.total_boxes} boxes
//                 </span>
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="flex flex-wrap gap-2">
//               {order.status === "pending" && (
//                 <button
//                   type="button"
//                   onClick={handleConfirmOrder}
//                   disabled={confirming}
//                   className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 text-sm font-medium text-white transition hover:bg-gray-800"
//                 >
//                   {confirming ? (
//                     <>
//                       <Loader2 size={16} className="animate-spin" />
//                       confirming
//                     </>
//                   ) : (
//                     <>
//                       <Check size={16} />
//                       Confirm Order
//                     </>
//                   )}
//                 </button>
//               )}

//               {order.status === "confirmed" && (
//                 <button
//                   type="button"
//                   className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 text-sm font-medium text-white transition hover:bg-gray-800"
//                 >
//                   <Package size={16} />
//                   Start Processing
//                 </button>
//               )}

//               {order.status === "processing" && (
//                 <button
//                   type="button"
//                   className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 text-sm font-medium text-white transition hover:bg-gray-800"
//                 >
//                   <CheckCircle2 size={16} />
//                   Mark Completed
//                 </button>
//               )}

//               {order.status !== "completed" && order.status !== "cancelled" && (
//                 <button
//                   type="button"
//                   className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 text-sm font-medium text-red-600 transition hover:bg-red-50"
//                 >
//                   <XCircle size={16} />
//                   Cancel
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Status Progress */}
//         <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
//           <div className="mb-4 flex items-center justify-between">
//             <div>
//               <h2 className="text-sm font-semibold text-gray-900">
//                 Order Status
//               </h2>

//               <p className="mt-0.5 text-xs text-gray-500">
//                 Track the progress of this pre-order
//               </p>
//             </div>

//             <StatusBadge status={order.status} />
//           </div>

//           <OrderProgress status={order.status} />
//         </div>

//         {/* Main Grid */}
//         <div className="grid gap-6 lg:grid-cols-3">
//           {/* Left */}
//           <div className="space-y-6 lg:col-span-2">
//             {/* Customer */}
//             <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
//               <div className="border-b border-gray-200 px-5 py-4">
//                 <h2 className="text-sm font-semibold text-gray-900">
//                   Customer
//                 </h2>
//               </div>

//               <div className="p-5">
//                 <div className="flex items-start gap-4">
//                   <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600">
//                     {getInitials(order.customers.fullName)}
//                   </div>

//                   <div className="min-w-0 flex-1">
//                     <div className="font-semibold text-gray-900">
//                       {order.customers.fullName}
//                     </div>

//                     <div className="mt-2 flex flex-col gap-1.5 text-sm text-gray-500 sm:flex-row sm:gap-5">
//                       <span className="inline-flex items-center gap-1.5">
//                         <Phone size={14} />
//                         {order.customers.phone}
//                       </span>

//                       <span className="inline-flex items-center gap-1.5">
//                         <MapPin size={14} />
//                         {toCapitalize(order.customers.area)}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Items */}
//             <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
//               <div className="border-b border-gray-200 px-5 py-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h2 className="text-sm font-semibold text-gray-900">
//                       Order Items
//                     </h2>

//                     <p className="mt-0.5 text-xs text-gray-500">
//                       {order.pre_order_items.length} products ·{" "}
//                       {order.totalBoxes} boxes
//                     </p>
//                   </div>

//                   <Package size={18} className="text-gray-400" />
//                 </div>
//               </div>

//               {/* Desktop */}
//               <div>
//                 <table className="w-full">
//                   <thead>
//                     <tr className="border-b border-gray-200 bg-gray-50/70 text-left">
//                       <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-gray-500">
//                         Product
//                       </th>

//                       <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-gray-500">
//                         Category
//                       </th>

//                       <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500">
//                         Cartons
//                       </th>

//                       <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500">
//                         Boxes
//                       </th>

//                       <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500">
//                         Amount
//                       </th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {order.pre_order_items.map((item) => (
//                       <tr
//                         key={item.id}
//                         className="border-b border-gray-100 last:border-0"
//                       >
//                         <td className="px-5 py-4">
//                           <div className="font-medium text-gray-900">
//                             {item.products.name}
//                           </div>
//                         </td>

//                         <td className="px-5 py-4">
//                           <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
//                             {item.category}
//                           </span>
//                         </td>

//                         <td className="px-5 py-4 text-right text-sm text-gray-600">
//                           {item.cartons}
//                         </td>

//                         <td className="px-5 py-4 text-right text-sm text-gray-600">
//                           {item.boxes}
//                         </td>

//                         <td className="px-5 py-4 text-right text-sm font-medium text-gray-900">
//                           {formatMoney(item.line_total)}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Notes */}
//             <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
//               <div className="border-b border-gray-200 px-5 py-4">
//                 <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
//                   <FileText size={16} />
//                   Notes
//                 </h2>
//               </div>

//               <div className="p-5">
//                 {order.notes ? (
//                   <p className="whitespace-pre-wrap text-sm leading-6 text-gray-600">
//                     {order.notes}
//                   </p>
//                 ) : (
//                   <p className="text-sm text-gray-400">
//                     No notes were added to this order.
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Right */}
//           <div className="space-y-6">
//             {/* Summary */}
//             <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
//               <div className="border-b border-gray-200 px-5 py-4">
//                 <h2 className="text-sm font-semibold text-gray-900">
//                   Order Summary
//                 </h2>
//               </div>

//               <div className="space-y-4 p-5">
//                 <SummaryRow label="Order number" value={order.order_number} />

//                 <SummaryRow
//                   label="Products"
//                   value={`${order.pre_order_items.length}`}
//                 />

//                 <SummaryRow
//                   label="Total boxes"
//                   value={`${order.total_boxes}`}
//                 />

//                 <div className="border-t border-gray-100 pt-4">
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm font-medium text-gray-600">
//                       Total amount
//                     </span>

//                     <span className="text-lg font-semibold text-gray-900">
//                       {formatMoney(order.total_amount)}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Timeline */}
//             <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
//               <div className="border-b border-gray-200 px-5 py-4">
//                 <h2 className="text-sm font-semibold text-gray-900">
//                   Order Information
//                 </h2>
//               </div>

//               <div className="space-y-5 p-5">
//                 <TimelineItem
//                   title="Order created"
//                   date={formatDate(order.created_at)}
//                   active
//                 />

//                 <TimelineItem
//                   title="Last updated"
//                   date={formatDate(order.updated_at)}
//                   active
//                 />
//               </div>
//             </div>

//             {/* Customer ID */}
//             <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
//               <div className="text-xs font-medium text-gray-500">
//                 Customer ID
//               </div>

//               <div className="mt-1 text-sm font-semibold text-gray-900">
//                 #{order.customers.id}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default OrderDetailsPage;

// function SummaryRow({ label, value }) {
//   return (
//     <div className="flex items-center justify-between gap-4">
//       <span className="text-sm text-gray-500">{label}</span>

//       <span className="text-sm font-medium text-gray-900">{value}</span>
//     </div>
//   );
// }

// function StatusBadge({ status }) {
//   const config = statusConfig[status] ?? statusConfig.pending;

//   const Icon = config.icon;

//   return (
//     <span
//       className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${config.className}`}
//     >
//       <Icon size={13} />
//       {config.label}
//     </span>
//   );
// }

// function TimelineItem({ title, date, active }) {
//   return (
//     <div className="flex gap-3">
//       <div
//         className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
//           active ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-400"
//         }`}
//       >
//         <Check size={14} />
//       </div>

//       <div className="min-w-0">
//         <div className="text-sm font-medium text-gray-900">{title}</div>

//         <div className="mt-0.5 text-xs text-gray-500">{date}</div>
//       </div>
//     </div>
//   );
// }

// function OrderProgress({ status }) {
//   const steps = [
//     {
//       key: "pending",
//       label: "Pending",
//     },
//     {
//       key: "confirmed",
//       label: "Confirmed",
//     },
//     {
//       key: "processing",
//       label: "Processing",
//     },
//     {
//       key: "completed",
//       label: "Completed",
//     },
//   ];

//   const currentIndex = steps.findIndex((step) => step.key === status);

//   return (
//     <div className="flex items-center">
//       {steps.map((step, index) => {
//         const completed = index <= currentIndex;
//         const current = index === currentIndex;

//         return (
//           <div key={step.key} className="flex flex-1 items-center">
//             <div className="flex flex-col items-center">
//               <div
//                 className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
//                   completed
//                     ? "bg-gray-900 text-white"
//                     : "bg-gray-100 text-gray-400"
//                 } ${current ? "ring-4 ring-gray-100" : ""}`}
//               >
//                 {index < currentIndex ? <Check size={14} /> : index + 1}
//               </div>

//               <span
//                 className={`mt-2 text-[11px] font-medium ${
//                   completed ? "text-gray-900" : "text-gray-400"
//                 }`}
//               >
//                 {step.label}
//               </span>
//             </div>

//             {index < steps.length - 1 && (
//               <div
//                 className={`mx-2 mt-[-17px] h-px flex-1 ${
//                   index < currentIndex ? "bg-gray-900" : "bg-gray-200"
//                 }`}
//               />
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

"use client";

import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Clock3,
  Package,
  Phone,
  MapPin,
  FileText,
  Loader2,
  XCircle,
  CalendarDays,
  Boxes,
  AlertTriangle,
  Warehouse,
} from "lucide-react";
import Link from "next/link";
import {
  formatDate,
  formatMoney,
  getInitials,
  toCapitalize,
} from "@/app/_lib/helper";
import { confirmOrder, startProcessing } from "@/app/dashboard/orders/action";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

const statusConfig = {
  pending: {
    label: "Pending",
    icon: Clock3,
    className: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
  },

  confirmed: {
    label: "Confirmed",
    icon: CheckCircle2,
    className: "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200",
  },

  processing: {
    label: "Processing",
    icon: Loader2,
    className: "bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200",
  },

  completed: {
    label: "Completed",
    icon: CheckCircle2,
    className:
      "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
  },

  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    className: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200",
  },
};

function OrderDetailsPage({ order, inventory }) {
  const router = useRouter();

  const [confirming, setConfirming] = useState(false);
  const [processing, setProcessing] = useState(false);

  // UI-only state for now.
  // We will replace this with the real order status/server action later.
  // const [processingStarted, setProcessingStarted] = useState(
  //   order.status === "processing",
  // );

  /*
   * TEMPORARY HARD-CODED INVENTORY
   *
   * This is only for building the UI.
   * Later we will get this from the Workflo inventory.
   *
   * Key:
   * product id -> available boxes
   */
  // const mockInventory = {
  //   12: 35,
  //   2: 8,
  //   13: 20,
  //   4: 5,
  //   5: 100,
  // };

  async function handleConfirmOrder() {
    if (confirming) return;

    setConfirming(true);

    try {
      const result = await confirmOrder(order.id);

      if (!result.success) {
        toast.error(result.error || "Failed to confirm order");
        return;
      }

      toast.success(
        `Order ${result.order.order_number} confirmed successfully`,
      );

      router.refresh();
    } catch (error) {
      console.log("handleConfirmOrder", error);
      toast.error("Something went wrong while confirming order.");
    } finally {
      setConfirming(false);
    }
  }
  async function handleProcessOrder() {
    if (processing) return;

    setProcessing(true);

    try {
      const result = await startProcessing(order.id);

      if (!result.success) {
        toast.error(result.error || "Failed to process order");
        return;
      }

      toast.success(`Processing order: ${result.order.order_number}`);

      router.refresh();
    } catch (error) {
      console.log("handleProcessOrder", error);
      toast.error("Something went wrong while processing order.");
    } finally {
      setProcessing(false);
    }
  }

  function handleMarkReady() {
    toast.success("Order is ready.");
  }

  /*
   * Determine whether all products have enough inventory.
   *
   * TEMPORARY:
   * We are using mockInventory above.
   *
   * Later this calculation will use actual inventory data.
   */
  console.log(order);
  const inventoryMap = new Map(
    inventory.map((item) => [`${item.product_id}-${item.category}`, item]),
  );
  console.log(inventoryMap);
  const inventoryItems = order.pre_order_items.map((item) => {
    const inventoryItem = inventoryMap.get(
      `${item.product_id}-${item.category}`,
    );

    const available = Number(inventoryItem?.quantity_boxes ?? 0);

    const required = Number(item.total_boxes);

    return {
      ...item,
      required,
      available,
      enough: available >= required,
    };
  });

  const allInventoryAvailable = inventoryItems.every((item) => item.enough);

  // const allInventoryAvailable = inventoryItems.every((item) => item.enough);

  return (
    <div className="min-h-full bg-gray-50/50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/dashboard/orders"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
          >
            <ArrowLeft size={16} />
            Back to Orders
          </Link>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                  {order.order_number}
                </h1>

                <StatusBadge status={order.status} />
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays size={15} />
                  {formatDate(order.created_at)}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <Boxes size={15} />
                  {order.total_boxes} boxes
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              {order.status === "pending" && (
                <button
                  type="button"
                  onClick={handleConfirmOrder}
                  disabled={confirming}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {confirming ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Confirming
                    </>
                  ) : (
                    <>
                      <Check size={16} />
                      Confirm Order
                    </>
                  )}
                </button>
              )}

              {order.status === "confirmed" && (
                <button
                  type="button"
                  onClick={handleProcessOrder}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  <Package size={16} />
                  Start Processing
                </button>
              )}

              {order.status === "processing" && allInventoryAvailable && (
                <button
                  type="button"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                >
                  <CheckCircle2 size={16} />
                  Mark Ready
                </button>
              )}

              <button
                type="button"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                <XCircle size={16} />
                Cancel
              </button>

              {/* {order.status !== "completed" &&
                order.status !== "cancelled" &&
                order.status !== "ready" && (
                  <button
                    type="button"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    <XCircle size={16} />
                    Cancel
                  </button>
                )} */}
            </div>
          </div>
        </div>

        {/* Status Progress */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Order Status
              </h2>

              <p className="mt-0.5 text-xs text-gray-500">
                Track the progress of this pre-order
              </p>
            </div>

            <StatusBadge status={order.status} />
          </div>

          <OrderProgress status={order.status} />
        </div>

        {/* Processing / Inventory */}
        {order.status === "processing" && (
          <ProcessingPanel
            inventoryItems={inventoryItems}
            allInventoryAvailable={allInventoryAvailable}
            onMarkReady={handleMarkReady}
          />
        )}

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left */}
          <div className="space-y-6 lg:col-span-2">
            {/* Customer */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 px-5 py-4">
                <h2 className="text-sm font-semibold text-gray-900">
                  Customer
                </h2>
              </div>

              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600">
                    {getInitials(order.customers.fullName)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-gray-900">
                      {order.customers.fullName}
                    </div>

                    <div className="mt-2 flex flex-col gap-1.5 text-sm text-gray-500 sm:flex-row sm:gap-5">
                      <span className="inline-flex items-center gap-1.5">
                        <Phone size={14} />
                        {order.customers.phone}
                      </span>

                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={14} />
                        {toCapitalize(order.customers.area)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 px-5 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold text-gray-900">
                      Order Items
                    </h2>

                    <p className="mt-0.5 text-xs text-gray-500">
                      {order.pre_order_items.length} products ·{" "}
                      {order.total_boxes} boxes
                    </p>
                  </div>

                  <Package size={18} className="text-gray-400" />
                </div>
              </div>

              <div>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50/70 text-left">
                      <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-gray-500">
                        Product
                      </th>

                      <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-gray-500">
                        Category
                      </th>

                      <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500">
                        Cartons
                      </th>

                      <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500">
                        Boxes
                      </th>

                      <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500">
                        Amount
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {order.pre_order_items.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-gray-100 last:border-0"
                      >
                        <td className="px-5 py-4">
                          <div className="font-medium text-gray-900">
                            {item.products.name}
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                            {item.category}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-right text-sm text-gray-600">
                          {item.cartons}
                        </td>

                        <td className="px-5 py-4 text-right text-sm text-gray-600">
                          {item.boxes}
                        </td>

                        <td className="px-5 py-4 text-right text-sm font-medium text-gray-900">
                          {formatMoney(item.line_total)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Notes */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 px-5 py-4">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <FileText size={16} />
                  Notes
                </h2>
              </div>

              <div className="p-5">
                {order.notes ? (
                  <p className="whitespace-pre-wrap text-sm leading-6 text-gray-600">
                    {order.notes}
                  </p>
                ) : (
                  <p className="text-sm text-gray-400">
                    No notes were added to this order.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-6">
            {/* Summary */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 px-5 py-4">
                <h2 className="text-sm font-semibold text-gray-900">
                  Order Summary
                </h2>
              </div>

              <div className="space-y-4 p-5">
                <SummaryRow label="Order number" value={order.order_number} />

                <SummaryRow
                  label="Products"
                  value={`${order.pre_order_items.length}`}
                />

                <SummaryRow
                  label="Total boxes"
                  value={`${order.total_boxes}`}
                />

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      Total amount
                    </span>

                    <span className="text-lg font-semibold text-gray-900">
                      {formatMoney(order.total_amount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 px-5 py-4">
                <h2 className="text-sm font-semibold text-gray-900">
                  Order Information
                </h2>
              </div>

              <div className="space-y-5 p-5">
                <TimelineItem
                  title="Order created"
                  date={format(order.created_at, "MM/dd/yyyy hh:mm aa")}
                  // date={formatDate(order.created_at)}
                  active
                />

                <TimelineItem
                  title="Last updated"
                  date={format(order.updated_at, "MM/dd/yyyy hh:mm aa")}
                  // date={formatDate(order.updated_at)}
                  active
                />
              </div>
            </div>

            {/* Customer ID */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="text-xs font-medium text-gray-500">
                Customer ID
              </div>

              <div className="mt-1 text-sm font-semibold text-gray-900">
                #{order.customers.id}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsPage;

/* -------------------------------------------------------------------------- */
/* Processing Panel                                                           */
/* -------------------------------------------------------------------------- */

function ProcessingPanel({
  inventoryItems,
  allInventoryAvailable,
  onMarkReady,
}) {
  return (
    <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-5 py-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100">
            <Warehouse size={18} className="text-gray-600" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-900">
              Inventory Check
            </h2>

            <p className="mt-0.5 text-xs text-gray-500">
              Every item must be available before this order can be marked
              ready.
            </p>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/70 text-left">
              <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-gray-500">
                Product
              </th>

              <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500">
                Required
              </th>

              <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500">
                Available
              </th>

              <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {inventoryItems.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-100 last:border-0"
              >
                <td className="px-5 py-4">
                  <div className="font-medium text-gray-900">
                    {item.products.name}
                  </div>

                  <div className="mt-0.5 text-xs text-gray-500">
                    {item.category.toUpperCase()}
                  </div>
                </td>

                <td className="px-5 py-4 text-right text-sm font-medium text-gray-700">
                  {item.required}
                </td>

                <td className="px-5 py-4 text-right text-sm font-medium text-gray-700">
                  {item.available}
                </td>

                <td className="px-5 py-4 text-right">
                  {item.enough ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                      <CheckCircle2 size={13} />
                      Available
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
                      <XCircle size={13} />
                      Insufficient
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Result */}
      <div className="border-t border-gray-200 p-5">
        {allInventoryAvailable ? (
          <div className="flex flex-col gap-4 rounded-lg bg-emerald-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <CheckCircle2
                size={20}
                className="mt-0.5 shrink-0 text-emerald-600"
              />

              <div>
                <div className="text-sm font-semibold text-emerald-900">
                  All items are available
                </div>

                <p className="mt-0.5 text-xs text-emerald-700">
                  This order can be prepared and marked as ready.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onMarkReady}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              <CheckCircle2 size={16} />
              Mark Ready
            </button>
          </div>
        ) : (
          <div className="rounded-lg bg-orange-50 p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <AlertTriangle
                  size={20}
                  className="mt-0.5 shrink-0 text-orange-600"
                />

                <div>
                  <div className="text-sm font-semibold text-orange-900">
                    Inventory is not available
                  </div>

                  <p className="mt-0.5 text-xs leading-5 text-orange-700">
                    One or more products do not have enough inventory. The
                    complete order will wait until all required inventory is
                    available.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Summary                                                                    */
/* -------------------------------------------------------------------------- */

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-gray-500">{label}</span>

      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Status Badge                                                               */
/* -------------------------------------------------------------------------- */

function StatusBadge({ status }) {
  const config = statusConfig[status] ?? statusConfig.pending;

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${config.className}`}
    >
      <Icon size={13} />
      {config.label}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Timeline                                                                   */
/* -------------------------------------------------------------------------- */

function TimelineItem({ title, date, active }) {
  return (
    <div className="flex gap-3">
      <div
        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
          active ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-400"
        }`}
      >
        <Check size={14} />
      </div>

      <div className="min-w-0">
        <div className="text-sm font-medium text-gray-900">{title}</div>

        <div className="mt-0.5 text-xs text-gray-500">{date}</div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Order Progress                                                             */
/* -------------------------------------------------------------------------- */

function OrderProgress({ status }) {
  const steps = [
    {
      key: "pending",
      label: "Pending",
    },
    {
      key: "confirmed",
      label: "Confirmed",
    },
    {
      key: "processing",
      label: "Processing",
    },
    {
      key: "ready",
      label: "Ready",
    },
    {
      key: "completed",
      label: "Completed",
    },
  ];

  /*
   * Waiting for inventory is a state inside the processing stage,
   * not a separate progress step.
   */
  const progressStatus = status === "waiting_inventory" ? "processing" : status;

  const currentIndex = steps.findIndex((step) => step.key === progressStatus);

  return (
    <div className="flex items-center overflow-x-auto pb-1">
      {steps.map((step, index) => {
        const completed = index <= currentIndex;
        const current = index === currentIndex;

        return (
          <div key={step.key} className="flex min-w-[80px] flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                  completed
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-400"
                } ${current ? "ring-4 ring-gray-100" : ""}`}
              >
                {index < currentIndex ? <Check size={14} /> : index + 1}
              </div>

              <span
                className={`mt-2 whitespace-nowrap text-[11px] font-medium ${
                  completed ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`mx-2 mt-[-17px] h-px flex-1 ${
                  index < currentIndex ? "bg-gray-900" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

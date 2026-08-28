"use client";
import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ChevronRight,
  Package,
  Clock3,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import { formatMoney } from "@/app/_lib/helper";
import { useRouter } from "next/navigation";

const orders = [
  {
    id: 1024,
    customer: "Al Noor Traders",
    phone: "0300-1234567",
    items: 8,
    totalBoxes: 120,
    amount: 60000,
    status: "pending",
    createdAt: "28 Aug 2026, 05:42 AM",
  },
  {
    id: 1023,
    customer: "City General Store",
    phone: "0312-7654321",
    items: 4,
    totalBoxes: 45,
    amount: 22500,
    status: "confirmed",
    createdAt: "27 Aug 2026, 04:18 PM",
  },
  {
    id: 1022,
    customer: "Ali Traders",
    phone: "0321-4567890",
    items: 6,
    totalBoxes: 80,
    amount: 40000,
    status: "processing",
    createdAt: "27 Aug 2026, 11:35 AM",
  },
  {
    id: 1021,
    customer: "Madina Store",
    phone: "0333-1122334",
    items: 10,
    totalBoxes: 150,
    amount: 75000,
    status: "completed",
    createdAt: "26 Aug 2026, 02:10 PM",
  },
  {
    id: 1020,
    customer: "Hassan General Store",
    phone: "0345-9988776",
    items: 3,
    totalBoxes: 30,
    amount: 15000,
    status: "cancelled",
    createdAt: "26 Aug 2026, 10:22 AM",
  },
];

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

export default function OrdersPage({ orders: dbOrders }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const orders = useMemo(() => {
    return (dbOrders ?? []).map((order) => ({
      id: order.id,
      orderNumber: order.order_number,
      customer: order.customers?.fullName || "Unknown Customer",
      area: order.customers?.area || "",
      items: order.pre_order_items?.length ?? 0,
      totalBoxes: Number(order.total_boxes ?? 0),
      amount: Number(order.total_amount ?? 0),
      status: order.status || "pending",
      createdAt: new Date(order.created_at).toLocaleString("en-PK", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));
  }, [dbOrders]);

  const filteredOrders = useMemo(() => {
    const term = search.trim().toLowerCase();
    return orders.filter((order) => {
      const matchesSearch =
        !term ||
        order.orderNumber.toLowerCase().includes(term) ||
        String(order.id).includes(term) ||
        order.customer.toLowerCase().includes(term) ||
        order.area.toLowerCase().includes(term);
      const matchesStatus = status === "all" || order.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [search, status, orders]);

  return (
    <div className="min-h-full bg-gray-50/50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              Orders
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage and track customer pre-orders
            </p>
          </div>

          <button
            type="button"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-gray-900 px-4 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            + New Order
          </button>
        </div>

        {/* Summary */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <SummaryCard label="Total Orders" value={orders.length} />

          <SummaryCard
            label="Pending"
            value={orders.filter((o) => o.status === "pending").length}
          />

          <SummaryCard
            label="Processing"
            value={orders.filter((o) => o.status === "processing").length}
          />

          <SummaryCard
            label="Completed"
            value={orders.filter((o) => o.status === "completed").length}
          />
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {/* Filters */}
          <div className="border-b border-gray-200 p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              {/* Search */}
              <div className="relative w-full lg:max-w-md">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search order, customer or phone..."
                  className="h-10 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                />
              </div>

              {/* Status */}
              <div className="flex items-center gap-2">
                <SlidersHorizontal
                  size={17}
                  className="hidden text-gray-400 sm:block"
                />

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none focus:border-gray-500 sm:w-auto"
                >
                  <option value="all">All statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/70 text-left">
                  <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-gray-500">
                    Order
                  </th>

                  <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-gray-500">
                    Customer
                  </th>

                  <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-gray-500">
                    Items
                  </th>

                  <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-gray-500">
                    Boxes
                  </th>

                  <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-gray-500">
                    Amount
                  </th>

                  <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-gray-500">
                    Status
                  </th>

                  <th className="w-10 px-3 py-3" />
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    onClick={() => router.push(`/dashboard/orders/${order.id}`)}
                    key={order.id}
                    className="group cursor-pointer border-b border-gray-100 transition hover:bg-gray-100"
                  >
                    <td className="px-5 py-4">
                      <div className="font-medium text-gray-900">
                        #{order.id}
                      </div>

                      <div className="mt-0.5 text-xs text-gray-400">
                        {order.createdAt}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-medium text-gray-900">
                        {order.customer}
                      </div>

                      <div className="mt-0.5 text-xs text-gray-500">
                        {order.phone}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {order.items}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {order.totalBoxes}
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-gray-900">
                      {formatMoney(order.amount)}
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={order.status} />
                    </td>

                    <td className="px-3 py-4">
                      <ChevronRight
                        size={18}
                        className="text-gray-300 transition group-hover:text-gray-600"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="divide-y divide-gray-100 md:hidden">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="cursor-pointer p-4 transition active:bg-gray-50"
              >
                {/* Top */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-semibold text-gray-900">
                      #{order.id}
                    </div>

                    <div className="mt-0.5 text-xs text-gray-400">
                      {order.createdAt}
                    </div>
                  </div>

                  <StatusBadge status={order.status} />
                </div>

                {/* Customer */}
                <div className="mt-4">
                  <div className="truncate font-medium text-gray-900">
                    {order.customer}
                  </div>

                  <div className="mt-0.5 text-xs text-gray-500">
                    {order.phone}
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="rounded-lg bg-gray-50 p-2.5">
                    <div className="text-[11px] text-gray-500">Items</div>

                    <div className="mt-0.5 text-sm font-semibold text-gray-900">
                      {order.items}
                    </div>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-2.5">
                    <div className="text-[11px] text-gray-500">Boxes</div>

                    <div className="mt-0.5 text-sm font-semibold text-gray-900">
                      {order.totalBoxes}
                    </div>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-2.5">
                    <div className="text-[11px] text-gray-500">Amount</div>

                    <div className="mt-0.5 truncate text-sm font-semibold text-gray-900">
                      {formatMoney(order.amount)}
                    </div>
                  </div>
                </div>

                {/* View */}
                <div className="mt-3 flex items-center justify-end gap-1 text-xs font-medium text-gray-500">
                  View order
                  <ChevronRight size={14} />
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredOrders.length === 0 && (
            <div className="flex min-h-75 flex-col items-center justify-center px-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <Package size={22} className="text-gray-400" />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-gray-900">
                No orders found
              </h3>

              <p className="mt-1 max-w-sm text-sm text-gray-500">
                Try changing your search or status filter.
              </p>
            </div>
          )}

          {/* Footer */}
          {filteredOrders.length > 0 && (
            <div className="border-t border-gray-200 px-4 py-3 sm:px-5">
              <p className="text-xs text-gray-500">
                Showing{" "}
                <span className="font-medium text-gray-700">
                  {filteredOrders.length}
                </span>{" "}
                of{" "}
                <span className="font-medium text-gray-700">
                  {orders.length}
                </span>{" "}
                orders
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ label, value }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="text-xs font-medium text-gray-500">{label}</div>

      <div className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
        {value}
      </div>
    </div>
  );
}

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

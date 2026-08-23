"use client";

import { UserRound } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import CustomerLedger from "./CustomerLedger";
import CustomerLedgerCustomerSearch from "./CustomerLedgerCustomerSearch";

function formatMoney(value) {
  return `Rs. ${Number(value || 0).toLocaleString("en-PK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function SummaryCard({ label, value, description }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <p className="text-sm font-medium text-gray-500">{label}</p>

      <p className="mt-2 text-2xl font-semibold tracking-tight text-gray-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-gray-400">{description}</p>
    </div>
  );
}

export default function CustomerLedgerReport({
  customers,
  customer,
  ledger,
  summary,
  period,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const customerId = searchParams.get("customer");

  function handleCustomerSelect(customer) {
    const params = new URLSearchParams(searchParams.toString());

    if (customer) {
      params.set("customer", customer.id);
    } else {
      params.delete("customer");
    }

    router.push(`/dashboard/reports/customer-ledger?${params.toString()}`);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          Customer Ledger
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          View sales, payments, and account balance for a customer.
        </p>
      </div>

      {/* Filters */}
      <section className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="w-full">
            <CustomerLedgerCustomerSearch
              customers={customers}
              selectedCustomer={customer}
              onSelect={handleCustomerSelect}
            />
          </div>
        </div>
      </section>

      {/* No Customer */}
      {!customerId ? (
        <section className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 text-gray-400">
            <UserRound size={22} />
          </div>

          <h2 className="mt-4 text-sm font-semibold text-gray-900">
            Select a customer
          </h2>

          <p className="mx-auto mt-1 max-w-sm text-sm text-gray-500">
            Select a customer above to view their sales, payments, and running
            account balance.
          </p>
        </section>
      ) : (
        <>
          {/* Customer Header */}
          <section className="rounded-xl border border-gray-200 bg-white px-5 py-4">
            <div>
              <h2 className="font-semibold text-gray-900">
                {customer?.fullName}
              </h2>

              <p className="mt-1 text-sm capitalize text-gray-500">
                {customer?.saleType}
                {customer?.taxCategory && ` • ${customer.taxCategory}`}
              </p>
            </div>
          </section>

          {/* Summary */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
              label="Opening Balance"
              value={formatMoney(summary?.openingBalance)}
              description="Balance at the start of the period"
            />

            <SummaryCard
              label="Total Sales"
              value={formatMoney(summary?.totalSales)}
              description="Sales during the period"
            />

            <SummaryCard
              label="Total Paid"
              value={formatMoney(summary?.totalPaid)}
              description="Payments received"
            />

            <SummaryCard
              label="Closing Balance"
              value={formatMoney(summary?.closingBalance)}
              description="Balance at the end of the period"
            />
          </div>

          {/* Ledger */}
          <CustomerLedger ledger={ledger} />
        </>
      )}
    </div>
  );
}

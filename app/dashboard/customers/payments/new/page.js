import CustomersPaymentForm from "@/app/_components/Customers/CustomersPaymentForm";
import { getCustomersWithOutstanding } from "@/app/_lib/dataService";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

async function page() {
  const customers = await getCustomersWithOutstanding();

  return (
    <div className="mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 w-10 items-center justify-center rounded-lg
            border border-slate-200 bg-white text-slate-600
            transition hover:bg-slate-50"
        >
          <ArrowLeft size={18} />
        </Link>

        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Receive Customer Payment
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Record a payment received from a customer.
          </p>
        </div>
      </div>

      {/* Form */}
      <CustomersPaymentForm customers={customers} />
    </div>
  );
}

export default page;

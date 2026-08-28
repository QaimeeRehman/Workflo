import Link from "next/link";
import { CheckCircle2, ShoppingBag } from "lucide-react";

export default async function OrderSuccessPage({ params, searchParams }) {
  const { customerToken } = await params;
  const { orderId } = await searchParams;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto flex min-h-screen w-full max-w-2xl items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full rounded-3xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-10">
          {/* Success Icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
            <CheckCircle2
              size={36}
              className="text-green-600"
              strokeWidth={2}
            />
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Order Submitted Successfully
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
            Thank you for your order. We have received your pre-order and will
            process it shortly.
          </p>

          {/* Order ID */}
          {orderId && (
            <div className="mx-auto mt-6 max-w-sm rounded-2xl bg-gray-50 px-5 py-4">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Order Number
              </p>

              <p className="mt-1 text-xl font-bold text-gray-900">#{orderId}</p>
            </div>
          )}

          {/* Information */}
          <div className="mx-auto mt-6 max-w-md rounded-2xl border border-gray-100 bg-white p-4 text-left">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                <ShoppingBag size={19} className="text-gray-700" />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-900">
                  What happens next?
                </p>

                <p className="mt-1 text-sm leading-6 text-gray-500">
                  Our team will review your order. If any confirmation is
                  required, we will contact you.
                </p>
              </div>
            </div>
          </div>

          {/* Action */}
          <Link
            href={`/order/${customerToken}`}
            className="mt-8 flex h-12 w-full items-center justify-center rounded-xl bg-gray-900 px-5 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Place Another Order
          </Link>

          <p className="mt-5 text-xs text-gray-400">Al Noor Traders</p>
        </div>
      </div>
    </main>
  );
}

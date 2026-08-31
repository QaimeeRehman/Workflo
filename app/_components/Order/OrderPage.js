"use client";

import { useState } from "react";
import { ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { getCustomerByCNIC } from "@/app/order/action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function OrderPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [cnic, setCnic] = useState("");
  const [error, setError] = useState("");

  function handleCnicChange(e) {
    let value = e.target.value.replace(/\D/g, "");

    value = value.slice(0, 13);

    if (value.length > 12) {
      value = `${value.slice(0, 5)}-${value.slice(5, 12)}-${value.slice(12)}`;
    } else if (value.length > 5) {
      value = `${value.slice(0, 5)}-${value.slice(5)}`;
    }

    setCnic(value);
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const cleanCnic = cnic.replace(/\D/g, "");

    if (cleanCnic.length !== 13) {
      setError("Please enter a valid 13-digit CNIC.");
      return;
    }

    setIsLoading(true);

    try {
      const customer = await getCustomerByCNIC(cnic);

      router.push(`/order/${customer.public_token}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex h-dvh w-full items-center justify-center overflow-hidden bg-slate-50 px-4">
      <div className="w-full max-w-md">
        {/* CARD */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* HEADER */}
          <div className="border-b border-slate-200 px-5 py-6 text-center sm:px-8 sm:py-8">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
              <ShieldCheck
                size={28}
                strokeWidth={1.8}
                className="text-slate-700"
              />
            </div>

            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Place Your Order
            </h1>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-5 text-slate-500">
              Enter your CNIC to continue with your order.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="p-5 sm:p-8">
            <div>
              <label
                htmlFor="cnic"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                CNIC Number
              </label>

              <input
                id="cnic"
                name="cnic"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                value={cnic}
                onChange={handleCnicChange}
                placeholder="XXXXX-XXXXXXX-X"
                maxLength={15}
                disabled={isLoading}
                className={`
                  h-12
                  w-full
                  rounded-xl
                  border
                  bg-white
                  px-4
                  text-sm
                  tracking-wide
                  text-slate-900
                  outline-none
                  transition
                  placeholder:text-slate-400
                  disabled:cursor-not-allowed
                  disabled:bg-slate-50
                  focus:ring-2
                  ${
                    error
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                      : "border-slate-300 focus:border-slate-900 focus:ring-slate-900/10"
                  }
                `}
              />

              {error && (
                <p className="mt-2 text-xs font-medium text-red-600">{error}</p>
              )}

              {!error && (
                <p className="mt-2 text-xs text-slate-400">
                  Enter the CNIC registered with your account.
                </p>
              )}
            </div>

            {/* CONTINUE */}
            <button
              type="submit"
              disabled={isLoading}
              className="
                mt-6
                flex
                h-12
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-slate-900
                px-5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-slate-800
                active:scale-[0.99]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {isLoading ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          {/* FOOTER */}
          <div className="border-t border-slate-100 bg-slate-50 px-5 py-4 text-center sm:px-8">
            <p className="text-xs leading-5 text-slate-500">
              Only registered customers can place orders through this portal.
            </p>
          </div>
        </div>

        {/* BOTTOM TEXT */}
        <p className="mt-4 text-center text-xs text-slate-400">
          Workflo Order Portal
        </p>
      </div>
    </main>
  );
}

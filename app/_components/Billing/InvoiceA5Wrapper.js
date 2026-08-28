// app/_components/Billing/InvoiceA5Wrapper.jsx
"use client";

import { useFitToA5 } from "@/app/_hooks/useFitToA5";

export default function InvoiceA5Wrapper({ children, watch }) {
  const { pageRef, innerRef, scale } = useFitToA5([watch]);

  return (
    <div
      id="invoice"
      ref={pageRef}
      className="mx-auto bg-white shadow-sm print relative overflow-hidden"
      style={{ width: "148mm", height: "210mm" }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: `${100 / scale}%`,
        }}
      >
        <div ref={innerRef} style={{ padding: "8mm", boxSizing: "border-box" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

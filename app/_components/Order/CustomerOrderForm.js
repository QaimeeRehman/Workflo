// "use client";

// import { useMemo, useState } from "react";
// import { Check, ChevronRight, Minus, Plus, ShoppingBag, X } from "lucide-react";

// // const PRODUCT_TYPES = [
// //   {
// //     value: "biscuit",
// //     label: "Biscuit",
// //     default_categories: ["TP", "SP", "MP", "HR"],
// //   },
// //   {
// //     value: "cake",
// //     label: "Cake",
// //     default_categories: ["CAKE"],
// //   },
// // ];

// function formatMoney(value) {
//   return `Rs. ${Number(value || 0).toLocaleString("en-PK")}`;
// }

// function getInitialType(productTypes) {
//   return productTypes[0].value;
// }

// function getProductKey(product) {
//   return `${product.id}-${product.category}`;
// }

// export default function CustomerOrderForm({
//   customer,
//   products = [],
//   productTypes,
//   token,
// }) {
//   console.log(productTypes);
//   const [selectedType, setSelectedType] = useState(() =>
//     getInitialType(productTypes),
//   );
//   const [selectedCategory, setSelectedCategory] = useState("TP");

//   const [quantities, setQuantities] = useState({});
//   const [notes, setNotes] = useState("");
//   const [showReview, setShowReview] = useState(false);

//   const currentType = productTypes.find((type) => type.value === selectedType);

//   const currentProducts = useMemo(() => {
//     return products.filter(
//       (product) =>
//         product.category?.toUpperCase() === selectedCategory.toUpperCase(),
//     );
//   }, [products, selectedCategory]);

//   const selectedItems = useMemo(() => {
//     return products
//       .filter((product) => {
//         const key = getProductKey(product);

//         return Number(quantities[key] || 0) > 0;
//       })
//       .map((product) => {
//         const key = getProductKey(product);
//         const quantity = Number(quantities[key]);

//         return {
//           ...product,
//           quantity,
//           lineTotal: Number(product.price || 0) * quantity,
//         };
//       });
//   }, [products, quantities]);

//   const totalQuantity = selectedItems.reduce(
//     (sum, item) => sum + item.quantity,
//     0,
//   );

//   const total = selectedItems.reduce((sum, item) => sum + item.lineTotal, 0);

//   function updateQuantity(product, value) {
//     const key = getProductKey(product);
//     const quantity = Math.max(0, Number(value) || 0);

//     setQuantities((current) => {
//       const next = { ...current };

//       if (quantity === 0) {
//         delete next[key];
//       } else {
//         next[key] = quantity;
//       }

//       return next;
//     });
//   }

//   function handleTypeChange(type) {
//     setSelectedType(type);

//     const nextType = productTypes.find((item) => item.value === type);

//     setSelectedCategory(nextType?.default_categories?.[0] || "");
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 pb-28">
//       {/* Header */}
//       <header className="border-b border-gray-200 bg-white">
//         <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6">
//           <div className="flex items-center gap-3">
//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-white">
//               <ShoppingBag size={21} />
//             </div>

//             <div className="min-w-0">
//               <h1 className="truncate text-lg font-semibold text-gray-900">
//                 Al Noor Traders
//               </h1>

//               <p className="text-sm text-gray-500">Customer Order</p>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Customer */}
//       <section className="mx-auto max-w-2xl px-4 pt-5 sm:px-6">
//         <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
//           <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
//             Welcome
//           </p>

//           <h2 className="mt-1 text-xl font-semibold text-gray-900">
//             {customer?.fullName}
//           </h2>

//           {customer?.area && (
//             <p className="mt-1 text-sm text-gray-500">{customer.area}</p>
//           )}
//         </div>
//       </section>

//       {/* Product type */}
//       <section className="mx-auto max-w-2xl px-4 pt-6 sm:px-6">
//         <div className="mb-3">
//           <h2 className="text-lg font-semibold text-gray-900">
//             Place Your Order
//           </h2>

//           <p className="mt-1 text-sm text-gray-500">
//             Select products and enter the quantity you need.
//           </p>
//         </div>

//         <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
//           {productTypes.map((type) => {
//             const active = selectedType === type.value;

//             return (
//               <button
//                 key={type.value}
//                 type="button"
//                 onClick={() => handleTypeChange(type.value)}
//                 className={[
//                   "min-h-11 shrink-0 rounded-xl px-5 text-sm font-semibold transition",
//                   active
//                     ? "bg-gray-900 text-white"
//                     : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-100",
//                 ].join(" ")}
//               >
//                 {type.label}
//               </button>
//             );
//           })}
//         </div>
//       </section>

//       {/* Category */}
//       <section className="mx-auto max-w-2xl px-4 pt-4 sm:px-6">
//         <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
//           {currentType?.default_categories.map((category) => {
//             const active = selectedCategory === category;

//             return (
//               <button
//                 key={category}
//                 type="button"
//                 onClick={() => setSelectedCategory(category)}
//                 className={[
//                   "min-h-10 shrink-0 rounded-lg px-4 text-sm font-medium transition",
//                   active
//                     ? "bg-gray-200 text-gray-900"
//                     : "bg-transparent text-gray-500 hover:bg-gray-100",
//                 ].join(" ")}
//               >
//                 {category}
//               </button>
//             );
//           })}
//         </div>
//       </section>

//       {/* Products */}
//       <section className="mx-auto max-w-2xl px-4 pt-4 sm:px-6">
//         {currentProducts.length === 0 ? (
//           <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-12 text-center">
//             <ShoppingBag size={28} className="mx-auto text-gray-300" />

//             <p className="mt-3 text-sm font-medium text-gray-700">
//               No products available
//             </p>

//             <p className="mt-1 text-xs text-gray-400">
//               There are currently no products in this category.
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-3">
//             {currentProducts.map((product) => {
//               const productKey = getProductKey(product);
//               const quantity = Number(quantities[productKey] || 0);

//               return (
//                 <div
//                   key={productKey}
//                   className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
//                 >
//                   <div className="flex items-center gap-4">
//                     <div className="min-w-0 flex-1">
//                       <h3 className="truncate text-sm font-semibold text-gray-900 sm:text-base">
//                         {product.name}
//                       </h3>

//                       <p className="mt-1 text-sm font-semibold text-gray-900">
//                         {formatMoney(product.price)}
//                       </p>

//                       {product.unit && (
//                         <p className="mt-0.5 text-xs text-gray-400">
//                           per {product.unit}
//                         </p>
//                       )}
//                     </div>

//                     <div className="flex shrink-0 items-center rounded-xl border border-gray-200 bg-gray-50 p-1">
//                       <button
//                         type="button"
//                         onClick={() => updateQuantity(product, quantity - 1)}
//                         disabled={quantity === 0}
//                         className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition hover:bg-white disabled:text-gray-300"
//                         aria-label={`Decrease ${product.name}`}
//                       >
//                         <Minus size={17} />
//                       </button>

//                       <span className="flex h-10 min-w-10 items-center justify-center text-sm font-semibold text-gray-900">
//                         {quantity}
//                       </span>

//                       <button
//                         type="button"
//                         onClick={() => updateQuantity(product, quantity + 1)}
//                         className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-gray-900 shadow-sm transition hover:bg-gray-100"
//                         aria-label={`Increase ${product.name}`}
//                       >
//                         <Plus size={17} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </section>

//       {/* Notes */}
//       {selectedItems.length > 0 && (
//         <section className="mx-auto max-w-2xl px-4 pt-6 sm:px-6">
//           <label
//             htmlFor="order-notes"
//             className="mb-2 block text-sm font-semibold text-gray-900"
//           >
//             Order Notes{" "}
//             <span className="font-normal text-gray-400">(optional)</span>
//           </label>

//           <textarea
//             id="order-notes"
//             value={notes}
//             onChange={(event) => setNotes(event.target.value)}
//             rows={3}
//             placeholder="Any special instructions..."
//             className="w-full resize-none rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
//           />
//         </section>
//       )}

//       {/* Sticky summary */}
//       <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur">
//         <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3 sm:px-6">
//           <div className="min-w-0 flex-1">
//             <p className="text-xs text-gray-500">
//               {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
//             </p>

//             <p className="truncate text-lg font-bold text-gray-900">
//               {formatMoney(total)}
//             </p>
//           </div>

//           <button
//             type="button"
//             disabled={selectedItems.length === 0}
//             onClick={() => setShowReview(true)}
//             className="flex h-12 shrink-0 items-center gap-2 rounded-xl bg-gray-900 px-5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
//           >
//             Review
//             <ChevronRight size={18} />
//           </button>
//         </div>
//       </div>

//       {/* Review */}
//       {showReview && (
//         <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-4">
//           <div className="max-h-[90vh] w-full overflow-hidden rounded-t-3xl bg-white sm:max-w-lg sm:rounded-3xl">
//             <div className="max-h-[90vh] overflow-y-auto p-5 sm:p-6">
//               {/* Review header */}
//               <div className="mb-5 flex items-start justify-between gap-4">
//                 <div>
//                   <h2 className="text-xl font-bold text-gray-900">
//                     Review Order
//                   </h2>

//                   <p className="mt-1 text-sm text-gray-500">
//                     Check your order before submitting.
//                   </p>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={() => setShowReview(false)}
//                   className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500"
//                   aria-label="Close review"
//                 >
//                   <X size={18} />
//                 </button>
//               </div>

//               {/* Items */}
//               <div className="overflow-hidden rounded-2xl border border-gray-200">
//                 {selectedItems.map((item) => (
//                   <div
//                     key={getProductKey(item)}
//                     className="flex items-center justify-between gap-4 border-b border-gray-100 p-4 last:border-0"
//                   >
//                     <div className="min-w-0">
//                       <p className="font-medium text-gray-900">{item.name}</p>

//                       <p className="mt-1 text-sm text-gray-500">
//                         {item.quantity} × {formatMoney(item.price)}
//                       </p>
//                     </div>

//                     <p className="shrink-0 font-semibold text-gray-900">
//                       {formatMoney(item.lineTotal)}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               {/* Notes */}
//               {notes.trim() && (
//                 <div className="mt-4 rounded-2xl bg-gray-50 p-4">
//                   <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
//                     Notes
//                   </p>

//                   <p className="mt-1 text-sm leading-6 text-gray-700">
//                     {notes}
//                   </p>
//                 </div>
//               )}

//               {/* Total */}
//               <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-5">
//                 <span className="font-medium text-gray-600">Total</span>

//                 <span className="text-xl font-bold text-gray-900">
//                   {formatMoney(total)}
//                 </span>
//               </div>

//               {/* Submit */}
//               <button
//                 type="button"
//                 className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gray-900 text-sm font-semibold text-white transition hover:bg-gray-800"
//               >
//                 <Check size={18} />
//                 Submit Pre-Order
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useMemo, useState } from "react";
import { Check, ChevronRight, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { submitOrder } from "@/app/order/action";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";

function formatMoney(value) {
  return `Rs. ${Number(value || 0).toLocaleString("en-PK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function getInitialType(productTypes) {
  return productTypes?.[0]?.value || "";
}

function getProductKey(product) {
  return `${product.id}-${product.category}`;
}

export default function CustomerOrderForm({
  customer,
  products = [],
  productTypes = [],
  customerToken,
}) {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState(() =>
    getInitialType(productTypes),
  );

  const [selectedCategory, setSelectedCategory] = useState(
    productTypes?.[0]?.default_categories?.[0] || "",
  );

  /*
   * Example:
   *
   * quantities = {
   *   "61-tp": {
   *      boxes: 2,
   *      cartons: 1
   *   }
   * }
   */
  const [quantities, setQuantities] = useState({});

  const [notes, setNotes] = useState("");
  const [showReview, setShowReview] = useState(false);

  const currentType = productTypes.find((type) => type.value === selectedType);

  const currentProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.category?.toUpperCase() === selectedCategory?.toUpperCase(),
    );
  }, [products, selectedCategory]);

  /*
   * Get quantity for one product/unit.
   */
  function getQuantity(product, unit) {
    const key = getProductKey(product);

    return Number(quantities[key]?.[unit] || 0);
  }

  /*
   * Update boxes/cartons independently.
   */
  function updateQuantity(product, unit, value) {
    const quantity = Math.max(0, Number(value) || 0);

    const key = getProductKey(product);

    setQuantities((current) => {
      const next = { ...current };

      const productQuantity = {
        ...(next[key] || {}),
      };

      if (quantity === 0) {
        delete productQuantity[unit];
      } else {
        productQuantity[unit] = quantity;
      }

      if (Object.keys(productQuantity).length === 0) {
        delete next[key];
      } else {
        next[key] = productQuantity;
      }

      return next;
    });
  }

  /*
   * Convert the selected quantities into order items.
   *
   * price = price per box
   *
   * carton price =
   * boxesPerCarton × price per box
   */
  const selectedItems = useMemo(() => {
    return products
      .map((product) => {
        const key = getProductKey(product);
        const productQuantity = quantities[key];

        if (!productQuantity) return null;

        const boxes = Number(productQuantity.boxes || 0);
        const cartons = Number(productQuantity.cartons || 0);

        if (boxes === 0 && cartons === 0) return null;

        const pricePerBox = Number(product.price || 0);

        const boxesPerCarton = Number(product.packaging?.boxesPerCarton || 0);

        const cartonPrice = pricePerBox * boxesPerCarton;

        const cartonBoxes = cartons * boxesPerCarton;

        const totalBoxes = cartonBoxes + boxes;

        const total = cartons * cartonPrice + boxes * pricePerBox;

        return {
          ...product,

          boxes,
          cartons,

          pricePerBox,
          boxesPerCarton,
          cartonPrice,

          cartonBoxes,
          totalBoxes,

          lineTotal: total,
        };
      })
      .filter(Boolean);
  }, [products, quantities]);

  const totalBoxes = selectedItems.reduce((sum, item) => {
    if (item.orderUnit === "carton") {
      return sum + item.quantity * item.boxesPerCarton;
    }

    return sum + item.quantity;
  }, 0);

  const total = selectedItems.reduce((sum, item) => sum + item.lineTotal, 0);

  function handleTypeChange(type) {
    setSelectedType(type);

    const nextType = productTypes.find((item) => item.value === type);

    setSelectedCategory(nextType?.default_categories?.[0] || "");
  }

  // async function handleSubmit() {
  //   if (!customer?.id || selectedItems.length === 0) return;

  //   const items = selectedItems.map((item) => ({
  //     productId: item.id,
  //     category: item.category,
  //     boxes: item.boxes,
  //     cartons: item.cartons,
  //   }));

  //   try {
  //     const result = await submitOrder({
  //       customerId: customer.id,
  //       items,
  //       notes: notes.trim() || null,
  //     });

  //     if (!result.success) {
  //       toast.error(result.error || "Failed to submit order");
  //       return;
  //     }

  //       const whatsappNumber = "923222800880";

  //       const message = `
  // New Pre-Order

  // Customer: ${customer?.fullName || "Customer"}

  // ${selectedItems
  //   .map((item) => {
  //     const quantities = [];

  //     if (item.cartons > 0) {
  //       quantities.push(
  //         `${item.cartons} ${item.cartons === 1 ? "carton" : "cartons"}`,
  //       );
  //     }

  //     if (item.boxes > 0) {
  //       quantities.push(`${item.boxes} ${item.boxes === 1 ? "box" : "boxes"}`);
  //     }

  //     return `${item.name} (${item.category.toUpperCase()})
  // ${quantities.join(" + ")}
  // Total: ${formatMoney(item.lineTotal)}`;
  //   })
  //   .join("\n\n")}

  // Total: ${formatMoney(total)}

  // ${notes.trim() ? `Notes: ${notes.trim()}` : ""}
  // `;

  //       const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  //         message,
  //       )}`;

  //       window.open(whatsappUrl, "_blank");
  //     toast.success(`Your order #${result.orderId} received successfully`);
  //     setShowReview(false);

  //     router.push(`/order/${customerToken}/success?orderId=${result.orderId}`);
  //   } catch (error) {
  //     console.log(error);

  //     alert("something went wrong while submitting the order");
  //   }
  // }

  async function handleSubmit() {
    if (!customer?.id || selectedItems.length === 0) return;
    const items = selectedItems.map((item) => ({
      productId: item.id,
      category: item.category,
      boxes: item.boxes,
      cartons: item.cartons,
    }));
    try {
      const result = await submitOrder({
        customerId: customer.id,
        items,
        notes: notes.trim() || null,
      });
      if (!result.success) {
        toast.error(result.error || "Failed to submit order");
        return;
      }
      toast.success(`Your order #${result.orderNumber} received successfully`);
      setShowReview(false);
      router.push(`/order/${customerToken}/success?orderId=${result.orderId}`);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while submitting the order.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-white">
              <ShoppingBag size={21} />
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-lg font-semibold text-gray-900">
                Al Noor Traders
              </h1>

              <p className="text-sm text-gray-500">Customer Order</p>
            </div>
          </div>
        </div>
      </header>

      {/* Customer */}
      <section className="mx-auto max-w-2xl px-4 pt-5 sm:px-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
            Welcome
          </p>

          <h2 className="mt-1 text-xl font-semibold text-gray-900">
            {customer?.fullName}
          </h2>

          {customer?.area && (
            <p className="mt-1 text-sm text-gray-500">{customer.area}</p>
          )}
        </div>
      </section>

      {/* Product type */}
      <section className="mx-auto max-w-2xl px-4 pt-6 sm:px-6">
        <div className="mb-3">
          <h2 className="text-lg font-semibold text-gray-900">
            Place Your Order
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Select products and enter the quantity you need.
          </p>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {productTypes.map((type) => {
            const active = selectedType === type.value;

            return (
              <button
                key={type.value}
                type="button"
                onClick={() => handleTypeChange(type.value)}
                className={[
                  "min-h-11 shrink-0 rounded-xl px-5 text-sm font-semibold transition",
                  active
                    ? "bg-gray-900 text-white"
                    : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-100",
                ].join(" ")}
              >
                {type.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Category */}
      <section className="mx-auto max-w-2xl px-4 pt-4 sm:px-6">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {currentType?.default_categories?.map((category) => {
            const active = selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={[
                  "min-h-10 shrink-0 rounded-lg px-4 text-sm font-medium transition",
                  active
                    ? "bg-gray-200 text-gray-900"
                    : "bg-transparent text-gray-500 hover:bg-gray-100",
                ].join(" ")}
              >
                {category}
              </button>
            );
          })}
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-2xl px-4 pt-4 sm:px-6">
        {currentProducts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-12 text-center">
            <ShoppingBag size={28} className="mx-auto text-gray-300" />

            <p className="mt-3 text-sm font-medium text-gray-700">
              No products available
            </p>

            <p className="mt-1 text-xs text-gray-400">
              There are currently no products in this category.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {currentProducts.map((product) => {
              const boxes = getQuantity(product, "boxes");

              const cartons = getQuantity(product, "cartons");

              const boxesPerCarton = Number(
                product.packaging?.boxesPerCarton || 0,
              );

              const cartonPrice = Number(product.price || 0) * boxesPerCarton;

              return (
                <div
                  key={getProductKey(product)}
                  className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                >
                  {/* Product */}
                  <div className="mb-4">
                    <h3 className="text-base font-bold leading-6 text-gray-900 sm:text-lg">
                      {product.name}
                    </h3>

                    <p className="mt-1 text-sm font-medium text-gray-600">
                      {formatMoney(product.price)} / box
                    </p>

                    {boxesPerCarton > 0 && (
                      <p className="mt-0.5 text-xs text-gray-400">
                        {boxesPerCarton} boxes / carton
                        {" · "}
                        {formatMoney(cartonPrice)} / carton
                      </p>
                    )}

                    {/* {product.packaging?.unitsPerBox && (
                      <p className="mt-0.5 text-xs text-gray-400">
                        {product.packaging.unitsPerBox} units / box
                      </p>
                    )} */}
                  </div>

                  {/* Quantities */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {/* Boxes */}
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            Boxes
                          </p>

                          <p className="text-xs text-gray-400">
                            {formatMoney(product.price)} each
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-1">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(product, "boxes", boxes - 1)
                          }
                          disabled={boxes === 0}
                          className="flex h-10 w-10 items-center justify-center bg-slate-100 rounded-lg text-gray-700 transition hover:bg-gray-100 disabled:text-gray-300"
                          aria-label={`Decrease boxes of ${product.name}`}
                        >
                          <Minus size={17} />
                        </button>

                        <span className="flex h-10 min-w-10 items-center justify-center text-sm font-semibold text-gray-900">
                          {boxes}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(product, "boxes", boxes + 1)
                          }
                          className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 text-white transition hover:bg-gray-800"
                          aria-label={`Increase boxes of ${product.name}`}
                        >
                          <Plus size={17} />
                        </button>
                      </div>
                    </div>

                    {/* Cartons */}
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                      <div className="mb-2">
                        <p className="text-sm font-semibold text-gray-900">
                          Cartons
                        </p>

                        <p className="text-xs text-gray-400">
                          {boxesPerCarton || 0} boxes / carton
                        </p>
                      </div>

                      <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-1">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(product, "cartons", cartons - 1)
                          }
                          disabled={cartons === 0}
                          className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-gray-700 transition hover:bg-gray-100 disabled:text-gray-300"
                          aria-label={`Decrease cartons of ${product.name}`}
                        >
                          <Minus size={17} />
                        </button>

                        <span className="flex h-10 min-w-10 items-center justify-center text-sm font-semibold text-gray-900">
                          {cartons}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(product, "cartons", cartons + 1)
                          }
                          className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 text-white transition hover:bg-gray-800"
                          aria-label={`Increase cartons of ${product.name}`}
                        >
                          <Plus size={17} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Notes */}
      {selectedItems.length > 0 && (
        <section className="mx-auto max-w-2xl px-4 pt-6 sm:px-6">
          <label
            htmlFor="order-notes"
            className="mb-2 block text-sm font-semibold text-gray-900"
          >
            Order Notes{" "}
            <span className="font-normal text-gray-400">(optional)</span>
          </label>

          <textarea
            id="order-notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={3}
            placeholder="Any special instructions..."
            className="w-full resize-none rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
          />
        </section>
      )}

      {/* Sticky summary */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3 sm:px-6">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-gray-500">
              {totalBoxes} {totalBoxes === 1 ? "box" : "boxes"}
            </p>

            <p className="truncate text-lg font-bold text-gray-900">
              {formatMoney(total)}
            </p>
          </div>

          <button
            type="button"
            disabled={selectedItems.length === 0}
            onClick={() => setShowReview(true)}
            className="flex h-12 shrink-0 items-center gap-2 rounded-xl bg-gray-900 px-5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
          >
            Review
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Review */}
      {showReview && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-4">
          <div className="max-h-[90vh] w-full overflow-hidden rounded-t-3xl bg-white sm:max-w-lg sm:rounded-3xl">
            <div className="max-h-[90vh] overflow-y-auto p-5 sm:p-6">
              {/* Review header */}
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Review Order
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Check your order before submitting.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowReview(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500"
                  aria-label="Close review"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Items */}
              {/* Items */}
              <div className="space-y-3">
                {selectedItems.map((item) => (
                  <div
                    key={getProductKey(item)}
                    className="rounded-2xl border border-gray-200 bg-white p-4"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="text-base font-bold leading-6 text-gray-900 sm:text-lg">
                          {item.name}
                        </h3>

                        <span className="mt-1 inline-flex rounded-md bg-gray-100 px-2 py-1 text-xs font-semibold uppercase text-gray-600">
                          {item.category}
                        </span>
                      </div>

                      <p className="shrink-0 text-base font-bold text-gray-900 sm:text-lg">
                        {formatMoney(item.lineTotal)}
                      </p>
                    </div>

                    {/* Quantity */}
                    <div className="mt-4 rounded-xl bg-gray-50 p-3">
                      {item.cartons > 0 && (
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {item.cartons}{" "}
                              {item.cartons === 1 ? "Carton" : "Cartons"}
                            </p>

                            <p className="mt-0.5 text-xs text-gray-500">
                              {item.boxesPerCarton} boxes per carton
                            </p>
                          </div>

                          <p className="text-sm font-medium text-gray-700">
                            {item.totalBoxes} boxes
                          </p>
                        </div>
                      )}

                      {item.boxes > 0 && (
                        <div
                          className={
                            item.cartons > 0
                              ? "mt-3 border-t border-gray-200 pt-3"
                              : ""
                          }
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-semibold text-gray-900">
                                {item.boxes}{" "}
                                {item.boxes === 1 ? "Box" : "Boxes"}
                              </p>

                              <p className="mt-0.5 text-xs text-gray-500">
                                {formatMoney(item.pricePerBox)} per box
                              </p>
                            </div>

                            <p className="text-sm font-medium text-gray-700">
                              {formatMoney(item.boxes * item.pricePerBox)}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Total boxes */}
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm text-gray-500">Total boxes</span>

                      <span className="text-sm font-bold text-gray-900">
                        {item.totalBoxes}{" "}
                        {item.totalBoxes === 1 ? "box" : "boxes"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Notes */}
              {notes.trim() && (
                <div className="mt-4 rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Notes
                  </p>

                  <p className="mt-1 text-sm leading-6 text-gray-700">
                    {notes}
                  </p>
                </div>
              )}

              {/* Total */}
              <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-5">
                <span className="font-medium text-gray-600">Total</span>

                <span className="text-xl font-bold text-gray-900">
                  {formatMoney(total)}
                </span>
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gray-900 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                <Check size={18} />
                Submit Pre-Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

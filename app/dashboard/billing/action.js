// "use server";

// import { auth } from "@/auth";
// import {
//   createBillItems,
//   createBills,
//   createCashTransaction,
//   createCustomerPayment,
//   createInventoryMovements,
//   getCustomerById,
//   getLatestStockInCost,
//   getProductContainsIds,
//   getProductPricing,
// } from "../_lib/dataService";
// import { roundMoney } from "../_lib/helper";
// import { supabase } from "../_lib/supabase";

// export async function createBill(billData) {
//   const session = await auth();
//   if (!session?.user) throw new Error("You must be logged in");
//   const { customer_id, sale_type, items, discount, payment_type, amount_paid } =
//     billData;
//   if (!items.length) throw new Error("Bill must contain at least one item");
//   if (!customer_id && payment_type !== "cash") {
//     throw new Error("Walk-in sales can only be paid in cash");
//   }

//   // fetching products
//   const productIds = items.map((item) => item.product_id);
//   const products = await getProductContainsIds(productIds);

//   // Calculating each item's price
//   const billItems = [];
//   for (const item of items) {
//     const product = products.find((product) => product.id === item.product_id);
//     if (!product) throw new Error(`Product ${item.product_id} not found`);

//     let price;

//     if (sale_type === "cash_sale") {
//       const data = await getProductPricing(product.type, product.id);
//       const priceKey =
//         product.type === "biscuit"
//           ? `${item.category}_retail_non-filer`
//           : "retail_non-filer";

//       price = data[priceKey];
//     }

//     if (sale_type === "customer") {
//       if (!customer_id) throw new Error("Customer is required");

//       const customer = await getCustomerById(customer_id);

//       const data = await getProductPricing(product.type, product.id);

//       const priceKey =
//         product.type === "biscuit"
//           ? `${item.category}_${customer.saleType}_${customer.taxCategory}`
//           : `${customer.saleType}_${customer.taxCategory}`;

//       price = data[priceKey];
//     }

//     if (price == null) {
//       throw new Error(
//         `No selling price available for ${product.name} (${item.category})`,
//       );
//     }

//     // Calculate Item total
//     const itemTotal = roundMoney(Number(item.quantity_boxes) * Number(price));

//     billItems.push({
//       product_id: product.id,
//       product_name: product.name,
//       category: item.category,
//       quantity: item.quantity,
//       unit: item.unit,
//       quantity_boxes: item.quantity_boxes,
//       price_per_box: roundMoney(price),
//       total: itemTotal,
//     });
//   }
//   // calculate bill totals
//   const subtotal = roundMoney(
//     billItems.reduce((sum, item) => sum + item.total, 0),
//   );
//   const cleanDiscount = roundMoney(discount);
//   const total = roundMoney(subtotal - cleanDiscount);
//   const cleanAmountPaid = roundMoney(amount_paid);

//   if (cleanDiscount > subtotal) throw new Error("Invalid discount");

//   const bill = await createBills({
//     customer_id,
//     subtotal,
//     sale_type,
//     discount: cleanDiscount,
//     total,
//     created_by: session.user.id,
//   });

//   const billItemsData = billItems.map((item) => {
//     return {
//       bill_id: bill.id,
//       product_id: item.product_id,
//       product_name: item.product_name,
//       category: item.category,
//       quantity: item.quantity,
//       unit: item.unit,
//       quantity_boxes: item.quantity_boxes,
//       price_per_box: item.price_per_box,
//       total: item.total,
//     };
//   });

//   await createBillItems(billItemsData);

//   const inventoryMovements = [];

//   for (const item of billItems) {
//     const costPerBox = await getLatestStockInCost(
//       item.product_id,
//       item.category,
//     );

//     if (costPerBox == null)
//       throw new Error(
//         `No stock-in cost found for ${item.product_name} (${item.category})`,
//       );

//     inventoryMovements.push({
//       product_id: item.product_id,
//       category: item.category,
//       movement_type: "sale",
//       quantity_boxes: -Number(item.quantity_boxes),
//       cost_per_box: roundMoney(costPerBox),
//       reference_id: bill.id,
//       reference_type: "bills",
//       created_by: session.user.id,
//     });
//   }

//   await createInventoryMovements(inventoryMovements);

//   for (const item of billItems) {
//     const { error } = await supabase.rpc("decrease_inventory_stock", {
//       p_product_id: Number(item.product_id),
//       p_category: item.category,
//       p_quantity_boxes: Number(item.quantity_boxes),
//     });

//     if (error) {
//       throw new Error(`Failed to decrease inventory: ${error.message}`);
//     }
//   }

//   if (payment_type === "cash") {
//     if (cleanAmountPaid < total) {
//       throw new Error("Amount received is less than the bill total");
//     }

//     const received = cleanAmountPaid;

//     if (customer_id) {
//       await createCustomerPayment({
//         customer_id,
//         bill_id: bill.id,
//         amount: total,
//         payment_method: "cash",
//         reference: bill.invoice_number,
//         created_by: session.user.id,
//       });
//     }

//     await createCashTransaction({
//       transaction_type: "sale",
//       direction: "in",
//       amount: total,
//       reference_type: "bill",
//       reference_id: bill.id,
//       description: `Cash payment - ${bill.invoice_number}`,
//       created_by: session.user.id,
//     });
//   }

//   if (payment_type === "partial") {
//     if (!customer_id) {
//       throw new Error("Walk-in sales cannot be partial");
//     }

//     if (cleanAmountPaid <= 0 || cleanAmountPaid >= total) {
//       throw new Error("Partial payment must be less than the bill total");
//     }

//     await createCustomerPayment({
//       customer_id,
//       bill_id: bill.id,
//       amount: cleanAmountPaid,
//       payment_method: "cash",
//       reference: bill.invoice_number,
//       created_by: session.user.id,
//     });

//     await createCashTransaction({
//       transaction_type: "customer_payment",
//       direction: "in",
//       amount: cleanAmountPaid,
//       reference_type: "customer_payment",
//       reference_id: bill.id,
//       description: `Partial payment - ${bill.invoice_number}`,
//       created_by: session.user.id,
//     });
//   }

//   if (payment_type === "credit") {
//     if (!customer_id) {
//       throw new Error("Walk-in sales cannot be credit");
//     }

//     if (cleanAmountPaid !== 0) {
//       throw new Error("Credit sale cannot have a payment");
//     }
//   }

//   // return {
//   //   bill,
//   //   items: billItems,
//   //   change:
//   //     payment_type === "cash"
//   //       ? roundMoney(Math.max(0, cleanAmountPaid - total))
//   //       : 0,
//   // };
// }

// "use server";

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

// import { auth } from "@/auth";
// import {
//   createBillItems,
//   createBills,
//   createCashTransaction,
//   createCustomerPayment,
//   createInventoryMovements,
//   getCustomerById,
//   getLatestStockInCost,
//   getProductContainsIds,
//   getProductPricing,
// } from "../_lib/dataService";
// import { roundMoney } from "../_lib/helper";
// import { supabase } from "../_lib/supabase";

// export async function createBill(billData) {
//   const session = await auth();

//   if (!session?.user) {
//     throw new Error("You must be logged in");
//   }

//   const { customer_id, sale_type, items, discount, payment_type, amount_paid } =
//     billData;

//   if (!items?.length) {
//     throw new Error("Bill must contain at least one item");
//   }

//   const cleanAmountPaid = roundMoney(amount_paid);

//   // --------------------------------------------------
//   // FETCH PRODUCTS
//   // --------------------------------------------------

//   const productIds = items.map((item) => item.product_id);
//   const products = await getProductContainsIds(productIds);

//   // --------------------------------------------------
//   // CALCULATE BILL ITEMS
//   // --------------------------------------------------

//   const billItems = [];

//   for (const item of items) {
//     const product = products.find((product) => product.id === item.product_id);

//     if (!product) {
//       throw new Error(`Product ${item.product_id} not found`);
//     }

//     let price;

//     if (sale_type === "cash_sale") {
//       const data = await getProductPricing(product.type, product.id);

//       const priceKey =
//         product.type === "biscuit"
//           ? `${item.category}_retail_non-filer`
//           : "retail_non-filer";

//       price = data[priceKey];
//     }

//     if (sale_type === "customer") {
//       if (!customer_id) {
//         throw new Error("Customer is required");
//       }

//       const customer = await getCustomerById(customer_id);

//       const data = await getProductPricing(product.type, product.id);

//       const priceKey =
//         product.type === "biscuit"
//           ? `${item.category}_${customer.saleType}_${customer.taxCategory}`
//           : `${customer.saleType}_${customer.taxCategory}`;

//       price = data[priceKey];
//     }

//     if (price == null) {
//       throw new Error(
//         `No selling price available for ${product.name} (${item.category})`,
//       );
//     }

//     const itemTotal = roundMoney(Number(item.quantity_boxes) * Number(price));

//     billItems.push({
//       product_id: product.id,
//       product_name: product.name,
//       category: item.category,
//       quantity: item.quantity,
//       unit: item.unit,
//       quantity_boxes: item.quantity_boxes,
//       price_per_box: roundMoney(price),
//       total: itemTotal,
//     });
//   }

//   // --------------------------------------------------
//   // CALCULATE TOTALS
//   // --------------------------------------------------

//   const subtotal = roundMoney(
//     billItems.reduce((sum, item) => sum + item.total, 0),
//   );

//   const cleanDiscount = roundMoney(discount);
//   const total = roundMoney(subtotal - cleanDiscount);

//   if (cleanDiscount < 0 || cleanDiscount > subtotal) {
//     throw new Error("Invalid discount");
//   }

//   // --------------------------------------------------
//   // VALIDATE PAYMENT
//   // --------------------------------------------------

//   // Walk-in customer can only pay cash
//   if (!customer_id && payment_type !== "cash") {
//     throw new Error("Walk-in sales can only be paid in cash");
//   }

//   // Cash
//   if (payment_type === "cash") {
//     if (cleanAmountPaid < total) {
//       throw new Error("Amount received is less than the bill total");
//     }
//   }

//   // Partial
//   if (payment_type === "partial") {
//     if (!customer_id) {
//       throw new Error("Walk-in sales cannot be partial");
//     }

//     if (cleanAmountPaid <= 0 || cleanAmountPaid >= total) {
//       throw new Error("Partial payment must be less than the bill total");
//     }
//   }

//   // Credit
//   if (payment_type === "credit") {
//     if (!customer_id) {
//       throw new Error("Walk-in sales cannot be credit");
//     }

//     if (cleanAmountPaid !== 0) {
//       throw new Error("Credit sale cannot have a payment");
//     }
//   }

//   // --------------------------------------------------
//   // CREATE BILL
//   // --------------------------------------------------

//   const bill = await createBills({
//     customer_id,
//     subtotal,
//     sale_type,
//     discount: cleanDiscount,
//     total,
//     created_by: session.user.id,
//   });

//   // --------------------------------------------------
//   // CREATE BILL ITEMS
//   // --------------------------------------------------

//   const billItemsData = billItems.map((item) => ({
//     bill_id: bill.id,
//     product_id: item.product_id,
//     product_name: item.product_name,
//     category: item.category,
//     quantity: item.quantity,
//     unit: item.unit,
//     quantity_boxes: item.quantity_boxes,
//     price_per_box: item.price_per_box,
//     total: item.total,
//   }));

//   await createBillItems(billItemsData);

//   // --------------------------------------------------
//   // CREATE INVENTORY MOVEMENTS
//   // --------------------------------------------------

//   const inventoryMovements = [];

//   for (const item of billItems) {
//     const costPerBox = await getLatestStockInCost(
//       item.product_id,
//       item.category,
//     );

//     if (costPerBox == null) {
//       throw new Error(
//         `No stock-in cost found for ${item.product_name} (${item.category})`,
//       );
//     }

//     inventoryMovements.push({
//       product_id: item.product_id,
//       category: item.category,
//       movement_type: "sale",
//       quantity_boxes: -Number(item.quantity_boxes),
//       cost_per_box: roundMoney(costPerBox),
//       reference_id: bill.id,
//       reference_type: "bills",
//       created_by: session.user.id,
//     });
//   }

//   await createInventoryMovements(inventoryMovements);

//   // --------------------------------------------------
//   // DECREASE INVENTORY
//   // --------------------------------------------------

//   for (const item of billItems) {
//     const { error } = await supabase.rpc("decrease_inventory_stock", {
//       p_product_id: Number(item.product_id),
//       p_category: item.category,
//       p_quantity_boxes: Number(item.quantity_boxes),
//     });

//     if (error) {
//       throw new Error(`Failed to decrease inventory: ${error.message}`);
//     }
//   }

//   // --------------------------------------------------
//   // CASH PAYMENT
//   // --------------------------------------------------

//   if (payment_type === "cash") {
//     // Registered customer
//     if (customer_id) {
//       await createCustomerPayment({
//         customer_id,
//         bill_id: bill.id,
//         amount: total,
//         payment_method: "cash",
//         reference: bill.invoice_number,
//         created_by: session.user.id,
//       });
//     }

//     // Cash transaction
//     await createCashTransaction({
//       transaction_type: "sale",
//       direction: "in",
//       amount: total,
//       reference_type: "bill",
//       reference_id: bill.id,
//       description: `Cash payment - ${bill.invoice_number}`,
//       created_by: session.user.id,
//     });
//   }

//   // --------------------------------------------------
//   // PARTIAL PAYMENT
//   // --------------------------------------------------

//   if (payment_type === "partial") {
//     await createCustomerPayment({
//       customer_id,
//       bill_id: bill.id,
//       amount: cleanAmountPaid,
//       payment_method: "cash",
//       reference: bill.invoice_number,
//       created_by: session.user.id,
//     });

//     await createCashTransaction({
//       transaction_type: "customer_payment",
//       direction: "in",
//       amount: cleanAmountPaid,
//       reference_type: "customer_payment",
//       reference_id: bill.id,
//       description: `Partial payment - ${bill.invoice_number}`,
//       created_by: session.user.id,
//     });
//   }

//   // --------------------------------------------------
//   // CREDIT
//   // --------------------------------------------------

//   // No payment record is created for credit.
//   // The outstanding amount is:
//   //
//   // bill.total - SUM(customer_payments.amount)
//   //
//   // Since there is no payment yet:
//   //
//   // outstanding = bill.total

//   return {
//     bill,
//     items: billItems,
//     change:
//       payment_type === "cash"
//         ? roundMoney(Math.max(0, cleanAmountPaid - total))
//         : 0,
//   };
// }

"use server";

import { auth } from "@/auth";
import {
  getCustomerById,
  getProductContainsIds,
  getProductPrice,
  getProductPricing,
} from "@/app/_lib/dataService";
import { roundMoney } from "@/app/_lib/helper";
import { supabase } from "@/app/_lib/supabase";

export async function createBill(billData) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("You must be logged in");
  }

  const { customer_id, sale_type, items, discount, payment_type, amount_paid } =
    billData;

  if (!items?.length) {
    throw new Error("Bill must contain at least one item");
  }

  if (!["cash_sale", "customer"].includes(sale_type)) {
    throw new Error("Invalid sale type");
  }

  if (!["cash", "partial", "credit"].includes(payment_type)) {
    throw new Error("Invalid payment type");
  }

  const cleanAmountPaid = roundMoney(amount_paid);

  // --------------------------------------------------
  // CUSTOMER
  // --------------------------------------------------

  let customer = null;

  if (customer_id) {
    customer = await getCustomerById(customer_id);
  }

  if (!customer_id && sale_type !== "cash_sale") {
    throw new Error("Invalid sale type for walk-in sale");
  }

  if (customer_id && sale_type !== "customer") {
    throw new Error("Invalid sale type for customer sale");
  }

  // --------------------------------------------------
  // WALK-IN PAYMENT VALIDATION
  // --------------------------------------------------

  if (!customer_id && payment_type !== "cash") {
    throw new Error("Walk-in sales can only be paid in cash");
  }

  // --------------------------------------------------
  // FETCH PRODUCTS
  // --------------------------------------------------

  // const productIds = items.map((item) => item.product_id);
  const productIds = items.map((item) => item.product_id);

  const uniqueProductIds = [...new Set(productIds)];

  const products = await getProductContainsIds(uniqueProductIds);

  if (products.length !== uniqueProductIds.length) {
    throw new Error("One or more products were not found");
  }

  // --------------------------------------------------
  // CALCULATE BILL ITEMS
  // --------------------------------------------------

  const mergedItems = Object.values(
    items.reduce((acc, item) => {
      const key = `${item.product_id}-${item.category}`;

      const quantityBoxes = Number(item.quantity_boxes);

      if (!acc[key]) {
        acc[key] = {
          ...item,
          quantity_boxes: quantityBoxes,
        };
      } else {
        acc[key].quantity_boxes += quantityBoxes;
      }

      return acc;
    }, {}),
  );

  const billItems = [];

  for (const item of mergedItems) {
    const product = products.find((product) => product.id === item.product_id);

    if (!product) {
      throw new Error(`Product ${item.product_id} not found`);
    }

    const quantityBoxes = Number(item.quantity_boxes);

    if (!Number.isFinite(quantityBoxes) || quantityBoxes <= 0) {
      throw new Error(
        `Invalid quantity for ${product.name} (${item.category})`,
      );
    }

    // const data = await getProductPricing(product.id);

    const saleType = sale_type === "cash_sale" ? "retail" : customer.saleType;

    const taxCategory =
      sale_type === "cash_sale" ? "non_filer" : customer.taxCategory;

    const price = await getProductPrice(
      product.id,
      item.category,
      saleType,
      taxCategory,
    );

    if (price == null) {
      throw new Error(
        `No selling price available for ${product.name} (${item.category})`,
      );
    }

    const cleanPrice = roundMoney(price);

    const itemTotal = roundMoney(quantityBoxes * cleanPrice);

    billItems.push({
      product_id: product.id,
      product_name: product.name,
      category: item.category,
      quantity: item.quantity,
      unit: item.unit,
      quantity_boxes: quantityBoxes,
      price_per_box: cleanPrice,
      total: itemTotal,
    });
  }

  // --------------------------------------------------
  // CALCULATE TOTALS
  // --------------------------------------------------

  const subtotal = roundMoney(
    billItems.reduce((sum, item) => sum + item.total, 0),
  );

  const cleanDiscount = roundMoney(discount);

  if (cleanDiscount < 0 || cleanDiscount > subtotal) {
    throw new Error("Invalid discount");
  }

  const total = roundMoney(subtotal - cleanDiscount);

  // --------------------------------------------------
  // PAYMENT VALIDATION
  // --------------------------------------------------

  if (payment_type === "cash") {
    if (cleanAmountPaid < total) {
      throw new Error("Amount received is less than the bill total");
    }
  }

  if (payment_type === "partial") {
    if (!customer_id) {
      throw new Error("Walk-in sales cannot be partial");
    }

    if (cleanAmountPaid <= 0 || cleanAmountPaid >= total) {
      throw new Error("Partial payment must be less than the bill total");
    }
  }

  if (payment_type === "credit") {
    if (!customer_id) {
      throw new Error("Walk-in sales cannot be credit");
    }

    if (cleanAmountPaid !== 0) {
      throw new Error("Credit sale cannot have a payment");
    }
  }

  // --------------------------------------------------
  // ATOMIC DATABASE TRANSACTION
  // --------------------------------------------------

  const { data, error } = await supabase.rpc("create_sale_transaction", {
    p_bill: {
      customer_id: customer_id ?? null,
      subtotal,
      sale_type,
      discount: cleanDiscount,
      total,
    },

    p_items: billItems,

    p_payment: {
      payment_type,
      amount_paid: cleanAmountPaid,
    },

    p_created_by: session.user.id,
  });

  if (error) {
    throw new Error(error.message);
  }

  // --------------------------------------------------
  // RESULT
  // --------------------------------------------------

  return {
    bill: {
      id: data.bill_id,
      invoice_number: data.invoice_number,
      token: data.public_token,
      customer_id: customer_id ?? null,
      subtotal,
      discount: cleanDiscount,
      total,
      sale_type,
      created_at: data.created_at,
      customer,
      payment_type,
      amount_paid: cleanAmountPaid,
    },

    items: billItems,

    change:
      payment_type === "cash"
        ? roundMoney(Math.max(0, cleanAmountPaid - total))
        : 0,
  };
}

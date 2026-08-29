import {
  buildMonthlySales,
  buildYearlySales,
  getDatePeriodWise,
} from "./helper";
import { supabase } from "./supabase";

///////////// CUSTOMER TABLE //////////////////
export async function getCustomerByQuery(query) {
  let supabaseQuery = supabase.from("customers").select("*");

  if (!isNaN(query)) {
    supabaseQuery = supabaseQuery.or(
      `id.eq.${query},phone.eq.${query},fullName.ilike.%${query}%`,
    );
  } else {
    supabaseQuery = supabaseQuery.or(
      `phone.eq.${query},fullName.ilike.%${query}%`,
    );
  }

  const { data, error } = await supabaseQuery.maybeSingle();
  if (error) throw new Error("Customer not found");

  return data;
}

export async function getCustomerById(id) {
  const { data: customer, error: customerError } = await supabase
    .from("customers")
    .select("*")
    .eq("id", id)
    .single();

  if (customerError) throw new Error("Customer not found");
  return customer;
}

export async function getCustomerByToken(token) {
  const { data: customer, error: customerError } = await supabase
    .from("customers")
    .select("*")
    .eq("public_token", token)
    .single();

  if (customerError) throw new Error("Customer not found with that token");

  return customer;
}

export async function getAllCustomers() {
  const { data: customers, error } = await supabase
    .from("customers")
    .select("*");

  if (error) throw new Error(error.message);

  return customers;
}

// export async function getCustomersWithOutstanding() {
//   const { data: customers, error: customerError } = await supabase
//     .from("customers")
//     .select("*");

//   if (customerError) throw new Error(customerError.message);

//   const { data: bills, error: billError } = await supabase
//     .from("bills")
//     .select("customer_id, total");

//   if (billError) throw new Error(billError.message);

//   const { data: payments, error: paymentError } = await supabase
//     .from("customer_payments")
//     .select("customer_id, amount");

//   if (paymentError) throw new Error(paymentError.message);

//   return customers.map((customer) => {
//     const totalBills = bills
//       .filter((bill) => bill.customer_id === customer.id)
//       .reduce((sum, bill) => sum + Number(bill.total || 0), 0);

//     const totalPayments = payments
//       .filter((payment) => payment.customer_id === customer.id)
//       .reduce((sum, payment) => sum + Number(payment.amount || 0), 0);

//     return {
//       ...customer,
//       outstanding: totalBills - totalPayments,
//     };
//   });
// }

export async function getCustomersWithOutstanding() {
  const { data: customers, error: customerError } = await supabase
    .from("customers")
    .select("*");

  if (customerError) throw new Error(customerError.message);

  const { data: bills, error: billError } = await supabase
    .from("bills")
    .select("customer_id, total, amount_paid")
    .not("customer_id", "is", null);

  if (billError) throw new Error(billError.message);

  return customers.map((customer) => {
    const outstanding = bills
      .filter((bill) => bill.customer_id === customer.id)
      .reduce(
        (sum, bill) =>
          sum + (Number(bill.total ?? 0) - Number(bill.amount_paid ?? 0)),
        0,
      );

    return {
      ...customer,
      outstanding,
    };
  });
}

export async function createNewCustomer(newCustomer) {
  const { data, error } = await supabase
    .from("customers")
    .insert([newCustomer])
    .select();

  // error handling are done in server action

  return { data, error };
}

export async function updateCustomer(id, newCustomer) {
  const { data, error } = await supabase
    .from("customers")
    .update(newCustomer)
    .eq("id", id)
    .select();

  // error handling are done in server action

  return { data, error };
}

export async function deleteCustomer(id) {
  const { error } = await supabase.from("customers").delete().eq("id", id);

  if (error) throw new Error("Customer can't be delete");

  return error;
}

///////////// PRODUCT TABLE //////////////////

export async function getAllProducts() {
  const { data: products, error } = await supabase.from("products").select("*");

  if (error) throw new Error(error.message);

  return products;
}

export async function getProductTypes() {
  const { data, error } = await supabase.from("product_types").select("*");

  if (error) throw new Error(error.message);

  return data;
}

export async function getProductTypeByValue(value) {
  const {
    data: [productType],
    error,
  } = await supabase.from("product_types").select("*").eq("value", value);

  if (error) throw new Error(error.message);

  return productType;
}

export async function getProductContainsIds(ids) {
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("id, name, type")
    .in("id", ids);

  if (productsError)
    throw new Error("Failed to fetch product including these ids");

  return products;
}

export async function getAllProductsForBilling() {
  const { data, error } = await supabase.from("products").select(`
    id,
    name,
    type,
    product_pricing (
      category,
      sale_type,
      tax_category,
      price
    )
  `);

  if (error) throw new Error(error.message);

  return data;
}

export async function getProductById(id) {
  const {
    data: [product],
    error,
  } = await supabase.from("products").select("*").eq("id", id);

  if (error) throw new Error(error.message);

  return product;
}

export async function getProductsByQuery(query) {
  const { data, error } = await supabase
    .from("products")
    .select("id")
    .ilike("name", `%${query}%`);

  if (error) throw new Error("Matching product by query is not found");

  return data;
}

export async function getProductPricing(productId) {
  const { data, error } = await supabase
    .from("product_pricing")
    .select("*")
    .eq("product_id", productId)
    .order("category");

  if (error) throw new Error(error.message);

  return data;
}

export async function getProductPrice(
  productId,
  category,
  saleType,
  taxCategory,
) {
  const { data, error } = await supabase
    .from("product_pricing")
    .select("price")
    .eq("product_id", productId)
    .eq("category", category)
    .eq("sale_type", saleType)
    .eq("tax_category", taxCategory)
    .maybeSingle();

  if (error) throw new Error(error.message);

  return data.price;
}

export async function getProductPackaging(id) {
  const { data, error } = await supabase
    .from("product_packaging")
    .select("*")
    .eq("product_id", id);

  if (error) throw new Error("Product packaging not found");

  return data;
}

export async function getProductPackagingByIdAndCategory(id, category) {
  const {
    data: [packaging],
    error,
  } = await supabase
    .from("product_packaging")
    .select("*")
    .eq("product_id", id)
    .eq("category", category);

  if (error) throw new Error("Product packaging not found");

  return packaging;
}

export async function createNewProduct(newProduct) {
  const { data, error } = await supabase
    .from("products")
    .insert([newProduct])
    .select();
  if (error) throw new Error(error.message);

  return { data, error };
}

export async function deleteProduct(id) {
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) throw new Error(error.message);

  return error;
}

///////////// PRICING TABLE //////////////////

export async function createNewPricing(type, id) {
  const { data, error } = await supabase
    .from(`pricing_${type}`)
    .insert([{ product_id: id }])
    .select();

  if (error) throw new Error(error.message);

  return { data, error };
}

///////////// PACKAGING TABLE //////////////////

export async function createNewPackaging(newPackaging) {
  const { data, error } = await supabase
    .from("product_packaging")
    .insert(newPackaging)
    .select();

  if (error) throw new Error(error.message);

  return { data, error };
}

export async function getAllPackagings() {
  const { data: packaging, error } = await supabase
    .from("product_packaging")
    .select("*");

  if (error) throw new Error(error.message);

  return packaging;
}

export async function getPackagingByIdAndCategory(id, category) {
  const { data: packaging, error: packagingError } = await supabase
    .from("product_packaging")
    .select("units_per_box, boxes_per_carton")
    .eq("product_id", id)
    .eq("category", category)
    .single();

  return { packaging, packagingError };
}

///////////// INVENTORY TABLE //////////////////

export async function getAllInventory() {
  const { data: inventory, error } = await supabase.from("inventory")
    .select(`*,product:products (
     id,name 
    )`);

  if (error) throw new Error(error.message);

  return inventory;
}

export async function getFilteredInventory(search, ctg, stock, product_id) {
  let query = supabase.from("inventory").select(`*,product:products!inner (
    id,
    name
    )`);

  if (search) {
    query = query.ilike("product.name", `%${search}%`);
  }

  if (ctg) {
    query = query.eq("category", ctg);
  }

  if (stock === "in-stock") {
    query = query.gt("quantity_boxes", 0);
  }

  if (stock === "low-stock") {
    query = query.lt("quantity_boxes", 180);
  }

  if (stock === "out-of-stock") {
    query = query.eq("quantity_boxes", 0);
  }

  if (product_id) {
    query = query.eq("product_id", product_id);
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) throw new Error("failed to filter data");

  return data;
}

///////////// INVENTORY MOVEMENTS TABLE //////////////////

export async function getInventoryMovementsWithProduct(from, to) {
  let query = supabase
    .from("inventory_movement")
    .select(
      `
    id,
    product_id,
    category,
    movement_type,
    quantity_boxes,
    cost_per_box,
    reference_id,
    reference_type,
    created_at,
    created_by,
    user:users(
    fullName
    ),
    product:products (
      id,
      name,
      type
    )
    `,
    )
    .order("created_at", { ascending: false });

  if (from) {
    query = query.gte("created_at", from.toISOString());
  }
  if (to) {
    query = query.lt("created_at", to.toISOString());
  }

  const { data, error } = await query;

  if (error) throw new Error(`${error.message}`);

  return data;
}

export async function getInventoryMovementByIdAndCategory(id, category) {
  const { data, error } = await supabase
    .from("inventory_movement")
    .select(
      `
    *,
    user:users(
    fullName
    ),
    product:products (
      id,
      name,
      type
    )
    `,
    )
    .eq("product_id", id)
    .eq("category", category)
    .order("created_at", { ascending: false });

  if (error)
    throw new Error("Failed to fetch inventory movements with product");
  return data;
}

export async function createInventoryMovements(movements) {
  const { data, error } = await supabase
    .from("inventory_movement")
    .insert(movements)
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function getLatestStockInCost(productId, category) {
  const { data, error } = await supabase
    .from("inventory_movement")
    .select("cost_per_box")
    .eq("product_id", productId)
    .eq("category", category)
    .eq("movement_type", "stock_in")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }

    throw new Error(error.message);
  }

  return data.cost_per_box;
}

export async function getSupplierInvoiceItemById(id) {
  const { data: invoiceItem } = await supabase
    .from("supplier_invoice_item")
    .select(
      `
    id,
    invoice_id,
    supplier_invoice (
      invoice_number
    )
  `,
    )
    .eq("id", id)
    .single();
  return invoiceItem;
}

export async function getInventoryMovement() {
  const { data: inventoryMovement, error } = await supabase
    .from("inventory_movement")
    .select("*")
    .order("created_at", { ascending: false });

  return inventoryMovement;
}

export async function convertBoxesIntoCartonAndBoxes(
  productId,
  productCateogory,
  quantity_boxes,
) {
  const productPackaging = await getProductPackagingByIdAndCategory(
    productId,
    productCateogory,
  );
  const boxesPerCarton = Number(productPackaging.boxes_per_carton);
  const quantity = Math.abs(Number(quantity_boxes));
  const cartons = Math.floor(Number(quantity) / Number(boxesPerCarton));
  const boxes = Number(quantity) % Number(boxesPerCarton);

  return { boxes, cartons };
}

///////////// BILLS TABLE //////////////////

export async function createBills(bill) {
  const { data, error } = await supabase
    .from("bills")
    .insert(bill)
    .select()
    .single();

  if (error) throw new Error("Failed to create bill");

  return data;
}

export async function getBillById(id) {
  const { data, error } = await supabase
    .from("bills")
    .select(
      `
      *,
      customer:customers (
        id,
        fullName,
        phone,
        cnic
      )
    `,
    )
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`Failed to fetch bill: ${error.message}`);
  }

  return data;
}

export async function getCustomersbills() {
  const { data, error } = await supabase
    .from("bills")
    .select("*")
    .eq("sale_type", "customer");

  if (error) throw new Error("Failed to fetch customer bills for total sales");

  return data;
}

export async function getCustomerOutstandingBills(customerId) {
  const { data, error } = await supabase
    .from("bills")
    .select(
      `
      id,
      invoice_number,
      created_at,
      total,
      amount_paid,
      payment_type
    `,
    )
    .eq("customer_id", customerId)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(
      `Failed to fetch customer outstanding bills: ${error.message}`,
    );
  }

  return (data ?? [])
    .map((bill) => {
      const total = Number(bill.total ?? 0);
      const amountPaid = Number(bill.amount_paid ?? 0);

      const outstanding = Number((total - amountPaid).toFixed(2));

      return {
        ...bill,
        total,
        amount_paid: amountPaid,
        outstanding,
      };
    })
    .filter((bill) => bill.outstanding > 0);
}

// export async function getBillByInvoiceNumber(invoiceNumber) {
//   const { data, error } = await supabase
//     .from("bills")
//     .select(
//       `
//      *,
//       customer:customers (
//         id,
//         fullName,
//         phone,
//         cnic
//       )
//     `,
//     )
//     .eq("invoice_number", invoiceNumber)
//     .single();

//   if (error) {
//     throw new Error(`Failed to fetch bill: ${error.message}`);
//   }

//   return data;
// }
export async function getBillByToken(token) {
  // Invalid/missing token → invoice not found
  if (!token) {
    return null;
  }

  // UUID validation
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!uuidRegex.test(token)) {
    return null;
  }

  const { data, error } = await supabase
    .from("bills")
    .select(
      `
      *,
      customer:customers(*)
    `,
    )
    .eq("public_token", token)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch bill:", error);
    return null;
  }

  return data;
}

///////////// BILL_ITEMS TABLE //////////////////

export async function createBillItems(billItems) {
  const { data, error } = await supabase
    .from("bill_items")
    .insert(billItems)
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function getBillItemsByBillId(id) {
  const { data, error } = await supabase
    .from("bill_items")
    .select("*")
    .eq("bill_id", id)
    .order("id", { ascending: true });

  if (error) throw new Error(error.message);

  return data;
}

///////////// BILL_ITEMS TABLE //////////////////

export async function createCashTransaction(transaction) {
  const { data, error } = await supabase
    .from("cash_transactions")
    .insert([transaction])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create cash transaction: ${error.message}`);
  }

  return data;
}

export async function createCustomerPayment(payment) {
  const { data, error } = await supabase
    .from("customer_payments")
    .insert([payment])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create customer payment: ${error.message}`);
  }

  return data;
}

///////////// CUSTOMER LEDGER //////////////////

// export async function getCustomerLedger(customerId, period) {
//   const { from, to } = getDatePeriodWise(period);

//   let billsQuery = supabase
//     .from("bills")
//     .select(
//       `
//       id,
//       invoice_number,
//       total,
//       created_at
//     `,
//     )
//     .eq("customer_id", customerId)
//     .order("created_at", { ascending: true });

//   let paymentsQuery = supabase
//     .from("customer_payments")
//     .select(
//       `
//       id,
//       bill_id,
//       amount,
//       payment_method,
//       reference,
//       created_at
//     `,
//     )
//     .eq("customer_id", customerId)
//     .order("created_at", { ascending: true });

//   if (from) {
//     billsQuery = billsQuery.gte("created_at", from.toISOString());
//     paymentsQuery = paymentsQuery.gte("created_at", from.toISOString());
//   }

//   if (to) {
//     billsQuery = billsQuery.lte("created_at", to.toISOString());
//     paymentsQuery = paymentsQuery.lte("created_at", to.toISOString());
//   }

//   const [
//     { data: bills, error: billsError },
//     { data: payments, error: paymentsError },
//   ] = await Promise.all([billsQuery, paymentsQuery]);

//   if (billsError) {
//     throw new Error(`Failed to fetch customer bills: ${billsError.message}`);
//   }

//   if (paymentsError) {
//     throw new Error(
//       `Failed to fetch customer payments: ${paymentsError.message}`,
//     );
//   }

//   // --------------------------------------------------
//   // CREATE BILL TRANSACTIONS
//   // --------------------------------------------------

//   const transactions = bills.map((bill) => ({
//     id: `bill-${bill.id}`,
//     date: bill.created_at,
//     reference: bill.invoice_number,
//     description: "Sale",

//     debit: Number(bill.total ?? 0),
//     credit: 0,

//     type: "sale",
//     bill_id: bill.id,
//   }));

//   // --------------------------------------------------
//   // CREATE PAYMENT TRANSACTIONS
//   // --------------------------------------------------

//   for (const payment of payments) {
//     transactions.push({
//       id: `payment-${payment.id}`,
//       date: payment.created_at,

//       // Show the invoice if payment belongs to a bill
//       reference: payment.bill_id
//         ? bills.find((bill) => bill.id === payment.bill_id)?.invoice_number ||
//           payment.reference ||
//           "Payment"
//         : payment.reference || "Payment",

//       description: "Payment",

//       debit: 0,
//       credit: Number(payment.amount ?? 0),

//       type: "payment",
//       bill_id: payment.bill_id,
//     });
//   }

//   // --------------------------------------------------
//   // SORT
//   // --------------------------------------------------

//   transactions.sort(
//     (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
//   );

//   // --------------------------------------------------
//   // RUNNING BALANCE
//   // --------------------------------------------------

//   let balance = 0;

//   const ledger = transactions.map((transaction) => {
//     balance += transaction.debit - transaction.credit;

//     return {
//       ...transaction,
//       balance,
//     };
//   });

//   // --------------------------------------------------
//   // SUMMARY
//   // --------------------------------------------------

//   const totalSales = bills.reduce(
//     (sum, bill) => sum + Number(bill.total ?? 0),
//     0,
//   );

//   const totalPaid = payments.reduce(
//     (sum, payment) => sum + Number(payment.amount ?? 0),
//     0,
//   );

//   return {
//     ledger,

//     summary: {
//       totalSales,
//       totalPaid,
//       outstanding: totalSales - totalPaid,
//     },
//   };
// }

export async function getCustomerLedger(customerId, period = "all") {
  const { from, to } = getDatePeriodWise(period);

  // --------------------------------------------------
  // FETCH CUSTOMER BILLS
  // --------------------------------------------------

  const { data: bills, error: billsError } = await supabase
    .from("bills")
    .select(
      `
      id,
      invoice_number,
      total,
      created_at
    `,
    )
    .eq("customer_id", customerId)
    .order("created_at", { ascending: true });

  if (billsError) {
    throw new Error(`Failed to fetch customer bills: ${billsError.message}`);
  }

  // --------------------------------------------------
  // FETCH CUSTOMER PAYMENTS
  // --------------------------------------------------

  const { data: payments, error: paymentsError } = await supabase
    .from("customer_payments")
    .select(
      `
      id,
      bill_id,
      amount,
      payment_method,
      reference,
      created_at
    `,
    )
    .eq("customer_id", customerId)
    .order("created_at", { ascending: true });

  if (paymentsError) {
    throw new Error(
      `Failed to fetch customer payments: ${paymentsError.message}`,
    );
  }

  const allBills = bills ?? [];
  const allPayments = payments ?? [];

  // --------------------------------------------------
  // DATE RANGE
  // --------------------------------------------------

  const fromTime = from?.getTime() ?? null;
  const toTime = to?.getTime() ?? null;

  const isBeforePeriod = (date) => {
    if (fromTime === null) return false;

    return new Date(date).getTime() < fromTime;
  };

  const isInPeriod = (date) => {
    const time = new Date(date).getTime();

    if (fromTime !== null && time < fromTime) {
      return false;
    }

    if (toTime !== null && time > toTime) {
      return false;
    }

    return true;
  };

  // --------------------------------------------------
  // OPENING BALANCE
  // --------------------------------------------------

  const openingSales = allBills
    .filter((bill) => isBeforePeriod(bill.created_at))
    .reduce((sum, bill) => sum + Number(bill.total ?? 0), 0);

  const openingPayments = allPayments
    .filter((payment) => isBeforePeriod(payment.created_at))
    .reduce((sum, payment) => sum + Number(payment.amount ?? 0), 0);

  const openingBalance = Number((openingSales - openingPayments).toFixed(2));

  // --------------------------------------------------
  // PERIOD TRANSACTIONS
  // --------------------------------------------------

  const periodBills = allBills.filter((bill) => isInPeriod(bill.created_at));

  const periodPayments = allPayments.filter((payment) =>
    isInPeriod(payment.created_at),
  );

  // --------------------------------------------------
  // CREATE BILL TRANSACTIONS
  // --------------------------------------------------

  const transactions = periodBills.map((bill) => ({
    id: `bill-${bill.id}`,
    date: bill.created_at,

    reference: bill.invoice_number,
    description: "Sale",

    debit: Number(bill.total ?? 0),
    credit: 0,

    type: "sale",
    bill_id: bill.id,
  }));

  // --------------------------------------------------
  // CREATE PAYMENT TRANSACTIONS
  // --------------------------------------------------

  for (const payment of periodPayments) {
    const bill = payment.bill_id
      ? allBills.find((bill) => Number(bill.id) === Number(payment.bill_id))
      : null;

    transactions.push({
      id: `payment-${payment.id}`,
      date: payment.created_at,

      reference: bill?.invoice_number || payment.reference || "Payment",

      description: "Payment",

      debit: 0,
      credit: Number(payment.amount ?? 0),

      type: "payment",
      bill_id: payment.bill_id,
    });
  }

  // --------------------------------------------------
  // SORT
  // --------------------------------------------------

  transactions.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  // --------------------------------------------------
  // RUNNING BALANCE
  // --------------------------------------------------

  let balance = openingBalance;

  const ledger = transactions.map((transaction) => {
    balance = Number(
      (
        balance +
        Number(transaction.debit || 0) -
        Number(transaction.credit || 0)
      ).toFixed(2),
    );

    return {
      ...transaction,
      balance,
    };
  });

  // --------------------------------------------------
  // SUMMARY
  // --------------------------------------------------

  const totalSales = periodBills.reduce(
    (sum, bill) => sum + Number(bill.total ?? 0),
    0,
  );

  const totalPaid = periodPayments.reduce(
    (sum, payment) => sum + Number(payment.amount ?? 0),
    0,
  );

  const closingBalance = Number(
    (openingBalance + totalSales - totalPaid).toFixed(2),
  );

  return {
    ledger,

    summary: {
      openingBalance,
      totalSales: Number(totalSales.toFixed(2)),
      totalPaid: Number(totalPaid.toFixed(2)),
      closingBalance,
    },
  };
}

export async function getCustomerAccountSummary(customerId) {
  const [billsResult, paymentsResult] = await Promise.all([
    supabase.from("bills").select("total").eq("customer_id", customerId),

    supabase
      .from("customer_payments")
      .select("amount")
      .eq("customer_id", customerId),
  ]);

  if (billsResult.error) {
    throw new Error(
      `Failed to fetch customer bills: ${billsResult.error.message}`,
    );
  }

  if (paymentsResult.error) {
    throw new Error(
      `Failed to fetch customer payments: ${paymentsResult.error.message}`,
    );
  }

  const totalSales = (billsResult.data ?? []).reduce(
    (sum, bill) => sum + Number(bill.total ?? 0),
    0,
  );

  const totalPaid = (paymentsResult.data ?? []).reduce(
    (sum, payment) => sum + Number(payment.amount ?? 0),
    0,
  );

  const outstanding = Number((totalSales - totalPaid).toFixed(2));

  return {
    totalSales: Number(totalSales.toFixed(2)),
    totalPaid: Number(totalPaid.toFixed(2)),
    outstanding,
  };
}

export async function getCustomerOutstandingSummary(customers) {
  const { data: bills, error } = await supabase
    .from("bills")
    .select("customer_id, total, amount_paid")
    .not("customer_id", "is", null);

  if (error) {
    throw new Error(`Failed to fetch customer bills: ${error.message}`);
  }

  // ------------------------------------------
  // CALCULATE BALANCE PER CUSTOMER
  // ------------------------------------------

  const customerBalances = new Map();

  for (const bill of bills) {
    const customerId = bill.customer_id;

    const total = Number(bill.total ?? 0);
    const amountPaid = Number(bill.amount_paid ?? 0);
    const outstanding = total - amountPaid;

    const existing = customerBalances.get(customerId);

    if (existing) {
      existing.totalSales += total;
      existing.totalPaid += amountPaid;
      existing.outstanding += outstanding;
    } else {
      customerBalances.set(customerId, {
        totalSales: total,
        totalPaid: amountPaid,
        outstanding,
      });
    }
  }

  // ------------------------------------------
  // ADD CUSTOMERS WITH NO BILLS
  // ------------------------------------------

  for (const customer of customers) {
    if (!customerBalances.has(customer.id)) {
      customerBalances.set(customer.id, {
        totalSales: 0,
        totalPaid: 0,
        outstanding: 0,
      });
    }
  }

  // ------------------------------------------
  // BUSINESS SUMMARY
  // ------------------------------------------

  let totalOutstanding = 0;
  let customersOwing = 0;

  for (const balance of customerBalances.values()) {
    if (balance.outstanding > 0) {
      totalOutstanding += balance.outstanding;
      customersOwing++;
    }
  }

  // ------------------------------------------
  // OUTSTANDING BY AREA
  // ------------------------------------------

  const areaMap = new Map();

  for (const customer of customers) {
    const balance = customerBalances.get(customer.id);

    if (!balance || balance.outstanding <= 0) continue;

    const area = customer.area || "Unknown";

    if (!areaMap.has(area)) {
      areaMap.set(area, {
        area,
        outstanding: 0,
        customersOwing: 0,
      });
    }

    const areaData = areaMap.get(area);

    areaData.outstanding += balance.outstanding;
    areaData.customersOwing += 1;
  }

  const outstandingByArea = Array.from(areaMap.values())
    .sort((a, b) => b.outstanding - a.outstanding)
    .map((item) => ({
      ...item,
      percentage:
        totalOutstanding > 0 ? (item.outstanding / totalOutstanding) * 100 : 0,
    }));

  return {
    summary: {
      totalCustomers: customers.length,
      customersOwing,
      totalOutstanding,
    },

    outstandingByArea,

    customerBalances,
  };
}

// export async function getCustomerOutstandingBills(customerId) {
//   const { data, error } = await supabase
//     .from("bills")
//     .select(
//       `
//       id,
//       invoice_number,
//       created_at,
//       total,
//       amount_paid
//     `,
//     )
//     .eq("customer_id", customerId)
//     .gt("total", 0)
//     .order("created_at", { ascending: true })
//     .not("customer_id", "is", null);

//   if (error) throw new Error(error.message);

//   return data
//     .map((bill) => ({
//       ...bill,
//       outstanding: Number(bill.total ?? 0) - Number(bill.amount_paid ?? 0),
//     }))
//     .filter((bill) => bill.outstanding > 0);
// }

///////////// EXPENSE TABLE //////////////////

export async function getExpenses() {
  const { data, error } = await supabase.from("expenses").select("*");

  if (error) throw new Error("Failed to fetch expenses");

  return data;
}

export async function getExpensesById(id) {
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error("Failed to fetch expense by it's id");

  return data;
}

export async function createExpense(expense) {
  const { data, error } = await supabase.from("expenses").insert(expense);

  if (error) throw new Error("Failed to create expense");

  return data;
}

export async function updateExpense(id, expense) {
  const { data, error } = await supabase
    .from("expenses")
    .update(expense)
    .eq("id", id);

  if (error) throw new Error("Failed to update expense");

  return data;
}

export async function deleteExpense(id) {
  const { data, error } = await supabase.from("expenses").delete().eq("id", id);

  if (error) throw new Error("Failed to delete expense");

  return data;
}

// dashboard

export async function getDashboardSummary(period) {
  const { from, to } = getDatePeriodWise(period);

  // --------------------------------------------------
  // BILLS
  // --------------------------------------------------

  let billsQuery = supabase.from("bills").select("id, total, customer_id");

  if (from) {
    billsQuery = billsQuery.gte("created_at", from.toISOString());
  }

  if (to) {
    billsQuery = billsQuery.lte("created_at", to.toISOString());
  }

  // --------------------------------------------------
  // EXPENSES
  // Use expense_date, not created_at
  // --------------------------------------------------

  let expensesQuery = supabase.from("expenses").select("amount");

  if (from) {
    expensesQuery = expensesQuery.gte("expense_date", from.toISOString());
  }

  if (to) {
    expensesQuery = expensesQuery.lte("expense_date", to.toISOString());
  }

  // --------------------------------------------------
  // CUSTOMER PAYMENTS
  // Current outstanding is lifetime/current balance,
  // so don't apply the dashboard period here.
  // --------------------------------------------------

  const customerBillsQuery = supabase
    .from("bills")
    .select("customer_id, total, amount_paid")
    .not("customer_id", "is", null);

  const customerPaymentsQuery = supabase
    .from("customer_payments")
    .select("customer_id, amount");

  // --------------------------------------------------
  // RUN INITIAL QUERIES
  // --------------------------------------------------

  const [
    { data: bills, error: billsError },
    { data: expenses, error: expensesError },
    { data: customerBills, error: customerBillsError },
    { data: customerPayments, error: customerPaymentsError },
  ] = await Promise.all([
    billsQuery,
    expensesQuery,
    customerBillsQuery,
    customerPaymentsQuery,
  ]);

  if (billsError) {
    throw new Error(`Failed to fetch dashboard bills: ${billsError.message}`);
  }

  if (expensesError) {
    throw new Error(
      `Failed to fetch dashboard expenses: ${expensesError.message}`,
    );
  }

  if (customerBillsError) {
    throw new Error(
      `Failed to fetch customer bills: ${customerBillsError.message}`,
    );
  }

  if (customerPaymentsError) {
    throw new Error(
      `Failed to fetch customer payments: ${customerPaymentsError.message}`,
    );
  }

  // --------------------------------------------------
  // SALES
  // --------------------------------------------------

  const totalSales = bills.reduce(
    (sum, bill) => sum + Number(bill.total || 0),
    0,
  );

  const cashSales = bills
    .filter((bill) => bill.customer_id === null)
    .reduce((sum, bill) => sum + Number(bill.total || 0), 0);

  const customerSales = bills
    .filter((bill) => bill.customer_id !== null)
    .reduce((sum, bill) => sum + Number(bill.total || 0), 0);

  // --------------------------------------------------
  // BILL COUNTS
  // --------------------------------------------------

  const billCount = bills.length;

  const cashBillCount = bills.filter(
    (bill) => bill.customer_id === null,
  ).length;

  const customerBillCount = bills.filter(
    (bill) => bill.customer_id !== null,
  ).length;

  // --------------------------------------------------
  // EXPENSES
  // --------------------------------------------------

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount || 0),
    0,
  );

  // --------------------------------------------------
  // CURRENT CUSTOMER OUTSTANDING
  // --------------------------------------------------

  // const customerSalesTotal = customerBills.reduce(
  //   (sum, bill) => sum + Number(bill.total || 0),
  //   0,
  // );

  // const customerPaymentsTotal = customerPayments.reduce(
  //   (sum, payment) => sum + Number(payment.amount || 0),
  //   0,
  // );

  const outstanding = customerBills.reduce(
    (sum, bill) =>
      sum + Number(bill.total ?? 0) - Number(bill.amount_paid ?? 0),
    0,
  );

  const customerBalances = new Map();

  for (const bill of customerBills) {
    const outstanding = Number(bill.total ?? 0) - Number(bill.amount_paid ?? 0);

    const current = customerBalances.get(bill.customer_id) ?? 0;

    customerBalances.set(bill.customer_id, current + outstanding);
  }

  for (const payment of customerPayments) {
    const customerId = payment.customer_id;

    const current = customerBalances.get(customerId) ?? 0;

    customerBalances.set(customerId, current - Number(payment.amount || 0));
  }

  const outstandingCustomerCount = [...customerBalances.values()].filter(
    (balance) => balance > 0,
  ).length;

  // --------------------------------------------------
  // GET BILL IDS FOR COGS
  // --------------------------------------------------

  const billIds = bills.map((bill) => bill.id);

  let cogs = 0;

  if (billIds.length > 0) {
    const { data: movements, error: movementsError } = await supabase
      .from("inventory_movement")
      .select(
        "quantity_boxes, cost_per_box, reference_id, reference_type, movement_type",
      )
      .eq("reference_type", "bills")
      .eq("movement_type", "sale")
      .in("reference_id", billIds);

    if (movementsError) {
      throw new Error(
        `Failed to fetch inventory movements: ${movementsError.message}`,
      );
    }

    cogs = movements.reduce((sum, movement) => {
      const quantity = Math.abs(Number(movement.quantity_boxes || 0));

      const costPerBox = Number(movement.cost_per_box || 0);

      return sum + quantity * costPerBox;
    }, 0);
  }

  // --------------------------------------------------
  // PROFIT
  // --------------------------------------------------

  const grossProfit = totalSales - cogs;

  const netProfit = grossProfit - totalExpenses;

  const netProfitMargin = totalSales > 0 ? (netProfit / totalSales) * 100 : 0;

  // --------------------------------------------------
  // RETURN
  // --------------------------------------------------

  return {
    totalSales,
    cashSales,
    customerSales,

    outstanding,
    outstandingCustomerCount,

    totalExpenses,

    cogs,
    grossProfit,
    netProfit,
    netProfitMargin,

    billCount,
    cashBillCount,
    customerBillCount,
  };
}

export async function getCustomersOwing(limit = 5) {
  const { data: bills, error } = await supabase
    .from("bills")
    .select(
      `
      customer_id,
      total,
      amount_paid,
      customers (
        id,
        fullName
      )
    `,
    )
    .not("customer_id", "is", null);

  if (error) {
    throw new Error(`Failed to fetch customer bills: ${error.message}`);
  }

  // ---------------------------------------------
  // Calculate outstanding balance per customer
  // ---------------------------------------------

  const customerMap = new Map();

  for (const bill of bills) {
    if (!bill.customer_id) continue;

    const billOutstanding =
      Number(bill.total ?? 0) - Number(bill.amount_paid ?? 0);

    const existing = customerMap.get(bill.customer_id);

    if (existing) {
      existing.balance += billOutstanding;
    } else {
      customerMap.set(bill.customer_id, {
        id: bill.customer_id,
        name: bill.customers?.fullName ?? "Unknown Customer",
        balance: billOutstanding,
      });
    }
  }

  // ---------------------------------------------
  // Only customers who currently owe money
  // ---------------------------------------------

  return [...customerMap.values()]
    .filter((customer) => customer.balance > 0)
    .sort((a, b) => b.balance - a.balance)
    .slice(0, limit);
}

export async function getRecentBills(limit = 5) {
  const { data, error } = await supabase
    .from("bills")
    .select(
      `
      *,
      customers (
        fullName
      )
    `,
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to fetch recent bills: ${error.message}`);
  }

  return data ?? [];
}

export async function getRecentPayments(limit = 5) {
  const { data, error } = await supabase
    .from("customer_payments")
    .select(
      `
      id,
      amount,
      payment_method,
      payment_date,
      created_at,
      bill_id,
      reference,
      customers (
        fullName
      ),
      bills (
        invoice_number
      )
    `,
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to fetch recent payments: ${error.message}`);
  }

  return data ?? [];
}

export async function getDashboardSales(period = "month") {
  const now = new Date();

  let startDate;
  let endDate;

  if (period === "year") {
    startDate = new Date(now.getFullYear(), 0, 1);
    endDate = new Date(now.getFullYear() + 1, 0, 1);
  } else {
    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  }

  const { data, error } = await supabase
    .from("bills")
    .select("created_at, total")
    .gte("created_at", startDate.toISOString())
    .lt("created_at", endDate.toISOString())
    .order("created_at", { ascending: true });

  if (error) {
    console.error("getDashboardSales:", error);
    throw new Error("Failed to fetch dashboard sales");
  }

  if (period === "year") {
    return buildYearlySales(data, now);
  }

  return buildMonthlySales(data, now);
}

// reports
export async function getBillsReport({
  search = "",
  from = "",
  to = "",
  paymentType = "all",
} = {}) {
  let query = supabase
    .from("bills")
    .select(
      `
      id,
      created_at,
      invoice_number,
      subtotal,
      discount,
      total,
      sale_type,
      payment_type,
      amount_paid,
      public_token,
      customers(
        fullName
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (from) {
    query = query.gte("created_at", `${from}T00:00:00`);
  }

  if (to) {
    query = query.lte("created_at", `${to}T23:59:59`);
  }

  if (paymentType !== "all") {
    query = query.eq("payment_type", paymentType);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  if (!search) return data;

  const searchTerm = search?.replaceAll(" ", "").toLowerCase();

  return data.filter((bill) => {
    const invoice = bill.invoice_number?.toLowerCase() ?? "";
    const customer =
      bill.customers?.fullName?.replaceAll(" ", "")?.toLowerCase() ?? "";

    return invoice.includes(searchTerm) || customer.includes(searchTerm);
  });
}

export async function getPaymentsReport({
  search = "",
  from = "",
  to = "",
} = {}) {
  // --------------------------------------------------
  // CASH TRANSACTIONS
  // --------------------------------------------------

  let query = supabase
    .from("cash_transactions")
    .select(
      `
      id,
      created_at,
      transaction_type,
      direction,
      amount,
      reference_type,
      reference_id,
      description,
      created_by
    `,
    )
    .eq("direction", "in")
    .order("created_at", { ascending: false });

  if (from) {
    query = query.gte("created_at", `${from}T00:00:00`);
  }

  if (to) {
    query = query.lt("created_at", `${to}T23:59:59.999`);
  }

  const { data: transactions, error } = await query;

  if (error) {
    throw new Error(`Failed to fetch payment transactions: ${error.message}`);
  }

  if (!transactions?.length) {
    return [];
  }

  // --------------------------------------------------
  // GET ALL POSSIBLE REFERENCE IDS
  // --------------------------------------------------

  const referenceIds = [
    ...new Set(
      transactions
        .filter((transaction) => transaction.reference_id != null)
        .map((transaction) => Number(transaction.reference_id)),
    ),
  ];

  // --------------------------------------------------
  // FETCH CUSTOMER PAYMENTS
  //
  // Some existing transactions have:
  //
  // reference_id = customer_payments.id
  //
  // --------------------------------------------------

  let customerPayments = [];

  if (referenceIds.length > 0) {
    const { data, error } = await supabase
      .from("customer_payments")
      .select(
        `
        id,
        customer_id,
        bill_id,
        amount,
        payment_method,
        reference
      `,
      )
      .in("id", referenceIds);

    if (error) {
      throw new Error(`Failed to fetch customer payments: ${error.message}`);
    }

    customerPayments = data ?? [];
  }

  // --------------------------------------------------
  // FETCH BILLS
  //
  // Needed for:
  //
  // 1. Cash sales
  // 2. Customer payments whose reference_id is bill.id
  // 3. Resolving customer/invoice
  // --------------------------------------------------

  const possibleBillIds = [
    ...new Set([
      ...referenceIds,

      ...customerPayments
        .map((payment) => payment.bill_id)
        .filter(Boolean)
        .map(Number),
    ]),
  ];

  let bills = [];

  if (possibleBillIds.length > 0) {
    const { data, error } = await supabase
      .from("bills")
      .select(
        `
        id,
        invoice_number,
        customer_id,
        customers (
          id,
          fullName
        )
      `,
      )
      .in("id", possibleBillIds);

    if (error) {
      throw new Error(`Failed to fetch payment bills: ${error.message}`);
    }

    bills = data ?? [];
  }

  // --------------------------------------------------
  // MAPS
  // --------------------------------------------------

  const customerPaymentMap = new Map(
    customerPayments.map((payment) => [Number(payment.id), payment]),
  );

  const billMap = new Map(bills.map((bill) => [Number(bill.id), bill]));

  // --------------------------------------------------
  // BUILD REPORT
  // --------------------------------------------------

  let result = transactions.map((transaction) => {
    const referenceId =
      transaction.reference_id != null
        ? Number(transaction.reference_id)
        : null;

    let bill = null;
    let customerPayment = null;

    // ==================================================
    // CUSTOMER PAYMENT
    // ==================================================

    if (transaction.transaction_type === "customer_payment") {
      // -----------------------------------------------
      // First: assume reference_id = customer_payment.id
      // -----------------------------------------------

      customerPayment =
        referenceId != null ? customerPaymentMap.get(referenceId) : null;

      if (customerPayment) {
        // Correct relationship:
        //
        // customer_payment
        //      ↓
        // bill_id
        //      ↓
        // bill
        bill = customerPayment.bill_id
          ? billMap.get(Number(customerPayment.bill_id))
          : null;
      } else {
        // ---------------------------------------------
        // Legacy/current records where:
        //
        // reference_id = bill.id
        // ---------------------------------------------

        bill = referenceId != null ? billMap.get(referenceId) : null;

        if (bill) {
          // Find the corresponding customer payment
          // using bill_id.
          customerPayment =
            customerPayments.find(
              (payment) => Number(payment.bill_id) === Number(bill.id),
            ) ?? null;
        }
      }
    }

    // ==================================================
    // CASH SALE
    // ==================================================

    if (transaction.transaction_type === "sale") {
      bill = referenceId != null ? billMap.get(referenceId) : null;
    }

    // --------------------------------------------------
    // CUSTOMER
    // --------------------------------------------------

    const customer = bill?.customers ?? null;

    return {
      id: transaction.id,

      created_at: transaction.created_at,

      transaction_type: transaction.transaction_type,

      amount: Number(transaction.amount ?? 0),

      reference_type: transaction.reference_type,

      reference_id: transaction.reference_id,

      description: transaction.description,

      customer: customer
        ? {
            id: customer.id,
            fullName: customer.fullName,
          }
        : null,

      bill: bill
        ? {
            id: bill.id,
            invoice_number: bill.invoice_number,
          }
        : null,

      customer_payment: customerPayment
        ? {
            id: customerPayment.id,
            payment_method: customerPayment.payment_method,
            amount: Number(customerPayment.amount ?? 0),
          }
        : null,
    };
  });

  // --------------------------------------------------
  // SEARCH
  // --------------------------------------------------

  const term = search?.trim().replaceAll(" ", "").toLowerCase();

  if (term) {
    result = result.filter((payment) => {
      const customerName =
        payment.customer?.fullName?.replaceAll(" ", "").toLowerCase() ?? "";

      const invoiceNumber = payment.bill?.invoice_number?.toLowerCase() ?? "";

      const description = payment.description?.toLowerCase() ?? "";

      return (
        customerName.includes(term) ||
        invoiceNumber.includes(term) ||
        description.includes(term)
      );
    });
  }

  return result;
}

export async function getPaymentsReportSummary({
  search = "",
  from = "",
  to = "",
} = {}) {
  const payments = await getPaymentsReport({
    search,
    from,
    to,
  });

  const totalReceived = payments.reduce(
    (sum, payment) => sum + Number(payment.amount || 0),
    0,
  );

  // ---------------------------------------------
  // CASH
  //
  // Cash sales are always cash.
  // Customer payments depend on payment_method.
  // ---------------------------------------------

  const cash = payments.reduce((sum, payment) => {
    // Cash sale
    if (payment.transaction_type === "sale") {
      return sum + Number(payment.amount || 0);
    }

    // Customer payment made in cash
    if (
      payment.transaction_type === "customer_payment" &&
      payment.customer_payment?.payment_method === "cash"
    ) {
      return sum + Number(payment.amount || 0);
    }

    return sum;
  }, 0);

  // ---------------------------------------------
  // BANK / ONLINE
  // ---------------------------------------------

  const bank = payments.reduce((sum, payment) => {
    if (
      payment.transaction_type === "customer_payment" &&
      payment.customer_payment?.payment_method !== "cash"
    ) {
      return sum + Number(payment.amount || 0);
    }

    return sum;
  }, 0);

  return {
    totalReceived,
    cash,
    bank,
    count: payments.length,
  };
}

export async function getProductsForCustomerOrder(customerId) {
  const { data: customer, error: customerError } = await supabase
    .from("customers")
    .select(
      `
      id,
      "fullName",
      area,
      "saleType",
      "taxCategory"
    `,
    )
    .eq("id", customerId)
    .single();

  if (customerError || !customer) {
    throw new Error("Customer not found");
  }

  const { data: pricing, error: pricingError } = await supabase
    .from("product_pricing")
    .select(
      `
      product_id,
      category,
      price
    `,
    )
    .eq("sale_type", customer.saleType)
    .eq("tax_category", customer.taxCategory);

  if (pricingError) {
    throw new Error(
      `Failed to fetch customer pricing: ${pricingError.message}`,
    );
  }

  if (!pricing?.length) {
    return {
      customer: {
        id: customer.id,
        fullName: customer.fullName,
        area: customer.area,
      },
      products: [],
    };
  }

  const productIds = [...new Set(pricing.map((item) => item.product_id))];

  const { data: products, error: productsError } = await supabase
    .from("products")
    .select(
      `
      id,
      name,
      type
    `,
    )
    .in("id", productIds);

  if (productsError) {
    throw new Error(`Failed to fetch products: ${productsError.message}`);
  }

  const { data: packaging, error: packagingError } = await supabase
    .from("product_packaging")
    .select(
      `
      product_id,
      category,
      units_per_box,
      boxes_per_carton
    `,
    )
    .in("product_id", productIds);

  if (packagingError) {
    throw new Error(
      `Failed to fetch product packaging: ${packagingError.message}`,
    );
  }

  const productMap = new Map(
    (products ?? []).map((product) => [Number(product.id), product]),
  );

  const packagingMap = new Map(
    (packaging ?? []).map((item) => [
      `${item.product_id}-${item.category}`,
      item,
    ]),
  );

  const resolvedProducts = pricing
    .map((pricingRow) => {
      const product = productMap.get(Number(pricingRow.product_id));

      if (!product) return null;

      const packagingData = packagingMap.get(
        `${pricingRow.product_id}-${pricingRow.category}`,
      );

      return {
        id: product.id,
        name: product.name,
        type: product.type,

        category: pricingRow.category,

        price: Number(pricingRow.price ?? 0),

        packaging: packagingData
          ? {
              unitsPerBox: Number(packagingData.units_per_box ?? 0),
              boxesPerCarton: Number(packagingData.boxes_per_carton ?? 0),
            }
          : null,
      };
    })
    .filter(Boolean);

  return {
    customer: {
      id: customer.id,
      fullName: customer.fullName,
      area: customer.area,
    },

    products: resolvedProducts,
  };
}

// PRE_ORDERS SERVICES

export async function createPreOrder({ customerId, items, notes }) {
  try {
    const { data: orderId, error } = await supabase.rpc("create_pre_order", {
      p_customer_id: customerId,
      p_items: items,
      p_notes: notes,
    });

    // console.log("create_pre_order RPC data:", orderId);
    // console.log("create_pre_order RPC error:", error);

    if (error) {
      console.error("submitOrder:", error);

      return {
        success: false,
        error: error.message,
      };
    }

    if (!orderId) {
      return {
        success: false,
        error: "Order was created but no order ID was returned.",
      };
    }

    // Get the generated order number
    const { data: order, error: orderError } = await supabase
      .from("pre_orders")
      .select("id, order_number")
      .eq("id", orderId)
      .single();

    // console.log("Order:", order);
    // console.log("Order lookup error:", orderError);

    if (orderError) {
      console.error("submitOrder order lookup:", orderError);

      return {
        success: false,
        error: "Order was created but could not retrieve order number.",
      };
    }

    return {
      success: true,
      orderId: order.id,
      orderNumber: order.order_number,
    };
  } catch (error) {
    console.error("submitOrder:", error);

    return {
      success: false,
      error: "Failed to submit order.",
    };
  }
}

export async function getPreOrders() {
  try {
    const { data, error } = await supabase
      .from("pre_orders")
      .select(
        ` id, order_number, customer_id, status, total_amount, total_boxes, notes, created_at, updated_at, customers ( id, fullName, area ), pre_order_items ( id ) `,
      )
      .order("created_at", { ascending: false });
    if (error) {
      console.error("getPreOrders:", error);
      return [];
    }
    return data ?? [];
  } catch (error) {
    console.error("getPreOrders:", error);
    return [];
  }
}

export async function getOrderById(orderId) {
  try {
    const { data, error } = await supabase
      .from("pre_orders")
      .select(
        `
        id,
        order_number,
        customer_id,
        status,
        total_amount,
        total_boxes,
        notes,
        created_at,
        updated_at,

        customers (
          id,
          fullName,
          area,
          phone
        ),

        pre_order_items (
          id,
          product_id,
          category,
          boxes,
          cartons,
          total_boxes,
          line_total,
          boxes_per_carton,
          price_per_box,
          carton_price,

          products (
            id,
            name
          )
        )
      `,
      )
      .eq("id", orderId)
      .single();

    // console.log("getOrderById data:", data);
    // console.log("getOrderById error:", error);

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    if (!data) {
      return {
        success: false,
        error: "Order not found.",
      };
    }

    return {
      success: true,
      order: data,
    };
  } catch (error) {
    console.error("getOrderById:", error);

    return {
      success: false,
      error: "Failed to retrieve order.",
    };
  }
}

export async function getInventoryForOrderItems(items) {
  const productIds = [...new Set(items.map((item) => item.product_id))];

  const { data, error } = await supabase
    .from("inventory")
    .select(
      `
      id,
      product_id,
      category,
      quantity_boxes
    `,
    )
    .in("product_id", productIds);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

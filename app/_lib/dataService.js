import { getDatePeriodWise } from "./helper";
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

export async function getAllCustomers() {
  const { data: customers, error } = await supabase
    .from("customers")
    .select("*");

  if (error) throw new Error(error.message);

  return customers;
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
  console.log(data, from, to);

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
// export async function getInventoryByProductIdAndCategory(id, ctg) {
//   let query = supabase.from("inventory").select("*");

//   if (id) {
//     query = query.eq("product_id", Number(id));
//   }

//   if (ctg) {
//     query = query.eq("category", ctg);
//   }

//   const { data, error } = await query;

//   if (error) throw new Error("Inventory is not found");

//   return data;
// }

/////////////////////////////helper

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

export async function getBillByInvoiceNumber(invoiceNumber) {
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
    .eq("invoice_number", invoiceNumber)
    .single();

  if (error) {
    throw new Error(`Failed to fetch bill: ${error.message}`);
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

export async function getCustomerLedger(customerId, period = "month") {
  const { from, to } = getDatePeriodWise(period);

  let billsQuery = supabase
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

  let paymentsQuery = supabase
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

  if (from) {
    billsQuery = billsQuery.gte("created_at", from.toISOString());
    paymentsQuery = paymentsQuery.gte("created_at", from.toISOString());
  }

  if (to) {
    billsQuery = billsQuery.lte("created_at", to.toISOString());
    paymentsQuery = paymentsQuery.lte("created_at", to.toISOString());
  }

  const [
    { data: bills, error: billsError },
    { data: payments, error: paymentsError },
  ] = await Promise.all([billsQuery, paymentsQuery]);

  if (billsError) {
    throw new Error(`Failed to fetch customer bills: ${billsError.message}`);
  }

  if (paymentsError) {
    throw new Error(
      `Failed to fetch customer payments: ${paymentsError.message}`,
    );
  }

  // --------------------------------------------------
  // GROUP PAYMENTS BY BILL
  // --------------------------------------------------

  const paymentsByBill = new Map();

  for (const payment of payments) {
    const currentAmount = paymentsByBill.get(payment.bill_id) ?? 0;

    paymentsByBill.set(payment.bill_id, currentAmount + Number(payment.amount));
  }

  // --------------------------------------------------
  // CREATE BILL TRANSACTIONS
  // --------------------------------------------------

  const transactions = bills.map((bill) => {
    const paymentAmount = paymentsByBill.get(bill.id) ?? 0;
    const billTotal = Number(bill.total);

    const fullyPaid = paymentAmount >= billTotal;

    return {
      id: `bill-${bill.id}`,
      date: bill.created_at,
      reference: bill.invoice_number,

      description: fullyPaid
        ? "Cash Sale"
        : paymentAmount > 0
          ? "Partial Payment"
          : "Sale",

      debit: billTotal,
      credit: paymentAmount,

      type: "sale",
      bill_id: bill.id,
    };
  });

  // --------------------------------------------------
  // PAYMENTS NOT ATTACHED TO A BILL IN THIS PERIOD
  // --------------------------------------------------

  for (const payment of payments) {
    const billExists = bills.some((bill) => bill.id === payment.bill_id);

    if (!billExists) {
      transactions.push({
        id: `payment-${payment.id}`,
        date: payment.created_at,
        reference: payment.reference || "—",
        description: "Payment",
        debit: 0,
        credit: Number(payment.amount),
        type: "payment",
        bill_id: payment.bill_id,
      });
    }
  }

  // --------------------------------------------------
  // SORT
  // --------------------------------------------------

  transactions.sort((a, b) => new Date(a.date) - new Date(b.date));

  // --------------------------------------------------
  // RUNNING BALANCE
  // --------------------------------------------------

  let balance = 0;

  const ledger = transactions.map((transaction) => {
    balance += transaction.debit - transaction.credit;

    return {
      ...transaction,
      balance,
    };
  });

  // --------------------------------------------------
  // SUMMARY
  // --------------------------------------------------

  const totalSales = bills.reduce((sum, bill) => sum + Number(bill.total), 0);

  const totalPaid = payments.reduce(
    (sum, payment) => sum + Number(payment.amount),
    0,
  );

  return {
    ledger,
    summary: {
      totalSales,
      totalPaid,
      outstanding: totalSales - totalPaid,
    },
  };
}

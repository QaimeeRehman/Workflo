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
      pricing_biscuit (
        tp_retail_filer,
        tp_retail_non-filer,
        tp_wholesale_filer,
        tp_wholesale_non-filer,
        sp_retail_filer,
        sp_retail_non-filer,
        sp_wholesale_filer,
        sp_wholesale_non-filer,
        mp_retail_filer,
        mp_retail_non-filer,
        mp_wholesale_filer,
        mp_wholesale_non-filer,
        hr_retail_filer,
        hr_retail_non-filer,
        hr_wholesale_filer,
        hr_wholesale_non-filer
      ),
      pricing_cake (
        retail_filer,
        retail_non-filer,
        wholesale_filer,
        wholesale_non-filer
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

export async function getProductPricing(type, id) {
  const {
    data: [pricing],
    error,
  } = await supabase.from(`pricing_${type}`).select("*").eq("product_id", id);

  if (error) throw new Error(error.message);

  return pricing;
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

  if (error) throw new Error("product has not been deleted");

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
  let query = supabase.from("inventory").select(`*,product:products (
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

  const { data, error } = await query;

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
  const boxesPerCarton = productPackaging.boxes_per_carton;
  const cartons = Math.floor(Number(quantity_boxes) / Number(boxesPerCarton));
  const boxes = Number(quantity_boxes) % Number(boxesPerCarton);

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

///////////// BILL_ITEMS TABLE //////////////////

export async function createBillItems(billItems) {
  const { data, error } = await supabase
    .from("bill_items")
    .insert(billItems)
    .select();

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

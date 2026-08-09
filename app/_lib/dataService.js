import { supabase } from "./supabase";
// ALL BILLING API

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

// ALL CUSTOMERS API

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

// ALL PRODUCTS API

export async function getAllProducts() {
  const { data: products, error } = await supabase.from("products").select("*");

  if (error) throw new Error(error.message);

  return products;
}

export async function getProductById(id) {
  const {
    data: [product],
    error,
  } = await supabase.from("products").select("*").eq("id", id);

  if (error) throw new Error(error.message);

  return product;
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

export async function createNewProduct(newProduct) {
  const { data, error } = await supabase
    .from("products")
    .insert([newProduct])
    .select();
  if (error) throw new Error(error.message);

  return { data, error };
}

export async function createNewPricing(type, id) {
  const { data, error } = await supabase
    .from(`pricing_${type}`)
    .insert([{ product_id: id }])
    .select();

  if (error) throw new Error(error.message);

  return { data, error };
}

export async function createNewPackaging(newPackaging) {
  const { data, error } = await supabase
    .from("product_packaging")
    .insert(newPackaging)
    .select();

  if (error) throw new Error(error.message);

  return { data, error };
}

export async function deleteProduct(id) {
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) throw new Error("product has not been deleted");

  return error;
}

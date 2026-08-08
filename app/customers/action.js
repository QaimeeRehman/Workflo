"use server";

import { supabase } from "../_lib/supabase";
import { revalidatePath } from "next/cache";

export async function createCustomerAction(formData) {
  if (
    formData.get("fullName") === "" ||
    formData.get("phone") === "" ||
    formData.get("cnic") === ""
  )
    return null;

  const newCustomer = {
    fullName: formData.get("fullName"),
    phone: formData.get("phone"),
    saleType: formData.get("saleType"),
    taxCategory: formData.get("taxCategory"),
    cnic: formData.get("cnic"),
    area: formData.get("area"),
  };

  const { data, error } = await supabase
    .from("customers")
    .insert([newCustomer])
    .select();

  revalidatePath("/customers");

  return { data, error };
}

export async function updateCustomerAction(formData) {
  if (
    formData.get("fullName") === "" ||
    formData.get("phone") === "" ||
    formData.get("cnic") === ""
  )
    return null;

  const newCustomer = {
    fullName: formData.get("fullName"),
    phone: formData.get("phone"),
    saleType: formData.get("saleType"),
    taxCategory: formData.get("taxCategory"),
    cnic: formData.get("cnic"),
    area: formData.get("area"),
  };

  const { data, error } = await supabase
    .from("customers")
    .update(newCustomer)
    .eq("id", formData.get("id"))
    .select();

  revalidatePath("/customers");

  return { data, error };
}

export async function deleteCustomer(id) {
  const { error } = await supabase.from("customers").delete().eq("id", id);

  if (!error) revalidatePath("/customers");
  return error;
}

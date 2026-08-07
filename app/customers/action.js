"use server";

import { supabase } from "../_lib/supabase";

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
    area: formData.get("fullName"),
  };

  const { data, error } = await supabase
    .from("customers")
    .insert([newCustomer])
    .select();

  // returning for toast messages
  if (data) return data;
  if (error) return error;
}

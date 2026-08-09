"use server";

import {
  createNewCustomer,
  deleteCustomer,
  updateCustomer,
} from "../_lib/dataService";
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

  const { data, error } = await createNewCustomer(newCustomer);

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

  const { data, error } = await updateCustomer(formData.get("id"), newCustomer);

  revalidatePath("/customers");

  return { data, error };
}

export async function deleteCustomerAction(id) {
  const error = await deleteCustomer(id);

  if (!error) revalidatePath("/customers");

  return error;
}

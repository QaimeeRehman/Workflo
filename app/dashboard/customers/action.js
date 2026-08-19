"use server";

import {
  createNewCustomer,
  deleteCustomer,
  getCustomerById,
  getCustomerOutstandingSummary,
  updateCustomer,
} from "@/app/_lib/dataService";
import { supabase } from "@/app/_lib/supabase";
import { auth } from "@/auth";
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

  if (!error) revalidatePath("/dashboard/customers");

  return error;
}

export async function receiveCustomerPaymentAction(formData) {
  const session = await auth();
  const customerId = formData.get("customerId");
  const amount = Number(formData.get("amount"));
  const paymentMethod = formData.get("payment_method");
  const paymentDate = formData.get("payment_date");
  const notes = formData.get("notes");

  if (!customerId || !amount || !paymentMethod || !paymentDate)
    throw new Error("All fields are required only notes are optional");

  const { data, error } = await supabase.rpc("receive_customer_payment", {
    p_customer_id: customerId,
    p_amount: amount,
    p_payment_method: paymentMethod,
    p_payment_date: paymentDate,
    p_reference: null,
    p_notes: notes,
    p_created_by: Number(session.user.id),
  });

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/customers");
  revalidatePath(`/dashboard/customers${customerId}`);
  revalidatePath("/dashboard/customers/payments/new");

  return data;

  // const customer = await getCustomerById(customerId);

  // if (!customer) throw new Error("Customer not found");

  // const { customerBalances } = await getCustomerOutstandingSummary([customer]);

  // const balances = customerBalances.get(customer.id);

  // if (amount > Number(balances.outstanding))
  //   throw new Error("Amount must be less than current customer outstanding");
}

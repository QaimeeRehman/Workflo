"use server";

import {
  createNewCustomer,
  deleteCustomer,
  updateCustomer,
} from "@/app/_lib/dataService";
import { supabase } from "@/app/_lib/supabase";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { getCustomerOutstandingBills } from "@/app/_lib/dataService";

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

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const customerId = formData.get("customerId");
  const billId = formData.get("billId");
  const amount = Number(formData.get("amount"));
  const paymentMethod = formData.get("payment_method");
  const paymentDate = formData.get("payment_date");
  const reference = formData.get("reference");
  const notes = formData.get("notes");

  if (!customerId || !billId || !amount || !paymentMethod || !paymentDate) {
    throw new Error(
      "Customer, bill, amount, payment method and payment date are required",
    );
  }

  if (amount <= 0) {
    throw new Error("Payment amount must be greater than zero");
  }

  const { data, error } = await supabase.rpc("receive_customer_payment", {
    p_customer_id: Number(customerId),
    p_bill_id: Number(billId),
    p_amount: amount,
    p_payment_method: paymentMethod,
    p_payment_date: paymentDate,
    p_reference: reference || null,
    p_notes: notes || null,
    p_created_by: Number(session.user.id),
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/customers");
  revalidatePath(`/dashboard/customers/${customerId}`);
  revalidatePath("/dashboard/customers/payments/new");

  return data;
}

export async function getCustomerOutstandingBillsAction(customerId) {
  if (!customerId) {
    throw new Error("Customer ID is required");
  }

  return await getCustomerOutstandingBills(Number(customerId));
}

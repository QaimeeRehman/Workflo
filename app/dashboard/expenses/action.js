"use server";

import { auth } from "@/auth";
import { supabase } from "@/app/_lib/supabase";

export async function createExpenseAction(formData) {
  const amount = Number(formData.get("amount"));
  const expense_date = formData.get("expense_date");
  const category = formData.get("category");
  const payment_method = formData.get("payment_method");
  const description = formData.get("description");
  const reference = formData.get("reference");

  const session = await auth();

  const { data, error } = await supabase.rpc("create_expense", {
    p_amount: amount,
    p_expense_date: expense_date,
    p_category: category,
    p_payment_method: payment_method,
    p_description: description || null,
    p_reference: reference || null,
    p_created_by: session.user.id,
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  return {
    success: true,
    expenseId: data,
  };
}

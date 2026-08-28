"use server";

import { createPreOrder } from "@/app/_lib/dataService";
import { supabase } from "../_lib/supabase";

export async function submitOrder({ customerId, items, notes = null }) {
  try {
    const result = await createPreOrder({
      customerId,
      items,
      notes,
    });

    console.log("submitOrder result:", result);

    if (!result.success) {
      return result;
    }

    return {
      success: true,
      orderId: result.orderId,
      orderNumber: result.orderNumber,
    };
  } catch (error) {
    console.error("submitOrder:", error);
    return {
      success: false,
      error: error.message || "Failed to submit order.",
    };
  }
}

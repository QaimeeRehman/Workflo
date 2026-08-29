"use server";
import { supabase } from "@/app/_lib/supabase";
import { revalidatePath } from "next/cache";
export async function confirmOrder(orderId) {
  try {
    // Make sure the order exists and is still pending
    const { data: order, error: fetchError } = await supabase
      .from("pre_orders")
      .select("id, status")
      .eq("id", orderId)
      .single();
    if (fetchError) {
      console.error("confirmOrder fetch:", fetchError);
      return { success: false, error: "Order could not be found." };
    }
    if (order.status !== "pending") {
      return {
        success: false,
        error: `Order cannot be confirmed because it is already ${order.status}.`,
      };
    }

    // Confirm the order
    const { data: updatedOrder, error: updateError } = await supabase
      .from("pre_orders")
      .update({ status: "confirmed", updated_at: new Date().toISOString() })
      .eq("id", orderId)
      .eq("status", "pending")
      .select("id, order_number, status, updated_at")
      .single();
    if (updateError) {
      console.error("confirmOrder update:", updateError);
      return { success: false, error: "Failed to confirm order." };
    }

    revalidatePath(`/dashboard/orders/${orderId}`);
    revalidatePath("/dashboard/orders");

    return { success: true, order: updatedOrder };
  } catch (error) {
    console.error("confirmOrder:", error);
    return {
      success: false,
      error: error.message || "Failed to confirm order.",
    };
  }
}

export async function startProcessing(orderId) {
  try {
    // Make sure the order exists and is still confirmed
    const { data: order, error: fetchError } = await supabase
      .from("pre_orders")
      .select("id, status")
      .eq("id", orderId)
      .single();

    if (fetchError) {
      console.error("startProcessing fetch:", fetchError);

      return {
        success: false,
        error: "Order could not be found.",
      };
    }

    if (order.status !== "confirmed") {
      return {
        success: false,
        error: `Order cannot be processed because it is already ${order.status}.`,
      };
    }

    // Start processing
    const { data: updatedOrder, error: updateError } = await supabase
      .from("pre_orders")
      .update({
        status: "processing",
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId)
      .eq("status", "confirmed")
      .select("id, order_number, status, updated_at")
      .single();

    if (updateError) {
      console.error("startProcessing update:", updateError);

      return {
        success: false,
        error: "Failed to start processing order.",
      };
    }

    revalidatePath(`/dashboard/orders/${orderId}`);
    revalidatePath("/dashboard/orders");

    return {
      success: true,
      order: updatedOrder,
    };
  } catch (error) {
    console.error("startProcessing:", error);

    return {
      success: false,
      error: error.message || "Failed to start processing order.",
    };
  }
}

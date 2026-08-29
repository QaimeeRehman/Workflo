"use server";
import { supabase } from "@/app/_lib/supabase";
import { revalidatePath } from "next/cache";
import { createBill } from "../billing/action";
import { getCustomerById } from "@/app/_lib/dataService";
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

export async function markOrderReady(orderId) {
  try {
    const { data: order, error: fetchError } = await supabase
      .from("pre_orders")
      .select("id, status")
      .eq("id", orderId)
      .single();

    if (fetchError) {
      console.error("markOrderReady fetch:", fetchError);

      return {
        success: false,
        error: "Order could not be found.",
      };
    }

    if (order.status !== "processing") {
      return {
        success: false,
        error: `Order cannot be marked ready because it is already ${order.status}.`,
      };
    }

    const { data: updatedOrder, error: updateError } = await supabase
      .from("pre_orders")
      .update({
        status: "ready",
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId)
      .eq("status", "processing")
      .select("id, order_number, status, updated_at")
      .single();

    if (updateError) {
      console.error("markOrderReady update:", updateError);

      return {
        success: false,
        error: "Failed to mark order as ready.",
      };
    }

    revalidatePath(`/dashboard/orders/${orderId}`);
    revalidatePath("/dashboard/orders");

    return {
      success: true,
      order: updatedOrder,
    };
  } catch (error) {
    console.error("markOrderReady:", error);

    return {
      success: false,
      error: error.message || "Failed to mark order as ready.",
    };
  }
}

export async function createPreOrderBill(preOrder) {
  try {
    if (!preOrder) {
      return {
        success: false,
        error: "Pre-order not found.",
      };
    }

    if (preOrder.status !== "ready") {
      return {
        success: false,
        error: `Bill cannot be created because the order is ${preOrder.status}.`,
      };
    }

    if (!preOrder.customer_id) {
      return {
        success: false,
        error: "Pre-order must have a customer.",
      };
    }

    if (!preOrder.pre_order_items?.length) {
      return {
        success: false,
        error: "Pre-order must contain at least one item.",
      };
    }

    const customer = await getCustomerById(preOrder.customer_id);

    if (!customer) {
      return {
        success: false,
        error: "Customer not found.",
      };
    }

    const billData = {
      customer_id: preOrder.customer_id,
      sale_type: "customer",

      items: preOrder.pre_order_items.map((item) => ({
        product_id: item.product_id,
        category: item.category,
        quantity: item.boxes,
        unit: "box",
        quantity_boxes: item.total_boxes,
      })),

      discount: 0,
      payment_type: "credit",
      amount_paid: 0,
    };

    const bill = await createBill(billData);

    const { data: updatedOrder, error: updateError } = await supabase
      .from("pre_orders")
      .update({
        status: "completed",
        updated_at: new Date().toISOString(),
      })
      .eq("id", preOrder.id)
      .eq("status", "ready")
      .select("id, order_number, status, updated_at")
      .single();

    if (updateError) {
      console.error("createPreOrderBill status update:", updateError);

      return {
        success: false,
        error: "Bill was created, but failed to complete the order.",
        bill,
      };
    }

    revalidatePath(`/dashboard/orders/${preOrder.id}`);
    revalidatePath("/dashboard/orders");

    return {
      success: true,
      bill,
      order: updatedOrder,
    };
  } catch (error) {
    console.error("createPreOrderBill:", error);

    return {
      success: false,
      error: error.message || "Failed to create bill.",
    };
  }
}

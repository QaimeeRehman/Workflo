import OrderDetailsPage from "@/app/_components/Order/OrderDetailsPage";
import {
  getInventoryForOrderItems,
  getOrderById,
} from "@/app/_lib/dataService";

async function page({ params }) {
  const { orderId } = await params;
  const result = await getOrderById(orderId);

  // if (!result.success || !result.order) notFound();

  const { order } = result;

  const inventory = await getInventoryForOrderItems(order.pre_order_items);
  return <OrderDetailsPage order={order} inventory={inventory} />;
}

export default page;

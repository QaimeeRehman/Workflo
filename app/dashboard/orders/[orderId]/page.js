import OrderDetailsPage from "@/app/_components/Order/OrderDetailsPage";
import { getOrderById } from "@/app/_lib/dataService";
import { notFound } from "next/navigation";

async function page({ params }) {
  const { orderId } = await params;
  const result = await getOrderById(orderId);
  // if (!result.success || !result.order) notFound();

  const { order } = result;
  console.log(order);
  return <OrderDetailsPage order={order} />;
}

export default page;

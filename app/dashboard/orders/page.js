import OrdersPage from "@/app/_components/Orders/OrdersPage";
import { getPreOrders } from "@/app/_lib/dataService";

async function page() {
  const orders = await getPreOrders();
  return <OrdersPage orders={orders} />;
}

export default page;

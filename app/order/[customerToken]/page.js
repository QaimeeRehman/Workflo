import { notFound } from "next/navigation";
import {
  getCustomerByToken,
  getProductsForCustomerOrder,
  getProductTypes,
} from "@/app/_lib/dataService";
import CustomerOrderForm from "@/app/_components/Order/CustomerOrderForm";

export default async function page({ params }) {
  const { customerToken } = await params;

  const customer = await getCustomerByToken(customerToken);
  const productTypes = await getProductTypes();

  if (!customer) {
    notFound();
  }
  const { customer: customerInfo, products } =
    await getProductsForCustomerOrder(customer.id);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-2xl">
        <CustomerOrderForm
          customer={customerInfo}
          products={products}
          productTypes={productTypes}
          customerToken={customerToken}
        />
      </div>
    </main>
  );
}

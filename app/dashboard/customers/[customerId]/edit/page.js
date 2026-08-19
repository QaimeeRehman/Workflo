import NewCustomerForm from "@/app/_components/Customers/NewCustomerForm";
import { supabase } from "@/app/_lib/supabase";

async function page({ params }) {
  const { customerId } = await params;
  const {
    data: [customer],
    error,
  } = await supabase.from("customers").select("*").eq("id", customerId);
  return <NewCustomerForm customer={customer} />;
}

export default page;

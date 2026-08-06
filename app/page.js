import { auth } from "@/auth";
import { redirect } from "next/navigation";
async function page() {
  const session = await auth();
  if (!session) redirect("/login");
  return <div>Main Page</div>;
}
export default page;

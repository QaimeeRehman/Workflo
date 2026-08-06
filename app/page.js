import { auth } from "@/auth";
import { supabase } from "./_lib/supabase";
import bcrypt from "bcryptjs";
async function page() {
  const password = "@Abdulrehman123";
  const hash = await bcrypt.hash(password, 12);
  const { data, error } = await supabase.from("users").select("*");
  const session = await auth();
  console.log(session);
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
export default page;

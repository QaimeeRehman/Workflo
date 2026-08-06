import { signInAction } from "./action";

function page() {
  return (
    <div className="">
      <form action={signInAction}>
        <label htmlFor="">Email</label>
        <input name="email" type="email" />
        <label htmlFor="">Password</label>
        <input name="password" type="password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default page;

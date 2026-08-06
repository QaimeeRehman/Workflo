import { signInAction } from "../login/action";

function LoginForm() {
  return (
    <form
      action={signInAction}
      className="w-full max-w-md bg-white p-8 rounded-lg shadow-md space-y-5"
    >
      <h1 className="text-3xl font-bold text-center">Login</h1>

      <div>
        <label className="block mb-2 font-medium">Email</label>
        <input
          name="email"
          type="email"
          required
          className="w-full border rounded-md px-4 py-2"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Password</label>
        <input
          name="password"
          type="password"
          required
          className="w-full border rounded-md px-4 py-2"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary-500 text-white py-2 rounded-md hover:bg-primary-900 "
      >
        Login
      </button>
    </form>
  );
}

export default LoginForm;

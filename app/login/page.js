import LoginForm from "../_components/LoginForm";
import Logo from "../_components/Logo";

function page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50">
      <div className="absolute top-10 left-10">
        <Logo />
      </div>
      <LoginForm />
    </div>
  );
}

export default page;

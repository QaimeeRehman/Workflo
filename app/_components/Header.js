import { auth } from "@/auth";
import Logo from "./Logo";

async function Header() {
  const session = await auth();
  const nameInitials = session?.user?.name
    .split(" ")
    .map((init) => init[0])
    .join("")
    .toUpperCase();
  return (
    <header className="border-b border-gray-400 bg-white ">
      {/* Top Row */}
      <div className="mx-auto flex h-18 max-w-screen-2xl items-center justify-between px-8">
        <Logo height={180} width={180} />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-900 text-white font-semibold">
              {nameInitials}
            </div>

            <div>
              <p className="font-semibold text-slate-800">
                {session?.user.name}
              </p>
              <p className="text-xs text-slate-500">{session?.user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

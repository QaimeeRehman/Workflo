"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Receipt,
  Package,
  Boxes,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";

function Navbar() {
  return (
    <nav className=" bg-slate-50">
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center gap-2 p-8">
        <NavItem href="/">
          <LayoutDashboard size={18} />
          Dashboard
        </NavItem>

        <NavItem href="/billing">
          <Receipt size={18} />
          Billing
        </NavItem>

        <NavItem href="/customers">
          <Users size={18} />
          Customers
        </NavItem>

        <NavItem href="/products">
          <Package size={18} />
          Products
        </NavItem>

        <NavItem href="/inventory">
          <Boxes size={18} />
          Inventory
        </NavItem>

        <NavItem href="/reports">
          <BarChart3 size={18} />
          Reports
        </NavItem>

        <NavItem href="/settings" extraClasses="ml-auto">
          <Settings size={18} />
          Settings
        </NavItem>
      </div>
    </nav>
  );
}

function NavItem({ href, children, extraClasses = "" }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={`${href}`}
      className={`flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-slate-700 hover:bg-primary-900 hover:text-white ${extraClasses} ${
        isActive
          ? "bg-primary-900 text-white"
          : "text-slate-700 hover:bg-primary-900 hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
}

export default Navbar;

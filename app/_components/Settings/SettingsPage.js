"use client";
import {
  Building2,
  FileText,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";
import { useState } from "react";
import BusinessSettings from "./BusinessSettings";
import InventorySettings from "./InventorySettings";
import InvoiceSettings from "./InvoiceSettings";
import UsersSettings from "./UsersSettings";
import ProductTypesSettings from "./ProductTypesSettings";

const settingsSections = [
  {
    id: "business",
    label: "Business",
    icon: Building2,
    description: "Business information",
  },
  {
    id: "invoice",
    label: "Invoice",
    icon: FileText,
    description: "Invoice preferences",
  },

  {
    id: "product-types",
    label: "Product Types",
    icon: Package,
    description: "Manage product types",
  },
  {
    id: "users",
    label: "Users",
    icon: Users,
    description: "Users and permissions",
  },
];

export default function SettingsPage({
  businessSettings,
  invoiceSettings,
  productTypes,
  users,
}) {
  const [activeSection, setActiveSection] = useState("business");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Settings
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your business and application preferences.
          </p>
        </div>

        {/* Settings Layout */}
        <div className="grid gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
          {/* Sidebar */}
          <aside className="h-fit rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
            <div className="space-y-1">
              {settingsSections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => setActiveSection(section.id)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition ${
                      isActive
                        ? "bg-slate-100 text-slate-900"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        isActive
                          ? "bg-white text-slate-900 shadow-sm"
                          : "bg-slate-50 text-slate-500"
                      }`}
                    >
                      <Icon size={18} strokeWidth={1.8} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-medium">{section.label}</p>

                      <p className="truncate text-xs text-slate-400">
                        {section.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Content */}
          <main className="min-w-0">
            {/* -------------------------------------------------------------------------- */
            /* Business Settings                                                          */
            /* -------------------------------------------------------------------------- */}
            {activeSection === "business" && (
              <BusinessSettings businessSettings={businessSettings} />
            )}
            {/* -------------------------------------------------------------------------- */
            /* Invoice Settings                                                           */
            /* -------------------------------------------------------------------------- */}
            {activeSection === "invoice" && (
              <InvoiceSettings
                invoiceSettings={invoiceSettings}
                onSave={handleSave}
                saved={saved}
              />
            )}

            {/* -------------------------------------------------------------------------- */
            /* Inventory Settings                                                         */
            /* -------------------------------------------------------------------------- */}
            {activeSection === "product-types" && (
              <ProductTypesSettings
                onSave={handleSave}
                saved={saved}
                productTypesDb={productTypes}
              />
            )}
            {/* -------------------------------------------------------------------------- */
            /* Users Settings                                                             */
            /* -------------------------------------------------------------------------- */}
            {activeSection === "users" && <UsersSettings users={users} />}
          </main>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState, useTransition } from "react";
import InputField from "./InputField";
import SettingsCard from "./SettingsCard";
import ToggleRow from "./ToggleRow";
import { updateInvoiceSettingsAction } from "@/app/dashboard/settings/action";
import toast from "react-hot-toast";

function InvoiceSettings({ invoiceSettings }) {
  const [invoice, setInvoice] = useState(invoiceSettings);
  const [saved, setSaved] = useState();
  const [isPending, startTransition] = useTransition();

  const updateField = (field, value) => {
    setInvoice((current) => ({
      ...current,
      [field]: value,
    }));
  };

  function handleSave() {
    setSaved(false);
    startTransition(async () => {
      try {
        await updateInvoiceSettingsAction(invoice);
        setSaved(true);
        toast.success("Saved settings successfully");
      } catch (error) {
        console.log(error);
      }
    });
  }

  return (
    <SettingsCard
      title="Invoice Settings"
      description="Configure how invoices are generated and displayed."
      onSave={handleSave}
      saved={saved}
    >
      <div className="space-y-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <InputField
            label="Invoice Prefix"
            value={invoice.invoice_prefix}
            onChange={(value) => updateField("invoice_prefix", value)}
            placeholder="INV-"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Invoice Footer
          </label>

          <textarea
            value={invoice.invoice_footer}
            onChange={(e) => updateField("invoice_footer", e.target.value)}
            rows={3}
            placeholder="Enter invoice footer"
            className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          />
        </div>

        <div className="border-t border-slate-100 pt-5">
          <h3 className="text-sm font-medium text-slate-900">
            Invoice Display
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Choose which business information appears on invoices.
          </p>

          <div className="mt-4 space-y-3">
            <ToggleRow
              label="Show phone number"
              checked={invoice.show_phone}
              onChange={(value) => updateField("show_phone", value)}
            />

            <ToggleRow
              label="Show business address"
              checked={invoice.show_business_address}
              onChange={(value) => updateField("show_business_address", value)}
            />

            <ToggleRow
              label="Show tax registration number"
              checked={invoice.show_tax_registration_number}
              onChange={(value) =>
                updateField("show_tax_registration_number", value)
              }
            />
          </div>
        </div>
      </div>
    </SettingsCard>
  );
}

export default InvoiceSettings;

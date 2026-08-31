"use client";

import { updateBusinessSettingsAction } from "@/app/dashboard/settings/action";
import { useState, useTransition } from "react";
import InputField from "./InputField";
import SettingsCard from "./SettingsCard";
import toast from "react-hot-toast";

function BusinessSettings({ businessSettings }) {
  const [business, setBusiness] = useState({
    business_name: businessSettings?.business_name ?? "",
    phone: businessSettings?.phone ?? "",
    email: businessSettings?.email ?? "",
    address: businessSettings?.address ?? "",
    tax_registration_number: businessSettings?.tax_registration_number ?? "",
  });
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  const updateField = (field, value) => {
    setBusiness((current) => ({
      ...current,
      [field]: value,
    }));
  };

  function handleSave() {
    setSaved(false);
    startTransition(async () => {
      try {
        await updateBusinessSettingsAction(business);
        setSaved(true);
        toast.success("Saved settings successfully");
      } catch (error) {
        console.log(error);
      }
    });
  }

  return (
    <SettingsCard
      title="Business Information"
      description="Manage the basic information about your business."
      onSave={handleSave}
      saved={saved}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <InputField
          label="Business Name"
          value={business.business_name}
          onChange={(value) => updateField("business_name", value)}
          placeholder="Enter business name"
        />

        <InputField
          label="Phone Number"
          value={business.phone}
          onChange={(value) => updateField("phone", value)}
          placeholder="Enter phone number"
        />

        <InputField
          label="Email Address"
          type="email"
          value={business.email}
          onChange={(value) => updateField("email", value)}
          placeholder="Enter email address"
        />

        <InputField
          label="Tax Registration Number"
          value={business.tax_registration_number}
          onChange={(value) => updateField("tax_registration_number", value)}
          placeholder="Enter tax number"
        />

        <div className="sm:col-span-2">
          <InputField
            label="Business Address"
            value={business.address}
            onChange={(value) => updateField("address", value)}
            placeholder="Enter business address"
          />
        </div>
      </div>
    </SettingsCard>
  );
}

export default BusinessSettings;

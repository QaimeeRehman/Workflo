"use client";
import ToggleRow from "./ToggleRow";
import SettingsCard from "./SettingsCard";
import { useState } from "react";

function InventorySettings({ onSave, saved }) {
  const [inventory, setInventory] = useState({
    negativeStock: false,
    lowStockAlert: true,
    autoMovement: true,
  });

  const updateField = (field, value) => {
    setInventory((current) => ({
      ...current,
      [field]: value,
    }));
  };

  return (
    <SettingsCard
      title="Inventory Settings"
      description="Configure how inventory behaves across Workflo."
      onSave={onSave}
      saved={saved}
    >
      <div className="space-y-3">
        <ToggleRow
          label="Allow negative stock"
          description="Allow sales when available inventory is insufficient."
          checked={inventory.negativeStock}
          onChange={(value) => updateField("negativeStock", value)}
        />

        <ToggleRow
          label="Low stock alerts"
          description="Show alerts when products reach their low-stock threshold."
          checked={inventory.lowStockAlert}
          onChange={(value) => updateField("lowStockAlert", value)}
        />

        <ToggleRow
          label="Automatic inventory movements"
          description="Automatically record inventory movements for sales and stock operations."
          checked={inventory.autoMovement}
          onChange={(value) => updateField("autoMovement", value)}
        />
      </div>
    </SettingsCard>
  );
}

export default InventorySettings;

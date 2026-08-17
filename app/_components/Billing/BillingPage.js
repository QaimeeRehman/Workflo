"use client";

import { useMemo, useState } from "react";
import BillingHeader from "./BillingHeader";
import BillingCustomerSearch from "./BillingCustomerSearch";
import BillingProduct from "./BillingProduct";
import BillItem from "./BillItem";
import toast from "react-hot-toast";
import BillSummary from "./BillSummary";

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Sooper",
    type: "biscuit",
    packaging: {
      tp: { boxes_per_carton: 8 },
      sp: { boxes_per_carton: 6 },
      mp: { boxes_per_carton: 10 },
      hr: { boxes_per_carton: 12 },
    },
    prices: {
      tp: {
        retailer_filer: 330,
        retailer_nonFiler: 340,
        wholesale_filer: 320,
        wholesale_nonFiler: 330,
      },
      sp: {
        retailer_filer: 295,
        retailer_nonFiler: 305,
        wholesale_filer: 285,
        wholesale_nonFiler: 295,
      },
    },
  },
  {
    id: 2,
    name: "Gluco",
    type: "biscuit",
    packaging: {
      tp: { boxes_per_carton: 8 },
      sp: { boxes_per_carton: 6 },
    },
    prices: {
      tp: {
        retailer_filer: 300,
        retailer_nonFiler: 310,
        wholesale_filer: 290,
        wholesale_nonFiler: 300,
      },
      sp: {
        retailer_filer: 270,
        retailer_nonFiler: 280,
        wholesale_filer: 260,
        wholesale_nonFiler: 270,
      },
    },
  },
];

const EMPTY_ITEM = {
  productId: "",
  category: "",
  quantity: "",
  unit: "box",
};

function BillingPage({ customers, products, packagings, inventory }) {
  return (
    <div className="mx-auto min-w-[80vw] space-y-6">
      {/* Header */}
      <BillingHeader />
      {/* Main Billing Area */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
        {/* Left */}
        <div className="space-y-6">
          {/* Customer */}
          <BillingCustomerSearch customers={customers} />
          {/* Product */}
          <BillingProduct
            products={products}
            inventory={inventory}
            packagings={packagings}
          />
          {/* Items */}
          <BillItem />
        </div>

        {/* Right Summary */}
        <BillSummary />
      </div>
    </div>
  );
}

export default BillingPage;

"use client";

import ProductInfo from "./ProductInfo";
import ProductPricingBiscuit from "./ProductPricingBiscuit";
import ProductPricingCake from "./ProductPricingCake";
import ProductPackagingBiscuit from "./ProductPackagingBiscuit";
import Link from "next/link";
import CRUDButton from "../CRUDButton";
import { Save } from "lucide-react";
import { updateProductAndPricingAction } from "@/app/products/action";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import ProductPackagingCake from "./ProductPackagingCake";
function UpdateProductForm({ product, pricing, packaging }) {
  async function handleSubmit(formData) {
    const {
      product: updatedProduct,
      pricing,
      packaging,
    } = await updateProductAndPricingAction(formData);

    if (!updatedProduct || !pricing || !packaging)
      toast.error("Product is not updated");

    toast.success("Product Updated Successfully");

    redirect(`/products/${product.id}`);
  }
  return (
    <form action={handleSubmit} className="space-y-6">
      <input type="hidden" name="productId" value={product.id} />
      <input type="hidden" name="type" value={product.type} />
      {/* Product Information */}
      <ProductInfo product={product} />
      {/* Pricing */}
      {product.type === "biscuit" && (
        <ProductPricingBiscuit pricing={pricing} />
      )}

      {/* Cake Pricing */}
      {product.type === "cake" && <ProductPricingCake pricing={pricing} />}

      {/* Packaging Biscuit */}
      {product.type === "biscuit" && (
        <ProductPackagingBiscuit packaging={packaging} />
      )}
      {product.type === "cake" && (
        <ProductPackagingCake packaging={packaging} />
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3 pb-8">
        <Link
          href={`/products/${product.id}`}
          className="rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Cancel
        </Link>

        <CRUDButton className="flex items-center gap-2">
          <Save size={18} />
          Save Changes
        </CRUDButton>
      </div>
    </form>
  );
}

export default UpdateProductForm;

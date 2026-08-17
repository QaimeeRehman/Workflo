"use client";

import { updateProductAndPricingAction } from "@/app/products/action";
import { Save } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import CRUDButton from "../CRUDButton";
import ProductInfo from "./ProductInfo";
import ProductPackaging from "./ProductPackaging";
import ProductPricing from "./ProductPricing";
function UpdateProductForm({ product, pricing, packaging, productType }) {
  async function handleSubmit(formData) {
    try {
      const {
        product: updatedProduct,
        pricing,
        packaging,
      } = await updateProductAndPricingAction(formData);

      if (!updatedProduct || !pricing || !packaging) {
        toast.error("Product is not updated");
        return;
      }

      toast.success("Product Updated Successfully");
    } catch (error) {
      console.log(error);
    }
    redirect(`/products/${product.id}`);
  }
  return (
    <form action={handleSubmit} className="space-y-6">
      <input type="hidden" name="productId" value={product.id} />
      <input type="hidden" name="type" value={product.type} />
      {/* Product Information */}
      <ProductInfo product={product} />
      {/* Pricing */}
      {/* {product.type === "biscuit" && (
        <ProductPricingBiscuit pricing={pricing} />
      )} */}

      {/* Cake Pricing */}
      {/* {product.type === "cake" && <ProductPricingCake pricing={pricing} />} */}

      {product.type && (
        <ProductPricing
          pricing={pricing}
          categories={productType.default_categories}
        />
      )}

      {product.type && (
        <ProductPackaging
          packaging={packaging}
          categories={productType.default_categories}
        />
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

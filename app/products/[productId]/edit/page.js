import Link from "next/link";
import { ArrowLeft, Package, Save } from "lucide-react";
import {
  getProductById,
  getProductPackaging,
  getProductPricing,
} from "@/app/_lib/dataService";
import { updateProductAndPricing } from "../../action";
import ProductInfo from "@/app/_components/Product/ProductInfo";
import ProductPricingBiscuit from "@/app/_components/Product/ProductPricingBiscuit";
import ProductPricingCake from "@/app/_components/Product/ProductPricingCake";
import CRUDButton from "@/app/_components/CRUDButton";
import ProductPackagingBiscuit from "@/app/_components/Product/ProductPackagingBiscuit";
import UpdateProductForm from "@/app/_components/Product/UpdateProductForm";

async function page({ params }) {
  const { productId } = await params;
  // Example data
  // const
  // fetching product for getting its price according to its type
  const product = await getProductById(productId);
  const pricing = await getProductPricing(product.type, productId);
  const productPackaging = await getProductPackaging(productId);
  const packaging = productPackaging.reduce((acc, item) => {
    acc[item.category.toLowerCase()] = {
      units_per_box: item.units_per_box,
      boxes_per_carton: item.boxes_per_carton,
    };

    return acc;
  }, {});

  return (
    <div className="mx-auto  space-y-6 p-6">
      {/* Header */}
      <div>
        <Link
          href={`/products/${product.id}`}
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800"
        >
          <ArrowLeft size={17} />
          Back to Product
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
            <Package size={25} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-800">Edit Product</h1>

            <p className="mt-1 text-slate-500">
              Update product information and pricing.
            </p>
          </div>
        </div>
      </div>

      <UpdateProductForm
        product={product}
        pricing={pricing}
        packaging={packaging}
      />
    </div>
  );
}

export default page;

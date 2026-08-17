import UpdateProductForm from "@/app/_components/Product/UpdateProductForm";
import {
  getProductById,
  getProductPackaging,
  getProductPricing,
  getProductTypeByValue,
} from "@/app/_lib/dataService";
import { ArrowLeft, Package } from "lucide-react";
import Link from "next/link";

async function page({ params }) {
  const { productId } = await params;
  // Example data
  // const
  // fetching product for getting its price according to its type
  const product = await getProductById(productId);
  const pricing = await getProductPricing(productId);
  const productPackaging = await getProductPackaging(productId);
  const productType = await getProductTypeByValue(product.type);
  const packaging = productPackaging.reduce((acc, item) => {
    acc[item.category.toLowerCase()] = {
      units_per_box: item.units_per_box,
      boxes_per_carton: item.boxes_per_carton,
    };

    return acc;
  }, {});
  console.log(productType);
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
        productType={productType}
      />
    </div>
  );
}

export default page;

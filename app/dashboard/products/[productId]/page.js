import ProductPackagingView from "@/app/_components/Product/ProductPackagingView";
import ProductPricingMessage from "@/app/_components/Product/ProductPricingMessage";
import ProductPricingView from "@/app/_components/Product/ProductPricingView";
import {
  getProductById,
  getProductPackaging,
  getProductPricing,
  getProductTypeByValue,
} from "@/app/_lib/dataService";
import { toCapitalize } from "@/app/_lib/helper";
import { ArrowLeft, Package, Pencil } from "lucide-react";
import Link from "next/link";

async function page({ params }) {
  const { productId } = await params;

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

  const saleTypes = [
    {
      key: "retail_filer",
      sale_type: "retail",
      tax_category: "filer",
    },
    {
      key: "retail_non_filer",
      sale_type: "retail",
      tax_category: "non_filer",
    },
    {
      key: "wholesale_filer",
      sale_type: "wholesale",
      tax_category: "filer",
    },
    {
      key: "wholesale_non_filer",
      sale_type: "wholesale",
      tax_category: "non_filer",
    },
  ];
  const pricingCategory = {};

  productType.default_categories.forEach((category) => {
    const key = category.toLowerCase();

    pricingCategory[key] = {};

    saleTypes.forEach(({ key: pricingKey, sale_type, tax_category }) => {
      const pricingRow = pricing?.find(
        (item) =>
          item.category === key &&
          item.sale_type === sale_type &&
          item.tax_category === tax_category,
      );

      pricingCategory[key][pricingKey] = pricingRow?.price ?? null;
    });
  });

  const hasPricing = Object.values(pricingCategory).some((category) =>
    Object.values(category).some(
      (price) => price !== null && price !== undefined,
    ),
  );
  return (
    <div className="mx-auto min-w-[80vw]  space-y-6 p-6">
      {/* Back */}
      <Link
        href="/dashboard/products"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-800"
      >
        <ArrowLeft size={17} />
        Back to Products
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between rounded-2xl bg-white p-7 shadow">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-100 text-primary-600">
            <Package size={30} />
          </div>

          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-slate-800">
                {toCapitalize(product.name.split(" "))}
              </h1>
            </div>
          </div>
        </div>

        <Link
          href={`/dashboard/products/${product.id}/edit`}
          className="flex items-center gap-2 rounded-lg bg-primary-500 px-5 py-3 font-medium text-white transition hover:bg-primary-900"
        >
          <Pencil size={18} />
          Edit Product
        </Link>
      </div>

      {/* Product Information */}
      <div className="grid grid-cols-3 gap-6">
        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm font-medium text-slate-500">Product ID</p>

          <p className="mt-2 text-2xl font-bold text-slate-800">
            #{product.id}
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm font-medium text-slate-500">Product Type</p>

          <p className="mt-2 text-2xl font-bold text-slate-800">
            {product.type.toUpperCase()}
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm font-medium text-slate-500">Company</p>

          <p className="mt-2 text-2xl font-bold text-slate-800">
            {product.company.toUpperCase()}
          </p>
        </div>
      </div>

      {hasPricing ? (
        <ProductPricingView pricing={pricingCategory} />
      ) : (
        <ProductPricingMessage productId={productId} />
      )}

      {/* Packaging */}
      {product.type && <ProductPackagingView packaging={packaging} />}
    </div>
  );
}

export default page;

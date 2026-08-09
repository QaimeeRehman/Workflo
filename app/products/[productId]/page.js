import Link from "next/link";
import {
  ArrowLeft,
  Package,
  Pencil,
  CircleDollarSign,
  Boxes,
} from "lucide-react";
import { supabase } from "@/app/_lib/supabase";
import ProductPricing from "@/app/_components/Product/ProductPricingBiscuitView";
import ProductPricingMessage from "@/app/_components/Product/ProductPricingMessage";
import {
  getProductById,
  getProductPackaging,
  getProductPricing,
} from "@/app/_lib/dataService";
import ProductPackaging from "@/app/_components/Product/ProductPackagingBiscuit";
import ProductPackagingCakeView from "@/app/_components/Product/ProductPackagingCakeView";
import { toCapitalize } from "@/app/_lib/helper";
import ProductPricingBiscuitView from "@/app/_components/Product/ProductPricingBiscuitView";
import ProductPricingCakeView from "@/app/_components/Product/ProductPricingCakeView";

async function page({ params }) {
  const { productId } = await params;

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

  let pricingType;

  if (Object.keys(pricing).length < 10) pricingType = "cake";
  if (Object.keys(pricing).length > 10) pricingType = "biscuit";

  const pricingCategoryBiscuit = {
    tp: {
      retail_filer: pricing.tp_retail_filer,
      "retail_non-filer": pricing["tp_retail_non-filer"],
      wholesale_filer: pricing.tp_wholesale_filer,
      "wholesale_non-filer": pricing["tp_wholesale_non-filer"],
    },
    sp: {
      retail_filer: pricing.sp_retail_filer,
      "retail_non-filer": pricing["sp_retail_non-filer"],
      wholesale_filer: pricing.sp_wholesale_filer,
      "wholesale_non-filer": pricing["sp_wholesale_non-filer"],
    },
    mp: {
      retail_filer: pricing.mp_retail_filer,
      "retail_non-filer": pricing["mp_retail_non-filer"],
      wholesale_filer: pricing.mp_wholesale_filer,
      "wholesale_non-filer": pricing["mp_wholesale_non-filer"],
    },
    hr: {
      retail_filer: pricing.hr_retail_filer,
      "retail_non-filer": pricing["hr_retail_non-filer"],
      wholesale_filer: pricing.hr_wholesale_filer,
      "wholesale_non-filer": pricing["hr_wholesale_non-filer"],
    },
  };

  const pricingCategoryCake = {
    cake: {
      retail_filer: pricing.retail_filer,
      "retail_non-filer": pricing["retail_non-filer"],
      wholesale_filer: pricing.wholesale_filer,
      "wholesale_non-filer": pricing["wholesale_non-filer"],
    },
  };

  // function isPricingComplete(pricing) {
  //   return Object.values(pricing).every(
  //     (value) => value !== null && value !== undefined,
  //   );
  // }

  const hasPricing = Object.values(
    product.type === "cake" ? pricingCategoryCake : pricingCategoryBiscuit,
  ).some((category) =>
    Object.values(category).some(
      (price) => price !== null && price !== undefined,
    ),
  );
  // const packaging = {
  //   tp: {
  //     units_per_box: 12,
  //     boxes_per_carton: 8,
  //   },

  //   sp: {
  //     units_per_box: 24,
  //     boxes_per_carton: 6,
  //   },

  //   mp: {
  //     units_per_box: 12,
  //     boxes_per_carton: 10,
  //   },

  //   hr: {
  //     units_per_box: 6,
  //     boxes_per_carton: 12,
  //   },
  // };

  return (
    <div className="mx-auto min-w-[80vw]  space-y-6 p-6">
      {/* Back */}
      <Link
        href="/products"
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
          href={`/products/${product.id}/edit`}
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

      {/* Pricing */}
      {/* {pricing ? (
        <ProductPricingBiscuitView pricing={pricingCategory} />
      ) : (
        <ProductPricingMessage />
      )} */}

      {product.type === "biscuit" && hasPricing && (
        <ProductPricingBiscuitView pricing={pricingCategoryBiscuit} />
      )}
      {product.type === "cake" && hasPricing && (
        <ProductPricingCakeView pricing={pricingCategoryCake} />
      )}
      {!hasPricing && <ProductPricingMessage productId={productId} />}

      {/* <ProductPricingMessage /> */}

      {/* Packaging */}
      {product.type === "biscuit" && (
        <ProductPricingBiscuitView packaging={packaging} />
      )}
      {product.type === "cake" && (
        <ProductPackagingCakeView packaging={packaging} />
      )}
    </div>
  );
}

export default page;

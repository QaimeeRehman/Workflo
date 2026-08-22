// "use server";

// import { redirect } from "next/navigation";
// import {
//   createNewPackaging,
//   createNewPricing,
//   createNewProduct,
//   deleteProduct,
//   getProductTypeByValue,
// } from "../_lib/dataService";
// import { revalidatePath } from "next/cache";
// import { supabase } from "../_lib/supabase";

// const saleTypes = [
//   "retail_filer",
//   "retail_non_filer",
//   "wholesale_filer",
//   "wholesale_non_filer",
// ];

// export async function createNewProductAction(formData) {
//   const newProduct = {
//     name: formData.get("name"),
//     type: formData.get("type"),
//     company: formData.get("company"),
//   };

//   const {
//     data: [product],
//   } = await createNewProduct(newProduct);

//   const productType = await getProductTypeByValue(product.type);
//   let newPackaging = productType.default_categories.map((category) => {
//     const lowerCaseCategory = category.toLowerCase();
//     return {
//       product_id: product.id,
//       category: lowerCaseCategory,
//       units_per_box: Number(formData.get(`${lowerCaseCategory}_units_per_box`)),
//       boxes_per_carton: Number(
//         formData.get(`${lowerCaseCategory}_boxes_per_carton`),
//       ),
//     };
//   });

//   await createNewPricing(product.type, product.id);
//   await createNewPackaging(newPackaging);

//   if (product) redirect(`/products/${product.id}`);

//   return data;
// }

// export async function updateProductAndPricingAction(formData) {
//   const productId = formData.get("productId");
//   const type = formData.get("type");

//   const productType = await getProductTypeByValue(type);

//   if (!productType) throw new Error("Invalid product Type");

//   // 1. Update Product in products
//   const updatedProduct = {
//     name: formData.get("name"),
//     company: formData.get("company"),
//   };

//   const { data: product, error: productError } = await supabase
//     .from("products")
//     .update(updatedProduct)
//     .eq("id", productId)
//     .select();

//   // Update Pricing
//   let updatedPricing = {};
//   productType.default_categories.forEach((category) => {
//     const key = category.toLowerCase();

//     saleTypes.forEach((saleType) => {
//       const fieldName = `${key}_${saleType}`;

//       updatedPricing[fieldName] = formData.get(fieldName) || null;
//     });
//   });

//   const { data: pricing, error: pricingError } = await supabase
//     .from(`pricing_${type}`)
//     .update(updatedPricing)
//     .eq("product_id", productId)
//     .select();

//   // Update Packaging
//   let updatedPackaging = productType.default_categories.map((category) => {
//     const key = category.toLowerCase();

//     return {
//       product_id: productId,
//       category: key,
//       units_per_box: Number(formData.get(`${key}_units_per_box`)),
//       boxes_per_carton: Number(formData.get(`${key}_boxes_per_carton`)),
//     };
//   });

//   const { data: packaging, error: packagingError } = await supabase
//     .from("product_packaging")
//     .upsert(updatedPackaging, {
//       onConflict: "product_id,category",
//     })
//     .select();

//   if (packagingError) {
//     throw new Error(packagingError.message);
//   }

//   revalidatePath(`/products/${productId}`);

//   return { product, pricing, packaging };
// }

// export async function deleteProductAction(id) {
//   const error = await deleteProduct(id);

//   if (!error) revalidatePath("/products");

//   return error;
// }

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createNewProduct,
  deleteProduct,
  getProductTypeByValue,
} from "@/app/_lib/dataService";
import { supabase } from "@/app/_lib/supabase";

const saleTypes = [
  {
    sale_type: "retail",
    tax_category: "filer",
  },
  {
    sale_type: "retail",
    tax_category: "non_filer",
  },
  {
    sale_type: "wholesale",
    tax_category: "filer",
  },
  {
    sale_type: "wholesale",
    tax_category: "non_filer",
  },
];

export async function createNewProductAction(formData) {
  const newProduct = {
    name: formData.get("name"),
    type: formData.get("type"),
    company: formData.get("company"),
  };

  const {
    data: [product],
    error: productError,
  } = await createNewProduct(newProduct);

  if (productError || !product) {
    throw new Error(productError?.message || "Failed to create product");
  }

  const productType = await getProductTypeByValue(product.type);

  if (!productType) {
    throw new Error("Invalid product type");
  }

  // -----------------------------
  // Create Packaging
  // -----------------------------

  const newPackaging = productType.default_categories.map((category) => {
    const key = category.toLowerCase();

    return {
      product_id: product.id,
      category: key,
      units_per_box: Number(formData.get(`${key}_units_per_box`)),
      boxes_per_carton: Number(formData.get(`${key}_boxes_per_carton`)),
    };
  });

  const { error: packagingError } = await supabase
    .from("product_packaging")
    .insert(newPackaging);

  if (packagingError) {
    throw new Error(packagingError.message);
  }

  // -----------------------------
  // Create Pricing
  // -----------------------------

  const newPricing = productType.default_categories.flatMap((category) => {
    const key = category.toLowerCase();

    return saleTypes.map(({ sale_type, tax_category }) => {
      const fieldName = `${key}_${sale_type}_${tax_category}`;

      const value = formData.get(fieldName);

      return {
        product_id: product.id,
        category: key,
        sale_type,
        tax_category,
        price: value === "" || value == null ? null : Number(value),
      };
    });
  });

  const { error: pricingError } = await supabase
    .from("product_pricing")
    .insert(newPricing);

  if (pricingError) {
    throw new Error(pricingError.message);
  }

  redirect(`/dashboard/products/${product.id}`);
}

export async function updateProductAndPricingAction(formData) {
  console.log(formData);
  const productId = formData.get("productId");
  const type = formData.get("type");

  const productType = await getProductTypeByValue(type);

  if (!productType) {
    throw new Error("Invalid product type");
  }

  // -----------------------------
  // Update Product
  // -----------------------------

  const updatedProduct = {
    name: formData.get("name"),
    company: formData.get("company"),
  };

  const { data: product, error: productError } = await supabase
    .from("products")
    .update(updatedProduct)
    .eq("id", productId)
    .select();

  if (productError) {
    throw new Error(productError.message);
  }

  // -----------------------------
  // Update Pricing
  // -----------------------------

  const updatedPricing = productType.default_categories.flatMap((category) => {
    const key = category.toLowerCase();

    return saleTypes.map(({ sale_type, tax_category }) => {
      const fieldName = `${key}_${sale_type}_${tax_category}`;

      const value = formData.get(fieldName);

      return {
        product_id: productId,
        category: key,
        sale_type,
        tax_category,
        price: value === "" || value == null ? null : Number(value),
      };
    });
  });

  const { data: pricing, error: pricingError } = await supabase
    .from("product_pricing")
    .upsert(updatedPricing, {
      onConflict: "product_id,category,sale_type,tax_category",
    })
    .select();

  if (pricingError) {
    throw new Error(pricingError.message);
  }

  // -----------------------------
  // Update Packaging
  // -----------------------------

  const updatedPackaging = productType.default_categories.map((category) => {
    const key = category.toLowerCase();

    return {
      product_id: productId,
      category: key,
      units_per_box: Number(formData.get(`${key}_units_per_box`)),
      boxes_per_carton: Number(formData.get(`${key}_boxes_per_carton`)),
    };
  });

  const { data: packaging, error: packagingError } = await supabase
    .from("product_packaging")
    .upsert(updatedPackaging, {
      onConflict: "product_id,category",
    })
    .select();

  if (packagingError) {
    throw new Error(packagingError.message);
  }

  revalidatePath(`/dashboard/products/${productId}`);

  return {
    product,
    pricing,
    packaging,
  };
}

export async function deleteProductAction(id) {
  const error = await deleteProduct(id);

  if (!error) {
    revalidatePath("/dashboard/products");
  }

  return error;
}

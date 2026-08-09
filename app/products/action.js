"use server";

import { redirect } from "next/navigation";
import {
  createNewPackaging,
  createNewPricing,
  createNewProduct,
  deleteProduct,
} from "../_lib/dataService";
import { revalidatePath } from "next/cache";
import { supabase } from "../_lib/supabase";

export async function createNewProductAction(formData) {
  const newProduct = {
    name: formData.get("name"),
    type: formData.get("type"),
    company: formData.get("company"),
  };

  const { data, error } = await createNewProduct(newProduct);

  let newPackaging;

  if (formData.get("type") === "biscuit") {
    newPackaging = [
      {
        product_id: data[0].id,
        category: "tp",
        units_per_box: formData.get("tp_units_per_box"),
        boxes_per_carton: formData.get("tp_boxes_per_carton"),
      },
      {
        product_id: data[0].id,
        category: "sp",
        units_per_box: formData.get("sp_units_per_box"),
        boxes_per_carton: formData.get("sp_boxes_per_carton"),
      },
      {
        product_id: data[0].id,
        category: "mp",
        units_per_box: formData.get("mp_units_per_box"),
        boxes_per_carton: formData.get("mp_boxes_per_carton"),
      },
      {
        product_id: data[0].id,
        category: "hr",
        units_per_box: formData.get("hr_units_per_box"),
        boxes_per_carton: formData.get("hr_boxes_per_carton"),
      },
    ];
  }
  if (formData.get("type") === "cake") {
    newPackaging = {
      product_id: data[0].id,
      category: "cake",
      units_per_box: Number(formData.get(`cake_units_per_box`)),
      boxes_per_carton: Number(formData.get(`cake_boxes_per_carton`)),
    };
  }

  await createNewPricing(data[0].type, data[0].id);
  await createNewPackaging(newPackaging);

  if (data) redirect(`/products/${data[0].id}`);

  return data;
}

export async function updateProductAndPricingAction(formData) {
  const productId = formData.get("productId");
  const type = formData.get("type");
  // 1. Update Product in products
  const updatedProduct = {
    name: formData.get("name"),
    company: formData.get("company"),
  };
  const { data: product, error: productError } = await supabase
    .from("products")
    .update(updatedProduct)
    .eq("id", productId)
    .select();

  // Update Pricing
  let updatedPricing;
  if (type === "biscuit") {
    updatedPricing = {
      "tp_retail_non-filer": formData.get("tp_retail_non-filer") || null,
      tp_retail_filer: formData.get("tp_retail_filer") || null,
      tp_wholesale_filer: formData.get("tp_wholesale_filer") || null,
      "tp_wholesale_non-filer": formData.get("tp_wholesale_non-filer") || null,

      sp_retail_filer: formData.get("sp_retail_filer") || null,
      "sp_retail_non-filer": formData.get("sp_retail_non-filer") || null,
      sp_wholesale_filer: formData.get("sp_wholesale_filer") || null,
      "sp_wholesale_non-filer": formData.get("sp_wholesale_non-filer") || null,

      mp_retail_filer: formData.get("mp_retail_filer") || null,
      "mp_retail_non-filer": formData.get("mp_retail_non-filer") || null,
      mp_wholesale_filer: formData.get("mp_wholesale_filer") || null,
      "mp_wholesale_non-filer": formData.get("mp_wholesale_non-filer") || null,

      hr_retail_filer: formData.get("hr_retail_filer") || null,
      "hr_retail_non-filer": formData.get("hr_retail_non-filer") || null,
      hr_wholesale_filer: formData.get("hr_wholesale_filer") || null,
      "hr_wholesale_non-filer": formData.get("hr_wholesale_non-filer") || null,
    };
  }

  if (type === "cake") {
    updatedPricing = {
      "retail_non-filer": formData.get("retail_non-filer") || null,
      retail_filer: formData.get("retail_filer") || null,
      wholesale_filer: formData.get("wholesale_filer") || null,
      "wholesale_non-filer": formData.get("wholesale_non-filer") || null,
    };
  }
  const { data: pricing, error: pricingError } = await supabase
    .from(`pricing_${type}`)
    .update(updatedPricing)
    .eq("product_id", productId)
    .select();

  // Update Packaging
  let updatedPackaging;
  if (type === "biscuit")
    updatedPackaging = ["tp", "sp", "mp", "hr"].map((category) => ({
      product_id: productId,
      category,
      units_per_box: Number(formData.get(`${category}_units_per_box`)),
      boxes_per_carton: Number(formData.get(`${category}_boxes_per_carton`)),
    }));

  if (type === "cake")
    updatedPackaging = {
      product_id: productId,
      category: "cake",
      units_per_box: Number(formData.get("cake_units_per_box")),
      boxes_per_carton: Number(formData.get("cake_boxes_per_carton")),
    };

  // const { data: packaging, error: packagingError } = await supabase
  //   .from("product_packaging")
  //   .update(updatedPackaging)
  //   .eq("product_id", productId)
  //   .select();

  const { data: packaging, error: packagingError } = await supabase
    .from("product_packaging")
    .upsert(updatedPackaging, {
      onConflict: "product_id,category",
    })
    .select();

  revalidatePath(`/products/${productId}`);

  return { product, pricing, packaging };
}

export async function deleteProductAction(id) {
  const error = await deleteProduct(id);

  if (!error) revalidatePath("/products");

  return error;
}

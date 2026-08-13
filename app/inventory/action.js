"use server";

import { auth } from "@/auth";
import { getPackagingByIdAndCategory } from "../_lib/dataService";
import { supabase } from "../_lib/supabase";

export async function stockInFormAction(items, formData) {
  const { supplier, invoice_number, invoice_date, invoice_file, notes } =
    Object.fromEntries(formData.entries());
  // Validating invoice information first
  if (!supplier?.trim()) {
    throw new Error("Supplier is required");
  }

  if (supplier.length > 150) {
    throw new Error("Supplier name is too long");
  }

  if (!invoice_number?.trim()) {
    throw new Error("Invoice number is required");
  }

  if (!invoice_date) {
    throw new Error("Invoice date is required");
  }

  if (!(invoice_file instanceof File) || invoice_file.size === 0) {
    throw new Error("Invoice file is required");
  }

  // Allowing ony these file types user can upload
  const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
  if (!allowedTypes.includes(invoice_file.type)) {
    throw new Error("Invalid invoice file type");
  }

  // Allowing maximum 5MB file size
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  if (invoice_file.size > MAX_FILE_SIZE) {
    throw new Error("Invoice file must be smaller than 5 MB");
  }

  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("At least one stock item is required");
  }

  console.log("ITEM RECIEVED:", items);
  console.log("ITEM RECIEVED:", items.length);

  // Validate all items
  for (const item of items) {
    const { productId, category, quantity, unit, costPerBox } = item;

    if (!productId) {
      throw new Error("Product is required");
    }

    if (!category) {
      throw new Error("Category is required");
    }

    if (!Number.isInteger(Number(quantity)) || Number(quantity) <= 0) {
      throw new Error("Quantity must be a positive integer");
    }

    if (!["carton", "box"].includes(unit)) {
      throw new Error("Invalid unit");
    }

    if (!Number.isFinite(Number(costPerBox)) || Number(costPerBox) <= 0) {
      throw new Error("Invalid cost per box");
    }
  }

  //  Upload supplier invoice file to bucket
  const fileExtension = invoice_file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExtension}`;
  const filePath = `invoices/${fileName}`;
  const fileBuffer = await invoice_file.arrayBuffer();

  const { data: fileUpload, error: fileUploadError } = await supabase.storage
    .from("invoice_files")
    .upload(filePath, fileBuffer, {
      contentType: invoice_file.type,
      upsert: false,
    });

  if (fileUploadError)
    throw new Error(`Failed to upload invoice: ${fileUploadError.message}`);

  const invoiceFilePath = fileUpload.path;

  // creating supplier_invoice
  const newSupplierInvoice = {
    supplier,
    invoice_number,
    invoice_date,
    invoice_file: invoiceFilePath,
    notes,
  };

  const {
    data: [supplierInvoice],
    error: supplierInvoiceError,
  } = await supabase
    .from("supplier_invoice")
    .insert([newSupplierInvoice])
    .select();

  if (supplierInvoiceError)
    throw new Error(
      `Failed to create supplier invoice: ${supplierInvoiceError.message}`,
    );

  const { user } = await auth();
  if (!user) throw new Error("User is not logged in");

  /////////////////////////LOOPING ITEMS/////////////////////////////
  for (const item of items) {
    const { productId, category, quantity, unit, costPerBox } = item;

    const { packaging, packagingError } = await getPackagingByIdAndCategory(
      productId,
      category,
    );

    if (packagingError || !packaging)
      throw new Error(
        `Packaging information not found for product ${productId} / ${category}`,
      );

    const quantityBoxes =
      unit === "carton"
        ? Number(quantity) * packaging.boxes_per_carton
        : Number(quantity);

    // Creating new supplier invoice item
    const newSupplierInvoiceItem = {
      invoice_id: supplierInvoice.id,
      product_id: productId,
      category,
      quantity_boxes: Number(quantityBoxes),
      cost_per_box: Number(costPerBox),
    };

    const {
      data: [supplierInvoiceItem],
      error: supplierInvoiceItemError,
    } = await supabase
      .from("supplier_invoice_item")
      .insert([newSupplierInvoiceItem])
      .select();

    if (supplierInvoiceItemError)
      throw new Error(
        `Failed to create supplier invoice item: ${supplierInvoiceItemError.message}`,
      );

    // Create Inventory Movements

    const newInventoryMovement = {
      product_id: productId,
      category,
      movement_type: "stock_in",
      quantity_boxes: quantityBoxes,
      reference_id: supplierInvoiceItem.id,
      cost_per_box: costPerBox,
      reference_type: "supplier_invoice_item",
      created_by: user.id,
    };

    const {
      data: [inventoryMovement],
      error: inventoryMovementError,
    } = await supabase
      .from("inventory_movement")
      .insert([newInventoryMovement])
      .select();

    if (inventoryMovementError)
      throw new Error(
        `Failed to create inventory movement: ${inventoryMovementError.message}`,
      );
    // Adding Inventory
    // const newInventory = {
    //   product_id: productId,
    //   category,
    //   quantity_boxes: quantityBoxes,
    // };
    const { data, error: inventoryError } = await supabase.rpc(
      "add_inventory_stock",
      {
        p_product_id: Number(productId),
        p_category: category,
        p_quantity_boxes: Number(quantityBoxes),
      },
    );

    if (inventoryError)
      throw new Error(`Failed to create inventory: ${inventoryError.message}`);

    // console.log("------------SUPPLIER INVOICE -----------------");
    // console.log(supplierInvoice);
    // console.log("------------SUPPLIER INVOICE ITEM -----------------");
    // console.log(supplierInvoiceItem);
    // console.log("------------ INVENTORY MOVEMENT -----------------");
    // console.log(inventoryMovement);
    // console.log("------------ INVENTORY -----------------");
    // console.log(inventory);
  }
}

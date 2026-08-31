"use server";

import {
  createProductTypeSettings,
  deleteProductTypeSettings,
  updateBusinessSettings,
  updateInvoiceSettings,
  updateProductTypesSettings,
} from "@/app/_lib/dataService";
import { revalidatePath } from "next/cache";

export async function updateBusinessSettingsAction(data) {
  const updatedSettings = await updateBusinessSettings(data);

  revalidatePath("/dashboard/settings");

  return updatedSettings;
}

export async function updateInvoiceSettingsAction(data) {
  const updatedSettings = await updateInvoiceSettings(data);

  revalidatePath("/dashboard/settings");

  return updatedSettings;
}

export async function updateProductTypesAction(data) {
  const updatedSettings = await updateProductTypesSettings(data);

  revalidatePath("/dashboard/settings");

  return updatedSettings;
}

export async function createProductTypesAction(data) {
  const updatedSettings = await createProductTypeSettings(data);

  revalidatePath("/dashboard/settings");

  return updatedSettings;
}

export async function deleteProductTypesAction(id) {
  const updatedSettings = await deleteProductTypeSettings(id);

  revalidatePath("/dashboard/settings");

  return updatedSettings;
}

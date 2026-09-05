"use server";

import {
  createProductTypeSettings,
  createUser,
  deleteProductTypeSettings,
  updateBusinessSettings,
  updateInvoiceSettings,
  updateProductTypesSettings,
} from "@/app/_lib/dataService";
import { revalidatePath } from "next/cache";

import bcrypt from "bcryptjs";
import { supabase } from "@/app/_lib/supabase";

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

export async function createUserAction(prevState, formData) {
  const fullName = formData.get("fullName")?.trim();
  const email = formData.get("email")?.trim().toLowerCase();
  const password = formData.get("password");
  const role = formData.get("role");
  const isActive = formData.get("isActive") === "true";

  if (!fullName || !email || !password || !role) {
    return {
      success: false,
      error: "All fields are required.",
    };
  }

  if (password.length < 6) {
    return {
      success: false,
      error: "Password must be at least 6 characters.",
    };
  }

  const { data: existingUser, error: existingUserError } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existingUserError) {
    return {
      success: false,
      error: `Failed to check email: ${existingUserError.message}`,
    };
  }

  if (existingUser) {
    return {
      success: false,
      error: "A user with this email already exists.",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  //  create user
  const user = await createUser({
    fullName,
    email,
    password: hashedPassword,
    role,
    isActive,
  });

  revalidatePath("/dashboard/settings");

  return {
    success: true,
    error: null,
  };
}

export async function updateUserAction(prevState, formData) {
  const id = formData.get("id");
  const fullName = formData.get("fullName")?.trim();
  const email = formData.get("email")?.trim().toLowerCase();
  const role = formData.get("role");
  const isActive = formData.get("isActive") === "true";

  // Validation
  if (!id || !fullName || !email || !role) {
    return {
      success: false,
      error: "All fields are required",
    };
  }

  // Check if another user already has this email
  const { data: existingUser, error: existingUserError } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .neq("id", id)
    .maybeSingle();

  if (existingUserError) {
    return {
      success: false,
      error: existingUserError.message,
    };
  }

  if (existingUser) {
    return {
      success: false,
      error: "A user with this email already exists.",
    };
  }

  // update user
  const { error } = await supabase
    .from("users")
    .update({
      fullName,
      email,
      role,
      isActive,
      updatedAt: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    return {
      success: false,
      error: `Failed to update user: ${error.message}`,
    };
  }

  // revalidate settings page
  revalidatePath("/dashboard/settings");

  return {
    success: true,
    error: null,
  };
}

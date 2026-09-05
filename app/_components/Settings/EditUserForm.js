"use client";

import { updateUserAction } from "@/app/dashboard/settings/action";
import { X } from "lucide-react";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

function EditUserForm({ user, onClose }) {
  const [state, formAction, isPending] = useActionState(updateUserAction, {
    success: false,
    error: null,
  });

  useEffect(
    function () {
      if (state.success) {
        toast.success("User updated successfully");
        onClose();
      }
    },
    [state.success, onClose],
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Edit User
            </h2>

            <p className="mt-0.5 text-sm text-slate-500">
              Update user information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form action={formAction} className="space-y-5 px-5 py-5">
          {/* User ID */}
          <input type="hidden" name="id" value={user.id} />

          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Full Name
            </label>

            <input
              id="fullName"
              name="fullName"
              type="text"
              defaultValue={user.fullName || ""}
              disabled={isPending}
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:bg-slate-50"
              placeholder="Enter full name"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              defaultValue={user.email || ""}
              disabled={isPending}
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:bg-slate-50"
              placeholder="Enter email"
            />
          </div>

          {/* Role */}
          <div>
            <label
              htmlFor="role"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Role
            </label>

            <select
              id="role"
              name="role"
              defaultValue={user.role || ""}
              disabled={isPending}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:bg-slate-50"
            >
              <option value="" disabled>
                Select role
              </option>

              <option value="Administrator">Administrator</option>

              <option value="Sales">Sales</option>

              <option value="Accounts">Accounts</option>

              <option value="Warehouse">Warehouse</option>
            </select>
          </div>

          {/* Error */}
          {state?.error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
              {state.error}
            </div>
          )}

          {/* Status */}
          <div>
            <label
              htmlFor="isActive"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Status
            </label>

            <select
              id="isActive"
              name="isActive"
              defaultValue={user.isActive ? "true" : "false"}
              disabled={isPending}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:bg-slate-50"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserForm;

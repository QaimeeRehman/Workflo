"use client";

import { useActionState, useEffect } from "react";
import { X, UserPlus } from "lucide-react";
import { createUserAction } from "@/app/dashboard/settings/action";
import toast from "react-hot-toast";

const roles = ["Administrator", "Sales", "Accounts", "Warehouse"];

const initialState = {
  success: false,
  error: null,
};

function CreateUserForm({ onClose }) {
  const [state, formAction, isPending] = useActionState(
    createUserAction,
    initialState,
  );

  useEffect(
    function () {
      if (state.success) {
        toast.success("User created successfully");
        onClose();
      }
    },
    [state.success, onClose],
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
              <UserPlus size={18} className="text-slate-700" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Add User
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Create a new user account for Workflo.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form action={formAction}>
          <div className="space-y-5 px-5 py-5 sm:px-6">
            {/* Error */}
            {state?.error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
                {state.error}
              </div>
            )}

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
                placeholder="Enter full name"
                required
                disabled={isPending}
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:bg-slate-50"
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
                placeholder="Enter email address"
                required
                disabled={isPending}
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:bg-slate-50"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                required
                minLength={6}
                disabled={isPending}
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:bg-slate-50"
              />

              <p className="mt-1.5 text-xs text-slate-400">
                Password must be at least 6 characters.
              </p>
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
                defaultValue="Sales"
                disabled={isPending}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:bg-slate-50"
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            {/* Active Status */}
            <div className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-slate-700">
                  Active User
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  Allow this user to log in to Workflo.
                </p>
              </div>

              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  defaultChecked
                  disabled={isPending}
                  value="true"
                  className="peer sr-only"
                />

                <div className="h-6 w-11 rounded-full bg-slate-200 transition peer-checked:bg-slate-900 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-slate-200 after:absolute after:left-[3px] after:top-[3px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full" />
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50 px-5 py-4 sm:px-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <UserPlus size={16} />

              {isPending ? "Creating..." : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUserForm;

"use client";

import { Pencil, Plus } from "lucide-react";
import { useState } from "react";
import CreateUserForm from "./CreateUserForm";
import EditUserForm from "./EditUserForm";

function UsersSettings({ users }) {
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  function openEditModal(user) {
    setSelectedUser(user);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-start justify-between border-b border-slate-100 px-5 py-5 sm:px-6">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Users & Permissions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage users who have access to Workflo.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateUser(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          <Plus size={16} />
          Add User
        </button>
      </div>

      {/* Table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left">
          <thead className="border-b border-slate-100 bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wide text-slate-500">
                User
              </th>

              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wide text-slate-500">
                Role
              </th>

              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/70">
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-slate-900">
                    {user.fullName}
                  </p>

                  <p className="mt-0.5 text-xs text-slate-500">{user.email}</p>
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {user.role}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                      user.isActive
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="px-4 py-4">
                  <div className="flex justify-end gap-1">
                    {/* Edit */}
                    <button
                      type="button"
                      onClick={() => openEditModal(user)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                      aria-label={`Edit ${user.fullName}`}
                    >
                      <Pencil size={15} />
                    </button>

                    {/* Activate / Deactivate */}
                    {/* <button
                      type="button"
                      className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
                        user.isActive
                          ? "text-slate-400 hover:bg-red-50 hover:text-red-600"
                          : "text-slate-400 hover:bg-emerald-50 hover:text-emerald-600"
                      }`}
                      aria-label={
                        user.isActive ? "Deactivate user" : "Activate user"
                      }
                    >
                      <Power size={15} />
                    </button> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create User Modal */}
      {showCreateUser && (
        <CreateUserForm onClose={() => setShowCreateUser(false)} />
      )}

      {/* Edit User Modal will go here */}
      {selectedUser && (
        <EditUserForm
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}

export default UsersSettings;

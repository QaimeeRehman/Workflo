function UsersSettings() {
  const users = [
    {
      name: "Admin User",
      email: "admin@example.com",
      role: "Administrator",
      status: "Active",
    },
    {
      name: "Sales User",
      email: "sales@example.com",
      role: "Sales",
      status: "Active",
    },
    {
      name: "Account User",
      email: "accounts@example.com",
      role: "Accounts",
      status: "Inactive",
    },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
        <h2 className="text-base font-semibold text-slate-900">
          Users & Permissions
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Manage users who have access to Workflo.
        </p>
      </div>

      {/* Desktop Table */}
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
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {users.map((user) => (
              <tr key={user.email} className="hover:bg-slate-50/70">
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-slate-900">
                    {user.name}
                  </p>

                  <p className="mt-0.5 text-xs text-slate-500">{user.email}</p>
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {user.role}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                      user.status === "Active"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="divide-y divide-slate-100 md:hidden">
        {users.map((user) => (
          <div key={user.email} className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-900">
                  {user.name}
                </p>

                <p className="mt-1 text-xs text-slate-500">{user.email}</p>

                <p className="mt-2 text-xs text-slate-500">
                  Role:{" "}
                  <span className="font-medium text-slate-700">
                    {user.role}
                  </span>
                </p>
              </div>

              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                  user.status === "Active"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {user.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default UsersSettings;

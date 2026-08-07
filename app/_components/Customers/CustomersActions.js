function CustomersActions() {
  return (
    <td className="px-6 py-4">
      <div className="flex justify-center gap-2">
        <button className="rounded-md bg-slate-100 px-3 py-1 hover:bg-slate-200">
          View
        </button>

        <button className="rounded-md bg-yellow-100 px-3 py-1 text-yellow-700 hover:bg-yellow-200">
          Edit
        </button>

        <button className="rounded-md bg-red-100 px-3 py-1 text-red-700 hover:bg-red-200">
          Delete
        </button>
      </div>
    </td>
  );
}

export default CustomersActions;

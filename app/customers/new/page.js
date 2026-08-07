import NewCustomerForm from "@/app/_components/Customers/NewCustomerForm";

function page() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Add New Customer
          </h1>
          <p className="mt-1 text-slate-500">
            Enter customer information to create a new account.
          </p>
        </div>

        <button className="rounded-lg border border-slate-300 px-5 py-3 font-medium hover:bg-slate-100">
          Back
        </button>
      </div>

      {/* Form */}
      <NewCustomerForm />
    </div>
  );
}

export default page;

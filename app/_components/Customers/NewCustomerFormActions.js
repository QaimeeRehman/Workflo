import { useFormStatus } from "react-dom";
import SpinnerMini from "../SpinnerMini";

function NewCustomerFormActions({ customerId }) {
  const { pending } = useFormStatus();
  return (
    <div className="flex justify-end gap-4 border-t border-gray-200 pt-6">
      <button
        type="reset"
        className="rounded-lg border border-slate-300 px-6 py-3 font-medium hover:bg-slate-100"
      >
        Reset
      </button>

      <button
        type="submit"
        className="rounded-lg bg-primary-500 px-8 py-3 font-semibold text-white transition hover:bg-primary-900"
      >
        {pending ? (
          <SpinnerMini />
        ) : customerId ? (
          "Update customer"
        ) : (
          "Save customer"
        )}
      </button>
    </div>
  );
}

export default NewCustomerFormActions;

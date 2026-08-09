import CRUDButton from "../CRUDButton";
import ResetButton from "../ResetButton";

function NewCustomerFormActions({ customerId }) {
  return (
    <div className="flex justify-end gap-4 border-t border-gray-200 pt-6">
      <ResetButton />
      <CRUDButton>
        {customerId ? "Update customer" : "Save customer"}
      </CRUDButton>
    </div>
  );
}

export default NewCustomerFormActions;

"use client";

import { useFormStatus } from "react-dom";
import SpinnerMini from "./SpinnerMini";

function CRUDButton({ children, className = "" }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={`${className} rounded-lg bg-primary-500 px-8 py-3 font-semibold text-white transition hover:bg-primary-900`}
    >
      {pending ? <SpinnerMini /> : children}
    </button>
  );
}

export default CRUDButton;

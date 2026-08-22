import Info from "@/app/_components/Info";
import { toCapitalize } from "@/app/_lib/helper";
import { format } from "date-fns";

function CustomerInformation({ customer }) {
  const { id, created_at, fullName, saleType, taxCategory, cnic, phone, area } =
    customer;
  return (
    <div className="rounded-xl bg-white p-6  shadow-[0_0_6px_0_rgba(0,0,0,0.2)]">
      <h2 className="mb-6 text-xl font-semibold">Customer Information</h2>

      <div className="grid grid-cols-7 gap-12">
        <span>
          <Info label="Customer ID" value={id} />
        </span>
        <Info label="Phone" value={phone} />
        <Info label="CNIC" value={cnic} />
        <Info label="Sale Type" value={toCapitalize(saleType)} />
        <Info label="Tax Category" value={toCapitalize(taxCategory)} />
        <Info label="Area" value={toCapitalize(area)} />
        <Info
          label="Created At"
          value={format(new Date(created_at), "MMM dd, yyyy")}
        />
      </div>
    </div>
  );
}

export default CustomerInformation;

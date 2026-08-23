import SummaryCard from "../SummaryCard";

function CustomerAccountSummary({ totalSales, totalPaid, outstanding }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <SummaryCard
        label="Total Sales"
        value={`Rs. ${Number(totalSales || 0).toLocaleString("en-PK", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`}
        description="Total billed amount"
      />

      <SummaryCard
        label="Total Paid"
        value={`Rs. ${Number(totalPaid || 0).toLocaleString("en-PK", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`}
        description="Total payments received"
      />

      <SummaryCard
        label="Outstanding"
        value={`Rs. ${Number(outstanding || 0).toLocaleString("en-PK", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`}
        description="Current amount due"
      />
    </div>
  );
}

export default CustomerAccountSummary;

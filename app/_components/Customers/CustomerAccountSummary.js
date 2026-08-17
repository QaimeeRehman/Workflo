import SummaryCard from "../SummaryCard";

function CustomerAccountSummary({ ledgerSummary }) {
  const { totalSales, totalPaid, outstanding } = ledgerSummary || {};
  console.log(ledgerSummary);
  return (
    <div className="grid grid-cols-3 gap-4">
      <SummaryCard
        label="Total Sales"
        value={`Rs. ${totalSales.toLocaleString()}`}
        description="Total billed amount"
      />

      <SummaryCard
        label="Total Paid"
        value={`Rs. ${totalPaid.toLocaleString()}`}
        description="Total payments received"
      />

      <SummaryCard
        label="Outstanding"
        value={`Rs. ${outstanding.toLocaleString()}`}
        description="Current customer balance"
      />
    </div>
  );
}

export default CustomerAccountSummary;

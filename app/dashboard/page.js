import DashboardHeader from "../_components/Dashboard/DashboardHeader";
import DashboardOutstandingCustomers from "../_components/Dashboard/DashboardOutstandingCustomer";
import DashboardRecentBills from "../_components/Dashboard/DashboardRecentBills";
import DashboardRecentPayments from "../_components/Dashboard/DashboardRecentPayments";
import DashboardSalesChart from "../_components/Dashboard/DashboardSalesChart";
import DashboardSummary from "../_components/Dashboard/DashboardSummary";
import {
  getCustomersOwing,
  getDashboardSales,
  getDashboardSummary,
  getRecentBills,
  getRecentPayments,
} from "../_lib/dataService";

async function page({ searchParams }) {
  const params = await searchParams;
  const period = params.period ?? "today";
  const [
    dashboardSummary,
    customersOwing,
    recentBills,
    recentPayments,
    monthlySales,
    yearlySales,
  ] = await Promise.all([
    getDashboardSummary(period),
    getCustomersOwing(5),
    getRecentBills(5),
    getRecentPayments(5),
    getDashboardSales("month"),
    getDashboardSales("year"),
  ]);

  return (
    <div className="space-y-6">
      <DashboardHeader />

      <DashboardSummary dashboardSummary={dashboardSummary} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="h-full xl:col-span-2">
          <DashboardSalesChart
            monthlySales={monthlySales}
            yearlySales={yearlySales}
          />
        </div>
        <div className="h-full">
          <DashboardOutstandingCustomers customers={customersOwing} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <DashboardRecentBills recentBills={recentBills} />
        <DashboardRecentPayments recentPayments={recentPayments} />
      </div>
    </div>
  );
}

export default page;

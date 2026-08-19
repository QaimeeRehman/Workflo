import { TrendingUp } from "lucide-react";

const sales = [
  { day: "Mon", value: 320000 },
  { day: "Tue", value: 450000 },
  { day: "Wed", value: 280000 },
  { day: "Thu", value: 520000 },
  { day: "Fri", value: 410000 },
  { day: "Sat", value: 610000 },
  { day: "Sun", value: 360000 },
];

function DashboardSalesOverview() {
  const max = Math.max(...sales.map((item) => item.value));

  return (
    <section className="h-full rounded-xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-slate-800">Sales Overview</h2>

          <p className="mt-1 text-sm text-slate-500">
            Sales performance this week.
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
          <TrendingUp size={18} />
        </div>
      </div>

      <div className="mt-8 flex h-64 items-end gap-3">
        {sales.map((item) => {
          const height = `${(item.value / max) * 100}%`;

          return (
            <div
              key={item.day}
              className="flex h-full flex-1 flex-col justify-end"
            >
              <div className="flex h-full items-end">
                <div
                  className="w-full rounded-t-md bg-primary-500 transition hover:bg-primary-600"
                  style={{ height }}
                  title={`Rs. ${item.value.toLocaleString()}`}
                />
              </div>

              <p className="mt-3 text-center text-xs font-medium text-slate-500">
                {item.day}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default DashboardSalesOverview;

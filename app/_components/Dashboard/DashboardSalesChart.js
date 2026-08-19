"use client";

import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function formatCurrency(value) {
  return `Rs. ${Number(value).toLocaleString()}`;
}

function DashboardSalesChart({ monthlySales, yearlySales }) {
  const [period, setPeriod] = useState("month");

  const data = period === "month" ? monthlySales : yearlySales;

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-slate-800">Sales</h2>

          <p className="mt-1 text-sm text-slate-500">
            {period === "month"
              ? "Daily sales for this month"
              : "Monthly sales for this year"}
          </p>
        </div>

        {/* Period selector */}
        <div className="flex rounded-lg bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setPeriod("month")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
              period === "month"
                ? "bg-white text-slate-800 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Month
          </button>

          <button
            type="button"
            onClick={() => setPeriod("year")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
              period === "year"
                ? "bg-white text-slate-800 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Year
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-6 h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />

            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 12,
                fill: "#94a3b8",
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              width={70}
              tick={{
                fontSize: 12,
                fill: "#94a3b8",
              }}
              tickFormatter={(value) =>
                value >= 1000000
                  ? `${(value / 1000000).toFixed(1)}M`
                  : `${Math.round(value / 1000)}k`
              }
            />

            <Tooltip
              formatter={(value) => [formatCurrency(value), "Sales"]}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
              }}
            />

            <Line
              type="monotone"
              dataKey="sales"
              stroke="#2563eb"
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 5,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default DashboardSalesChart;

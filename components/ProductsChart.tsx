"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export interface ChartData {
  week: string;
  products: number;
}

const ProductsChart = ({ data }: { data: ChartData[] }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        {/* Gradient definition */}
        <defs>
          <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#10b981" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        {/* Grid */}
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

        {/* Axes */}
        <XAxis
          dataKey="week"
          tick={{ fill: "#065f46", fontSize: 12 }}
        />
        <YAxis
          tick={{ fill: "#065f46", fontSize: 12 }}
          allowDecimals={false}
        />

        {/* Tooltip */}
        <Tooltip
          contentStyle={{
            backgroundColor: "#ecfdf5",
            borderRadius: "8px",
            border: "1px solid #75cca9ff",
            color: "#064e3b",
          }}
        />

        {/* Area (filled curve) */}
        <Area
          type="monotone"
          dataKey="products"
          stroke="#10b981"
          strokeWidth={3}
          fill="url(#greenGradient)"
          dot={{ r: 4, fill: "#065f46" }}
          activeDot={{ r: 6 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ProductsChart;

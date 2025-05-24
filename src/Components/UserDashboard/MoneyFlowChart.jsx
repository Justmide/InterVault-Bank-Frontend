import React, { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid,
} from "recharts";

const generateData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May"];
  return months.map((month) => ({
    name: month,
    Income: Math.floor(3000 + Math.random() * 4000),
    Expense: Math.floor(1500 + Math.random() * 2500),
  }));
};

const MoneyFlowChart = () => {
  const [data, setData] = useState(generateData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateData());
    }, 30000); // every 30 seconds

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div className="w-full max-w-4xl h-[350px] mx-auto">
      <h2 className="text-black text-xl font-semibold mb-4 text-center">Money Flow Overview</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip contentStyle={{ backgroundColor: "#1f1f1f", border: "none" }} />
          <Legend />
          <Line
            type="monotone"
            dataKey="Income"
            stroke="#22c55e"
            strokeWidth={2}
            animationDuration={1000}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="Expense"
            stroke="#ef4444"
            strokeWidth={2}
            animationDuration={1000}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoneyFlowChart;

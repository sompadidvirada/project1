import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useBakeryStore from "../zustand/storage";

const LineChartRecharts = ({ isDashboard = false }) => {
  const dataLine = useBakeryStore((state) => state.dataLine) || [];

  // Convert data to Recharts format
  // Nivo format: [{ id: 'Branch A', data: [{ x: 'Monday', y: 10 }, ...] }, ...]
  // Recharts format: [{ name: 'Monday', 'Branch A': 10, 'Branch B': 20 }, ...]
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const branches = dataLine.map((branch) => branch.id);

  const chartData = daysOfWeek.map((day) => {
    const point = { name: day };
    dataLine.forEach((branch) => {
      const dayData = branch.data.find((d) => d.x === day);
      point[branch.id] = dayData ? dayData.y : 0;
    });
    return point;
  });

  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7300",
    "#413ea0",
    "#ff69b4",
    "#00c49f",
  ];

  return (
    <div style={{ width: "98%", height: isDashboard ? "250px" : "600px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={0} textAnchor="end" />
          <YAxis />
          <Tooltip />
          <Legend />
          {branches.map((branch, index) => (
            <Line
              key={branch}
              type="monotone"
              dataKey={branch}
              stroke={colors[index % colors.length]}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartRecharts;

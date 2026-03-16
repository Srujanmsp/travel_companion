import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00C49F"];

// Tooltip remains the same
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
        }}
      >
        <p style={{ margin: 0, fontWeight: "600", color: "#000" }}>
          {payload[0].name}
        </p>
        <p style={{ margin: 0, color: "#000" }}>
          ₹ {payload[0].value.toFixed(2)}
        </p>
      </div>
    );
  }

  return null;
};

// Custom label to show percentages
const renderCustomLabel = ({ percent, x, y }) => {
  return (
    <text
      x={x}
      y={y}
      fill="#333"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={14}
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function ExpenseChart({ data }) {
  const summary = data.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + Number(item.amount);
    return acc;
  }, {});

  const chartData = Object.entries(summary).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  return (
    <PieChart width={350} height={300}>
      <Pie
        dataKey="value"
        data={chartData}
        cx="50%"
        cy="50%"
        outerRadius={90}
        fill="#8884d8"
        labelLine={false} // ❌ No line from slice to label
        label={renderCustomLabel} // ✅ Show percentage
        isAnimationActive={false}
      >
        {chartData.map((entry, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>

      <Tooltip content={<CustomTooltip />} />
      <Legend />
    </PieChart>
  );
}

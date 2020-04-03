import React from 'react';
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Tooltip,
  Legend,
} from 'recharts';

const data = [
  {
    name: '0',
    orange: 4,
    blue: 2,
    black: 2,
  },
  {
    name: '0.5',
    orange: 3,
    blue: 1,
    black: 2,
  },
  {
    name: '1',
    orange: 2,
    blue: 9,
    black: 2,
  },
  {
    name: '1.5',
    orange: 2,
    blue: 3,
    black: 2,
  },
  {
    name: '2',
    orange: 1,
    blue: 4,
    black: 2,
  },
  {
    name: '2.5',
    orange: 2,
    blue: 3,
    black: 2,
  },
  {
    name: '3',
    orange: 3,
    blue: 4,
    black: 2,
  },
];

function ClickGameLineChart() {
  return (
    <LineChart
      width={800}
      height={400}
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 200,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="orange"
        stroke="#ff9559"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="blue" stroke="#007aff" />
      <Line type="monotone" dataKey="black" stroke="#000000" />
    </LineChart>
  );
}

export default ClickGameLineChart;

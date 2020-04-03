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
import moment from 'moment';

// count click_game by color and elapsed time
const parseLineChartData = (index, duration, color, line_chart_data) => {
  if (
    // orange or blue
    duration >= parseFloat(line_chart_data[index - 1].name) &&
    duration < parseFloat(line_chart_data[index].name)
  ) {
    // black
    line_chart_data[index][color]++;
    if (color === 'orange') {
      line_chart_data[index].black--;
    }
    if (color === 'blue') {
      line_chart_data[index].black++;
    }
  }
};

// calculate all line chart data
const getAllLineChartData = (click_game) => {
  // line chart data
  const line_chart_data = [
    {
      name: '0',
      orange: 0,
      blue: 0,
      black: 0,
    },
    {
      name: '0.5',
      orange: 0,
      blue: 0,
      black: 0,
    },
    {
      name: '1',
      orange: 0,
      blue: 0,
      black: 0,
    },
    {
      name: '1.5',
      orange: 0,
      blue: 0,
      black: 0,
    },
    {
      name: '2',
      orange: 0,
      blue: 0,
      black: 0,
    },
    {
      name: '2.5',
      orange: 0,
      blue: 0,
      black: 0,
    },
    {
      name: '3',
      orange: 0,
      blue: 0,
      black: 0,
    },
    {
      name: '3.5',
      orange: 0,
      blue: 0,
      black: 0,
    },
    {
      name: '4',
      orange: 0,
      blue: 0,
      black: 0,
    },
    {
      name: '4.5',
      orange: 0,
      blue: 0,
      black: 0,
    },
    {
      name: '5',
      orange: 0,
      blue: 0,
      black: 0,
    },
  ];

  const first_clicked_at =
    click_game.length > 0 ? click_game[0]['clicked_at'] : null;
  for (let click of click_game) {
    const duration = moment
      .duration(moment(click.clicked_at).diff(moment(first_clicked_at)))
      .as('seconds');

    for (let i = 1; i < line_chart_data.length - 1; i++) {
      parseLineChartData(i, duration, click.color, line_chart_data);
    }
  }

  return line_chart_data;
};

const renderLegend = (props) => {
  return <div className="d-flex justify-content-center">Second(s)</div>;
};

// function component
function ClickGameLineChart({ click_game }) {
  const data = getAllLineChartData(click_game);
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
      <YAxis
        type="number"
        domain={['dataMin', 'dataMax']}
        label={{ value: 'Click(s)', angle: -90, position: 'insideLeft' }}
      />
      <Tooltip />
      <Legend content={renderLegend} />
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

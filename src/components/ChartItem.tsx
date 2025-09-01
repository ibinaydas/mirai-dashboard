
import React from 'react';
import {
  LineChart, BarChart, AreaChart, PieChart, ScatterChart, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Line, Bar, Area, Pie, Cell, Scatter
} from 'recharts';
import { CHART_COLORS } from '../constants/colors';

const ChartItem = ({ chart }) => {
  const { type, title, config, data } = chart;
  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={config.xAxisKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={config.dataKey}
              stroke={config.color || '#8884d8'}
              strokeWidth={2}
            />
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={config.xAxisKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={config.dataKey} fill={config.color || '#82ca9d'} />
          </BarChart>
        );
      case 'area':
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={config.xAxisKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey={config.dataKey}
              stroke={config.color || '#ffc658'}
              fill={config.color || '#ffc658'}
              fillOpacity={0.6}
            />
          </AreaChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey={config.dataKey}
              nameKey={config.nameKey}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        );
      case 'scatter':
        return (
          <ScatterChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={config.xAxisKey} name="Satisfaction" />
            <YAxis dataKey={config.yAxisKey} name="Sales" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter
              name="Data Points"
              data={data}
              fill={config.color || '#ff7300'}
            />
          </ScatterChart>
        );
      default:
        return <div className="p-4 text-gray-500">Unsupported chart type: {type}</div>;
    }
  };
  return (
    <div
      className="chart-container"
      style={{ width: config.width, minHeight: config.height + 50 }}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={config.height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default ChartItem;

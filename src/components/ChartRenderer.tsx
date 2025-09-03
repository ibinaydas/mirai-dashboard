import React from 'react';
import {
  LineChart, BarChart, AreaChart, PieChart, ScatterChart, RadarChart,
  ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Line, Bar, Area, Pie, Cell, Scatter, Radar,
  RadarChart as RadarChartComponent, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { ChartConfig, SeriesConfig } from '../types/chart';
import { CHART_COLORS } from '../constants/global';

interface ChartRendererProps {
  config: ChartConfig;
  onDataPointClick?: (data: any, index: number) => void;
  onSeriesHover?: (data: any, series: SeriesConfig) => void;
}

const ChartRenderer: React.FC<ChartRendererProps> = ({ config, onDataPointClick, onSeriesHover }) => {
  const { type, data, axes, series, styling, layout } = config;

  // Render X-Axis components
  const renderXAxes = () => {
    if (!axes?.xAxis) return <XAxis dataKey="name" />;
    return axes.xAxis.map((axis, index) => (
      <XAxis
        key={index}
        xAxisId={axis.xAxisId}
        dataKey={axis.dataKey}
        type={axis.type}
        domain={axis.domain !== 'auto' ? axis.domain : undefined}
        tickCount={axis.tickCount}
        label={axis.label}
        orientation={axis.orientation as any}
        hide={axis.hide}
        style={axis.style}
      />
    ));
  };

  // Render Y-Axis components
  const renderYAxes = () => {
    if (!axes?.yAxis) return <YAxis />;
    return axes.yAxis.map((axis, index) => (
      <YAxis
        key={index}
        yAxisId={axis.yAxisId}
        dataKey={axis.dataKey}
        type={axis.type}
        domain={axis.domain !== 'auto' ? axis.domain : undefined}
        tickCount={axis.tickCount}
        label={axis.label}
        orientation={axis.orientation as any}
        hide={axis.hide}
        style={axis.style}
      />
    ));
  };

  // Render series based on chart type
  const renderSeries = () => {
    return series.map((seriesConfig, index) => {
      const color = seriesConfig.stroke || seriesConfig.fill || CHART_COLORS[index % CHART_COLORS.length];
      switch (type) {
        case 'line':
          return (
            <Line
              key={index}
              type={seriesConfig.type || 'monotone'}
              dataKey={seriesConfig.dataKey}
              stroke={seriesConfig.stroke || color}
              strokeWidth={seriesConfig.strokeWidth || 2}
              strokeDasharray={seriesConfig.strokeDasharray}
              yAxisId={seriesConfig.yAxisId}
              name={seriesConfig.name}
              opacity={seriesConfig.opacity}
            />
          );
        case 'bar':
          return (
            <Bar
              key={index}
              dataKey={seriesConfig.dataKey}
              fill={seriesConfig.fill || color}
              yAxisId={seriesConfig.yAxisId}
              name={seriesConfig.name}
              opacity={seriesConfig.opacity}
              stackId={seriesConfig.stackId}
              barSize={seriesConfig.barSize}
              maxBarSize={seriesConfig.maxBarSize}
            />
          );
        case 'area':
          return (
            <Area
              key={index}
              type={seriesConfig.type || 'monotone'}
              dataKey={seriesConfig.dataKey}
              stroke={seriesConfig.stroke || color}
              fill={seriesConfig.fill || color}
              fillOpacity={seriesConfig.opacity || 0.6}
              yAxisId={seriesConfig.yAxisId}
              name={seriesConfig.name}
              stackId={seriesConfig.stackId}
            />
          );
        case 'scatter':
          return (
            <Scatter
              key={index}
              name={seriesConfig.name || `Series ${index + 1}`}
              data={data}
              fill={seriesConfig.fill || color}
            />
          );
        case 'radar':
          return (
            <Radar
              key={index}
              name={seriesConfig.name || `Series ${index + 1}`}
              dataKey={seriesConfig.dataKey}
              stroke={seriesConfig.stroke || color}
              fill={seriesConfig.fill || color}
              fillOpacity={seriesConfig.opacity || 0.6}
            />
          );
        case 'composed':
          // For composed charts, use custom.chartType to determine the component
          const chartType = seriesConfig.custom?.chartType || 'line';
          if (chartType === 'bar') {
            return (
              <Bar
                key={index}
                dataKey={seriesConfig.dataKey}
                fill={seriesConfig.fill || color}
                yAxisId={seriesConfig.yAxisId}
                name={seriesConfig.name}
                opacity={seriesConfig.opacity}
                stackId={seriesConfig.stackId}
              />
            );
          } else if (chartType === 'area') {
            return (
              <Area
                key={index}
                type={seriesConfig.custom?.type || 'monotone'}
                dataKey={seriesConfig.dataKey}
                stroke={seriesConfig.stroke || color}
                fill={seriesConfig.fill || color}
                fillOpacity={seriesConfig.opacity || 0.6}
                yAxisId={seriesConfig.yAxisId}
                name={seriesConfig.name}
              />
            );
          } else {
            return (
              <Line
                key={index}
                type={seriesConfig.custom?.type || 'monotone'}
                dataKey={seriesConfig.dataKey}
                stroke={seriesConfig.stroke || color}
                strokeWidth={seriesConfig.strokeWidth || 2}
                yAxisId={seriesConfig.yAxisId}
                name={seriesConfig.name}
              />
            );
          }
        default:
          return null;
      }
    });
  };

  // Render Pie chart separately due to different structure
  const renderPieChart = () => {
    const seriesConfig = series[0]; // Pie charts typically have one series
    return (
      <PieChart>
        <Pie
          data={data}
          cx={seriesConfig.cx || '50%'}
          cy={seriesConfig.cy || '50%'}
          innerRadius={seriesConfig.innerRadius || 0}
          outerRadius={seriesConfig.outerRadius || 80}
          dataKey={seriesConfig.dataKey}
          nameKey={seriesConfig.custom?.nameKey || 'name'}
          label={seriesConfig.custom?.label}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.fill || CHART_COLORS[index % CHART_COLORS.length]}
            />
          ))}
        </Pie>
        {styling?.tooltip?.show !== false && <Tooltip />}
        {styling?.legend?.show !== false && <Legend />}
      </PieChart>
    );
  };

  // Render Radar chart separately
  const renderRadarChart = () => {
    return (
      <RadarChartComponent data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis />
        {renderSeries()}
        {styling?.tooltip?.show !== false && <Tooltip />}
        {styling?.legend?.show !== false && <Legend />}
      </RadarChartComponent>
    );
  };

  // Main chart renderer
  const renderChart = () => {
    const commonProps = {
      data,
      margin: layout.margin,
    };
    switch (type) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            {styling?.grid?.show !== false && (
              <CartesianGrid
                strokeDasharray={styling?.grid?.strokeDasharray || '3 3'}
                stroke={styling?.grid?.stroke}
                opacity={styling?.grid?.opacity}
              />
            )}
            {renderXAxes()}
            {renderYAxes()}
            {styling?.tooltip?.show !== false && (
              <Tooltip
                separator={styling?.tooltip?.separator}
                contentStyle={styling?.tooltip?.contentStyle}
                cursor={styling?.tooltip?.cursor}
              />
            )}
            {styling?.legend?.show !== false && (
              <Legend
                verticalAlign={styling?.legend?.verticalAlign}
                height={styling?.legend?.height}
                iconType={styling?.legend?.iconType}
              />
            )}
            {renderSeries()}
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart {...commonProps}>
            {styling?.grid?.show !== false && (
              <CartesianGrid strokeDasharray={styling?.grid?.strokeDasharray || '3 3'} />
            )}
            {renderXAxes()}
            {renderYAxes()}
            {styling?.tooltip?.show !== false && <Tooltip />}
            {styling?.legend?.show !== false && <Legend />}
            {renderSeries()}
          </BarChart>
        );
      case 'area':
        return (
          <AreaChart {...commonProps}>
            {styling?.grid?.show !== false && (
              <CartesianGrid strokeDasharray={styling?.grid?.strokeDasharray || '3 3'} />
            )}
            {renderXAxes()}
            {renderYAxes()}
            {styling?.tooltip?.show !== false && <Tooltip />}
            {styling?.legend?.show !== false && <Legend />}
            {renderSeries()}
          </AreaChart>
        );
      case 'scatter':
        return (
          <ScatterChart {...commonProps}>
            {styling?.grid?.show !== false && (
              <CartesianGrid strokeDasharray={styling?.grid?.strokeDasharray || '3 3'} />
            )}
            {renderXAxes()}
            {renderYAxes()}
            {styling?.tooltip?.show !== false && <Tooltip cursor={{ strokeDasharray: '3 3' }} />}
            {styling?.legend?.show !== false && <Legend />}
            {renderSeries()}
          </ScatterChart>
        );
      case 'composed':
        return (
          <ComposedChart {...commonProps}>
            {styling?.grid?.show !== false && (
              <CartesianGrid strokeDasharray={styling?.grid?.strokeDasharray || '3 3'} />
            )}
            {renderXAxes()}
            {renderYAxes()}
            {styling?.tooltip?.show !== false && <Tooltip />}
            {styling?.legend?.show !== false && <Legend />}
            {renderSeries()}
          </ComposedChart>
        );
      case 'pie':
        return renderPieChart();
      case 'radar':
        return renderRadarChart();
      default:
        return <div className="unsupported-chart">Unsupported chart type: {type}</div>;
    }
  };

  return (
    <>
      <h3 className="chart-title">{config.title}</h3>
      <ResponsiveContainer width={layout.width || "100%"} height={layout.height}>
        {renderChart()}
      </ResponsiveContainer>
    </>
  );
};

export default ChartRenderer;
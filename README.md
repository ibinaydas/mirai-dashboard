# 📊 Mirai Dashboard - Generic Chart System

> A powerful, flexible, and type-safe chart configuration system built on top of Recharts for React applications.

[![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Recharts](https://img.shields.io/badge/Recharts-2.8+-FF6B6B?style=flat-square&logo=recharts)](https://recharts.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

## ✨ Features

### 🎨 **Comprehensive Chart Types**
- **Line Charts**: Single & multi-series with customizable styling
- **Bar Charts**: Grouped, stacked, and individual with flexible configurations
- **Area Charts**: Stacked and overlapping with gradient support
- **Pie Charts**: Standard and donut charts with custom labeling
- **Scatter Plots**: Correlation analysis with multi-dimensional data
- **Radar Charts**: Multi-axis comparison with customizable scales
- **Composed Charts**: Hybrid visualizations combining different chart types

### 🔧 **Advanced Configuration**
- **Multi-Series Support**: Display multiple data series in a single chart
- **Dual Axis Support**: Left and right Y-axes for different metrics
- **Flexible Styling**: Comprehensive theming and customization options
- **Interactive Elements**: Tooltips, legends, and hover effects
- **Responsive Design**: Auto-sizing with container-based dimensions

### 🏗️ **Developer Experience**
- **TypeScript First**: Full type safety with comprehensive interfaces
- **Builder Pattern**: Fluent API for easy chart configuration
- **Hot Reloading**: Real-time chart updates during development
- **Error Handling**: Graceful fallbacks and detailed error messages
- **Performance Optimized**: Efficient rendering for large datasets

### 🎯 **Production Ready**
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Mobile Responsive**: Touch-friendly interactions
- **Theme Support**: Light/dark themes with custom palettes
- **Data Validation**: Built-in validation for chart configurations
- **Extensible**: Easy to add new chart types and features

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/ibinaydas/mirai-dashboard.git
cd mirai-dashboard

# Install dependencies
npm install

# Start development server
npm start
```

### Basic Usage

```typescript
import { createLineChart } from './utils/chartConfigBuilder';
import ChartItem from './components/ChartItem';

// Create a simple line chart
const salesChart = createLineChart(
  'monthly-sales',
  'Monthly Sales Trend',
  salesData,
  'sales',
  'month'
).withLayout({ height: 350 })
 .build();

// Render the chart
<ChartItem chart={{
  id: 'monthly-sales',
  type: 'line',
  title: 'Monthly Sales Trend',
  data: salesData,
  config: salesChart
}} />
```

## 📈 Chart Types & Examples

### Line Charts
Perfect for showing trends over time with single or multiple data series.

```typescript
const multiLineChart = createMultiLineChart(
  'performance-metrics',
  'Revenue vs Profit',
  data,
  [
    { dataKey: 'revenue', name: 'Revenue', color: '#8884d8' },
    { dataKey: 'profit', name: 'Profit', color: '#82ca9d' }
  ]
).withLayout({ height: 400 })
 .withLegend(true, { verticalAlign: 'top' })
 .build();
```

### Composed Charts
Combine different chart types for comprehensive data visualization.

```typescript
const composedChart = createComposedChart('sales-analysis', 'Sales Analysis', data)
  .withSeries({
    dataKey: 'volume',
    name: 'Sales Volume',
    fill: '#8884d8',
    yAxisId: 'left',
    custom: { chartType: 'bar' }
  })
  .withSeries({
    dataKey: 'conversionRate',
    name: 'Conversion %',
    stroke: '#ff7300',
    strokeWidth: 2,
    yAxisId: 'right',
    custom: { chartType: 'line' }
  })
  .build();
```

### Donut Charts
Modern pie charts with customizable inner radius.

```typescript
const donutChart = createPieChart('market-share', 'Market Share', data)
  .withSeries({
    dataKey: 'value',
    cx: '50%',
    cy: '50%',
    outerRadius: 120,
    innerRadius: 60,
    custom: { nameKey: 'name', label: true }
  })
  .build();
```

## 🏗️ Architecture

### Builder Pattern
Fluent API for creating chart configurations:

```typescript
const chart = new ChartConfigBuilder('line', 'chart-id', 'Chart Title')
  .withData(chartData)
  .withLayout({ height: 300, margin: { top: 20, right: 30, left: 20, bottom: 5 } })
  .withXAxis({ dataKey: 'month', type: 'category' })
  .withYAxis({ type: 'number', domain: [0, 'dataMax + 1000'] })
  .withSeries({
    dataKey: 'sales',
    stroke: '#8884d8',
    strokeWidth: 2,
    type: 'monotone'
  })
  .withGrid(true, '3 3')
  .withTooltip(true)
  .withLegend(true, { verticalAlign: 'top' })
  .build();
```

### Component Structure

```
src/
├── components/
│   ├── ChartItem.tsx              # Chart wrapper component
│   ├── GenericChartRenderer.tsx   # Main chart renderer
│   └── ChartDemo.tsx             # Interactive demo
├── types/
│   └── chart.ts                  # TypeScript interfaces
├── utils/
│   └── chartConfigBuilder.ts     # Builder pattern utilities
├── constants/
│   └── global.tsx               # Colors, themes, defaults
├── examples/
│   └── chartExamples.ts         # Example configurations
└── services/
    └── api.ts                   # Data fetching
```

## 📚 API Reference

### GenericChartConfig Interface

```typescript
interface GenericChartConfig {
  type: 'line' | 'bar' | 'area' | 'pie' | 'scatter' | 'radar' | 'composed';
  id: string;
  title: string;
  layout: {
    width?: string | number;
    height: number;
    margin?: { top?: number; right?: number; bottom?: number; left?: number };
  };
  data: any[];
  axes?: {
    xAxis?: AxisConfig[];
    yAxis?: AxisConfig[];
  };
  series: SeriesConfig[];
  styling?: {
    background?: string;
    grid?: GridConfig;
    tooltip?: TooltipConfig;
    legend?: LegendConfig;
  };
  options?: Record<string, any>;
}
```

### Builder Methods

| Method | Description | Example |
|--------|-------------|---------|
| `withData(data)` | Set chart data | `.withData(salesData)` |
| `withLayout(layout)` | Configure dimensions | `.withLayout({ height: 400 })` |
| `withSeries(series)` | Add data series | `.withSeries({ dataKey: 'sales' })` |
| `withXAxis(config)` | Configure X-axis | `.withXAxis({ dataKey: 'month' })` |
| `withYAxis(config)` | Configure Y-axis | `.withYAxis({ type: 'number' })` |
| `withGrid(show, pattern)` | Configure grid | `.withGrid(true, '3 3')` |
| `withTooltip(show, options)` | Configure tooltip | `.withTooltip(true)` |
| `withLegend(show, options)` | Configure legend | `.withLegend(true)` |
| `build()` | Build configuration | `.build()` |

## 🎨 Theming & Customization

### Color Palettes

```typescript
// Default colors
CHART_COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe'
];

// Extended palette with theme variants
EXTENDED_CHART_COLORS = {
  primary: ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe'],
  blue: ['#0088fe', '#1890ff', '#40a9ff', '#69c0ff', '#91d5ff'],
  green: ['#00c49f', '#52c41a', '#73d13d', '#95de64', '#b7eb8f'],
  orange: ['#ff7300', '#fa541c', '#ff7875', '#ffa39e', '#ffbb96']
};
```

### Theme Configuration

```typescript
const darkTheme = {
  colors: ['#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1'],
  grid: { strokeDasharray: '3 3', stroke: '#434343' },
  tooltip: { 
    contentStyle: { 
      backgroundColor: '#1f1f1f', 
      border: '1px solid #434343',
      color: '#fff'
    } 
  }
};
```

## 📊 Performance & Best Practices

### Data Optimization
- **Large Datasets**: Use data sampling for >1000 points
- **Real-time Updates**: Implement data throttling
- **Memory Management**: Clean up event listeners

### Component Optimization
```typescript
// Memoize expensive chart components
const MemoizedChart = React.memo(ChartItem, (prevProps, nextProps) => {
  return prevProps.chart.id === nextProps.chart.id && 
         JSON.stringify(prevProps.chart.data) === JSON.stringify(nextProps.chart.data);
});
```

### Responsive Design
```typescript
// Auto-sizing with container queries
.withLayout({ 
  width: '100%', 
  height: 300,
  margin: { top: 20, right: 30, left: 20, bottom: 5 }
})
```

## 🔧 Development

### Setup Development Environment

```bash
# Install dependencies
npm install

# Start development server with hot reload
npm start

# Run TypeScript compiler in watch mode
npm run type-check:watch

# Run tests
npm test

# Build for production
npm run build
```

### Adding New Chart Types

1. **Update Types**: Add new chart type to `GenericChartConfig['type']`
2. **Extend Renderer**: Add case to `GenericChartRenderer.tsx`
3. **Create Builder**: Add helper function to `chartConfigBuilder.ts`
4. **Add Examples**: Include in `chartExamples.ts`
5. **Update Tests**: Add test cases for new chart type

Example:
```typescript
// 1. Update type
type ChartType = 'line' | 'bar' | 'funnel'; // Add 'funnel'

// 2. Add to renderer
case 'funnel':
  return <FunnelChart data={data}>...</FunnelChart>;

// 3. Create builder helper
export const createFunnelChart = (id, title, data) => 
  new ChartConfigBuilder('funnel', id, title).withData(data);
```
import { ChartConfig, SeriesConfig, AxisConfig } from '../types/chart';

export class ChartConfigBuilder {
    private config: Partial<ChartConfig>;

    constructor(type: ChartConfig['type'], id: string, title: string) {
        this.config = {
            type,
            id,
            title,
            layout: { height: 300 },
            series: [],
            styling: {
                grid: { show: true, strokeDasharray: '3 3' },
                tooltip: { show: true },
                legend: { show: true }
            }
        };
    }

    // Set chart data
    withData(data: any[]): ChartConfigBuilder {
        this.config.data = data;
        return this;
    }

    // Set layout properties
    withLayout(layout: Partial<ChartConfig['layout']>): ChartConfigBuilder {
        this.config.layout = { ...this.config.layout, ...layout };
        return this;
    }

    // Add X-axis configuration
    withXAxis(config: AxisConfig): ChartConfigBuilder {
        if (!this.config.axes) this.config.axes = {};
        if (!this.config.axes.xAxis) this.config.axes.xAxis = [];
        this.config.axes.xAxis.push(config);
        return this;
    }

    // Add Y-axis configuration
    withYAxis(config: AxisConfig): ChartConfigBuilder {
        if (!this.config.axes) this.config.axes = {};
        if (!this.config.axes.yAxis) this.config.axes.yAxis = [];
        this.config.axes.yAxis.push(config);
        return this;
    }

    // Add series configuration
    withSeries(series: SeriesConfig): ChartConfigBuilder {
        if (!this.config.series) this.config.series = [];
        this.config.series.push(series);
        return this;
    }

    // Add multiple series at once
    withMultipleSeries(seriesArray: SeriesConfig[]): ChartConfigBuilder {
        if (!this.config.series) this.config.series = [];
        this.config.series.push(...seriesArray);
        return this;
    }

    // Configure grid styling
    withGrid(show: boolean = true, strokeDasharray: string = '3 3', stroke?: string): ChartConfigBuilder {
        if (!this.config.styling) this.config.styling = {};
        this.config.styling.grid = { show, strokeDasharray, stroke };
        return this;
    }

    // Configure tooltip
    withTooltip(show: boolean = true, options?: Partial<NonNullable<ChartConfig['styling']>['tooltip']>): ChartConfigBuilder {
        if (!this.config.styling) this.config.styling = {};
        this.config.styling.tooltip = { show, ...options };
        return this;
    }

    // Configure legend
    withLegend(show: boolean = true, options?: Partial<NonNullable<ChartConfig['styling']>['legend']>): ChartConfigBuilder {
        if (!this.config.styling) this.config.styling = {};
        this.config.styling.legend = { show, ...options };
        return this;
    }

    // Add custom options
    withOptions(options: Record<string, any>): ChartConfigBuilder {
        this.config.options = { ...this.config.options, ...options };
        return this;
    }

    // Build the final configuration
    build(): ChartConfig {
        if (!this.config.data || this.config.data.length === 0) {
            throw new Error('Chart data is required');
        }
        if (!this.config.series || this.config.series.length === 0) {
            throw new Error('At least one series is required');
        }
        return this.config as ChartConfig;
    }
}

// Utility functions for common chart patterns
export const createLineChart = (id: string, title: string, data: any[], dataKey: string, xAxisKey: string = 'name') => {
    return new ChartConfigBuilder('line', id, title)
        .withData(data)
        .withXAxis({ dataKey: xAxisKey, type: 'category' })
        .withYAxis({ type: 'number' })
        .withSeries({
            dataKey,
            stroke: '#8884d8',
            strokeWidth: 2,
            type: 'monotone'
        });
};

export const createMultiLineChart = (id: string, title: string, data: any[], seriesConfigs: { dataKey: string; name: string; color: string }[], xAxisKey: string = 'name') => {
    const builder = new ChartConfigBuilder('line', id, title)
        .withData(data)
        .withXAxis({ dataKey: xAxisKey, type: 'category' })
        .withYAxis({ type: 'number' });
    seriesConfigs.forEach(series => {
        builder.withSeries({
            dataKey: series.dataKey,
            name: series.name,
            stroke: series.color,
            strokeWidth: 2,
            type: 'monotone'
        });
    });
    return builder;
};

export const createBarChart = (id: string, title: string, data: any[], dataKey: string, xAxisKey: string = 'name') => {
    return new ChartConfigBuilder('bar', id, title)
        .withData(data)
        .withXAxis({ dataKey: xAxisKey, type: 'category' })
        .withYAxis({ type: 'number' })
        .withSeries({
            dataKey,
            fill: '#82ca9d'
        });
};

export const createStackedBarChart = (id: string, title: string, data: any[], seriesConfigs: { dataKey: string; name: string; color: string }[], xAxisKey: string = 'name') => {
    const builder = new ChartConfigBuilder('bar', id, title)
        .withData(data)
        .withXAxis({ dataKey: xAxisKey, type: 'category' })
        .withYAxis({ type: 'number' });

    seriesConfigs.forEach(series => {
        builder.withSeries({
            dataKey: series.dataKey,
            name: series.name,
            fill: series.color,
            stackId: 'stack1'
        });
    });
    return builder;
};

export const createPieChart = (id: string, title: string, data: any[], dataKey: string = 'value', nameKey: string = 'name') => {
    return new ChartConfigBuilder('pie', id, title)
        .withData(data)
        .withSeries({
            dataKey,
            cx: '50%',
            cy: '50%',
            outerRadius: 80,
            custom: { nameKey }
        })
        .withLegend(true, { verticalAlign: 'bottom' });
};

export const createComposedChart = (id: string, title: string, data: any[], xAxisKey: string = 'name') => {
    return new ChartConfigBuilder('composed', id, title)
        .withData(data)
        .withXAxis({ dataKey: xAxisKey, type: 'category' })
        .withYAxis({ yAxisId: 'left', type: 'number' })
        .withYAxis({ yAxisId: 'right', type: 'number', orientation: 'right' });
};

export const createScatterChart = (id: string, title: string, data: any[], xDataKey: string, yDataKey: string) => {
    return new ChartConfigBuilder('scatter', id, title)
        .withData(data)
        .withXAxis({ dataKey: xDataKey, type: 'number' })
        .withYAxis({ dataKey: yDataKey, type: 'number' })
        .withSeries({
            dataKey: yDataKey,
            fill: '#ff7300'
        });
};

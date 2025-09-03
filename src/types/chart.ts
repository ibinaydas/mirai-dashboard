// Generic Chart Configuration Types
export interface ChartConfig {
    // Basic chart properties
    type: 'line' | 'bar' | 'area' | 'pie' | 'scatter' | 'radar' | 'treemap' | 'funnel' | 'composed';
    title: string;
    id: string;

    // Layout configuration
    layout: {
        width?: string | number;
        height: number;
        margin?: { top?: number; right?: number; bottom?: number; left?: number };
    };

    // Data configuration
    data: any[];

    // Axes configuration (flexible for multiple axes)
    axes?: {
        xAxis?: AxisConfig[];
        yAxis?: AxisConfig[];
    };

    // Series configuration (supports multiple series)
    series: SeriesConfig[];

    // Chart-wide styling and behavior
    styling?: {
        background?: string;
        grid?: GridConfig;
        tooltip?: TooltipConfig;
        legend?: LegendConfig;
    };

    // Chart-specific options
    options?: Record<string, any>;
}

export interface AxisConfig {
    dataKey?: string;
    type?: 'number' | 'category';
    domain?: [number | string, number | string] | 'auto';
    tickCount?: number;
    tickFormatter?: string;
    label?: string;
    orientation?: 'top' | 'bottom' | 'left' | 'right';
    hide?: boolean;
    style?: Record<string, any>;
    xAxisId?: string | number;
    yAxisId?: string | number;
}

export interface SeriesConfig {
    // Universal series properties
    dataKey: string;
    name?: string;

    // Visual styling
    stroke?: string;
    fill?: string;
    strokeWidth?: number;
    strokeDasharray?: string;
    opacity?: number;

    // Series-specific properties
    type?: 'monotone' | 'linear' | 'step' | 'stepBefore' | 'stepAfter';
    stackId?: string;
    yAxisId?: string | number;

    // Pie chart specific
    cx?: string | number;
    cy?: string | number;
    innerRadius?: number;
    outerRadius?: number;

    // Bar chart specific  
    barSize?: number;
    maxBarSize?: number;

    // Custom properties for extensibility
    custom?: Record<string, any>;
}

export interface GridConfig {
    show?: boolean;
    strokeDasharray?: string;
    stroke?: string;
    opacity?: number;
}

export interface TooltipConfig {
    show?: boolean;
    formatter?: string;
    labelFormatter?: string;
    separator?: string;
    contentStyle?: Record<string, any>;
    cursor?: boolean | Record<string, any>;
}

export interface LegendConfig {
    show?: boolean;
    verticalAlign?: 'top' | 'middle' | 'bottom';
    height?: number;
    iconType?: 'line' | 'rect' | 'circle' | 'cross' | 'diamond' | 'square' | 'star' | 'triangle' | 'wye';
    payload?: any[];
}

// Chart interface using generic configuration
export interface Chart {
    id: string;
    type: string;
    title: string;
    data: any[];
    config: ChartConfig;
}

// Chart renderer props
export interface ChartRendererProps {
    config: ChartConfig;
    onDataPointClick?: (data: any, index: number) => void;
    onSeriesHover?: (data: any, series: SeriesConfig) => void;
}
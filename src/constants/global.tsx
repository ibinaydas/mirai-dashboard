export const CHART_COLORS = [
    '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe',
    '#00c49f', '#ffbb28', '#ff8042', '#8dd1e1', '#d084d0'
];

// Extended color palette for more variety
export const EXTENDED_CHART_COLORS = {
    primary: [
        '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe',
        '#00c49f', '#ffbb28', '#ff8042', '#8dd1e1', '#d084d0'
    ],
    blue: [
        '#0088fe', '#1890ff', '#40a9ff', '#69c0ff', '#91d5ff',
        '#bae7ff', '#e6f7ff', '#003a8c', '#002766', '#001529'
    ],
    green: [
        '#00c49f', '#52c41a', '#73d13d', '#95de64', '#b7eb8f',
        '#d9f7be', '#f6ffed', '#135200', '#092b00', '#051b00'
    ],
    orange: [
        '#ff7300', '#fa541c', '#ff7875', '#ffa39e', '#ffbb96',
        '#ffd591', '#fff2e8', '#ad2102', '#5c0a00', '#2a0300'
    ],
    purple: [
        '#d084d0', '#722ed1', '#9254de', '#b37feb', '#d3adf7',
        '#efdbff', '#f9f0ff', '#391085', '#120338', '#030014'
    ],
    gradient: [
        'linear-gradient(90deg, #8884d8 0%, #82ca9d 100%)',
        'linear-gradient(90deg, #ffc658 0%, #ff7300 100%)',
        'linear-gradient(90deg, #0088fe 0%, #00c49f 100%)'
    ]
};

// Theme configurations for different chart types
export const CHART_THEMES = {
    default: {
        colors: CHART_COLORS,
        grid: { strokeDasharray: '3 3', stroke: '#f0f0f0' },
        tooltip: {
            contentStyle: {
                backgroundColor: '#fff',
                border: '1px solid #d9d9d9',
                borderRadius: '4px'
            }
        },
        legend: { iconType: 'rect' as const }
    },
    dark: {
        colors: ['#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1'],
        grid: { strokeDasharray: '3 3', stroke: '#434343' },
        tooltip: {
            contentStyle: {
                backgroundColor: '#1f1f1f',
                border: '1px solid #434343',
                borderRadius: '4px',
                color: '#fff'
            }
        },
        legend: { iconType: 'circle' as const }
    },
    minimal: {
        colors: ['#666666', '#999999', '#cccccc', '#444444', '#888888'],
        grid: { strokeDasharray: '1 1', stroke: '#e8e8e8' },
        tooltip: {
            contentStyle: {
                backgroundColor: '#fafafa',
                border: 'none',
                borderRadius: '2px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }
        },
        legend: { iconType: 'line' as const }
    },
    vibrant: {
        colors: ['#ff4d4f', '#1890ff', '#52c41a', '#faad14', '#722ed1', '#eb2f96'],
        grid: { strokeDasharray: '5 5', stroke: '#f0f0f0' },
        tooltip: {
            contentStyle: {
                backgroundColor: '#fff',
                border: '2px solid #1890ff',
                borderRadius: '8px'
            }
        },
        legend: { iconType: 'diamond' as const }
    }
};

// Chart type specific defaults
export const CHART_TYPE_DEFAULTS = {
    line: {
        strokeWidth: 2,
        type: 'monotone' as const,
        dot: false
    },
    bar: {
        fill: '#8884d8',
        radius: [0, 0, 0, 0]
    },
    area: {
        fillOpacity: 0.6,
        strokeWidth: 2,
        type: 'monotone' as const
    },
    pie: {
        cx: '50%',
        cy: '50%',
        outerRadius: 80,
        innerRadius: 0,
        label: true
    },
    scatter: {
        fill: '#ff7300'
    },
    radar: {
        fillOpacity: 0.6,
        strokeWidth: 2
    }
};

// Responsive breakpoints for chart layouts
export const CHART_BREAKPOINTS = {
    mobile: 576,
    tablet: 768,
    desktop: 1024,
    large: 1200
};

// Default chart dimensions based on type
export const DEFAULT_CHART_DIMENSIONS = {
    line: { height: 300, minHeight: 200 },
    bar: { height: 320, minHeight: 220 },
    area: { height: 280, minHeight: 180 },
    pie: { height: 400, minHeight: 300 },
    scatter: { height: 350, minHeight: 250 },
    radar: { height: 400, minHeight: 300 },
    composed: { height: 380, minHeight: 280 }
};

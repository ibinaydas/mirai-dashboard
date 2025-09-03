import { ChartConfig } from "../types/chart";

export const DummyData = {
    dashboardConfig: {
        title: "Advanced Sales Analytics Dashboard"
    },
    insights: {
        summary: "Sales performance shows strong growth in Q2 with Electronics leading category performance. Multi-channel analysis reveals mobile conversion improvement opportunities.",
        keyMetrics: [
            { label: "Total Revenue", value: "$278,000", change: "+12.5%" },
            { label: "Active Customers", value: "1,247", change: "+8.2%" },
            { label: "Avg Order Value", value: "$223", change: "+5.1%" },
            { label: "Conversion Rate", value: "3.4%", change: "+0.8%" }
        ],
        recommendations: [
            "Focus marketing efforts on Electronics category",
            "Investigate Q1 performance dip for improvement opportunities",
            "Consider expanding Product A market share",
            "Monitor customer satisfaction correlation with sales",
            "Optimize mobile conversion funnel"
        ]
    },
    tableData: {
        title: "Top Products Performance",
        headers: ["Product", "Sales", "Units", "Revenue", "Growth"],
        rows: [
            ["iPhone 15", "$45,000", "200", "$45,000", "+15%"],
            ["MacBook Pro", "$38,000", "95", "$38,000", "+8%"],
            ["iPad Air", "$22,000", "150", "$22,000", "+12%"],
            ["AirPods Pro", "$18,000", "360", "$18,000", "+25%"],
            ["Apple Watch", "$15,000", "125", "$15,000", "+6%"]
        ]
    },
    charts: [
        // Multi-series line chart
        {
            id: "multi-series-performance",
            type: "line",
            title: "Revenue & Profit Trend",
            data: [
                { month: 'Jan', revenue: 4000, profit: 1200, expenses: 2800 },
                { month: 'Feb', revenue: 3000, profit: 900, expenses: 2100 },
                { month: 'Mar', revenue: 5000, profit: 1800, expenses: 3200 },
                { month: 'Apr', revenue: 4500, profit: 1600, expenses: 2900 },
                { month: 'May', revenue: 6000, profit: 2200, expenses: 3800 },
                { month: 'Jun', revenue: 5500, profit: 2000, expenses: 3500 }
            ],
            config: {
                type: 'line',
                title: 'Revenue & Profit Trend',
                id: 'multi-series-performance',
                layout: { height: 320 },
                data: [
                    { month: 'Jan', revenue: 4000, profit: 1200, expenses: 2800 },
                    { month: 'Feb', revenue: 3000, profit: 900, expenses: 2100 },
                    { month: 'Mar', revenue: 5000, profit: 1800, expenses: 3200 },
                    { month: 'Apr', revenue: 4500, profit: 1600, expenses: 2900 },
                    { month: 'May', revenue: 6000, profit: 2200, expenses: 3800 },
                    { month: 'Jun', revenue: 5500, profit: 2000, expenses: 3500 }
                ],
                axes: {
                    xAxis: [{ dataKey: 'month', type: 'category' }],
                    yAxis: [{ type: 'number', domain: [0, 'dataMax + 500'] }]
                },
                series: [
                    {
                        dataKey: 'revenue',
                        name: 'Revenue',
                        stroke: '#8884d8',
                        strokeWidth: 3,
                        type: 'monotone'
                    },
                    {
                        dataKey: 'profit',
                        name: 'Profit',
                        stroke: '#82ca9d',
                        strokeWidth: 2,
                        type: 'monotone'
                    },
                    {
                        dataKey: 'expenses',
                        name: 'Expenses',
                        stroke: '#ff7c7c',
                        strokeWidth: 2,
                        type: 'monotone',
                        strokeDasharray: '5 5'
                    }
                ],
                styling: {
                    grid: { show: true, strokeDasharray: '3 3' },
                    tooltip: { show: true },
                    legend: { show: true, verticalAlign: 'top' }
                }
            } as ChartConfig
        },

        // Composed chart (bars + line)
        {
            id: "composed-sales-conversion",
            type: "composed",
            title: "Sales Volume vs Conversion Rate",
            data: [
                { month: 'Jan', sales: 590, conversion: 4.5, visitors: 1200 },
                { month: 'Feb', sales: 868, conversion: 5.2, visitors: 1800 },
                { month: 'Mar', sales: 1397, conversion: 6.8, visitors: 2100 },
                { month: 'Apr', sales: 1480, conversion: 7.2, visitors: 2300 },
                { month: 'May', sales: 1520, conversion: 6.9, visitors: 2200 },
                { month: 'Jun', sales: 1400, conversion: 7.5, visitors: 2000 }
            ],
            config: {
                type: 'composed',
                title: 'Sales Volume vs Conversion Rate',
                id: 'composed-sales-conversion',
                layout: { height: 350 },
                data: [
                    { month: 'Jan', sales: 590, conversion: 4.5, visitors: 1200 },
                    { month: 'Feb', sales: 868, conversion: 5.2, visitors: 1800 },
                    { month: 'Mar', sales: 1397, conversion: 6.8, visitors: 2100 },
                    { month: 'Apr', sales: 1480, conversion: 7.2, visitors: 2300 },
                    { month: 'May', sales: 1520, conversion: 6.9, visitors: 2200 },
                    { month: 'Jun', sales: 1400, conversion: 7.5, visitors: 2000 }
                ],
                axes: {
                    xAxis: [{ dataKey: 'month', type: 'category' }],
                    yAxis: [
                        { yAxisId: 'left', type: 'number' },
                        { yAxisId: 'right', type: 'number', orientation: 'right' }
                    ]
                },
                series: [
                    {
                        dataKey: 'sales',
                        name: 'Sales Volume',
                        fill: '#8884d8',
                        yAxisId: 'left',
                        custom: { chartType: 'bar' }
                    },
                    {
                        dataKey: 'visitors',
                        name: 'Visitors',
                        fill: '#82ca9d',
                        yAxisId: 'left',
                        opacity: 0.7,
                        custom: { chartType: 'bar' }
                    },
                    {
                        dataKey: 'conversion',
                        name: 'Conversion Rate %',
                        stroke: '#ff7300',
                        strokeWidth: 3,
                        yAxisId: 'right',
                        custom: { chartType: 'line', type: 'monotone' }
                    }
                ],
                styling: {
                    grid: { show: true, strokeDasharray: '3 3' },
                    tooltip: { show: true },
                    legend: { show: true, verticalAlign: 'top' }
                }
            } as ChartConfig
        },

        // Enhanced Pie chart with custom styling
        {
            id: "enhanced-market-share",
            type: "pie",
            title: "Enhanced Market Share Distribution",
            data: [
                { name: 'Desktop', value: 400, fill: '#0088FE' },
                { name: 'Mobile', value: 300, fill: '#00C49F' },
                { name: 'Tablet', value: 200, fill: '#FFBB28' },
                { name: 'Smart TV', value: 100, fill: '#FF8042' }
            ],
            config: {
                type: 'pie',
                title: 'Enhanced Market Share Distribution',
                id: 'enhanced-market-share',
                layout: { height: 400 },
                data: [
                    { name: 'Desktop', value: 400, fill: '#0088FE' },
                    { name: 'Mobile', value: 300, fill: '#00C49F' },
                    { name: 'Tablet', value: 200, fill: '#FFBB28' },
                    { name: 'Smart TV', value: 100, fill: '#FF8042' }
                ],
                series: [
                    {
                        dataKey: 'value',
                        name: 'Market Share',
                        cx: '50%',
                        cy: '50%',
                        outerRadius: 120,
                        innerRadius: 40,
                        custom: {
                            nameKey: 'name',
                            label: true,
                            labelLine: false
                        }
                    }
                ],
                styling: {
                    tooltip: { show: true },
                    legend: { show: true, verticalAlign: 'bottom', height: 36 }
                }
            } as ChartConfig
        },

        // Stacked Area Chart
        {
            id: "stacked-revenue-channels",
            type: "area",
            title: "Revenue by Channel (Stacked)",
            data: [
                { month: 'Jan', online: 2400, retail: 1600, wholesale: 1000 },
                { month: 'Feb', online: 1398, retail: 1200, wholesale: 800 },
                { month: 'Mar', online: 3800, retail: 1800, wholesale: 1200 },
                { month: 'Apr', online: 3908, retail: 1900, wholesale: 1100 },
                { month: 'May', online: 4800, retail: 2200, wholesale: 1400 },
                { month: 'Jun', online: 3490, retail: 2100, wholesale: 1300 }
            ],
            config: {
                type: 'area',
                title: 'Revenue by Channel (Stacked)',
                id: 'stacked-revenue-channels',
                layout: { height: 320 },
                data: [
                    { month: 'Jan', online: 2400, retail: 1600, wholesale: 1000 },
                    { month: 'Feb', online: 1398, retail: 1200, wholesale: 800 },
                    { month: 'Mar', online: 3800, retail: 1800, wholesale: 1200 },
                    { month: 'Apr', online: 3908, retail: 1900, wholesale: 1100 },
                    { month: 'May', online: 4800, retail: 2200, wholesale: 1400 },
                    { month: 'Jun', online: 3490, retail: 2100, wholesale: 1300 }
                ],
                axes: {
                    xAxis: [{ dataKey: 'month', type: 'category' }],
                    yAxis: [{ type: 'number' }]
                },
                series: [
                    {
                        dataKey: 'online',
                        name: 'Online',
                        stackId: '1',
                        fill: '#8884d8',
                        stroke: '#8884d8'
                    },
                    {
                        dataKey: 'retail',
                        name: 'Retail',
                        stackId: '1',
                        fill: '#82ca9d',
                        stroke: '#82ca9d'
                    },
                    {
                        dataKey: 'wholesale',
                        name: 'Wholesale',
                        stackId: '1',
                        fill: '#ffc658',
                        stroke: '#ffc658'
                    }
                ],
                styling: {
                    grid: { show: true, strokeDasharray: '3 3' },
                    tooltip: { show: true },
                    legend: { show: true, verticalAlign: 'top' }
                }
            } as ChartConfig
        },

        // Stacked Bar Chart
        {
            id: "category-breakdown",
            type: "bar",
            title: "Category Performance by Channel",
            data: [
                { category: 'Electronics', online: 12000, retail: 8000, wholesale: 4000 },
                { category: 'Clothing', online: 8000, retail: 6000, wholesale: 3000 },
                { category: 'Books', online: 6000, retail: 4000, wholesale: 2000 },
                { category: 'Home', online: 9000, retail: 7000, wholesale: 3500 }
            ],
            config: {
                type: 'bar',
                title: 'Category Performance by Channel',
                id: 'category-breakdown',
                layout: { height: 320 },
                data: [
                    { category: 'Electronics', online: 12000, retail: 8000, wholesale: 4000 },
                    { category: 'Clothing', online: 8000, retail: 6000, wholesale: 3000 },
                    { category: 'Books', online: 6000, retail: 4000, wholesale: 2000 },
                    { category: 'Home', online: 9000, retail: 7000, wholesale: 3500 }
                ],
                axes: {
                    xAxis: [{ dataKey: 'category', type: 'category' }],
                    yAxis: [{ type: 'number' }]
                },
                series: [
                    {
                        dataKey: 'online',
                        name: 'Online',
                        fill: '#8884d8',
                        stackId: 'channels'
                    },
                    {
                        dataKey: 'retail',
                        name: 'Retail',
                        fill: '#82ca9d',
                        stackId: 'channels'
                    },
                    {
                        dataKey: 'wholesale',
                        name: 'Wholesale',
                        fill: '#ffc658',
                        stackId: 'channels'
                    }
                ],
                styling: {
                    grid: { show: true, strokeDasharray: '3 3' },
                    tooltip: { show: true },
                    legend: { show: true, verticalAlign: 'top' }
                }
            } as ChartConfig
        },
        // Enhanced scatter plot with multiple data points
        {
            id: "enhanced-customer-satisfaction",
            type: "scatter",
            title: "Customer Satisfaction vs Sales Performance",
            data: [
                { satisfaction: 8.5, sales: 12000, region: 'North' },
                { satisfaction: 7.2, sales: 8000, region: 'South' },
                { satisfaction: 9.1, sales: 15000, region: 'East' },
                { satisfaction: 6.8, sales: 6000, region: 'West' },
                { satisfaction: 8.9, sales: 13500, region: 'Central' },
                { satisfaction: 7.8, sales: 10500, region: 'Northwest' },
                { satisfaction: 8.3, sales: 11200, region: 'Southeast' }
            ],
            config: {
                type: 'scatter',
                title: 'Customer Satisfaction vs Sales Performance',
                id: 'enhanced-customer-satisfaction',
                layout: { height: 350 },
                data: [
                    { satisfaction: 8.5, sales: 12000, region: 'North' },
                    { satisfaction: 7.2, sales: 8000, region: 'South' },
                    { satisfaction: 9.1, sales: 15000, region: 'East' },
                    { satisfaction: 6.8, sales: 6000, region: 'West' },
                    { satisfaction: 8.9, sales: 13500, region: 'Central' },
                    { satisfaction: 7.8, sales: 10500, region: 'Northwest' },
                    { satisfaction: 8.3, sales: 11200, region: 'Southeast' }
                ],
                axes: {
                    xAxis: [{ dataKey: 'satisfaction', type: 'number', domain: [6, 10], label: 'Customer Satisfaction Score' }],
                    yAxis: [{ dataKey: 'sales', type: 'number', domain: [0, 'dataMax + 1000'], label: 'Sales ($)' }]
                },
                series: [
                    {
                        dataKey: 'sales',
                        name: 'Regional Performance',
                        fill: '#ff7300',
                        opacity: 0.8
                    }
                ],
                styling: {
                    grid: { show: true, strokeDasharray: '3 3' },
                    tooltip: {
                        show: true,
                        cursor: { strokeDasharray: '3 3' }
                    },
                    legend: { show: true }
                }
            } as ChartConfig
        }
    ]
};
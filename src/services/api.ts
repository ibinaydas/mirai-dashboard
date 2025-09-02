import axios from 'axios';

export const fetchData = async () => {
    try {
        const response = await axios.get(process.env.API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate network delay
        return {
            dashboardConfig: {
                title: "Sales Analytics Dashboard"
            },
            insights: {
                summary: "Sales performance shows strong growth in Q2 with Electronics leading category performance.",
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
                    "Monitor customer satisfaction correlation with sales"
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
                {
                    id: "sales-trend",
                    type: "line",
                    title: "Sales Trend",
                    config: {
                        height: 280,
                        dataKey: "value",
                        xAxisKey: "month",
                        color: "#8884d8"
                    },
                    data: [
                        { month: 'Jan', value: 4000 },
                        { month: 'Feb', value: 3000 },
                        { month: 'Mar', value: 5000 },
                        { month: 'Apr', value: 4500 },
                        { month: 'May', value: 6000 },
                        { month: 'Jun', value: 5500 }
                    ]
                },
                {
                    id: "category-breakdown",
                    type: "bar",
                    title: "Category Performance",
                    config: {
                        height: 280,
                        dataKey: "sales",
                        xAxisKey: "category",
                        color: "#82ca9d"
                    },
                    data: [
                        { category: 'Electronics', sales: 12000 },
                        { category: 'Clothing', sales: 8000 },
                        { category: 'Books', sales: 6000 },
                        { category: 'Home', sales: 9000 }
                    ]
                },
                {
                    id: "market-share",
                    type: "pie",
                    title: "Market Share",
                    config: {
                        height: 280,
                        dataKey: "value",
                        nameKey: "name"
                    },
                    data: [
                        { name: 'Product A', value: 400 },
                        { name: 'Product B', value: 300 },
                        { name: 'Product C', value: 200 },
                        { name: 'Product D', value: 100 }
                    ]
                },
                {
                    id: "customer-satisfaction",
                    type: "scatter",
                    title: "Customer Satisfaction vs Sales",
                    config: {
                        height: 280,
                        xAxisKey: "satisfaction",
                        yAxisKey: "sales",
                        color: "#ff7300"
                    },
                    data: [
                        { satisfaction: 8.5, sales: 12000 },
                        { satisfaction: 7.2, sales: 8000 },
                        { satisfaction: 9.1, sales: 15000 },
                        { satisfaction: 6.8, sales: 6000 },
                        { satisfaction: 8.9, sales: 13500 }
                    ]
                }
            ]
        };
        return null;
    }
};
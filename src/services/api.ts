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
            charts: [
                {
                    id: "sales-trend",
                    type: "line",
                    title: "Sales Trend",
                    config: {
                        width: "50%",
                        height: 300,
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
                        width: "50%",
                        height: 300,
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
                    id: "revenue-area",
                    type: "area",
                    title: "Revenue Growth",
                    config: {
                        width: "100%",
                        height: 300,
                        dataKey: "revenue",
                        xAxisKey: "quarter",
                        color: "#ffc658"
                    },
                    data: [
                        { quarter: 'Q1', revenue: 50000 },
                        { quarter: 'Q2', revenue: 65000 },
                        { quarter: 'Q3', revenue: 78000 },
                        { quarter: 'Q4', revenue: 85000 }
                    ]
                },
                {
                    id: "market-share",
                    type: "pie",
                    title: "Market Share",
                    config: {
                        width: "50%",
                        height: 300,
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
                        width: "50%",
                        height: 300,
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
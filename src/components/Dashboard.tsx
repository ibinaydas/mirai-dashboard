
import React, { useState, useEffect } from 'react';
import { fetchData } from '../services/api';
import ChartItem from './ChartItem';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API call
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await fetchData();
      setData(data);
      setError(null);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard API error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleRefresh = () => {
    fetchDashboardData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="error-message">
            {error}
          </div>
          <button
            onClick={handleRefresh}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="dashboard-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="dashboard-title">
              {data.dashboardConfig.title}
            </h1>
            <button className="refresh-button" onClick={handleRefresh}>Refresh</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap -mx-3">
          {data.charts.map((chart) => (
            <div
              key={chart.id}
              className="px-3 mb-6"
              style={{ width: chart.config.width }}
            >
              <ChartItem chart={chart} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

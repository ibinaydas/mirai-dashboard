
import React, { useState, useEffect, useRef } from 'react';
import { fetchData } from '../services/api';
import ResizableHandle from './ResizableHandle';
import InsightPanel from './InsightPanel';
import ChartPanel from './ChartPanel';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [leftPanelWidth, setLeftPanelWidth] = useState(50); // Percentage
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef(null);

  // API call
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await fetchData();
      setDashboardData(data);
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

  // Handle resizing
  const handleMouseDown = (e) => {
    setIsResizing(true);
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;

      // Constrain between 20% and 80%
      const constrainedWidth = Math.min(Math.max(newLeftWidth, 20), 80);
      setLeftPanelWidth(constrainedWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing]);

  const handleRefresh = () => {
    fetchDashboardData();
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <div className="error-message">
            {error}
          </div>
          <button
            onClick={handleRefresh}
            className="retry-button"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="dashboard-header-inner">
            <h1 className="dashboard-title">
              {dashboardData.dashboardConfig.title}
            </h1>
            <div className="dashboard-controls">
              <div className="dashboard-timestamp">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
              <button
                onClick={handleRefresh}
                className="refresh-button"
              >
                Refresh Data
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Split Panel Container */}
      <div ref={containerRef} className="split-container">
        {/* Left Panel - Insights and Tabular Data */}
        <div
          className="left-panel"
          style={{ width: `${leftPanelWidth}%` }}
        >
          <InsightPanel
            insights={dashboardData.insights}
            tableData={dashboardData.tableData}
          />
        </div>

        {/* Resizable Handle */}
        <ResizableHandle onMouseDown={handleMouseDown} />

        {/* Right Panel - Charts */}
        <div
          className="right-panel"
          style={{ width: `${100 - leftPanelWidth}%` }}
        >
          <ChartPanel charts={dashboardData.charts} />
        </div>
      </div>

      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-bar-content">
          <span>
            {dashboardData.charts?.length || 0} charts loaded
          </span>
          <span>
            Split: {Math.round(leftPanelWidth)}% / {Math.round(100 - leftPanelWidth)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

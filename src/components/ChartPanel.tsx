import React from 'react';
import ChartRenderer from './ChartRenderer';
import { Chart } from '../types/chart';

interface ChartItemProps {
  charts: Chart[];
}

const ChartPanel: React.FC<ChartItemProps> = ({ charts }) => {
  return (
    <div className="charts-panel">
      <h2 className="charts-title">Analytics</h2>
      <div className="charts-container">
        {charts ? charts.map((chart) => (
          <ChartRenderer config={chart.config} />
        )) : <div className="error-message">Chart configuration(s) missing</div>}
      </div>
    </div>
  );
};

export default ChartPanel;
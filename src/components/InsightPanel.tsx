import DataTable from "./DataTable";
import KeyMetrics from "./KeyMetrics";

const InsightPanel = ({ insights, tableData }) => (
  <div className="insights-panel">
    <h2 className="insights-title">Data Insights</h2>
    
    {/* Key Metrics */}
    <div className="insights-section">
      <h3 className="section-title">Key Metrics</h3>
      <KeyMetrics metrics={insights.keyMetrics} />
    </div>

    {/* Summary */}
    <div className="insights-section">
      <h3 className="section-title">Executive Summary</h3>
      <div className="summary-box">
        <p className="summary-text">{insights.summary}</p>
      </div>
    </div>

    {/* Data Table */}
    <DataTable tableData={tableData} />

    {/* Recommendations */}
    <div className="insights-section">
      <h3 className="section-title">Recommendations</h3>
      <div className="recommendations-list">
        {insights.recommendations.map((rec, index) => (
          <div key={index} className="recommendation-item">
            <div className="recommendation-number">
              <span className="recommendation-number-text">{index + 1}</span>
            </div>
            <p className="recommendation-text">{rec}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default InsightPanel;
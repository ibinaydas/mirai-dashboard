const KeyMetrics = ({ metrics }) => (
    <div className="metrics-grid">
        {metrics.map((metric, index) => (
            <div key={index} className="metric-card">
                <div className="metric-label">{metric.label}</div>
                <div className="metric-value">{metric.value}</div>
                <div className={metric.change.startsWith('+') ? 'metric-change-positive' : 'metric-change-negative'}>
                    {metric.change}
                </div>
            </div>
        ))}
    </div>
);

export default KeyMetrics;
import ChartItem from "./ChartItem";

const ChartPanel = ({ charts }) => (
    <div className="charts-panel">
        <h2 className="charts-title">Analytics Dashboard</h2>
        <div className="charts-container">
            {charts.map((chart) => (
                <ChartItem key={chart.id} chart={chart} />
            ))}
        </div>
    </div>
);

export default ChartPanel;
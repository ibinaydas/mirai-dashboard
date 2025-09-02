const DataTable = ({ tableData }) => (
  <div className="insights-section">
    <h3 className="section-title">{tableData.title}</h3>
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr className="table-header">
            {tableData.headers.map((header, index) => (
              <th key={index} className="table-header-cell">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="table-row">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="table-cell">
                  {cellIndex === row.length - 1 ? (
                    <span className={cell.startsWith('+') ? 'table-cell-positive' : 'table-cell-negative'}>
                      {cell}
                    </span>
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default DataTable;
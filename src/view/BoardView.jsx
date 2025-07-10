import React from 'react';

const BoardView = ({ model, boardState, onCellClick, tableData }) => {
  const columnLabels = ['P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W'];
  const rowLabels = ['1', '2', '3', '4'];

  return (
    <div style={{ padding: 20 }}>
      <h2>Draw Board</h2>

      {/* Column Headers */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '40px repeat(8, 90px)',
        marginBottom: '10px',
        alignItems: 'center',
      }}>
        <div></div> {/* Empty top-left cell */}
        {columnLabels.map((col, idx) => (
          <div key={idx} style={{ textAlign: 'center', fontWeight: 'bold' }}>{col}</div>
        ))}
      </div>
        
      {/* Grid Rows with Row Labels */}
      <div style={{ display: 'grid', gridTemplateRows: 'repeat(4, 1fr)' }}>
        {rowLabels.map((row, rowIndex) => (
          <div
            key={rowIndex}
            style={{
              display: 'grid',
              gridTemplateColumns: '40px repeat(8, 80px)',
              gap: '10px',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <div style={{ textAlign: 'center', fontWeight: 'bold' }}>{row}</div>
            {boardState.slice(rowIndex * 8, rowIndex * 8 + 8).map((value, colIndex) => {
              const idx = rowIndex * 8 + colIndex;
              return (
                <button
                  key={idx}
                  onClick={() => onCellClick(idx)}
                  disabled={value?.disabled}
                  style={{ height: 60, fontSize: 18 }}
                >
                  {value?.text || '?'}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      {tableData.length > 0 && (
        <div>
          <h2>Team Table</h2>
          <table border="1" cellPadding="8" style={{ width: '100%' }}>
            {/* <thead>
          <tr>
            <th>Column A</th>
            <th>Column B</th>
          </tr>
        </thead> */}
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td>{row.A}</td>
                  <td>{row.B}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


      )}


    </div>
  );
};

export default BoardView;

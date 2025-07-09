import React from 'react';

const BoardView = ({ model, boardState, onCellClick, tableData }) => {
  const rows = model.rows;
  const cols = model.boardSize;

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 60px)` }}>
        {model.xLabels.map((label, i) => (
          <div key={i} style={{ fontWeight: 'bold', textAlign: 'center' }}>{label}</div>
        ))}
        {Array.from({ length: rows * cols }).map((_, i) => (
          <button
            key={i}
            onClick={() => onCellClick(i)}
            disabled={boardState[i]?.disabled}
            style={{
              width: 60,
              height: 60,
              margin: 2,
              backgroundColor: boardState[i]?.disabled ? '#add8e6' : '#fff',
              fontSize: 18,
            }}
          >
            {boardState[i]?.text || "?"}
          </button>
        ))}
      </div>

      <table border="1" style={{ width: "100%", marginTop: 20 }}>
        <thead>
          <tr>
            <th>A</th>
            <th>B</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, idx) => (
            <tr key={idx}>
              <td>{row.A}</td>
              <td>{row.B}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BoardView;

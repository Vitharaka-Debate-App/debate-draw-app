import React from 'react';
import Swal from 'sweetalert2';

const BoardView = ({ model, boardState, onCellClick, tableData }) => {
  const columnLabels = ['P', 'Q', 'R', 'S'];
  const rowLabels = ['1', '2'];

  return (
    <div style={{ padding: 20 }}>
      <h2>Draw Board</h2>

      {/* Column Headers */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '40px repeat(4, 80px)',
        marginBottom: '10px',
        alignItems: 'center',
      }}>
        <div></div> {/* Empty top-left cell */}
        {columnLabels.map((col, idx) => (
          <div key={idx} style={{ textAlign: 'center', fontWeight: 'bold' }}>{col}</div>
        ))}
      </div>

      {/* Grid Rows with Row Labels */}
      <div style={{ display: 'grid', gridTemplateRows: 'repeat(2, 1fr)' }}>
        {rowLabels.map((row, rowIndex) => (
          <div
            key={rowIndex}
            style={{
              display: 'grid',
              gridTemplateColumns: '40px repeat(4, 80px)',
              gap: '10px',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <div style={{ textAlign: 'center', fontWeight: 'bold' }}>{row}</div>


            {boardState.slice(rowIndex * 8, rowIndex * 8 + 8).map((value, colIndex) => {
              const idx = rowIndex * 8 + colIndex;

              const letterCoord = `${String.fromCharCode(65 + colIndex)}${rowIndex + 1}`; // A1, B1, ...
              const columnLabels = Array.from({ length: 8 }, (_, i) => String.fromCharCode(80 + i)); // P–W
              const coordText = `(${columnLabels[colIndex]},${rowIndex + 1})`; // (P,1), etc.

              return (
                <button
                  key={idx}
                  // onClick={() => {
                  //   onCellClick(idx)
                  //   console.log( letterCoord,coordText );

                  // }}
                  onClick={() => {

                    Swal.fire({
                      title: "Are you sure?",
                      text: "You won't be able to revert this!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes, delete it!"
                    }).then((result) => {
                      if (result.isConfirmed) {
                        // Swal.fire({
                        //   title: "Deleted!",
                        //   text: "Your file has been deleted.",
                        //   icon: "success"
                        // });
                         onCellClick(idx);
                      }
                    });
                    // const confirmClick = window.confirm("Are you sure you want to select this cell?");
                    // if (confirmClick) {
                     
                    // }
                  }}

                  disabled={value?.disabled}
                  style={{
                    height: 70,
                    fontSize: 14,
                    padding: '4px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div>{value?.text || '?'}</div>
                  {/* <small style={{ fontSize: 10, color: '#555' }}>{letterCoord}</small>
                  <small style={{ fontSize: 10, color: '#777' }}>{coordText}</small> */}
                </button>
              );
            })}



            {/* {boardState.slice(rowIndex * 4, rowIndex * 4 + 4).map((value, colIndex) => {
              const idx = rowIndex * 4 + colIndex;
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
            })} */}
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

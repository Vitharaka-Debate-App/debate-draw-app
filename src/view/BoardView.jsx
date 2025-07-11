import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Bounce, ToastContainer, toast } from 'react-toastify';

const BoardView = ({ model, boardState, onCellClick, tableData }) => {
  const columnLabels = ['P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W'];
  const rowLabels = ['1', '2', '3', '4'];
  const [showToast, setShowToast] = useState(false);
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

              const letterCoord = `${String.fromCharCode(65 + colIndex)}${rowIndex + 1}`;
              const columnLabels = Array.from({ length: 8 }, (_, i) => String.fromCharCode(80 + i));
              const coordText = `(${columnLabels[colIndex]},${rowIndex + 1})`;

              return (
                <button
                  key={idx}
                  onClick={() => {
                    const swalWithBootstrapButtons = Swal.mixin({
                      customClass: {
                        confirmButton: "btn btn-success",
                        cancelButton: "btn btn-danger"
                      },
                      buttonsStyling: false
                    });
                    swalWithBootstrapButtons.fire({
                      title: "Are you sure?",
                      html: `You are selected: <b>${coordText}</b>`,
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonText: "Yes",
                      cancelButtonText: "No",
                      reverseButtons: true
                    }).then((result) => {
                      if (result.isConfirmed) {
                        onCellClick(idx)
                        setShowToast(true)
                        toast.success('Successfully saved!', {
                          position: "bottom-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "dark",
                          transition: Bounce,
                        });
                        setShowToast(false)
                      }
                    });
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
      {showToast && <ToastContainer />}
    </div>
  );
};

export default BoardView;

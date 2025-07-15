import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import LogoScreensaver from '../components/LogoScreensaver';
import '../App.css'
import animatedGif from '../assets/vwi2.gif';

const BoardView = ({ model, boardState, onCellClick, tableData }) => {
  const columnLabels = ['P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X'];
  const rowLabels = ['1', '2', '3', '4'];
  const [showToast, setShowToast] = useState(false);
  return (
    <div style={{
      display: 'flex',
      gap: '150px',
      paddingRight: tableData.length > 0 ? '200px' : '0',
      transition: 'padding-right 0.5s ease',
    }}>

      <div style={{
        paddingTop: '15%',
        minWidth: '400px', // Prevent shrinking
        transition: 'all 0.5s ease', // Smooth movement
      }}>
        <div>
          <h1 style={{ color: '#eff1f5', paddingBottom: '30px' }}>Draw Board</h1>

          {/* Column Headers */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '40px repeat(9, 90px)',
            marginBottom: '10px',
            alignItems: 'center',
          }}>
            <div></div> {/* Empty top-left cell */}
            {columnLabels.map((col, idx) => (
              <div key={idx} style={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#e6e9ef',
                fontSize: '30px'

              }}>{col}</div>
            ))}
          </div>

          {/* Grid Rows with Row Labels */}
          <div style={{ display: 'grid', gridTemplateRows: 'repeat(4, 1fr)' }}>
            {rowLabels.map((row, rowIndex) => (
              <div
                key={rowIndex}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '40px repeat(9, 80px)',
                  gap: '10px',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <div style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: '#e6e9ef',
                  fontSize: '30px'
                }}>{row}</div>

                {boardState.slice(rowIndex * 9, rowIndex * 9 + 9).map((value, colIndex) => {
                  const idx = rowIndex * 9 + colIndex;

                  const letterCoord = `${String.fromCharCode(65 + colIndex)}${rowIndex + 1}`;
                  const columnLabels = Array.from({ length: 9 }, (_, i) => String.fromCharCode(80 + i));
                  const coordText = `(${columnLabels[colIndex]},${rowIndex + 1})`;

                  return (
                    <button
                      key={idx}
                      className="grid-button"
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
                      <div style={{ fontSize: '30px' }}>{value?.text || '?'}</div>
                    </button>
                  );
                })}

              </div>
            ))}
          </div>
        </div>
        {showToast && <ToastContainer />}
      </div>

      <div
        style={{
          position: 'absolute',
          top: '30px',          
          right: '30px',        
          opacity: tableData.length > 0 ? 1 : 0,
          transition: 'opacity 0.6s ease-in-out',
          padding: '10px',      
          borderRadius: '10px', 
          zIndex: 10,
        }}
      >
        {tableData.length > 0 && (
          <div
          >
            <h2
              style={{ color: '#e6e9ef', marginBottom: '10px', paddingBottom: '30px' }}>Team Table</h2>
            <table
              cellPadding="0"
              cellSpacing="0"
              style={{
                borderCollapse: 'separate',
                borderSpacing: '20px 15px',
                width: '100%'
              }}
            >
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index} style={{ height: '10px', marginBottom: '100px' }}>
                    {row.A &&
                      <td
                        className="fade-in-cell"
                        style={{
                          backgroundColor: '#eff1f5',
                          width: '200px',
                          height: '10px',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderRadius: '6px',
                          margin: '10px'
                        }}
                      >
                        <h3 style={{ margin: 0 }}>{row.A}</h3>
                      </td>
                    }
                    {row.B &&
                      <td
                        className="fade-in-cell"
                        style={{
                          backgroundColor: '#eff1f5',
                          width: '200px',
                          height: '10px',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderRadius: '6px',
                          margin: '10px'
                        }}
                      >
                        <h3 style={{ margin: 0 }}>{row.B}</h3>
                      </td>
                    }
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>


    </div>
  );
};

export default BoardView;

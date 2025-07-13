import React, { useRef, useState } from 'react';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import './App.css';

import BoardModel from './model/BoardModel';
import BoardController from './controller/BoardController';
import BoardView from './view/BoardView';
import Swal from 'sweetalert2';
import animatedGif from './assets/13.gif';
import sltcLogo from './assets/sltc-logo.png';
import mediaUnitLogo from './assets/media-unit-logo.png';



function App() {
  const modelRef = useRef(new BoardModel());

  const [boardState, setBoardState] = useState(
    Array(32).fill(null).map(() => ({ text: '', disabled: false }))
  );
  const [tableData, setTableData] = useState([]);

  // Only create the controller ONCE using useRef
  const controllerRef = useRef(
    new BoardController(modelRef.current, setBoardState, setTableData)
  );

  const handleClick = (idx: number) => {
    controllerRef.current.handleClick(idx, boardState, tableData);
  };

  const refreshGame = () => {
    modelRef.current.reshuffle();
    controllerRef.current.clickIndex = 1;
    setBoardState(Array(32).fill(null).map(() => ({ text: '', disabled: false })));
    setTableData([]);
  };

  return (
    <div style={{ display: 'flex', }}>
      <div style={{ paddingTop: '40px', paddingLeft: '20px', position: 'fixed', top: 0, left: 0, zIndex: 9999 }}>
        <img src={animatedGif} alt="Animated Logo" style={{ width: '350px' }} />
      </div>

      <div >
        <BoardView
          model={modelRef.current}
          boardState={boardState}
          onCellClick={handleClick}
          tableData={tableData}
        />

        {tableData.length > 0 && (

          <button
            style={{
              margin: '20px',
              padding: '10px 20px',
              marginBottom: '30px',
              marginTop: '60px',
              color: '#2e3440',
              borderRadius: '6px'

            }}
            onClick={() => {
              const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: "btn btn-success",
                  cancelButton: "btn btn-danger"
                },
                buttonsStyling: false
              });
              swalWithBootstrapButtons.fire({
                title: "Are you sure to reload?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                reverseButtons: true
              }).then((result) => {
                if (result.isConfirmed) {
                  refreshGame()
                  toast.success('Reloaded', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                  });
                }
              });
            }}
          >
            Reload
          </button>
        )}
        <ToastContainer />
      </div>
      <div style={{
        width: '100%',
        position: 'fixed',
        bottom: '10px',
        left: 0,
        display: 'flex',
        justifyContent: 'left',
        gap: '40px',
        zIndex: 9999,
        paddingLeft: '70px'
      }}>
        <div style={{ display: 'flex', gap: '40px', marginBottom: '5px' }}>
          <img src={sltcLogo} alt="SLTC" style={{ width: '200px' }} />
          <img src={mediaUnitLogo} alt="Media Unit" style={{ width: '200px', paddingBottom: '17px' }} />
        </div>
        <div style={{ fontSize: '14px', color: '#fff', marginTop: 'auto',paddingBottom: '90px' }}>
          © {new Date().getFullYear()} Rukshan Ranasinghe (DeW)
        </div>
      </div>
    </div>
  );
}

export default App;
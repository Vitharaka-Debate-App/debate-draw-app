import React, { useRef, useState } from 'react';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import './App.css';

import BoardModel from './model/BoardModel';
import BoardController from './controller/BoardController';
import BoardView from './view/BoardView';
import Swal from 'sweetalert2';



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
    <div>
      <BoardView
        model={modelRef.current}
        boardState={boardState}
        onCellClick={handleClick}
        tableData={tableData}
      />

      {tableData.length > 0 && (

        <button
          style={{ margin: '20px', padding: '10px 20px' }}
          onClick={() => {
            const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
              },
              buttonsStyling: false
            });
            swalWithBootstrapButtons.fire({
              title: "Are you sure to refresh?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Yes",
              cancelButtonText: "No",
              reverseButtons: true
            }).then((result) => {
              if (result.isConfirmed) {
                refreshGame()
                toast.success('Refreshed', {
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
          🔄 Refresh
        </button>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
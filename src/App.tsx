import React, { useRef, useState } from 'react';
import './App.css';

import BoardModel from './model/BoardModel';
import BoardController from './controller/BoardController';
import BoardView from './view/BoardView';



function App() {
  const modelRef = useRef(new BoardModel());

  const [boardState, setBoardState] = useState(
    Array(8).fill(null).map(() => ({ text: '', disabled: false }))
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
    setBoardState(Array(8).fill(null).map(() => ({ text: '', disabled: false })));
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
        <button onClick={refreshGame} style={{ margin: '20px', padding: '10px 20px' }}>
          🔄 Refresh
        </button>
      )}


    </div>
  );
}

export default App;
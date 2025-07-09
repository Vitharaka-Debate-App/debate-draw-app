import { useState } from 'react'
import './App.css'


import BoardModel from './model/BoardModel';
import BoardController from './controller/BoardController';
import BoardView from './view/BoardView';

function App() {
   const model = new BoardModel();
  const [boardState, setBoardState] = useState(Array(8).fill(null));
  const [tableData, setTableData] = useState([]);
  const controller = new BoardController(model, setBoardState, setTableData);

  const handleClick = (idx:number) => {
    controller.handleClick(idx, boardState, tableData);
  };
  return (
   <BoardView
      model={model}
      boardState={boardState}
      onCellClick={handleClick}
      tableData={tableData}
    />
  )
}

export default App

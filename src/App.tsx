import React, { useRef, useState } from "react";
import BoardModel from "./model/BoardModel";
import BoardController from "./controller/BoardController";
import BoardView from "./view/BoardView";
import StartView from "./view/StartView";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const modelRef = useRef(new BoardModel());

  const [boardState, setBoardState] = useState(
    Array(32)
      .fill(null)
      .map(() => ({ text: "", disabled: false }))
  );
  const [tableData, setTableData] = useState([]);

  const controllerRef = useRef(
    new BoardController(modelRef.current, setBoardState, setTableData)
  );

  const handleClick = (idx: number) => {
    controllerRef.current.handleClick(idx, boardState, tableData);
  };

  const refreshGame = () => {
    modelRef.current.reshuffle();
    controllerRef.current.clickIndex = 1;
    setBoardState(
      Array(32)
        .fill(null)
        .map(() => ({ text: "", disabled: false }))
    );
    setTableData([]);
    setGameStarted(false);
  };

  const startGame = () => {
    setGameStarted(true);
  };

  const styles = {
    appContainer: {
      width: "100%",
      height: "100vh",
      overflow: "hidden",
    },
    refreshButton: {
      margin: "20px",
      padding: "10px 20px",
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "1rem",
      transition: "background-color 0.3s",
      ":hover": {
        backgroundColor: "#45a049",
      },
    },
  };

  return (
    <div style={styles.appContainer}>
      {!gameStarted ? (
        <StartView onStartGame={startGame} />
      ) : (
        <>
          <BoardView
            model={modelRef.current}
            boardState={boardState}
            onCellClick={handleClick}
            tableData={tableData}
          />

          {tableData.length > 0 && (
            <button onClick={refreshGame} style={styles.refreshButton}>
              🔄 Refresh
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default App;

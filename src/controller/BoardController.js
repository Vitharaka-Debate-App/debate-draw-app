export default class BoardController {
  constructor(model, setBoardState, setTableData) {
    this.model = model;
    this.setBoardState = setBoardState;
    this.setTableData = setTableData;
    this.revealed = []; // Optional, for future matching
    this.clickIndex = 1;
  }

  handleClick(idx, boardState, tableData) {

    const label = this.model.getLetter(idx);
    const baseKey = label.slice(0, -1);
    const currentPlayer = this.model.currentPlayer;
    const playerText = `${this.clickIndex}. ${label}`;
    this.clickIndex += 1;

    // Update the board
    const newBoardState = [...boardState];
    newBoardState[idx] = {
      text: label,
      disabled: true,
    };

    // Update the result table
    const updatedTable = [...tableData];

    let row = updatedTable.find(row => row.baseKey === baseKey);

    if (!row) {
      // First time this baseKey is clicked — insert into column A
      updatedTable.push({
        baseKey,
        A: playerText,
        B: ''
      });
    } else {
      // Second time this baseKey is clicked — insert into column B
      if (!row.A) {
        row.A = playerText;
      } else if (!row.B) {
        row.B = playerText;
      }
    }

    // Switch player
    this.model.switchPlayer();

    // Update states
    this.setBoardState(newBoardState);
    this.setTableData(updatedTable);
  }
}

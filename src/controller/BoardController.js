export default class BoardController {
  constructor(model, setBoardState, setTableData) {
    this.model = model;
    this.setBoardState = setBoardState;
    this.setTableData = setTableData;
  }

  handleClick(idx, boardState, tableData) {
    const label = this.model.getLetter(idx);
    const newBoardState = [...boardState];
    newBoardState[idx] = {
      text: label,
      disabled: true,
    };

    const baseKey = label.slice(0, -1);
    const playerText = `Player ${this.model.currentPlayerId}: ${label}`;
    const existingRow = tableData.findIndex((row) => row.baseKey === baseKey);

    let updatedTable;
    if (existingRow === -1) {
      updatedTable = [...tableData, {
        baseKey,
        A: playerText,
        B: '',
      }];
    } else {
      updatedTable = [...tableData];
      updatedTable[existingRow].B = playerText;
    }

    this.model.switchPlayer();
    this.setBoardState(newBoardState);
    this.setTableData(updatedTable);
  }
}

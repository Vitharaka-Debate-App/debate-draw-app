export default class BoardModel {
  constructor() {
    this.boardSize = 4;
    this.rows = 2;
    this.xLabels = ['P', 'Q', 'R', 'S'];
    this.yLabels = ['1', '2'];
    this.currentPlayerId = 1;
    this.revealed = [];
    this.matchedPairs = new Set();
    this.baseKeyToRow = {};
    this.letters = this.shuffle([
      '1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B',
    ]);
  }

  shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  getLetter(index) {
    return this.letters[index];
  }

  switchPlayer() {
    this.currentPlayerId += 1;
  }

  isMatch(idx1, idx2) {
    const l1 = this.letters[idx1];
    const l2 = this.letters[idx2];
    return l1 === l2 && l1 !== '*';
  }

  markMatched(label) {
    const base = label.slice(0, -1);
    this.matchedPairs.add(base);
  }

  isGameOver() {
    return this.matchedPairs.size === 4;
  }
}

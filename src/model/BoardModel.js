export default class BoardModel {
  constructor() {
    this.baseLabels = ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B'];
    this.letters = this.shuffle([...this.baseLabels]); // clone and shuffle
    this.currentPlayer = 1;
    this.matchedPairs = new Set();
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array; // return the shuffled array
  }

  reshuffle() {
    this.letters = this.shuffle([...this.baseLabels]);
    this.currentPlayer = 1; // Reset to player 1 on reshuffle
    this.matchedPairs.clear(); // Optional: clear matched pairs
  }

  getLetter(index) {
    return this.letters[index]; // safe access
  }

  getBaseKey(label) {
    return label.slice(0, -1);
  }

  switchPlayer() {
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
  }
}

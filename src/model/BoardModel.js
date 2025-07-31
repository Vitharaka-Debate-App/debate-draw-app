
import { BASE_LABELS } from '../configs/gridConfig.js';
export default class BoardModel {
  constructor() {
    this.baseLabels = BASE_LABELS
    this.letters = this.shuffle([...this.baseLabels]); // clone and shuffle
    this.currentPlayer = 1;
    this.matchedPairs = new Set();
    console.log(BASE_LABELS);
  }
  

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {2
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
    // this.currentPlayer = this.currentPlayer === 32 ? 2 : 1;
    this.currentPlayer = this.currentPlayer === 32 ? 1 : this.currentPlayer + 1;
  }
}

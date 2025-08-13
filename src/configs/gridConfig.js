// src/gridConfig.js

export const ROW_COUNT = 4;
export const COLUMN_COUNT = 9;

export const COLUMN_LABELS = ['P', 'Q', 'R', 'X','N', 'O', 'S', 'T','U']; // Length must be COLUMN_COUNT

export const TOTAL_CELLS = ROW_COUNT * COLUMN_COUNT;

export const BASE_LABELS = Array.from({ length: TOTAL_CELLS / 2 }, (_, i) => `${i + 1}A`)
  .concat(Array.from({ length: TOTAL_CELLS / 2 }, (_, i) => `${i + 1}B`))
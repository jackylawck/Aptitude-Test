function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export class SkyscraperEngine {
  static generate4x4(seed = Date.now()) {
    const rnd = mulberry32(seed);
    const size = 4;
    const maxRetries = 35;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      const solution = this._generateLatinSquare(size, rnd);
      const fullClues = this._computeClues(solution, size);
      const maskedClues = this._maskCluesSafely(fullClues, size, rnd);

      if (this._countSolutions(maskedClues, size) === 1) {
        return {
          seed,
          size,
          clues: maskedClues,
          solution,
          initialGrid: Array.from({ length: size }, () => Array(size).fill(0)),
        };
      }
    }

    const fallbackSol = this._generateLatinSquare(size, rnd);
    return {
      seed,
      size,
      clues: this._computeClues(fallbackSol, size),
      solution: fallbackSol,
      initialGrid: Array.from({ length: size }, () => Array(size).fill(0)),
    };
  }

  static _shuffle(arr, rnd) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  static _generateLatinSquare(size, rnd) {
    const board = Array.from({ length: size }, () => Array(size).fill(0));
    const solve = (r, c) => {
      if (r === size) return true;
      const nextR = c === size - 1 ? r + 1 : r;
      const nextC = c === size - 1 ? 0 : c + 1;
      const nums = this._shuffle([1, 2, 3, 4], rnd);

      for (const num of nums) {
        let valid = true;
        for (let i = 0; i < size; i++) {
          if (board[r][i] === num || board[i][c] === num) {
            valid = false;
            break;
          }
        }
        if (valid) {
          board[r][c] = num;
          if (solve(nextR, nextC)) return true;
          board[r][c] = 0;
        }
      }
      return false;
    };
    solve(0, 0);
    return board;
  }

  static _computeClues(grid, size) {
    const countVisible = (line) => {
      let maxH = 0, count = 0;
      for (const h of line) {
        if (h > maxH) { count++; maxH = h; }
      }
      return count;
    };

    const top = [], bottom = [], left = [], right = [];
    for (let c = 0; c < size; c++) {
      const col = grid.map((r) => r[c]);
      top.push(countVisible(col));
      bottom.push(countVisible([...col].reverse()));
    }
    for (let r = 0; r < size; r++) {
      const row = grid[r];
      left.push(countVisible(row));
      right.push(countVisible([...row].reverse()));
    }
    return { top, bottom, left, right };
  }

  static _maskCluesSafely(clues, size, rnd) {
    const copy = {
      top: [...clues.top],
      bottom: [...clues.bottom],
      left: [...clues.left],
      right: [...clues.right],
    };
    const directions = ['top', 'bottom', 'left', 'right'];
    const candidates = [];
    for (const d of directions) {
      for (let i = 0; i < size; i++) {
        candidates.push({ d, i });
      }
    }
    this._shuffle(candidates, rnd);

    const minClues = size + 2;
    let currentClues = size * 4;

    for (const item of candidates) {
      if (currentClues <= minClues) break;
      const orig = copy[item.d][item.i];
      copy[item.d][item.i] = 0;

      if (this._countSolutions(copy, size) !== 1) {
        copy[item.d][item.i] = orig;
      } else {
        currentClues--;
      }
    }
    return copy;
  }

  static _countSolutions(clues, size) {
    const board = Array.from({ length: size }, () => Array(size).fill(0));
    let solutions = 0;
    const rowUsed = Array.from({ length: size }, () => new Uint8Array(size + 1));
    const colUsed = Array.from({ length: size }, () => new Uint8Array(size + 1));

    const checkLine = (line, clue) => {
      if (clue === 0) return true;
      let visible = 0, maxH = 0, emptyCount = 0;
      for (const h of line) {
        if (h === 0) emptyCount++;
        else if (h > maxH) { visible++; maxH = h; }
      }
      if (visible > clue) return false;
      if (visible + emptyCount < clue) return false;
      if (emptyCount === 0 && visible !== clue) return false;
      return true;
    };

    const solve = (r, c) => {
      if (solutions >= 2) return;
      if (r === size) { solutions++; return; }
      const nextR = c === size - 1 ? r + 1 : r;
      const nextC = c === size - 1 ? 0 : c + 1;

      for (let num = 1; num <= size; num++) {
        if (rowUsed[r][num] || colUsed[c][num]) continue;
        board[r][c] = num;
        rowUsed[r][num] = 1;
        colUsed[c][num] = 1;

        let ok = true;
        if (clues.left[r] > 0 && !checkLine(board[r], clues.left[r])) ok = false;
        if (ok && c === size - 1 && clues.right[r] > 0 && !checkLine([...board[r]].reverse(), clues.right[r])) ok = false;
        if (ok && clues.top[c] > 0 && !checkLine(board.map(row => row[c]), clues.top[c])) ok = false;
        if (ok && r === size - 1 && clues.bottom[c] > 0 && !checkLine(board.map(row => row[c]).reverse(), clues.bottom[c])) ok = false;

        if (ok) solve(nextR, nextC);
        board[r][c] = 0;
        rowUsed[r][num] = 0;
        colUsed[c][num] = 0;
        if (solutions >= 2) return;
      }
    };
    solve(0, 0);
    return solutions;
  }
}

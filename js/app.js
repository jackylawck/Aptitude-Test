import { t, getLang, setLang } from './i18n.js';
import { SkyscraperEngine } from './skyscraperEngine.js';
import { PsychometricsEngine } from './psychometrics.js';
import { IntegrityProof } from './integrityProof.js';
import { RadarChartRenderer } from './radarChart.js';

/**
 * @typedef {{ t: number, type: string, val?: string }} AuditEvent
 */

let currentPuzzle = null;
let currentGrid = [];
/** @type {AuditEvent[]} */
let eventStream = [];
let startTime = 0;
let remainingSeconds = 90;
let timerInterval = null;
let isTimerPaused = false;
let isFinished = false;
let isStarted = false; // 追蹤是否已點擊開始測驗
let lastEvaluatedDimensions = null;

function announceLive(message) {
  const announcer = document.getElementById('status-announcer');
  if (announcer) {
    announcer.textContent = '';
    requestAnimationFrame(() => {
      announcer.textContent = message;
    });
  }
}

function computeConflictCount(stream) {
  const cellHistory = new Map();
  let conflicts = 0;
  for (const evt of stream) {
    if (evt.type !== 'INPUT' || !evt.val) continue;
    const match = evt.val.match(/r(\d+)c(\d+)v(\d+)/);
    if (!match) continue;
    const key = `${match[1]},${match[2]}`;
    const val = match[3];
    const prev = cellHistory.get(key);
    if (prev !== undefined && prev !== '0' && prev !== val) {
      conflicts++;
    }
    cellHistory.set(key, val);
  }
  return conflicts;
}

function updateAriaLabels() {
  document.querySelectorAll('.cell-clue').forEach((el) => {
    const dir = el.getAttribute('data-direction');
    const val = el.textContent?.trim();
    if (dir) {
      const clueText = val ? val : t('clues.none');
      el.setAttribute('aria-label', `${t(`clues.${dir}`)}: ${clueText}`);
    }
  });

  document.querySelectorAll('.cell-input').forEach((el) => {
    const r = Number(el.getAttribute('data-r'));
    const c = Number(el.getAttribute('data-c'));
    const v = currentGrid[r] ? currentGrid[r][c] : 0;
    const vText = v === 0 ? t('cellAria.empty') : t('cellAria.height', { h: v });
    el.setAttribute(
      'aria-label',
      `${t('cellAria.row', { r: r + 1 })}, ${t('cellAria.col', { c: c + 1 })}: ${vText}`
    );
    el.setAttribute('aria-valuetext', vText);
  });

  const langBtn = document.getElementById('lang-switch');
  if (langBtn) {
    langBtn.setAttribute('aria-label', t('langBtnAria'));
    langBtn.textContent = t('langBtn');
  }
}

function renderI18n() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key) el.textContent = t(key);
  });
  updateAriaLabels();

  if (lastEvaluatedDimensions && !document.getElementById('result-card')?.classList.contains('hidden')) {
    RadarChartRenderer.render('radar-container', lastEvaluatedDimensions);
  }
}

function startAssessmentFlow() {
  isStarted = true;
  isFinished = false;
  remainingSeconds = 90;
  isTimerPaused = false;
  currentPuzzle = SkyscraperEngine.generate4x4();
  currentGrid = Array.from({ length: 4 }, () => Array(4).fill(0));
  eventStream = [];
  startTime = performance.now();

  // 切換卡片：隱藏說明與結算卡片，顯示作答區域
  document.getElementById('intro-card')?.classList.add('hidden');
  document.getElementById('result-card')?.classList.add('hidden');
  document.getElementById('exam-card')?.classList.remove('hidden');

  renderGrid();
  startTimer();
  announceLive(t('announcements.started'));
}

function updateCell(r, c, val, cellElement) {
  currentGrid[r][c] = val;
  cellElement.textContent = val > 0 ? String(val) : '';
  cellElement.setAttribute('aria-valuenow', String(val));

  const vText = val === 0 ? t('cellAria.empty') : t('cellAria.height', { h: val });
  cellElement.setAttribute('aria-valuetext', vText);
  cellElement.setAttribute(
    'aria-label',
    `${t('cellAria.row', { r: r + 1 })}, ${t('cellAria.col', { c: c + 1 })}: ${vText}`
  );

  eventStream.push({
    t: Math.round(performance.now() - startTime),
    type: 'INPUT',
    val: `r${r}c${c}v${val}`,
  });
}

function renderGrid() {
  const container = document.getElementById('grid-container');
  if (!container) return;
  container.textContent = '';

  const table = document.createElement('div');
  table.className = 'grid-board';

  for (let r = 0; r < 6; r++) {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'grid-row';

    for (let c = 0; c < 6; c++) {
      const cell = document.createElement('div');

      if ((r === 0 || r === 5) && (c === 0 || c === 5)) {
        cell.className = 'cell-corner';
        cell.setAttribute('aria-hidden', 'true');
      } else if (r === 0) {
        cell.className = 'cell-clue';
        cell.setAttribute('data-direction', 'top');
        cell.textContent = currentPuzzle.clues.top[c - 1] ? String(currentPuzzle.clues.top[c - 1]) : '';
      } else if (r === 5) {
        cell.className = 'cell-clue';
        cell.setAttribute('data-direction', 'bottom');
        cell.textContent = currentPuzzle.clues.bottom[c - 1] ? String(currentPuzzle.clues.bottom[c - 1]) : '';
      } else if (c === 0) {
        cell.className = 'cell-clue';
        cell.setAttribute('data-direction', 'left');
        cell.textContent = currentPuzzle.clues.left[r - 1] ? String(currentPuzzle.clues.left[r - 1]) : '';
      } else if (c === 5) {
        cell.className = 'cell-clue';
        cell.setAttribute('data-direction', 'right');
        cell.textContent = currentPuzzle.clues.right[r - 1] ? String(currentPuzzle.clues.right[r - 1]) : '';
      } else {
        const cellR = r - 1;
        const cellC = c - 1;
        cell.className = 'cell-input';
        cell.tabIndex = 0;
        cell.setAttribute('role', 'spinbutton');
        cell.setAttribute('data-r', String(cellR));
        cell.setAttribute('data-c', String(cellC));
        cell.setAttribute('aria-valuemin', '0');
        cell.setAttribute('aria-valuemax', '4');
        cell.setAttribute('aria-valuenow', '0');

        cell.addEventListener('click', () => {
          if (isFinished) return;
          const nextVal = (currentGrid[cellR][cellC] + 1) % 5;
          updateCell(cellR, cellC, nextVal, cell);
        });

        cell.addEventListener('keydown', (e) => {
          if (isFinished) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const nextVal = (currentGrid[cellR][cellC] + 1) % 5;
            updateCell(cellR, cellC, nextVal, cell);
          } else if (e.key >= '1' && e.key <= '4') {
            e.preventDefault();
            updateCell(cellR, cellC, Number(e.key), cell);
          } else if (e.key === '0' || e.key === 'Backspace' || e.key === 'Delete') {
            e.preventDefault();
            updateCell(cellR, cellC, 0, cell);
          }
        });
      }
      rowDiv.appendChild(cell);
    }
    table.appendChild(rowDiv);
  }
  container.appendChild(table);
  updateAriaLabels();
}

function updateTimerDisplay() {
  const timerEl = document.getElementById('timer');
  if (!timerEl) return;
  const m = Math.floor(remainingSeconds / 60).toString().padStart(2, '0');
  const s = (remainingSeconds % 60).toString().padStart(2, '0');
  timerEl.textContent = `${m}:${s}`;
}

function startTimer() {
  if (timerInterval) clearInterval(timerInterval);
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    if (isTimerPaused || isFinished || !isStarted) return;
    remainingSeconds--;
    updateTimerDisplay();

    if (remainingSeconds <= 0) {
      clearInterval(timerInterval);
      finishAssessment();
    }
  }, 1000);
}

document.addEventListener('visibilitychange', () => {
  if (!isStarted || isFinished) return;
  if (document.hidden) {
    isTimerPaused = true;
    eventStream.push({ t: Math.round(performance.now() - startTime), type: 'TAB_PAUSE' });
    announceLive(t('announcements.paused'));
  } else {
    isTimerPaused = false;
    eventStream.push({ t: Math.round(performance.now() - startTime), type: 'TAB_RESUME' });
    announceLive(t('announcements.resumed'));
  }
});

async function finishAssessment() {
  if (isFinished) return;
  isFinished = true;
  if (timerInterval) clearInterval(timerInterval);

  const timeSpentSec = Math.max(1, Math.min(90, 90 - remainingSeconds));

  let isCorrect = true;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (currentGrid[r][c] !== currentPuzzle.solution[r][c]) {
        isCorrect = false;
        break;
      }
    }
  }

  const realConflicts = computeConflictCount(eventStream);
  const results = PsychometricsEngine.evaluate(timeSpentSec, isCorrect, realConflicts);
  lastEvaluatedDimensions = results.dimensions;

  const proof = await IntegrityProof.generateProof(
    { name: 'CANDIDATE' },
    results,
    currentPuzzle.seed,
    eventStream
  );

  const examCard = document.getElementById('exam-card');
  const resultCard = document.getElementById('result-card');

  if (examCard && resultCard) {
    examCard.classList.add('hidden');
    resultCard.classList.remove('hidden');

    const resultTitle = resultCard.querySelector('h2');
    if (resultTitle) {
      resultTitle.tabIndex = -1;
      resultTitle.focus();
    }
  }

  const stanineEl = document.getElementById('res-stanine');
  const prEl = document.getElementById('res-pr');
  const receiptEl = document.getElementById('res-receipt');
  const chainEl = document.getElementById('res-chain');

  if (stanineEl) stanineEl.textContent = String(results.stanine);
  if (prEl) prEl.textContent = `${results.percentile}%`;
  if (receiptEl) receiptEl.textContent = proof.receiptCode;
  if (chainEl) chainEl.textContent = proof.eventChainHash;

  RadarChartRenderer.render('radar-container', results.dimensions);

  announceLive(t('announcements.finished', { stanine: results.stanine, pr: results.percentile }));
}

document.addEventListener('DOMContentLoaded', () => {
  renderI18n();

  // 切換中英文
  document.getElementById('lang-switch')?.addEventListener('click', () => {
    setLang(getLang() === 'zh' ? 'en' : 'zh');
    renderI18n();
  });

  // 點擊開始測驗（從說明引導卡進入作答卡並開始倒數）
  document.getElementById('start-btn')?.addEventListener('click', startAssessmentFlow);

  // 完成交卷
  document.getElementById('submit-btn')?.addEventListener('click', finishAssessment);

  // 列印 / 匯出報告
  document.getElementById('print-btn')?.addEventListener('click', () => window.print());

  // 再測一次：乾淨重置並返回說明卡片
  document.getElementById('restart-btn')?.addEventListener('click', () => {
    if (timerInterval) clearInterval(timerInterval);
    isStarted = false;
    isFinished = false;
    lastEvaluatedDimensions = null;
    document.getElementById('result-card')?.classList.add('hidden');
    document.getElementById('exam-card')?.classList.add('hidden');
    document.getElementById('intro-card')?.classList.remove('hidden');
  });
});

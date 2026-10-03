export const DICTIONARY = {
  zh: {
    appTitle: '能力傾向測試',
    appSubtitle: '空間與演繹推理評估',
    badgeText: '零伺服器 • CHC 認知對標',
    langBtn: 'English',
    langBtnAria: '切換至英文介面',

    // 1. 引導頁面與規則說明
    introTitle: '空間與邏輯演繹測試 (4×4 摩天透視)',
    introPurpose: '本測驗旨在快速評估受試者之空間視覺化 (Gv)、流體演繹 (Gf) 與工作記憶穩定性。純前端本地運行，無伺服器傳輸。',
    
    specsHeading: '📊 測驗規格概覽',
    specItems: {
      count: '• 測驗題數：1 題核心演繹題（4×4 網格共 16 格需推導填入）',
      duration: '• 作答時限：90 秒（倒數計時，時間歸零將自動交卷；切換分頁會暫停）',
      scoring: '• 計分機制：綜合考量「填答正確性」、「作答耗時」與「塗改猶豫次數」',
      scale: '• 評估量尺：輸出 CHC 五維認知雷達圖、標準九分 (Stanine 1-9) 及常模百分位數 (PR)',
    },

    rulesHeading: '📋 網格規則與玩法說明',
    rule1: '1. 網格大小為 4×4，每一行（Row）與每一列（Column）必須填入數字 1、2、3、4，數字不可重複。',
    rule2: '2. 數字代表建築物的高度（1 為最低，4 為最高）；較高的建築物會擋住後方較矮的建築物。',
    rule3: '3. 外圍邊緣數字代表從該角度望過去「能看見的建築物數量」。',
    ruleExample: '💡 舉例：若一行填入 [1, 4, 3, 2]，從左側看過去只看見 1 與 4（共 2 棟，因為 4 擋住了 3 和 2），因此左邊視野線索為 2。',

    controlsHeading: '⌨️ 操作方式',
    controlClick: '• 滑鼠點擊：點擊格子循環切換數字 (空格 → 1 → 2 → 3 → 4 → 空格)。',
    controlKey: '• 鍵盤操作：按 Tab 鍵跳轉格子，直接按數字鍵 1-4 輸入，Backspace 或 Delete 可清除。',
    timeLimitInfo: '⏱️ 本測驗限時 90 秒，純演繹無盲猜。準備好後請點擊下方按鈕開始。',
    startBtn: '我已理解規則與規格，開始測驗',

    // 2. 測驗操作區域
    instructionsTitle: '4×4 摩天透視空間推理',
    instructionsDesc: '依據邊緣視野數字填入建築高度 (1-4)。支援點擊輪播或鍵盤輸入 (1-4、Backspace 清除)。',
    timeRemaining: '剩餘時間',
    submitBtn: '完成交卷',
    restartBtn: '再測一次',

    // 3. 結算報告
    resultTitle: '能力傾向評估完成',
    resultSubtitle: '評估指標已透過 Web Crypto 在本地計算並存證',
    stanineLabel: '標準九分 (Stanine)',
    prLabel: '常模百分位 (PR)',
    receiptLabel: '防偽收執代碼',
    eventChainLabel: '鏈式事件校驗',
    printBtn: '列印 / 匯出報告',
    disclaimer: '本系統定位為純前端自評沙盒 (Formative Screener)，資料完全於本機瀏覽器運算，無伺服器傳輸。',

    clues: {
      top: '上方視野',
      bottom: '下方視野',
      left: '左方視野',
      right: '右方視野',
      none: '無限制',
    },
    cellAria: {
      row: '第 {r} 列',
      col: '第 {c} 行',
      empty: '空格',
      height: '高度 {h}',
    },
    announcements: {
      started: '測驗開始，計時 90 秒',
      finished: '測驗評估完成。標準九分 {stanine}，常模百分位 {pr}。',
      paused: '分頁已離開，計時器暫停',
      resumed: '測驗繼續',
    },
    dimensions: {
      gv: '空間視覺 Gv',
      gf: '流體推理 Gf',
      gsm: '工作記憶 Gsm',
      gq: '數理約束 Gq',
      gs: '處理速度 Gs',
    },
  },
  en: {
    appTitle: 'Aptitude Test',
    appSubtitle: 'Spatial & Deductive Reasoning Assessment',
    badgeText: 'Zero-Server • CHC Aligned',
    langBtn: '繁體中文',
    langBtnAria: 'Switch to Traditional Chinese',

    // 1. Intro & Guidelines
    introTitle: 'Spatial & Deductive Reasoning Test (4×4 Skyscraper)',
    introPurpose: 'Evaluates Visual Processing (Gv), Fluid Reasoning (Gf), and Working Memory stability. Runs 100% locally in-browser.',

    specsHeading: '📊 Test Specifications',
    specItems: {
      count: '• Item Count: 1 core deductive task (4×4 grid with 16 cells to resolve)',
      duration: '• Time Limit: 90 seconds (Auto-submits at 00:00; pauses when tab is hidden)',
      scoring: '• Scoring Model: Evaluated on accuracy, completion time, and revision conflicts',
      scale: '• Reporting: CHC 5-axis Radar Profile, Stanine Score (1-9), and Percentile Rank (PR)',
    },

    rulesHeading: '📋 Grid Rules & Mechanics',
    rule1: '1. The grid is 4×4. Each row and column must contain heights 1, 2, 3, and 4 without duplicates.',
    rule2: '2. Each number represents building height (1 = lowest, 4 = tallest). Taller buildings obscure shorter ones behind them.',
    rule3: '3. Outer edge numbers show how many buildings are visible looking into that line.',
    ruleExample: '💡 Example: If a row is [1, 4, 3, 2], looking from left you see 1 and 4 (2 buildings visible; 4 hides 3 and 2). Thus the left clue is 2.',

    controlsHeading: '⌨️ Controls Guide',
    controlClick: '• Mouse: Click any cell to cycle heights (Empty → 1 → 2 → 3 → 4 → Empty).',
    controlKey: '• Keyboard: Press Tab to navigate, press 1-4 directly to enter, Backspace/Delete to clear.',
    timeLimitInfo: '⏱️ Time limit: 90 seconds. Pure logical deduction, zero guesswork. Click below when ready.',
    startBtn: 'I Understand the Rules, Start Assessment',

    // 2. Test Area
    instructionsTitle: '4×4 Skyscraper Spatial Reasoning',
    instructionsDesc: 'Place heights (1-4) by edge visibility. Supports click cycling or keyboard inputs (1-4, Backspace clear).',
    timeRemaining: 'Time Left',
    submitBtn: 'Submit Assessment',
    restartBtn: 'Retake Test',

    // 3. Results
    resultTitle: 'Assessment Completed',
    resultSubtitle: 'Metrics calculated & authenticated locally via Web Crypto API',
    stanineLabel: 'Stanine Score',
    prLabel: 'Percentile Rank (PR)',
    receiptLabel: 'Receipt Token',
    eventChainLabel: 'Event Chain Hash',
    printBtn: 'Print / Export Report',
    disclaimer: 'Client-side formative screener only. All metrics processed in-browser. Zero server telemetries.',

    clues: {
      top: 'Top view',
      bottom: 'Bottom view',
      left: 'Left view',
      right: 'Right view',
      none: 'Unconstrained',
    },
    cellAria: {
      row: 'Row {r}',
      col: 'Column {c}',
      empty: 'Empty',
      height: 'Height {h}',
    },
    announcements: {
      started: 'Assessment started. 90 seconds timer active.',
      finished: 'Assessment complete. Stanine score {stanine}, percentile rank {pr}.',
      paused: 'Tab inactive, timer paused',
      resumed: 'Assessment resumed',
    },
    dimensions: {
      gv: 'Spatial Gv',
      gf: 'Fluid Gf',
      gsm: 'Memory Gsm',
      gq: 'Numeric Gq',
      gs: 'Speed Gs',
    },
  },
};

let currentLang = 'zh';

export function getLang() {
  return currentLang;
}

export function setLang(lang) {
  if (lang === 'zh' || lang === 'en') {
    currentLang = lang;
    document.documentElement.lang = lang === 'zh' ? 'zh-HK' : 'en';
  }
}

export function t(key, params = {}) {
  const keys = key.split('.');
  let value = DICTIONARY[currentLang];
  for (const k of keys) {
    if (value && value[k] !== undefined) {
      value = value[k];
    } else {
      return key;
    }
  }
  if (typeof value === 'string') {
    return value.replace(/\{(\w+)\}/g, (_, k) => params[k] !== undefined ? params[k] : `{${k}}`);
  }
  return value;
}

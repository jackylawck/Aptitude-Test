export const DICTIONARY = {
  zh: {
    appTitle: 'JO-ATP',
    appSubtitle: '認知架構沙盒',
    badgeText: '零伺服器 • CHC 認知對標',
    langBtn: 'English',
    langBtnAria: '切換至英文介面',
    instructionsTitle: '4×4 摩天透視空間推理 (Skyscraper)',
    instructionsDesc: '依據邊緣視野數字填入建築高度 (1-4)。支援點擊輪播或鍵盤輸入 (1-4、Backspace 清除)。',
    timeRemaining: '剩餘時間',
    submitBtn: '完成交卷',
    restartBtn: '再測一次',
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
    appTitle: 'JO-ATP',
    appSubtitle: 'Cognitive Architecture Sandbox',
    badgeText: 'Zero-Server • CHC Aligned',
    langBtn: '繁體中文',
    langBtnAria: 'Switch to Traditional Chinese',
    instructionsTitle: '4×4 Skyscraper Spatial Reasoning',
    instructionsDesc: 'Place heights (1-4) by edge visibility. Supports click cycling or keyboard inputs (1-4, Backspace clear).',
    timeRemaining: 'Time Left',
    submitBtn: 'Submit Assessment',
    restartBtn: 'Retake Test',
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

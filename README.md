# 能力傾向測試 | Aptitude Test

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Architecture: Zero--Server](https://img.shields.io/badge/Architecture-Zero--Server-emerald.svg)](#)
[![WCAG: 2.1_AA](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA-purple.svg)](#)
[![Security: Strict_CSP](https://img.shields.io/badge/Security-CSP%20Strict-red.svg)](#)
[![Standards: ISO/IEC_42001_Aligned](https://img.shields.io/badge/Standards-ISO%2FIEC%2042001-orange.svg)](#)

**純前端・零伺服器・確定性演繹的 CHC 認知能力傾向探索評測系統**  
*A Pure-Deduction, Zero-Server, Psychometrically-Aligned Cognitive Aptitude Assessment Sandbox.*

[🚀 立即在線體驗 Demo](https://jackylawck.github.io/Aptitude-Test/) · [📖 系統架構與邊界分析](./ARCHITECTURE_BOUNDARIES.md) · [⚖️ 治理合規白皮書](./GOVERNANCE_AND_COMPLIANCE.md) · [🔒 隱私架構說明](./PRIVACY.md)

</div>

---

## ⚡ 核心定位宣告 / Core Scoping Statement

> **[繁體中文] 重要定位宣告：**  
> 本專案為**技能探索、架構展示與認知自評之「形成性沙盒（Formative Screener）」**。本系統採用純前端確定性運算與客戶端密碼學完整性技術，**明確不具備**商業高利害招聘（High-Stakes Selection）所需的伺服器端權威 KMS 簽名與臨床常模背書，**嚴禁作為正式人事錄用或淘汰的法定排他性依據**。
>
> **[English] Critical Boundary Disclosure:**  
> This project is strictly an **educational, architectural showcase and formative cognitive screening sandbox**. Operating under a client-side deterministic paradigm, it **explicitly lacks** the authoritative KMS server signatures and clinical norm pools required for commercial high-stakes recruitment. It **must not** be deployed as a sole automated decision-making tool for formal employment selection.

---

## 🌟 核心工程亮點 / Key Engineering Highlights

### 1. 100% 因果純演繹引擎 (Deterministic CSP Solver)
- **零盲猜保證**：結合 **FastLineCSP** 約束滿足求解器、**Fisher-Yates** 隨機洗牌演算法與 `minClues`（最少保留 $N+2$ 條線索）下限保護。
- **唯一解驗證**：出題時逐一驗證解空間基數恆等於 1（$\vert{}\text{Sol}\vert{} = 1$），杜絕隨機生成無解題或多解歧義題。

### 2. 嚴謹 CHC 認知架構對標 (Psychometric Construct Alignment)
- **多維度構念映射**：將 4×4 摩天透視空間推理任務映射至 **Cattell-Horn-Carroll (CHC)** 智力理論五大構念：
  - **空間視覺 ($G_v$)**：正交遮擋與心理透視
  - **流體演繹 ($G_f$)**：線索交集與矛盾消除
  - **工作記憶 ($G_{sm}$)**：基於事件流塗改與猶豫次數（`conflictCount`）動態推導
  - **數理約束 ($G_q$)**：行列表格正交唯一性約束
  - **處理速度 ($G_s$)**：作答時間效率衰減曲線
- **動態 SVG 雷達圖**：使用原生 `document.createElementNS` 構造向量圖形，徹底杜絕 `innerHTML` 帶來的 XSS 隱患。

### 3. 滾動 SHA-256 鏈式事件存證 (Client-Side Audit Trail)
- **狀態遞推**：作答期間實時記錄單調事件流，原生調用 Web Cryptography API 執行 $h_i = \text{SHA256}(h_{i-1} \parallel \text{event})$ 滾動雜湊。
- **RFC 8785 (JCS) 規範化收執**：收執物件按字典代碼單元升序排序後序列化，產出確定性數位防偽代碼（Integrity Digest）。

### 4. 極致前端資安與無障礙 (Strict CSP & WCAG 2.1 AA)
- **零外部依賴**：完全無第三方 CDN，拔除所有 Inline Style 與 Inline Script，支援最嚴格的 `default-src 'self'` 安全標頭。
- **無障礙樹保證**：
  - 支援全鍵盤導航：`Tab` 聚焦、數字鍵 `1-4` 直接定值、`Backspace/Delete` 清除、`Enter/Space` 步進輪播。
  - 常駐 `.sr-only` 播報器：利用 `aria-live="polite"` 傳遞分頁暫停與成績通知，徹底解決 `display: none` 銷毀無障礙樹的問題。
  - 完整支援 `aria-valuetext` 與中英雙語 `<html lang>` 同步切換。

---

## 🧭 系統邊界與產業差距 / System Boundaries & Industry Gap

本專案展現了純前端沙盒在極限約束下的工程嚴密性，並誠實公開其與行業商業巨頭（如 Criteria Corp, Aon, SHL）的結構性差距：

| 維度 | 本專案 (JO-ATP Showcase) | 企業級高利害標準 (Enterprise Benchmark) |
| :--- | :--- | :--- |
| **信任模型** | 客戶端確定性完整性收執 (Client-side Digest) | 伺服器端 FIPS 140-2 L3 KMS / HSM 權威數位簽名 |
| **心理計量** | 演算法動態啟發式錨定 (Heuristic Anchors) | $N > 5,000$ 臨床常模大樣本校準與 DIF 偏誤檢定 |
| **作答防弊** | 非侵入式分頁失焦暫停與行為日誌遙測 | WebRTC 視訊姿態分析、安全鎖定瀏覽器 (SEB) |
| **維護成本** | **$0 / 年**（零伺服器開支、靜態託管） | **$60,000 - $120,000 / 年**（雲端 HSM、專職 SRE、法務諮詢） |

*完整之商用化重構路線圖（Tier-1 到 Tier-2），請詳閱 **[ARCHITECTURE_BOUNDARIES.md](./ARCHITECTURE_BOUNDARIES.md)**。*

---

## ⚖️ 治理合規與法規對標 / Governance & Statutory Alignment

- **歐盟 AI 法案 (EU AI Act 2024/1689)**：
  - 本系統採用經典符號約束滿足（CSP）求解器與封閉式數學公式，未嵌入自適應黑箱神經網絡或生成式機器學習模型。依據 Recital 12 定義，**排除於高風險就業 AI 管轄範疇之外**。
- **香港《個人資料（私隱）條例》(Cap. 486)**：
  - 實施 **設計賦予私隱（Privacy by Design, PbD）**，全站不收集任何個人身份標識（PII），作答數據僅存於受試者本機記憶體，關閉分頁即銷毀。
- **香港平機會 (EOC) 僱傭實務守則**：
  - 題目基於純幾何空間視線邏輯，完全排除文化、語言、性別或年齡偏見，杜絕直接或間接歧視。
- **ISO/IEC 42001:2023**：
  - 嚴格對標 Control A.6.2，題型推導鏈具備 100% 透明度與因果可解釋性。

*完整法規豁免理據與權責分析，請參閱 **[GOVERNANCE_AND_COMPLIANCE.md](./GOVERNANCE_AND_COMPLIANCE.md)** 與 **[PRIVACY.md](./PRIVACY.md)**。*

---

## 📁 專案檔案結構 / Project Structure

```text
Aptitude-Test/
├── index.html                   # 語意化 HTML5 入口 (WCAG 2.1 AA, 無 Inline Style)
├── style.css                    # 原生現代深色 CSS (含 .sr-only 螢幕閱讀器輔助層)
├── _headers                     # 嚴格 Content Security Policy 安全回應標頭
├── GOVERNANCE_AND_COMPLIANCE.md # 演算法定性與 EU AI Act / ISO 42001 合規白皮書
├── ARCHITECTURE_BOUNDARIES.md  # 系統邊界與產業差距深度分析報告
├── PRIVACY.md                   # 零伺服器隱私設計與香港 PDPO Cap. 486 合規手冊
├── LICENSE                      # MIT 開源授權條款
└── js/
    ├── app.js                   # 應用核心狀態機、事件流與全鍵盤控制器
    ├── i18n.js                  # 繁中 / 英文雙語對照字典與動態插值
    ├── skyscraperEngine.js      # 4x4 摩天透視出題引擎 (CSP 唯一解驗證, 無非法語法)
    ├── psychometrics.js         # CHC 理論五軸構念估算與動態衝突計算器
    ├── integrityProof.js        # Web Crypto 滾動 SHA-256 鏈與 JCS 規範化收執
    └── radarChart.js            # 原生 SVG 向量雷達圖繪製器 (無 innerHTML)

```

---

## 🚀 本地執行與除錯 / Local Setup

本專案採用純原生 ES Modules 架構，無需任何 Node.js 構建（Build）步驟，克隆後即可直接啟動：

```bash
# 1. 複製倉庫
git clone [https://github.com/jackylawck/Aptitude-Test.git](https://github.com/jackylawck/Aptitude-Test.git)
cd Aptitude-Test

# 2. 啟動本機靜態伺服器 (支援 Python 3, Node http-server 或 VS Code Live Server)
python3 -m http.server 8000

# 3. 瀏覽器開啟
# http://localhost:8000

```

---

## 📜 授權條款 / License

Distributed under the [MIT License](https://www.google.com/search?q=LICENSE).


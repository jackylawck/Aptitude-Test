# Privacy Architecture & Statutory Data Protection Statement
# 隱私架構設計與法定個人資料保護合規手冊

**Compliance Frameworks / 合規準則:**  
- Hong Kong Personal Data (Privacy) Ordinance (PDPO, Cap. 486) / 香港《個人資料（私隱）條例》（第 486 章）
- EU General Data Protection Regulation (GDPR, Regulation (EU) 2016/679)
- ISO/IEC 27701:2019 Privacy by Design (PbD)

---

## 1. Architectural Philosophy: Zero-Server & Privacy by Design
## 1. 架構核心理念：零伺服器與設計賦予私隱

**[English]**  
This system adheres to the most stringent interpretation of **Privacy by Design (PbD)**:
1. **Zero Server Telemetry**: There is no backend server, no remote database, no tracking cookie, and no telemetry endpoint. The application runs entirely within the user's browser sandbox.
2. **No Collection of Personally Identifiable Information (PII)**: The system does not request, log, or transmit personal identifiers such as legal names, national identity numbers, biometric data, email addresses, or IP addresses.
3. **Local Ephemeral Storage**: User responses and test states exist ephemerally in browser RAM. No persistent tracking occurs across sessions without explicit user actions.

**[繁體中文]**  
本系統嚴格遵循 **設計賦予私隱（Privacy by Design, PbD）** 的最高架構準則：
1. **零伺服器遙測**：本系統無後端伺服器、無遠端資料庫、無追蹤 Cookie、亦無任何遙測端點。所有運算與互動 100% 於受試者本機瀏覽器沙盒中執行。
2. **零個人可識別資訊（PII）收集**：系統不要求、不記錄、亦不傳輸任何法定全名、身份證件號碼、生物特徵、電子郵件地址或 IP 位址。
3. **本地無狀態運行**：作答事件流與暫存結果僅短暫存在於瀏覽器記憶體（RAM），關閉分頁即行銷毀，不進行任何跨站點持久化追蹤。

---

## 2. Compliance Mapping: Hong Kong PDPO (Cap. 486)
## 2. 香港《個人資料（私隱）條例》（第 486 章）六項保障資料原則對標

| Data Protection Principle (DPP) / 保障資料原則 | Compliance Implementation / 系統具體落實措施 |
| :--- | :--- |
| **DPP 1: Purpose & Manner of Collection<br>原則 1：收集目的及方式** | **完全免除個資義務 (Exempt by Non-Collection)**<br>系統不收集 Cap. 486 所定義之「個人資料（Personal Data）」。受試者以匿名方式操作，所產生的計算數據無法直接或間接識別任何自然人。 |
| **DPP 2: Accuracy & Retention<br>原則 2：準確性及保留期限** | 數據保留期限由受試者端設備完全掌控。系統不設中央儲存，不具備過期資料未銷毀之風險。 |
| **DPP 3: Use of Data<br>原則 3：資料的使用** | 所產生的能力分數與鏈式雜湊收執，僅即時展示於受試者螢幕供其個人參考，絕無未經授權之目的外轉移或第三方商業利用。 |
| **DPP 4: Data Security<br>原則 4：資料的保安** | 採用純靜態資源發布，完全防禦 SQL 注入、伺服器端資料庫外洩或中途攔截（Man-in-the-Middle）風險；實施嚴格 CSP 標頭。 |
| **DPP 5: Openness & Transparency<br>原則 5：資訊政策及公開** | 本文件與白皮書公開揭露演算法原理、計分權重與隱私策略，符合透明度最高標準。 |
| **DPP 6: Access & Correction<br>原則 6：查閱及更正資料** | 由於不設中央伺服器儲存，所有產出即時歸受試者單獨持有，不存在向營運方提出資料查閱請求（DAR）之技術必要性。 |

---

## 3. Compliance Mapping: European Union GDPR (2016/679)
## 3. 歐盟通用數據保障條例 (GDPR) 核心條款對標

- **Article 4(1) - Personal Data Scope**:  
  所有在客戶端執行的作答秒數與雜湊值，均未與任何識別碼關聯，屬於 GDPR 範疇下之**完全匿名化資料（Fully Anonymized Data）**。依據 Recital 26，本條例不適用於匿名資訊之處理。
- **Article 22 - Automated Individual Decision-Making**:  
  系統明確聲明為自評沙盒，不產出具備法定效力之單一自動化決策，不涉及 GDPR 第 22 條之限制。
- **Chapter V - International Transfers**:  
  由於系統無中央伺服器亦無數據回傳，完全不涉及個人資料之跨境傳輸（Cross-Border Data Transfers）。

---

## 4. Cryptographic Proof vs. Data Processing
## 4. 密碼學完整性證明與資料處理之邊界

本系統所產出的 `Integrity Digest`（基於 W3C Web Cryptography API SHA-256）具有以下明確特徵：
- **單向不可逆雜湊（One-way Cryptographic Hash）**：雜湊值僅用於驗證當次作答資料在本地端是否有被手動篡改，不包含任何可反向推導之受試者個人識別資訊。
- **無秘密簽署私鑰（No Identity Claims）**：收執碼為客戶端確定性完整性摘要，不代表 CA 憑證機構對特定自然人身份之背書。

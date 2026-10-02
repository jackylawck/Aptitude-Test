# Algorithmic Governance, Statutory Compliance & Professional Standards
# 演算法治理、法定合規與專業標準規範

**Document Classification: Public Architecture & Algorithmic Whitepaper**  
**文件級別：公開系統架構與演算法合規白皮書**  
**Effective Date / 生效日期：October 2026**  
**Version / 版本：Apex Governed Standard v2.1**

---

## 1. Executive Summary & Algorithmic Taxonomy
## 1. 執行摘要與演算法定性分類

### 1.1 Algorithmic Determinism vs. Machine Learning / Generative AI
### 1.1 演算法確定性與機器學習／生成式人工智慧之定性區隔

**[English]**  
This project (`Aptitude Test / 能力傾向測試`) explicitly specifies its mathematical and computational boundaries:
- **Exclusion of Autonomous AI**: The system does NOT deploy, embed, invoke, or fine-tune any Large Language Models (LLMs), deep neural networks, or non-deterministic heuristic models.
- **Pure Deterministic Logic**: The engine operates strictly on deterministic seeded Pseudo-Random Number Generation (Mulberry32 PRNG), Constraint Satisfaction Problem (CSP) solvers, forward-checking tree traversal, and closed-form mathematical psychometric formulas.
- **100% Causal Explainability**: Every puzzle instance generated possesses an exact singular solution ($\vert{}\text{Sol}\vert{} = 1$) with fully traceable deduction paths, eliminating stochastic hallucinations and algorithmic bias.

**[繁體中文]**  
本專案（`Aptitude Test / 能力傾向測試`）在此明確規範其底層數學與計算架構邊界：
- **排除黑箱與生成式 AI**：本系統**未部署、未嵌入、未調用、亦未微調**任何大型語言模型（LLM）、深度神經網絡或隨機自學習模型。
- **純符號約束推導**：題盤生成完全建構於確定性種子偽隨機演算法（Mulberry32 PRNG）、約束滿足問題（CSP）回溯剪枝器及封閉式心理計量數學公式。
- **100% 因果可解釋性**：所有生成題型均具備嚴格唯一正解（$\vert{}\text{Sol}\vert{} = 1$），推導路徑全程透明可驗證，杜絕黑箱漂移與演算法偏誤。

---

## 2. Regulatory Alignment & Exemption Analysis
## 2. 法規架構適用性與豁免分析矩陣

| Regulatory Standard / 法規與標準 | Jurisdiction & Scope / 管轄與範疇 | Compliance & Exemption Rationale / 合規現狀與豁免理據 |
| :--- | :--- | :--- |
| **EU AI Act<br>(Regulation (EU) 2024/1689)** | High-Risk Employment AI<br>(Annex III - Recruitment) | **EXEMPT / OUT OF SCOPE (豁免適用)**<br>Article 3(1) defines an AI system as an inference-based system. Classical symbolic rule-based CSP solvers and fixed mathematical algorithms without machine-learned adaptation are explicitly excluded (Recital 12). |
| **Hong Kong EOC Guidelines<br>香港平機會僱傭實務守則** | 客觀甄選、防止直接與間接歧視 | **完全合規 (Fully Compliant)**<br>基於純幾何空間與正交邏輯推導，題目不涉及任何文化、性別、年齡或家庭崗位偏見；系統明確標記為輔助性自評沙盒，嚴禁自動化排他淘汰。 |
| **CAC Algorithmic Regulations<br>國家網信辦演算法法規** | 互聯網信息服務算法推薦服務 | **不適用 (Not Applicable)**<br>本專案無內容推薦、無排序演算法、無用戶標籤畫像，不屬於算法備案法定監管範疇。 |

---

## 3. ISO Management Standards Alignment
## 3. 國際標準化組織 (ISO) 架構原則對標

- **ISO/IEC 42001:2023 (Artificial Intelligence Management System)**:  
  雖然本專案非屬高風險 AI，但在治理層面深度對齊 ISO 42001 標準原則：
  - *Control A.6.2 (Transparency & Explainability)*: 每一道題目的解題推導步驟均具備完全可追溯的因果鏈支持。
  - *Control A.8.4 (Bias Mitigation)*: 幾何題目排除語言文化差異，符合演算法公平性要求。
- **ISO/IEC 27001:2022 (Information Security Management)**:  
  - 系統採用純靜態資源分發，運行於客戶端瀏覽器隔離沙盒中，伺服器端零攻擊面。
  - 遵循嚴格的內容安全策略（Content Security Policy, `default-src 'self'`），杜絕代碼注入。
- **ISO/IEC 27701:2019 (Privacy Information Management System)**:  
  - 實施最小化數據處理（Data Minimization）原則，完全實現隱私設計（Privacy by Design, PbD）。

---

## 4. Limitation of Liability & Professional Disclaimer
## 4. 責任限制與專業法律免責聲明

1. **Non-Clinical & Formative Nature (非臨床與形成性評估聲明)**:  
   本專案輸出之標準分（Stanine）與常模百分位數（PR）為演算法沙盒內部模擬值，**絕不構成任何正式神經心理學臨床診斷、標準化法定智力檢定或正式人事僱用之排他性法定判斷**。
2. **AS-IS Disclaimer (軟體現狀交付免責)**:  
   本專案依據 MIT License 提供，不帶有任何明示或暗示之商售性、特定目的適用性或不侵權擔保。開發者不對因使用本系統引發之任何直接、間接或衍生性爭議承擔法律責任。

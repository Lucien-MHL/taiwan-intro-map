# Taiwan Interactive Map Project - Claude記錄

## 專案概述 (Project Overview)
- **目標**: 學習 D3.js 製作台灣互動地圖，支援縣市點擊縮放和介紹文案顯示
- **技術棧**: Next.js 15 + React 19 + TypeScript + D3.js v7 + Zustand + TailwindCSS
- **地圖資料**: TopoJSON 格式 (已解決 GeoJSON 的 scale 問題)

## 當前開發狀態 (Current Development Status)

### ✅ 已完成功能
1. **基礎地圖渲染** - 使用 TopoJSON 成功解決座標投影問題
2. **Hover 效果** - 滑鼠移入縣市時顯示青色填充 (#06b6d4)
3. **點擊縮放功能** - 點擊縣市後縮放並顯示對應內容
4. **選中狀態維持** - 解決選中縣市在 hover 後顏色消失的問題
5. **狀態管理** - Zustand stores 管理地圖和內容狀態
6. **內容系統** - JSON 格式的縣市介紹資料結構
7. **響應式設計 (RWD)** - 完美解決地圖元素縮放問題，使用純 viewBox 技術
8. **互動行為優化** - 移除不必要的拖曳/滾輪/雙擊功能，專注於點擊縮放

### 🔧 核心技術實作細節

#### D3.js 地圖設定
```typescript
// 投影設定 (已優化)
const projection = d3
  .geoMercator()
  .scale(10000)
  .center([121, 23.5])
  .translate([width / 2, height / 2])
```

#### 縮放系統
- 縮放範圍: 1-8倍
- 動畫時間: 750ms
- 自動計算 bounds 並置中
- 支援雙擊/空白區域重置

#### 選中狀態管理（重要解決方案）
```typescript
// 問題: React 重新渲染會清除 D3 設置的 style，且 mouseleave 事件會覆蓋選中狀態

// 解決方案: 使用 ID + TailwindCSS 統一管理樣式
handleCityClick: (event, feature) => {
  (event.target as SVGPathElement).setAttribute('id', 'selected')
  setSelectedCity(cityName)
}

// CSS 優先級確保選中狀態不被 hover 覆蓋
useEffect(() => {
  svg.select('#selected').attr('class', 
    selectedCity ? 'fill-[#06b6d4]' : 'fill-transparent'
  )
}, [selectedCity])
```

#### 狀態管理架構
- `mapStore`: 處理選中縣市、縮放狀態
- `contentStore`: 管理顯示內容切換
- **ID-based 選中標識**: 避免 React + D3 狀態衝突
- 使用 Zustand 確保響應式更新

### 📁 專案結構
```
├── components/
│   ├── TaiwanSvgMap.tsx     # 主地圖組件
│   ├── map/                 # 地圖相關組件
│   └── content/             # 內容顯示組件
├── hooks/
│   └── useMapZoom.ts        # 縮放邏輯 hook
├── stores/
│   ├── mapStore.ts          # 地圖狀態管理
│   └── contentStore.ts      # 內容狀態管理
├── data/
│   ├── main.json           # TopoJSON 地圖資料
│   └── intros.json         # 縣市介紹內容
└── types/
    └── content.ts          # TypeScript 型別定義
```

### 🎯 下一步開發計畫

#### 優先級 1: 筆繪 Loading 動畫 🎨
- [ ] 實作單一縣市的 stroke animation proof of concept
- [ ] 設計 22 縣市的繪製順序策略（建議: 外島 → 本島輪廓 → 內部邊界）
- [ ] 優化 `getTotalLength()` 和 `stroke-dasharray` 效果
- [ ] 加入筆觸停頓效果讓動畫更自然
- [ ] 測試不同裝置的動畫效能

#### 優先級 2: 進階功能優化
- [ ] 響應式設計優化 (手機適配)
- [ ] 內容面板的視覺改進
- [ ] 重置按鈕 UI 優化

#### 優先級 3: 後期優化
- [ ] 無障礙設計實作
- [ ] 效能優化和程式碼重構
- [ ] SEO 和 meta 標籤優化

### 🔥 技術挑戰記錄
1. **GeoJSON vs TopoJSON**: 花費一週時間解決座標 scale 問題，最終 TopoJSON 完美解決
2. **D3 + React 整合**: 使用 useRef + useEffect 確保 DOM 操作正確性
3. **選中狀態維持問題**: 
   - 問題: React 重新渲染清除 D3 設置的 style + mouseleave 事件覆蓋選中狀態
   - 解決: 使用 ID 標識 + TailwindCSS 統一樣式管理，避免 JavaScript 狀態競爭
4. **狀態同步**: Zustand 確保地圖狀態與 UI 同步更新
5. **⭐ SVG 響應式元素縮放問題** (2025/08/29 解決):
   - 問題: `preserveAspectRatio="xMidYMid meet"` 導致地圖元素過早縮小
   - 嘗試方案: 動態 JavaScript scale 補償 (被否決，會破壞 zoom 狀態)
   - **最終解決**: 純 ViewBox 比例調整 `viewBox="0 0 450 800"` 實現 max-width 效果
   - **關鍵洞察**: SVG 的 preserveAspectRatio 自然臨界點可以通過調整 viewBox 比例控制

### 🚀 開發指令
- `npm run dev`: 開發模式
- `npm run build`: 建立生產版本  
- `npm run lint`: 代碼檢查

### 🎨 Loading 動畫技術規劃

#### 核心技術方案
```typescript
// SVG stroke animation 基礎
const totalLength = pathElement.getTotalLength()
pathElement.style.strokeDasharray = totalLength.toString()
pathElement.style.strokeDashoffset = totalLength.toString()

// D3 transition 控制繪製
d3.select(pathElement)
  .transition()
  .duration(2000)
  .ease(d3.easeLinear)
  .style('stroke-dashoffset', 0)
```

#### 繪製策略
1. **階段性繪製**: 外島 → 本島輪廓 → 縣市邊界
2. **視覺停頓**: 每個階段間加入短暫停頓讓效果更自然
3. **效能考量**: 複雜路徑可能需要簡化或分段處理
4. **錯誤處理**: 動畫載入失敗的 fallback 機制

### 💡 備註
- 無障礙設計將在後期優化階段處理
- 專案採用 Prettier + ESLint 確保代碼品質
- 使用 TailwindCSS 進行樣式管理
- **重要**: hover 和 zoom 功能已完美運作，可以專心開發 loading 動畫

---

## 📱 RWD 響應式設計研究 (2025/08/28)

### 🎯 RWD 必要性確認
**結論**: RWD 對於面試作品**絕對必要**，2025年不做 RWD 的前端作品基本上是職業自殺。

### 🔍 技術研究過程

#### 1. Observable D3 範例分析
- **範例**: https://observablehq.com/@d3/zoom-to-bounding-box
- **關鍵發現**: 使用固定尺寸 + CSS 自動縮放的簡單方法
- **實作方式**:
  ```javascript
  const width = 975, height = 610
  svg.attr("style", "max-width: 100%; height: auto;")
  // 固定投影參數，讓 CSS 處理響應式
  ```

#### 2. 天下雜誌地圖深度分析 ⭐
**研究網站**: https://www.cw.com.tw/graphics/recall-2025/map/

**🚀 重大發現: 動態 ViewBox 技術**

##### 核心技術突破:
- **手機版 (375px)**: `viewBox="0 0 375 667"`
- **桌面版 (1440px)**: `viewBox="0 0 1440 900"`
- **核心原理**: ViewBox 寬高 = 視窗尺寸，完全動態調整

##### 狀態保持測試結果:
✅ **縮放狀態完美保持** - 調整視窗大小時，地圖的縮放級別和選中狀態都不會丟失
✅ **佈局自適應** - 手機版底部面板，桌面版右側面板
✅ **內容尺寸適中** - 不會因為螢幕變小而地圖過小難以閱讀

### 🎓 關鍵技術洞察

#### 動態 ViewBox + 響應式 Scale 組合方案
```typescript
const updateResponsiveMap = () => {
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight
  
  // 1. 動態更新 ViewBox (關鍵!)
  svg.attr('viewBox', `0 0 ${windowWidth} ${windowHeight}`)
  
  // 2. 根據螢幕大小調整 projection scale
  const responsiveScale = getResponsiveScale(windowWidth)
  projection.scale(responsiveScale)
  
  // 3. 重新計算路徑但保持 zoom transform
  // 核心: 不清除 zoom 狀態，只更新基礎投影
}

const getResponsiveScale = (windowWidth: number): number => {
  if (windowWidth <= 375) return 30000      // 手機版
  if (windowWidth <= 768) return 25000      // 平板版
  if (windowWidth <= 1024) return 20000     // 小筆電
  if (windowWidth <= 1440) return 15000     // 一般桌面
  return 11000                              // 大螢幕
}
```

#### 當前專案狀態 ✅ **RWD 完美解決**
- ✅ **純 ViewBox 響應式方案** - 使用 `viewBox="0 0 450 800"` 實現 max-width 效果  
- ✅ **元素縮放控制完成** - 寬度 >450px 時地圖保持原始大小，<450px 才縮小
- ✅ **狀態保持機制** - zoom 和 selectedCity 在 resize 時完全保持
- ✅ **交互行為優化** - 移除拖曳/滾輪功能，只保留純淨的點擊縮放體驗

### 🎯 下一步開發重點：Loading 動畫 🎨 (2025/08/29)

**專案現狀**: 基礎功能和 RWD 已完成，專心開發視覺效果提升面試作品質感

#### 優先級 1: 筆繪 Loading 動畫實作
1. **動態線條 stroke animation** - 創造華麗的地圖繪製效果
2. **22 縣市繪製順序設計** - 外島 → 本島輪廓 → 內部縣市邊界
3. **視覺停頓和節奏** - 讓動畫更自然，增加觀賞性
4. **效能優化** - 確保各種裝置的流暢播放
5. **Fallback 機制** - 動畫失敗時的備用方案

### 🔧 技術挑戰預期
1. **狀態同步**: 確保 React state + D3 zoom state + 視窗狀態三方同步
2. **效能優化**: resize 事件的防抖處理
3. **邊界條件**: 極小螢幕和超寬螢幕的處理

### 📝 重要提醒
- **Loading 動畫為優先**: 基礎功能已穩定，專注視覺效果提升面試競爭力
- **保持技術純度**: 使用純 D3 + SVG 技術，避免過度依賴第三方套件  
- **效能優先**: 動畫效果需在各種裝置上流暢運行

---

## 🎯 SVG 響應式設計完美解決方案 (2025/08/29)

### ✨ 核心技術突破: 純 ViewBox 響應式控制

**問題**: 希望 SVG 地圖元素有類似 CSS `max-width` 的行為 - 大螢幕保持原始大小，小螢幕才按比例縮小

**解決方案**: 利用 `viewBox` 比例 + `preserveAspectRatio` 的自然臨界點行為

#### 關鍵技術實作:
```jsx
// 設定特定比例的 viewBox
<svg viewBox="0 0 450 800" className="w-full h-full" />

// D3 projection 對應調整
const projection = d3.geoMercator()
  .translate([450/2, 800/2]) // 對應 viewBox 中心點
```

#### 效果驗證:
- **容器寬度 > 450px**: 地圖保持原始大小 ✅
- **容器寬度 < 450px**: 地圖等比例縮小 ✅  
- **Zoom 狀態完全保持**: 調整視窗大小不影響使用者操作 ✅

### 🏆 技術優勢
1. **零 JavaScript 動態調整** - 純 SVG 特性實現
2. **完美狀態保持** - 不破壞 D3 zoom transform
3. **效能極佳** - 沒有 resize 事件監聽和重繪
4. **代碼簡潔** - 比動態 scale 補償方案簡單 10 倍

### 💡 重要洞察  
**SVG 的 `preserveAspectRatio` 行為可以透過精心設計的 viewBox 比例來創造出 CSS-like 的響應式效果。** 這比複雜的 JavaScript 動態調整更優雅且穩定。
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
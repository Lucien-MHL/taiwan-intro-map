# Taiwan Interactive Map Project

## Project Overview
- **Goal**: Learning D3.js to create an interactive Taiwan map with clickable zoom and city descriptions
- **Tech Stack**: Next.js 15 + React 19 + TypeScript + D3.js v7 + Zustand + TailwindCSS
- **Map Data**: TopoJSON format

## Current Development Status

### ✅ Completed Features
1. **Basic Map Rendering** - TopoJSON successfully resolved coordinate projection issues
2. **Hover Effects** - Mouse hover shows cyan fill (#06b6d4) on cities
3. **Click-to-Zoom** - Click city to zoom and show corresponding content
4. **Selected State Persistence** - Fixed issue where selected city color disappeared after hover
5. **State Management** - Zustand stores for map and content state
6. **Content System** - JSON format city introduction data structure
7. **Responsive Design (RWD)** - Perfect solution for map element scaling using pure viewBox technique
8. **Interaction Optimization** - Removed unnecessary drag/scroll/double-click, focusing on click-to-zoom

### 🔧 Core Technical Implementation

#### D3.js Map Configuration
```typescript
const projection = d3
  .geoMercator()
  .scale(10000)
  .center([121, 23.5])
  .translate([width / 2, height / 2])
```

#### Zoom System
- Zoom range: 1-8x
- Animation duration: 750ms
- Auto-calculate bounds and center
- Double-click/empty area reset support

#### Selected State Management (Important Solution)
```typescript
// Problem: React re-render clears D3-set styles, mouseleave events override selected state
// Solution: Use ID + TailwindCSS for unified style management
handleCityClick: (event, feature) => {
  (event.target as SVGPathElement).setAttribute('id', 'selected')
  setSelectedCity(cityName)
}

// CSS priority ensures selected state isn't overridden by hover
useEffect(() => {
  svg.select('#selected').attr('class', 
    selectedCity ? 'fill-[#06b6d4]' : 'fill-transparent'
  )
}, [selectedCity])
```

#### State Management Architecture
- `mapStore`: Handles selected city, zoom state
- `contentStore`: Manages content display switching
- **ID-based selection**: Avoids React + D3 state conflicts
- Zustand ensures reactive updates

### 📁 Project Structure
```
├── components/
│   ├── TaiwanSvgMap.tsx     # Main map component
│   ├── map/                 # Map-related components
│   └── content/             # Content display components
├── hooks/
│   └── useMapZoom.ts        # Zoom logic hook
├── stores/
│   ├── mapStore.ts          # Map state management
│   └── contentStore.ts      # Content state management
├── data/
│   ├── main.json           # TopoJSON map data
│   └── intros.json         # City introduction content
└── types/
    └── content.ts          # TypeScript type definitions
```

### 🎯 Next Development Plan

#### Priority 1: Stroke Loading Animation 🎨
- [ ] Implement single city stroke animation proof of concept
- [ ] Design drawing sequence strategy for 22 cities (suggest: outlying islands → main island outline → internal boundaries)
- [ ] Optimize `getTotalLength()` and `stroke-dasharray` effects
- [ ] Add stroke pause effects to make animation more natural
- [ ] Test animation performance on different devices

#### Priority 2: Advanced Feature Optimization
- [ ] Responsive design optimization (mobile adaptation)
- [ ] Content panel visual improvements
- [ ] Reset button UI optimization

#### Priority 3: Later Optimization
- [ ] Accessibility implementation
- [ ] Performance optimization and code refactoring
- [ ] SEO and meta tag optimization

### 🔥 Technical Challenge Records
1. **GeoJSON vs TopoJSON**: Spent a week solving coordinate scale issues, TopoJSON perfectly solved it
2. **D3 + React Integration**: Used useRef + useEffect to ensure proper DOM manipulation
3. **Selected State Persistence Issue**:
   - Problem: React re-render clears D3-set styles + mouseleave events override selected state
   - Solution: Use ID identification + TailwindCSS unified style management, avoid JavaScript state race
4. **State Synchronization**: Zustand ensures map state syncs with UI updates
5. **⭐ SVG Responsive Element Scaling Issue** (Solved 2025/08/29):
   - Problem: `preserveAspectRatio="xMidYMid meet"` caused map elements to shrink too early
   - Attempted: Dynamic JavaScript scale compensation (rejected, would break zoom state)
   - **Final Solution**: Pure ViewBox ratio adjustment `viewBox="0 0 450 800"` achieves max-width effect
   - **Key Insight**: SVG's preserveAspectRatio natural breakpoint can be controlled by adjusting viewBox ratio

### 🚀 Development Commands
- `npm run dev`: Development mode
- `npm run build`: Build production version
- `npm run lint`: Code linting

### 🎨 Loading Animation Technical Planning

#### Core Technical Approach
```typescript
// SVG stroke animation basics
const totalLength = pathElement.getTotalLength()
pathElement.style.strokeDasharray = totalLength.toString()
pathElement.style.strokeDashoffset = totalLength.toString()

// D3 transition controls drawing
d3.select(pathElement)
  .transition()
  .duration(2000)
  .ease(d3.easeLinear)
  .style('stroke-dashoffset', 0)
```

#### Drawing Strategy
1. **Staged Drawing**: Outlying islands → Main island outline → City boundaries
2. **Visual Pauses**: Add brief pauses between stages for more natural effect
3. **Performance Considerations**: Complex paths may need simplification or segmentation
4. **Error Handling**: Fallback mechanism for animation loading failures

### 💡 Notes
- Accessibility design will be handled in later optimization phase
- Project uses Prettier + ESLint to ensure code quality
- TailwindCSS for style management
- **Important**: Hover and zoom features work perfectly, can focus on developing loading animation
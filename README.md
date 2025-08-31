# 🏝️ Taiwan Interactive Map

An interactive map of Taiwan built with Next.js, D3.js, and modern web technologies. Click on any city to explore detailed information and zoom into different regions of beautiful Taiwan.

## 🚀 Live Demo

🔗 **[View Live Demo](https://taiwan-intro-map.vercel.app)** *(will be updated after deployment)*

## ✨ Features

- **🗺️ Interactive Map**: Click on any city/county to zoom in and explore
- **📍 Detailed City Information**: Population, area, highlights, and local specialties
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **🎨 Smooth Animations**: Elegant loading animations and transitions
- **🖱️ Intuitive Navigation**: Easy zoom controls and reset functionality
- **🎯 Accessible Design**: Keyboard navigation and screen reader support

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Data Visualization**: D3.js v7 with TopoJSON
- **State Management**: Zustand
- **Styling**: TailwindCSS
- **Build Tool**: Webpack (via Next.js)
- **Deployment**: Vercel

## 📊 Technical Highlights

### D3.js + React Integration
- Seamless integration of D3.js with React using useRef and useEffect
- Custom zoom behavior with smooth transitions
- TopoJSON data processing for optimal performance

### State Management
- **mapStore**: Manages selected city, zoom states, and D3 zoom behavior
- **contentStore**: Handles city content and information display
- **loadingStore**: Controls loading animations and stages

### Responsive Design Solution
```typescript
// Custom viewBox solution for perfect scaling
<svg viewBox="0 0 450 800" className="w-full h-full" />
```
- Pure SVG viewBox technique instead of JavaScript calculations
- Maintains zoom state during window resize
- Natural breakpoint behavior for mobile optimization

### Loading Animation System
- **Fade-Pulse Animation**: Elegant center pulse with multi-ring effects
- **State-Driven**: Zustand manages loading stages and transitions
- **Performance Optimized**: Pure CSS animations for mobile friendliness

## 🎯 Key Challenges Solved

1. **GeoJSON vs TopoJSON**: Resolved coordinate scale issues by switching to TopoJSON
2. **D3 + React State Conflicts**: Implemented ID-based selection with TailwindCSS for stable state management
3. **SVG Responsive Scaling**: Custom viewBox ratio solution for max-width-like behavior
4. **Loading UX**: Designed elegant fade-pulse animation system

## 🏗️ Project Structure

```
├── app/
│   └── page.tsx              # Main application page
├── components/
│   ├── TaiwanSvgMap.tsx     # Core map component
│   ├── Intro.tsx            # Information panel
│   ├── BackButton.tsx       # Navigation control
│   └── LoadingPulse.tsx     # Loading animation
├── stores/
│   ├── mapStore.ts          # Map state management
│   ├── contentStore.ts      # Content management
│   └── loadingStore.ts      # Loading states
├── data/
│   ├── main.json           # TopoJSON map data
│   └── intros.json         # City information
├── hooks/
│   ├── useMapZoom.ts       # Zoom functionality
│   └── useWindowSize.ts    # Responsive utilities
└── types/
    └── content.ts          # TypeScript definitions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/taiwan-intro-map.git
cd taiwan-intro-map

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Usage

1. **Explore the Map**: The interactive map shows all 22 cities and counties of Taiwan
2. **Click to Zoom**: Click on any region to zoom in and see detailed information
3. **Read City Info**: Information panel shows population, area, highlights, and local specialties
4. **Reset View**: Click the reset button or empty areas to return to full map view
5. **Mobile Experience**: Fully responsive design works on all device sizes

## 📱 Screenshots

*Screenshots will be added after deployment*

## 🔮 Future Enhancements

- [ ] Multi-language support (English, Japanese)
- [ ] Tourism recommendations and routes
- [ ] Historical timeline integration
- [ ] 3D terrain visualization
- [ ] Accessibility improvements

## 🤝 Contributing

This is a portfolio project, but suggestions and feedback are welcome! Feel free to open an issue or reach out.

## 📄 License

This project is for educational and portfolio purposes.

## 👨‍💻 Developer

**Lin Ming-Hui**
- 🌐 Portfolio: [Coming Soon]
- 📧 Email: [Your Email]
- 💼 LinkedIn: [Your LinkedIn]

---

*Built with ❤️ in Taiwan 🇹🇼*
import { create } from 'zustand'

interface MapState {
  selectedCity: string | null
  isZoomedIn: boolean
  d3Zoom: d3.ZoomBehavior<SVGSVGElement, unknown> | null
  setD3Zoom: (d3Zoom: d3.ZoomBehavior<SVGSVGElement, unknown>) => void
  setSelectedCity: (cityId: string | null) => void
  setZoomState: (isZoomedIn: boolean) => void
  reset: () => void
}

export const useMapStore = create<MapState>((set) => ({
  selectedCity: null,
  isZoomedIn: false,
  d3Zoom: null,
  setD3Zoom: (d3Zoom) => set({ d3Zoom }),
  setSelectedCity: (cityId) => set({ selectedCity: cityId }),
  setZoomState: (isZoomedIn) => set({ isZoomedIn }),
  reset: () => set({ selectedCity: null, isZoomedIn: false })
}))

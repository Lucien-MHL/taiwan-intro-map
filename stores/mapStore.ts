import { create } from 'zustand'

interface MapState {
  selectedCity: string | null
  isZoomedIn: boolean
  setSelectedCity: (cityId: string | null) => void
  setZoomState: (isZoomedIn: boolean) => void
  reset: () => void
}

export const useMapStore = create<MapState>((set) => ({
  selectedCity: null,
  isZoomedIn: false,
  setSelectedCity: (cityId) => set({ selectedCity: cityId }),
  setZoomState: (isZoomedIn) => set({ isZoomedIn }),
  reset: () => set({ selectedCity: null, isZoomedIn: false })
}))

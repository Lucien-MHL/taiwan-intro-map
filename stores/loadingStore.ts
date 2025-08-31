import { create } from 'zustand'

interface LoadingState {
  isLoading: boolean
  loadProgress: number // 0-100 for progress tracking
  loadingStage: 'initial' | 'data-loading' | 'rendering' | 'completed'
  setLoading: (loading: boolean) => void
  setProgress: (progress: number) => void
  setStage: (stage: LoadingState['loadingStage']) => void
  reset: () => void
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: true, // Start with loading state
  loadProgress: 0,
  loadingStage: 'initial',
  setLoading: (loading) => set({ isLoading: loading }),
  setProgress: (progress) =>
    set({ loadProgress: Math.min(100, Math.max(0, progress)) }),
  setStage: (stage) => set({ loadingStage: stage }),
  reset: () =>
    set({
      isLoading: true,
      loadProgress: 0,
      loadingStage: 'initial'
    })
}))

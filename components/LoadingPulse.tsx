'use client'

import { useLoadingStore } from '@/stores/loadingStore'
import { cn } from '@/lib/utils'

export function LoadingPulse() {
  const { isLoading } = useLoadingStore()

  if (!isLoading) return null

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-zinc-800">
      {/* Pulse animation container */}
      <div className="relative flex items-center justify-center">
        {/* Main pulse circle */}
        <div
          className={cn(
            'h-16 w-16 rounded-full border-2 border-cyan-400 bg-cyan-400/30',
            'animate-pulse'
          )}
        />

        {/* Outer pulse ring - slow animation */}
        <div
          className={cn(
            'absolute h-24 w-24 rounded-full border border-cyan-400/20',
            'animate-ping'
          )}
        />

        {/* Inner pulse ring - medium animation */}
        <div
          className={cn(
            'absolute h-20 w-20 rounded-full border border-cyan-400/40',
            'animate-ping',
            'animation-delay-75'
          )}
        />

        {/* Center dot */}
        <div className="absolute h-2 w-2 rounded-full bg-cyan-400" />
      </div>

      {/* Loading text */}
      <div className="absolute bottom-1/3 text-center">
        <p className="animate-pulse text-lg font-medium text-cyan-400">
          載入台灣地圖中...
        </p>
        <p className="mt-2 text-sm text-cyan-300/60">Loading Taiwan Map...</p>
      </div>
    </div>
  )
}

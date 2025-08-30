'use client'

import { useMapZoom } from '@/hooks/useMapZoom'
import { cn } from '@/lib/utils'
import { useMapStore } from '@/stores/mapStore'
import { ArrowLeft } from 'lucide-react'

export const BackButton = () => {
  const { handleReset } = useMapZoom()
  const { isZoomedIn } = useMapStore()

  return (
    <div
      className={cn(
        'absolute top-4 left-4 flex cursor-pointer gap-2 rounded-md bg-black/80 p-2 text-white backdrop-blur-sm',
        !isZoomedIn && 'hidden'
      )}
      onClick={handleReset}
      data-testid="back-button"
    >
      <ArrowLeft />
      <p>返回</p>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useContentStore } from '@/stores/contentStore'
import { useLoadingStore } from '@/stores/loadingStore'
import { cn } from '@/lib/utils'
import { useWindowSize } from '@/hooks/useWindowSize'

export const Intro = () => {
  const { currentContent } = useContentStore()
  const { isLoading } = useLoadingStore()
  const { width } = useWindowSize()
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    if (width >= 640) {
      setIsCollapsed(false)
    }
  }, [width])

  return (
    <div
      className={cn(
        // Base styles
        'absolute z-10 rounded-lg bg-black/80 text-white shadow-2xl backdrop-blur-sm select-none',
        'pointer-events-none',
        'overflow-hidden transition-all duration-1000 ease-in-out',
        'max-h-fit max-w-2xs',
        // 摺疊狀態樣式
        isCollapsed ? 'p-3' : 'p-6',
        // Loading fade effect
        isLoading ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100',
        // Desktop positioning (>=1280px)
        'xl:right-1/2 xl:translate-x-[150%]',
        // Desktop positioning (>=1024px)
        'lg:max-w-sm',
        // Desktop positioning (>=640px)
        'sm:top-2/5 sm:right-4',
        // Mobile positioning (<640px) - 浮動小卡片
        'max-sm:right-4 max-sm:bottom-4 max-sm:left-auto max-sm:max-w-[280px] max-sm:bg-black/90'
      )}
    >
      <div
        className={cn(
          'flex items-center justify-between',
          !isCollapsed && 'mb-2'
        )}
      >
        {/* Title */}
        <h2 className="pr-4 text-xl font-bold text-cyan-400">
          {currentContent.title}
        </h2>
        {/* 摺疊按鈕 - 可點擊 */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            'pointer-events-auto flex h-6 w-6 items-center justify-center rounded-full bg-cyan-600/30 text-xs text-cyan-200 transition-all duration-200 hover:bg-cyan-600/50 hover:text-white',
            isCollapsed ? 'top-3 right-2 rotate-0' : 'top-6 right-4 rotate-180',
            'sm:hidden'
          )}
        >
          ↑
        </button>
      </div>

      <div
        className={cn(
          'transition-all duration-750 ease-in-out',
          isCollapsed
            ? 'absolute -translate-y-2 scale-50 opacity-0'
            : 'translate-y-0 scale-100 opacity-100'
        )}
      >
        {/* Description */}
        <p className="mb-4 text-sm leading-relaxed text-gray-300">
          {currentContent.description}
        </p>

        {/* Stats */}
        <div className="mb-4 grid grid-cols-1 gap-3 text-xs lg:grid-cols-2">
          {currentContent.population && (
            <div>
              <span className="text-gray-400">人口:</span>
              <span className="ml-1 text-white">
                {currentContent.population}
              </span>
            </div>
          )}
          {currentContent.area && (
            <div>
              <span className="text-gray-400">面積:</span>
              <span className="ml-1 text-white">{currentContent.area}</span>
            </div>
          )}
        </div>

        {/* Highlights */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-cyan-300">特色亮點</h3>
          <ul className="space-y-1">
            {currentContent.highlights.slice(0, 3).map((highlight, index) => (
              <li
                key={index}
                className="flex items-start text-xs text-gray-300"
              >
                <span className="mr-2 text-cyan-400">•</span>
                <span className="leading-relaxed">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Specialties */}
        {currentContent.specialties && (
          <div className="mt-4 border-t border-gray-700 pt-3">
            <h3 className="mb-2 text-sm font-semibold text-cyan-300">
              特色美食
            </h3>
            <div className="flex flex-wrap gap-1">
              {currentContent.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="rounded-full bg-cyan-600/30 px-2 py-1 text-xs text-cyan-200"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import { cn } from '@/lib/utils'
import { useContentStore } from '../../stores/contentStore'
import { useMapStore } from '../../stores/mapStore'

export function ContentDisplay() {
  const { currentContent } = useContentStore()
  const { selectedCity, isZoomedIn } = useMapStore()

  return (
    <div className="h-full overflow-y-auto bg-white p-6">
      <div className="max-w-lg">
        {/* 縣市標籤 */}
        {selectedCity && (
          <div className="mb-4">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
              {selectedCity}
            </span>
          </div>
        )}

        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          {currentContent.title}
        </h1>

        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          {currentContent.description}
        </p>

        <div className="space-y-4">
          {currentContent.population && (
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-600">人口：</span>
              <span className="text-gray-800">{currentContent.population}</span>
            </div>
          )}

          {currentContent.area && (
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-600">面積：</span>
              <span className="text-gray-800">{currentContent.area}</span>
            </div>
          )}

          <div>
            <h3 className="mb-2 font-semibold text-gray-600">特色亮點：</h3>
            <ul className="space-y-1">
              {currentContent.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="mt-1 text-blue-500">•</span>
                  <span className="text-gray-700">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {currentContent.specialties && (
            <div>
              <h3 className="mb-2 font-semibold text-gray-600">特色美食：</h3>
              <div className="flex flex-wrap gap-2">
                {currentContent.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-800"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {isZoomedIn && (
          <div className="mt-6 rounded-lg bg-blue-50 p-4">
            <p
              className={cn(
                'text-sm',
                isZoomedIn ? 'text-blue-700' : 'text-green-700'
              )}
            >
              {isZoomedIn
                ? '💡 點擊地圖空白處可回到完整台灣視圖'
                : '🗺️ 點擊任何縣市可查看詳細資訊'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

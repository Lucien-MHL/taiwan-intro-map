'use client'

import { Mainland } from './Mainland'
import { ContentPanel } from '../content/ContentPanel'

export function MapContainer() {
  return (
    <div className="flex h-screen">
      <div className="flex flex-1 items-center justify-center">
        <Mainland />
      </div>
      <ContentPanel />
    </div>
  )
}

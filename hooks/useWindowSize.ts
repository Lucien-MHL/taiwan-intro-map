'use client'

import { useState, useEffect } from 'react'

const isServer = typeof window === 'undefined'

export function useWindowSize() {
  const [width, setWidth] = useState(isServer ? 0 : innerWidth)
  const [height, setHeight] = useState(isServer ? 0 : innerHeight)
  const handleResize = () => {
    setWidth(innerWidth)
    setHeight(innerHeight)
  }
  useEffect(() => {
    addEventListener('resize', handleResize)
    return () => removeEventListener('resize', handleResize)
  }, [])
  return { width, height }
}

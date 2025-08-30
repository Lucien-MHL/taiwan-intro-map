'use client'

import * as d3 from 'd3'
import { feature } from 'topojson-client'
import { useEffect, useRef } from 'react'
import map_data from '@/data/main.json'
import { cn } from '@/lib/utils'
import { useMapZoom } from '@/hooks/useMapZoom'
import { useMapStore } from '@/stores/mapStore'

const tw = map_data as any as Omit<TopoJSON.Topology, 'arcs'> & {
  arcs: [number, number][][]
}

const viewBox = {
  width: 450,
  height: 800
}

export function TaiwanSvgMap() {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const { selectedCity } = useMapStore()
  const { handleCityClick, handleReset, createD3Zoom } = useMapZoom()

  useEffect(() => {
    if (!svgRef.current) return
    const svg = d3.select(svgRef.current)
    draw(svg)
  }, [svgRef])

  // 監聽 selectedCity 變化，重新設置選中狀態
  useEffect(() => {
    if (!svgRef.current) return
    const svg = d3.select(svgRef.current)
    svg
      .select('#selected')
      .attr(
        'class',
        cn(
          'stroke-1.5 stroke-gray-300',
          selectedCity ? 'fill-[#06b6d4]' : 'fill-transparent'
        )
      )
  }, [selectedCity])

  const draw = (svg: d3.Selection<SVGSVGElement, unknown, null, undefined>) => {
    const width = viewBox.width
    const height = viewBox.height
    const mapObject = feature(tw, tw.objects.main) as GeoJSON.FeatureCollection

    const projection = d3
      .geoMercator()
      .scale(11000)
      .center([121, 23.6])
      .translate([width / 2, height / 2])
    const path = d3.geoPath().projection(projection)

    svg.attr('width', width).attr('height', height)

    // 創建地圖容器群組
    const mapGroup = svg.append('g')

    // 創建縮放行為
    const zoom = createD3Zoom(mapGroup)

    // 添加地圖路徑
    mapGroup
      .selectAll('path')
      .data(mapObject.features)
      .join('path')
      .attr('d', path)
      .attr(
        'class',
        cn(
          'fill-transparent cursor-pointer stroke-1.5 stroke-dashed stroke-gray-300',
          'transition-all ease-in-out duration-300',
          'hover:fill-[#06b6d4]'
        )
      )
      .on('click', (event: React.MouseEvent<SVGPathElement, MouseEvent>, d) => {
        handleCityClick(event, d, svg, zoom, path, width, height)
      })

    // 點擊空白區域重置
    svg.on('click', () => {
      handleReset()
    })
  }

  return (
    <div className="h-screen w-full">
      <svg
        id="taiwan-map"
        ref={svgRef}
        className="h-full w-full"
        viewBox={`0 0  ${viewBox.width} ${viewBox.height}`}
      />
    </div>
  )
}

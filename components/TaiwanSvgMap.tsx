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

export function TaiwanSvgMap() {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const { selectedCity } = useMapStore()
  const { handleCityClick, handleReset } = useMapZoom()

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
    const width = document.documentElement.clientWidth
    const height = document.documentElement.clientHeight
    const mapObject = feature(tw, tw.objects.main) as GeoJSON.FeatureCollection

    const projection = d3
      .geoMercator()
      .scale(10000)
      .center([121, 23.5])
      .translate([width / 2, height / 2])
    const path = d3.geoPath().projection(projection)

    svg.attr('width', width).attr('height', height)

    // 清除之前的內容
    svg.selectAll('*').remove()

    // 創建地圖容器群組
    const mapGroup = svg.append('g').attr('class', 'map-group')

    // 創建縮放行為
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 8])
      .on('zoom', (event) => {
        const { transform } = event
        mapGroup.attr('transform', transform.toString())
      })

    // 應用縮放行為到 SVG
    svg.call(zoom)

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
      handleReset(svg, zoom)
      // 顏色重置由 useEffect 處理
    })

    // 雙擊重置
    svg.on('dblclick.zoom', () => {
      handleReset(svg, zoom)
      // 顏色重置由 useEffect 處理
    })
  }

  return <svg ref={svgRef} />
}

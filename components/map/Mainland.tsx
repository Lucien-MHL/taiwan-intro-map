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

export function Mainland() {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const { selectedCity } = useMapStore()
  const { handleCityClick, handleReset } = useMapZoom()

  useEffect(() => {
    if (!svgRef.current) return
    const svg = d3.select(svgRef.current)
    draw(svg)
  }, [svgRef])

  const draw = (svg: d3.Selection<SVGSVGElement, unknown, null, undefined>) => {
    const width = document.documentElement.clientWidth
    const height = document.documentElement.clientHeight
    const mapObject = feature(tw, tw.objects.main) as GeoJSON.FeatureCollection

    const projection = d3.geoMercator().fitSize([width, height], mapObject)
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
    const paths = mapGroup
      .selectAll('path')
      .data(mapObject.features)
      .join('path')
      .attr('d', path)
      .attr(
        'class',
        cn(
          'fill-transparent cursor-pointer stroke-1.5 stroke-white',
          'transition-all ease-in-out duration-300'
        )
      )
      .on('mouseenter', function (event, d) {
        const cityName = d.properties?.COUNTYNAME
        if (cityName !== selectedCity) {
          d3.select(this).style('fill', '#06b6d4')
        }
      })
      .on('mouseleave', function (event, d) {
        const cityName = d.properties?.COUNTYNAME
        if (cityName !== selectedCity) {
          d3.select(this).style('fill', 'transparent')
        }
      })
      .on('click', (event, d) => {
        // 移除所有路徑的選中狀態
        paths.style('fill', 'transparent')

        // 為點擊的路徑添加選中狀態
        d3.select(event.currentTarget).style('fill', '#06b6d4')

        handleCityClick(event, d, svg, zoom, path, width, height)
      })

    // 點擊空白區域重置
    svg.on('click', () => {
      paths.style('fill', 'transparent')
      handleReset(svg, zoom)
    })

    // 雙擊重置
    svg.on('dblclick.zoom', () => {
      paths.style('fill', 'transparent')
      handleReset(svg, zoom)
    })
  }

  return <svg ref={svgRef} className="mx-auto border" />
}

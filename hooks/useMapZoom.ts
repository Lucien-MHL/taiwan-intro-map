import { useCallback } from 'react'
import * as d3 from 'd3'
import { useMapStore } from '../stores/mapStore'
import { useContentStore } from '../stores/contentStore'
import { cn } from '@/lib/utils'

export const useMapZoom = () => {
  const { setSelectedCity, setZoomState, reset: resetMapState } = useMapStore()
  const { setContent } = useContentStore()

  const zoomToFeature = useCallback(
    (
      svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
      zoom: d3.ZoomBehavior<SVGSVGElement, unknown>,
      path: d3.GeoPath,
      feature: GeoJSON.Feature,
      width: number,
      height: number
    ) => {
      const bounds = path.bounds(feature)
      const dx = bounds[1][0] - bounds[0][0]
      const dy = bounds[1][1] - bounds[0][1]
      const x = (bounds[0][0] + bounds[1][0]) / 2
      const y = (bounds[0][1] + bounds[1][1]) / 2
      const scale = Math.max(
        1,
        Math.min(8, 0.9 / Math.max(dx / width, dy / height))
      )
      const translate = [width / 2 - scale * x, height / 2 - scale * y]

      svg
        .transition()
        .duration(750)
        .call(
          zoom.transform,
          d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)
        )
    },
    []
  )

  const handleCityClick = useCallback(
    (
      event: React.MouseEvent<SVGPathElement, MouseEvent>,
      feature: GeoJSON.Feature,
      svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
      zoom: d3.ZoomBehavior<SVGSVGElement, unknown>,
      path: d3.GeoPath,
      width: number,
      height: number
    ) => {
      event.stopPropagation()
      ;(event.target as SVGPathElement).setAttribute('id', 'selected')

      // 從 TopoJSON 的 properties 中獲取縣市名稱
      const cityName = feature.properties?.COUNTYNAME
      const cityId = feature.properties?.COUNTYCODE

      setSelectedCity(cityName)
      setZoomState(true)
      setContent(cityName) // 使用 COUNTYNAME 來查找內容

      zoomToFeature(svg, zoom, path, feature, width, height)
    },
    [setSelectedCity, setZoomState, setContent, zoomToFeature]
  )

  const handleReset = useCallback(
    (
      svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
      zoom: d3.ZoomBehavior<SVGSVGElement, unknown>
    ) => {
      resetMapState()
      setContent(null)
      svg
        .select('#selected')
        .attr('id', '')
        .attr(
          'class',
          cn(
            'fill-transparent cursor-pointer stroke-1.5 stroke-gray-300',
            'transition-all ease-in-out duration-300',
            'hover:fill-[#06b6d4]'
          )
        )

      svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity)
    },
    [resetMapState, setContent]
  )

  return {
    handleCityClick,
    handleReset,
    zoomToFeature
  }
}

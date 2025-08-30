import { useCallback } from 'react'
import * as d3 from 'd3'
import { useMapStore } from '../stores/mapStore'
import { useContentStore } from '../stores/contentStore'
import { cn } from '@/lib/utils'

export const useMapZoom = () => {
  const {
    setSelectedCity,
    setZoomState,
    reset: resetMapState,
    setD3Zoom,
    isZoomedIn
  } = useMapStore()
  const { setContent } = useContentStore()

  const createD3Zoom = useCallback(
    (g: d3.Selection<SVGGElement, unknown, null, undefined>) => {
      const zoom = d3
        .zoom<SVGSVGElement, unknown>()
        .scaleExtent([1, 8])
        .on('zoom', (event) => {
          const { transform } = event
          g.attr('transform', transform.toString())
        })
      setD3Zoom(zoom)
      return zoom
    },
    []
  )

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
      const selectedElement = svg.select('#selected')
      const element = event.target as SVGPathElement
      if (selectedElement.node() !== element) {
        selectedElement
          .attr('id', '')
          .attr(
            'class',
            cn(
              'fill-transparent cursor-pointer stroke-1.5 stroke-gray-300',
              'transition-all ease-in-out duration-300',
              'hover:fill-[#06b6d4]'
            )
          )
      }

      element.setAttribute('id', 'selected')

      // 從 TopoJSON 的 properties 中獲取縣市名稱
      const cityName = feature.properties?.COUNTYNAME

      setSelectedCity(cityName)
      setZoomState(true)
      setContent(cityName) // 使用 COUNTYNAME 來查找內容

      zoomToFeature(svg, zoom, path, feature, width, height)
    },
    [setSelectedCity, setZoomState, setContent, zoomToFeature]
  )

  const handleReset = useCallback(() => {
    const { isZoomedIn, d3Zoom } = useMapStore.getState()
    if (!isZoomedIn) return
    resetMapState()
    setContent(null)
    const svg = d3.select('#taiwan-map')
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

    if (d3Zoom) {
      svg
        .transition()
        .duration(750)
        .call((d3Zoom as any).transform, d3.zoomIdentity)
    }
  }, [resetMapState, setContent])

  return {
    handleCityClick,
    handleReset,
    zoomToFeature,
    createD3Zoom
  }
}

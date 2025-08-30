export interface TaiwanFeatureProperties {
  COUNTYNAME: string
  COUNTYID: string
  TOWNNAME?: string
  TOWNID?: string
  [key: string]: any
}

export interface TaiwanFeature extends GeoJSON.Feature {
  properties: TaiwanFeatureProperties
}

export type TaiwanFeatureCollection = GeoJSON.FeatureCollection<
  GeoJSON.Geometry,
  TaiwanFeatureProperties
>

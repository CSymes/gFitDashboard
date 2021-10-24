import moment from "moment"

export const COLOUR_SCHEME = {
  domain: [
    '#AAAAAA',
    '#AA0000',
    '#00AA00'
  ]
}

export const DEFAULT_SIZE: [number, number] = [
  /* X */ 700,
  /* Y */ 300
]

export interface ChartDataPoint {
  name: string,
  value: number
}

export interface ChartSeries {
  name: string,
  series: ChartDataPoint[]
}

export type ChartMultiSeries = ChartSeries[]
export type ChartSingleSeries = ChartDataPoint[]

export interface TimeWindow {
  type: moment.unitOfTime.Base
  length: number
}

export interface TimeBucket {
  type: 'day' | 'month' | 'week',
  length: number
}

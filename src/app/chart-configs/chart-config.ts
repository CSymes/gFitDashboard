import { COLOUR_SCHEME, DEFAULT_SIZE } from "./common-interfaces";
import { curveBasis } from 'd3-shape';

export class ChartConfig {
  showXAxis = true;
  showYAxis = true;
  showLegend = false;
  showXAxisLabel = true;
  showYAxisLabel = true;
  colourScheme = COLOUR_SCHEME;
  viewport = DEFAULT_SIZE;
  curve = curveBasis
  timeline = false;

  xAxisLabel: string;
  yAxisLabel: string;

  xScaleMin: number = 0;
  xScaleMax: number = 0;

  constructor(xLabel: string, yLabel: string) {
    this.xAxisLabel = xLabel;
    this.yAxisLabel = yLabel;
  }

  setTimeBounds(min: number, max: number) {
    this.xScaleMin = min;
    this.xScaleMax = max;
  }
}

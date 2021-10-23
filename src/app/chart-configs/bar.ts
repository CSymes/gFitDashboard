import { COLOUR_SCHEME, DEFAULT_SIZE } from "./common-interfaces";

export class BarChartConfig {
  showXAxis = true;
  showYAxis = true;
  showLegend = false;
  showXAxisLabel = true;
  showYAxisLabel = true;
  colourScheme = COLOUR_SCHEME;
  viewport = DEFAULT_SIZE;

  xAxisLabel: string;
  yAxisLabel: string;

  constructor(xLabel: string, yLabel: string) {
    this.xAxisLabel = xLabel;
    this.yAxisLabel = yLabel;
  }
}

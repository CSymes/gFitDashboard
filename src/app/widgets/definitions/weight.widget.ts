import { BarChartConfig } from "src/app/chart-configs/bar";
import { AbstractWidgetConfig } from "./abstract.widget";

export class WeightWidget extends AbstractWidgetConfig {
  createChartConfig(): BarChartConfig {
    return new BarChartConfig('Time', 'Weight');
  }

  getDataTypeName(): string {
    return 'com.google.weight';
  }
}

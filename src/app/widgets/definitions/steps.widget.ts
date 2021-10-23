import { BarChartConfig } from "src/app/chart-configs/bar";
import { AbstractWidgetConfig } from "./abstract.widget";

export class StepsWidget extends AbstractWidgetConfig {
  createChartConfig(): BarChartConfig {
    return new BarChartConfig('Time', 'Steps');
  }

  getDataTypeName(): string {
    return 'com.google.step_count.delta';
  }
}

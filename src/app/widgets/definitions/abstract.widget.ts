import { BarChartConfig } from '../../chart-configs/bar';
import { TimeBucket, TimeWindow } from '../../chart-configs/common-interfaces';

export abstract class AbstractWidgetConfig {

  timeWindow: TimeWindow;
  timeBucket: TimeBucket;

  constructor() {
    this.timeWindow = {
      type: 'days',
      length: 10
    };
    this.timeBucket = {
      type: 'day',
      length: 1
    }
  }

  abstract createChartConfig(): BarChartConfig;

  abstract getDataTypeName(): string;
}

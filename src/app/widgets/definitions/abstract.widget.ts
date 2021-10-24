import { ChartConfig } from 'src/app/chart-configs/chart-config';
import { TimeBucket, TimeWindow } from '../../chart-configs/common-interfaces';

export abstract class AbstractWidgetConfig {

  timeWindow: TimeWindow;
  aggregationBucket: TimeBucket;

  constructor() {
    this.timeWindow = {
      type: 'days',
      length: 10
    };
    this.aggregationBucket = {
      type: 'day',
      length: 1
    }
  }

  createChartConfig(): ChartConfig {
    return new ChartConfig('Time', this.getName());
  }

  isAggregated(): boolean {
    return true;
  }

  isInteger(): boolean {
    return true;
  }

  getType(): GraphType {
    return GraphType.Bar;
  }

  abstract getName(): string;

  abstract getDataTypeName(): string;
}

export enum GraphType {
  Bar,
  Line
}

import { ChartConfig } from 'src/app/chart-configs/chart-config';
import { TimeBucket, TimeWindow } from '../../chart-configs/common-interfaces';

export abstract class AbstractWidget {

  timeWindow: TimeWindow;
  aggregationBucket: TimeBucket;

  constructor() {
    this.timeWindow = this.createTimeWindow();
    this.aggregationBucket = this.createAggregationBucket();
  }

  createTimeWindow(): TimeWindow {
    return {
      type: 'days',
      length: 10
    };
  }

  createAggregationBucket(): TimeBucket {
    return {
      type: 'day',
      length: 1
    };
  }

  createChartConfig(): ChartConfig {
    return new ChartConfig('Time', this.getName(), this.getUnits());
  }

  isAggregated(): boolean {
    return true;
  }

  getType(): GraphType {
    return GraphType.Bar;
  }

  abstract getName(): string;

  abstract getUnits(): string;

  abstract getDataTypeName(): string;
}

export enum GraphType {
  Bar,
  Line
}

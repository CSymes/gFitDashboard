import { TimeWindow } from "src/app/chart-configs/common-interfaces";
import { AbstractWidget, GraphType } from "./abstract.widget";

export class HeartRateWidget extends AbstractWidget {

  getName(): string {
    return 'Heart Rate';
  }

  getUnits(): string {
    return 'BPM';
  }

  isAggregated(): boolean {
    return false;
  }

  createTimeWindow(): TimeWindow {
    return {
      type: 'month',
      length: 3
    };
  }

  getType(): GraphType {
    return GraphType.Line;
  }

  getDataTypeName(): string {
    return 'derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm';
  }
}

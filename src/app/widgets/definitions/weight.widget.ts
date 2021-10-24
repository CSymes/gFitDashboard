import { TimeWindow } from "src/app/chart-configs/common-interfaces";
import { AbstractWidget, GraphType } from "./abstract.widget";

export class WeightWidget extends AbstractWidget {

  getName(): string {
    return 'Weight';
  }

  getUnits(): string {
    return 'kg';
  }

  isAggregated(): boolean {
    return false;
  }

  isInteger(): boolean {
    return false;
  }

  createTimeWindow(): TimeWindow {
    return {
      type: 'years',
      length: 1
    };
  }

  getType(): GraphType {
    return GraphType.Line;
  }

  getDataTypeName(): string {
    return 'derived:com.google.weight:com.google.android.gms:merge_weight';
    // return 'com.google.weight';
  }
}

import { TimeWindow } from "src/app/chart-configs/common-interfaces";
import { AbstractWidget, GraphType } from "./abstract.widget";

export class HeightWidget extends AbstractWidget {

  getName(): string {
    return 'Height';
  }

  getUnits(): string {
    return 'm';
  }

  isAggregated(): boolean {
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
    return 'derived:com.google.height:com.google.android.gms:merge_height';
  }
}

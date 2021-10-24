import { AbstractWidgetConfig, GraphType } from "./abstract.widget";

export class WeightWidget extends AbstractWidgetConfig {

  getName(): string {
    return 'Weight';
  }

  isAggregated(): boolean {
    return false;
  }

  isInteger(): boolean {
    return false;
  }

  getType(): GraphType {
    return GraphType.Line;
  }

  getDataTypeName(): string {
    return 'derived:com.google.weight:com.google.android.gms:merge_weight';
    // return 'com.google.weight';
  }
}

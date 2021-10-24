import { AbstractWidgetConfig } from "./abstract.widget";

export class StepsWidget extends AbstractWidgetConfig {
  getName(): string {
    return 'Steps';
  }

  getDataTypeName(): string {
    return 'com.google.step_count.delta';
  }
}

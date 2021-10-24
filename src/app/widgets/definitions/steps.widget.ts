import { AbstractWidget } from "./abstract.widget";

export class StepsWidget extends AbstractWidget {
  getName(): string {
    return 'Steps';
  }

  getDataTypeName(): string {
    return 'com.google.step_count.delta';
  }
}

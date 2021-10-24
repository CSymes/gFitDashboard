import { AbstractWidget } from "./abstract.widget";

export class StepsWidget extends AbstractWidget {
  getName(): string {
    return 'Steps';
  }

  getUnits(): string {
    return 'steps'
  }

  getDataTypeName(): string {
    return 'com.google.step_count.delta';
  }
}

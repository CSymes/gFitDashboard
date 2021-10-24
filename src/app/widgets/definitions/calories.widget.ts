import { AbstractWidget } from "./abstract.widget";

export class CaloriesWidget extends AbstractWidget {
  getName(): string {
    return 'Calories Burnt';
  }

  getUnits(): string {
    return 'cal'
  }

  getDataTypeName(): string {
    return 'com.google.calories.expended';
  }
}

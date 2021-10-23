import { Component } from '@angular/core';
import { BarChartConfig } from 'src/app/chart-configs/bar';
import { GenericWidgetComponent } from '../generic-widget.component';

@Component({
  selector: 'app-widget-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsWidgetComponent extends GenericWidgetComponent<BarChartConfig> {
  createConfig(): BarChartConfig {
    return new BarChartConfig('Time', 'Steps');
  }

  getDataTypeName(): string {
    return 'com.google.step_count.delta';
  }
}

import { Component } from '@angular/core';
import { BarChartConfig } from 'src/app/chart-configs/bar';
import { GenericWidgetComponent } from '../generic-widget.component';

@Component({
  selector: 'app-widget-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.css']
})
export class WeightComponent extends GenericWidgetComponent<BarChartConfig>{
  createConfig(): BarChartConfig {
    return new BarChartConfig('Time', 'Weight');
  }

  getDataTypeName(): string {
    return 'com.google.weight';
  }
}

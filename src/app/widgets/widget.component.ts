import { Component, Input } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import moment from 'moment';
import { config } from 'rxjs';
import { BarChartConfig } from '../chart-configs/bar';
import { AggregateDataBody } from '../utils/api-queries';
import { ApiService } from '../utils/api.service';
import { Endpoints } from '../utils/endpoints';
import { AbstractWidgetConfig } from './definitions/abstract.widget';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent {

  _config!: AbstractWidgetConfig;
  _user!: SocialUser;

  graphData: any;
  graphConfig!: BarChartConfig;

  get config() { return this._config; }

  get user() { return this._user; }

  @Input() set config(val: AbstractWidgetConfig) {
    this._config = val;
    this.graphConfig = val.createChartConfig();
    this.loadData();
  }

  @Input() set user(val: SocialUser) {
    this._user = val;
    this.loadData();
  }

  constructor(private api: ApiService) { }

  loadData(): void {
    // wait all both inputs
    if (!this.user || !this.config) return;

    var aggDefinition: AggregateDataBody = {
      endTimeMillis: moment().startOf(this.config.timeWindow.type).valueOf(),
      startTimeMillis: moment().subtract(this.config.timeWindow.length, this.config.timeWindow.type).startOf(this.config.timeWindow.type).valueOf(),
      aggregateBy: [
        {
          dataTypeName: this.config.getDataTypeName()
        }
      ],
      bucketByTime: {
        period: {
          type: this.config.timeBucket.type,
          value: this.config.timeBucket.length,
          timeZoneId: Intl.DateTimeFormat().resolvedOptions().timeZone
        }
      }
    }

    this.api.apiPost<any>(Endpoints.getAggregatedData, this.user, aggDefinition).subscribe((data) => {
      console.log(data);

      this.graphData = data.bucket.filter((item: any) => {
        return item.dataset[0].point.length > 0;
      }).map((item: any) => {
        return {
          name: item.startTimeMillis,
          value: item.dataset[0].point[0].value[0].intVal
        }
      });

      console.log(this.graphData);
    });
  }
}

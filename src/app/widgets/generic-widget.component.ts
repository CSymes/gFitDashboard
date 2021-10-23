import { Component, Input } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import moment from 'moment';
import { GenericChartConfig, TimeBucket, TimeWindow } from '../chart-configs/common-interfaces';
import { AggregateDataBody } from '../utils/api-queries';
import { ApiService } from '../utils/api.service';
import { Endpoints } from '../utils/endpoints';

@Component({ template: '' })
export class GenericWidgetComponent<T = GenericChartConfig> {

  timeWindow: TimeWindow;
  timeBucket: TimeBucket;
  _user!: SocialUser;

  get user() {
    return this._user;
  }

  @Input() set user(val: SocialUser) {
    console.log('got user input');

    this._user = val;
    this.loadData();
  }

  graphConfig: T;
  graphData: any;

  constructor(private api: ApiService) {
    this.graphConfig = this.createConfig();
    this.timeWindow = {
      type: 'days',
      length: 10
    };
    this.timeBucket = {
      type: 'day',
      length: 1
    }
  }

  createConfig(): T {
    throw new Error("Not implemented!");
  }

  getDataTypeName(): string {
    throw new Error("Not implemented!");
  }

  loadData(): void {
    var aggDefinition: AggregateDataBody = {
      endTimeMillis: moment().startOf(this.timeWindow.type).valueOf(),
      startTimeMillis: moment().subtract(this.timeWindow.length, this.timeWindow.type).startOf(this.timeWindow.type).valueOf(),
      aggregateBy: [
        {
          dataTypeName: this.getDataTypeName()
        }
      ],
      bucketByTime: {
        period: {
          type: this.timeBucket.type,
          value: this.timeBucket.length,
          timeZoneId: Intl.DateTimeFormat().resolvedOptions().timeZone
        }
      }
    }

    this.api.apiPost<any>(Endpoints.getAggregatedData, this.user, aggDefinition).subscribe((data) => {
      console.log(data);

      this.graphData = data.bucket.map((item: any) => {
        return {
          name: item.startTimeMillis,
          value: item.dataset[0].point[0].value[0].intVal
        }
      });

      console.log(this.graphData);
    });
  }

}

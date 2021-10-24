import { Component, Input } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { ChartConfig } from '../chart-configs/chart-config';
import { ChartMultiSeries, ChartSingleSeries } from '../chart-configs/common-interfaces';
import { AggregateDataBody } from '../utils/api-queries';
import { ApiService } from '../utils/api.service';
import { Endpoints } from '../utils/endpoints';
import { AbstractWidgetConfig, GraphType } from './definitions/abstract.widget';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent {

  _config!: AbstractWidgetConfig;
  _user!: SocialUser;

  graphData: any;
  graphConfig!: ChartConfig;

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
    // wait for all inputs
    if (!this.user || !this.config) return;

    let sub: Observable<any>;
    if (this.config.isAggregated()) {
      sub = this.loadAggData();
    } else {
      sub = this.loadRawData();
    }

    sub.subscribe((data: any) => {
      this.graphData = data;
    });
  }

  loadRawData(): Observable<ChartMultiSeries> {
    const output = new Subject<ChartMultiSeries>();
    const ept = Endpoints.getDataSources + this.config.getDataTypeName() + '/datasets/' + '0-1634997142275000000'

    this.api.apiGet<any>(ept, this.user).subscribe((data) => {
      const formattedData = [{
        'name': this.config.getName(),
        'series': data.point.map((item: any) => {
          return {
            name: this.getTimeSeconds(item),
            value: this.getValue(item.value[0])
          }
        })
      }];

      output.next(formattedData);
      output.complete();
    });

    return output;
  }

  loadAggData(): Observable<ChartSingleSeries> {
    const output = new Subject<ChartSingleSeries>();

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
          type: this.config.aggregationBucket.type,
          value: this.config.aggregationBucket.length,
          timeZoneId: Intl.DateTimeFormat().resolvedOptions().timeZone
        }
      }
    }

    this.api.apiPost<any>(Endpoints.getAggregatedData, this.user, aggDefinition).subscribe((data) => {
      const formattedData = data.bucket.filter((item: any) => {
        return item.dataset[0].point.length > 0;
      }).map((item: any) => {
        return {
          name: this.getTimeSeconds(item),
          value: this.getValue(item.dataset[0].point[0].value[0])
        }
      });

      output.next(formattedData);
      output.complete();
    });

    return output;
  }

  getTimeSeconds(item: any): number {
    return item.startTimeNanos / 1e9 || item.startTimeMillis / 1e3;
  }

  getValue(val: any): string {
    return this.config.isInteger() ? val.intVal : val.fpVal;
  }

  // expose GraphType to the template
  get GraphType() {
    return GraphType;
  }
}

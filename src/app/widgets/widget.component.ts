import { Component, Input } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { ChartConfig } from '../chart-configs/chart-config';
import { ChartSingleSeries, TimeBucket } from '../chart-configs/common-interfaces';
import { AggregateDataBody } from '../utils/api-queries';
import { ApiService } from '../utils/api.service';
import { Endpoints } from '../utils/endpoints';
import { AbstractWidget, GraphType } from './definitions/abstract.widget';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent {

  _config!: AbstractWidget;
  _user!: SocialUser;

  graphData: any;
  graphConfig!: ChartConfig;

  get config() { return this._config; }
  get user() { return this._user; }

  @Input() set config(val: AbstractWidget) {
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

    const startTimeS = moment().subtract(this.config.timeWindow.length, this.config.timeWindow.type).startOf(this.config.timeWindow.type).unix();
    const endTimeS = moment().startOf(this.config.timeWindow.type).unix();

    this.graphConfig.setTimeBounds(startTimeS, endTimeS);

    let sub: Observable<any>;
    if (this.config.isAggregated()) {
      sub = this.loadAggData(startTimeS, endTimeS, this.config.aggregationBucket);
    } else {
      const inner_sub = new Subject<ChartSingleSeries>();
      sub = inner_sub;
      this.loadRawData(startTimeS, endTimeS).subscribe((items: ChartSingleSeries) => {
        this.loadRawData(0, startTimeS, 1).subscribe((inner_items: ChartSingleSeries) => {

          if (inner_items.length) {
            items.unshift(inner_items[0]);
          }
          if (items.length) {
            const lastItem = items[items.length - 1];
            items.push({
              name: endTimeS.toString(),
              value: lastItem.value
            });
          }

          inner_sub.next(items);
          inner_sub.complete();
        });
      });
    }

    sub.subscribe((data: any) => {
      // convert to ChartMultiSeries if necessary
      if (this.config.getType() == GraphType.Line) {
        data = [{
          'name': this.config.getName(),
          'series': data
        }];
      }

      this.graphData = data;
    });
  }

  loadRawData(start: number, end: number, limit?: number): Observable<ChartSingleSeries> {
    const output = new Subject<ChartSingleSeries>();
    const ept = Endpoints.getDataSources + this.config.getDataTypeName() + `/datasets/${start * 1e9}-${end * 1e9}`;

    const params: any = {}
    if (limit) {
      params.limit = limit;
    }

    this.api.apiGet<any>(ept, this.user, params).subscribe((data) => {
      const formattedData = data.point.map((item: any) => {
        return {
          name: this.getTimeSeconds(item),
          value: this.getValue(item.value[0])
        }
      });

      output.next(formattedData);
      output.complete();
    });

    return output;
  }

  loadAggData(start: number, end: number, agg: TimeBucket): Observable<ChartSingleSeries> {
    const output = new Subject<ChartSingleSeries>();

    var aggDefinition: AggregateDataBody = {
      startTimeMillis: start * 1e3,
      endTimeMillis: end * 1e3,
      aggregateBy: [
        {
          dataTypeName: this.config.getDataTypeName()
        }
      ],
      bucketByTime: {
        period: {
          type: agg.type,
          value: agg.length,
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

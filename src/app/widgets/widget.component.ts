import { Component, Input } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { ChartConfig } from '../chart-configs/chart-config';
import { ChartMultiSeries, ChartSingleSeries, TimeBucket } from '../chart-configs/common-interfaces';
import { AggDataBody, AggregateDataRequestBody, DataBody, PossibleTime, PossibleValue } from '../utils/api-queries';
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

  graphData!: ChartSingleSeries | ChartMultiSeries;
  graphConfig!: ChartConfig;

  get config(): AbstractWidget { return this._config; }
  @Input() set config(val: AbstractWidget) {
    this._config = val;
    this.graphConfig = val.createChartConfig();
    this.loadData();
  }

  get user(): SocialUser { return this._user; }
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

    let sub: Observable<ChartSingleSeries>;
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

    sub.subscribe((data: ChartSingleSeries) => {
      // convert to ChartMultiSeries if necessary
      if (this.config.getType() == GraphType.Line) {
        this.graphData = [{
          'name': this.config.getName(),
          'series': data
        }];
      } else {
        this.graphData = data;
      }
    });
  }

  loadRawData(start: number, end: number, limit?: number): Observable<ChartSingleSeries> {
    const output = new Subject<ChartSingleSeries>();
    const ept = Endpoints.getDataSources + this.config.getDataTypeName() + `/datasets/${start * 1e9}-${end * 1e9}`;

    const params = (limit ? { limit } : undefined);

    this.api.apiGet<DataBody>(ept, this.user, params).subscribe(data => {
      const formattedData: ChartSingleSeries = data.point.map(item => {
        return {
          name: this.getTimeSeconds(item).toString(),
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

    const aggDefinition: AggregateDataRequestBody = {
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

    this.api.apiPost<AggDataBody>(Endpoints.getAggregatedData, this.user, aggDefinition).subscribe((data) => {
      const formattedData: ChartSingleSeries = data.bucket.filter(item => {
        return item.dataset[0].point.length > 0;
      }).map(item => {
        return {
          name: this.getTimeSeconds(item).toString(),
          value: this.getValue(item.dataset[0].point[0].value[0])
        }
      });

      output.next(formattedData);
      output.complete();
    });

    return output;
  }

  getTimeSeconds(item: PossibleTime): number {
    return ((item.startTimeNanos || 0) / 1e9) || ((item.startTimeMillis || 0) / 1e3) || 0;
  }

  getValue(val: PossibleValue): number {
    return val.fpVal ?? val.intVal ?? 0;
  }

  // expose GraphType to the template
  get GraphType(): typeof GraphType {
    return GraphType;
  }
}

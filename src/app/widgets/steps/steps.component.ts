import { Component, Input, OnInit } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import moment from 'moment';
import { BarConfig } from 'src/app/chart-configs/bar';
import { AggregateDataBody } from 'src/app/utils/api-queries';
import { ApiService } from 'src/app/utils/api.service';
import { Endpoints } from 'src/app/utils/endpoints';

@Component({
  selector: 'app-widget-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsWidgetComponent {

  _user!: SocialUser;

  get user() {
    return this._user;
  }

  @Input() set user(val: SocialUser) {
    console.log('got user input');

    this._user = val;
    this.loadData(val);
  }

  graphConfig: BarConfig;
  graphData: any;

  constructor(private api: ApiService) {
    this.graphConfig = new BarConfig('Time', 'Steps');
  }

  loadData(user: SocialUser): void {

    const numDays = 10;

    var stepBody: AggregateDataBody = {
      endTimeMillis: moment().startOf('day').valueOf(),
      startTimeMillis: moment().subtract(numDays, 'days').startOf('day').valueOf(),
      aggregateBy: [
        {
          dataTypeName: 'com.google.step_count.delta'
        }
      ],
      bucketByTime: {
        period: {
          type: 'day',
          value: 1,
          timeZoneId: Intl.DateTimeFormat().resolvedOptions().timeZone
        }
      }
    }

    this.api.apiPost<any>(Endpoints.getAggregatedData, user, stepBody).subscribe((data) => {
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

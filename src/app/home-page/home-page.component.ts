import { Component, OnInit } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import moment from 'moment';
import { BarConfig } from '../chart-configs/bar';
import { AggregateDataBody } from '../utils/api-queries';
import { ApiService } from '../utils/api.service';
import { AuthService } from '../utils/auth.service';
import { Endpoints } from '../utils/endpoints';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  user?: SocialUser;
  data?: string;

  graphConfig: BarConfig;
  graphData: any;

  constructor(private auth: AuthService, private api: ApiService) {

    this.graphConfig = new BarConfig('Time', 'Steps');
  }

  ngOnInit(): void {
    this.auth.getUser().subscribe((user) => {
      this.user = user;
      this.loadData(user);

      console.log(user);
    });
  }

  loadData(user: SocialUser): void {
    this.api.apiGet<string>(Endpoints.getDataSources, user).subscribe((data) => {
      console.log(data);
      // this.data = JSON.stringify(data);
    })

    var stepBody: AggregateDataBody = {
      endTimeMillis: moment().startOf('day').valueOf(),
      startTimeMillis: moment().subtract(10, 'days').startOf('day').valueOf(),
      aggregateBy: [
        {
          dataTypeName: 'com.google.step_count.delta'
        }
      ],
      bucketByTime: {
        period: {
          type: 'day',
          value: 1,
          timeZoneId: 'Australia/Melbourne'
        }
      }
    }

    this.api.apiPost<any>(Endpoints.getAggregatedData, user, stepBody).subscribe((data) => {
      console.log(data);
      this.data = JSON.stringify(data);

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

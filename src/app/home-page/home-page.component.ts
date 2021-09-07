import { Component, OnInit } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import moment from 'moment';
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

  constructor(private auth: AuthService, private api: ApiService) { }

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

    this.api.apiPost<string>(Endpoints.getAggregatedData, user, stepBody).subscribe((data) => {
      console.log(data);
      this.data = JSON.stringify(data);
    });
  }
}

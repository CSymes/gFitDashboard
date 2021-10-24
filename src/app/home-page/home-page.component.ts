import { Component, OnInit } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import { ApiService } from '../utils/api.service';
import { AuthService } from '../utils/auth.service';
import { AbstractWidget } from '../widgets/definitions/abstract.widget';
import { CaloriesWidget } from '../widgets/definitions/calories.widget';
import { HeightWidget } from '../widgets/definitions/height.widget';
import { HeartRateWidget } from '../widgets/definitions/hr.widget';
import { StepsWidget } from '../widgets/definitions/steps.widget';
import { WeightWidget } from '../widgets/definitions/weight.widget';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  user!: SocialUser;
  chartConfigs: Record<string, AbstractWidget[]>;
  currentPanel: string;

  constructor(private auth: AuthService, private api: ApiService) {
    this.chartConfigs = {
      "Activity": [
        new CaloriesWidget(),
        new StepsWidget(),
        new HeartRateWidget()
      ],
      "Body": [
        new WeightWidget(),
        new HeightWidget(),
      ]
    }

    // default to first category
    this.currentPanel = Object.keys(this.chartConfigs)[0];
  }

  ngOnInit(): void {
    this.auth.observe.subscribe((user) => {
      if (!user) {
        this.auth.exitSecureArea();
        return;
      }

      this.user = user;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.log(user.response.access_token);
    });
  }
}

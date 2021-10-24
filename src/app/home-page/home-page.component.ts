import { Component, OnInit } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import { ApiService } from '../utils/api.service';
import { AuthService } from '../utils/auth.service';
import { AbstractWidget } from '../widgets/definitions/abstract.widget';
import { StepsWidget } from '../widgets/definitions/steps.widget';
import { WeightWidget } from '../widgets/definitions/weight.widget';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  user!: SocialUser;
  chartConfigs: AbstractWidget[];

  constructor(private auth: AuthService, private api: ApiService) {
    this.chartConfigs = [
      new StepsWidget(),
      new WeightWidget()
    ]
  }

  ngOnInit(): void {
    this.auth.getUser().subscribe((user) => {
      this.user = user;
      console.log(user);
    });
  }
}

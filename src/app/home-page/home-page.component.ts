import { Component, OnInit } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
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
    });
  }

  loadData(user: SocialUser): void {
    this.api.apiGet<string>(Endpoints.getDataSources, user).subscribe((data) => {
      console.log(data);
      this.data = JSON.stringify(data);
    })
  }
}

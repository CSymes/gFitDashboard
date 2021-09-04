import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { ApiService } from '../utils/api-service.service';
import { Endpoints } from '../utils/endpoints';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  user?: SocialUser;
  data?: string;

  constructor(private authService: SocialAuthService, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      // validate that we're actually logged in before trying to do anything
      if (user === null) this.router.navigate(['/login']);

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

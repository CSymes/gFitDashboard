import { Component, OnInit } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import { ApiService } from '../utils/api.service';
import { AuthService } from '../utils/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  user!: SocialUser;

  constructor(private auth: AuthService, private api: ApiService) {  }

  ngOnInit(): void {
    this.auth.getUser().subscribe((user) => {
      this.user = user;
      console.log(user);
    });
  }
}

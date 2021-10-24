import { Component, OnInit } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import { timer } from 'rxjs';
import { AuthService } from '../utils/auth.service';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.css']
})
export class TitlebarComponent implements OnInit {

  public user: SocialUser | undefined | null;
  public dispText: string;

  constructor(private auth: AuthService) {
    this.dispText = '';
  }

  ngOnInit(): void {
    this.auth.observe.subscribe((user) => {
      this.user = user;
      if (user) {
        this.dispText = `Welcome, ${user.name}`;
      } else {
        this.dispText = 'gFitDashboard';
      }
    });

    // backup in case it's taking ages to determine whether we're logged in or not -- assume not
    timer(1000).subscribe(_ => {
      if (this.user === undefined) this.user = null;
    });
  }
}

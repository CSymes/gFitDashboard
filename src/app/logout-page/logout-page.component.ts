import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../utils/auth.service';

@Component({
  selector: 'app-logout-page',
  templateUrl: './logout-page.component.html',
  styleUrls: ['./logout-page.component.css']
})
export class LogoutPageComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // ask auth service to logout
    this.authService.signOut().subscribe(_ => {
      console.log('user logout flow')

      // then redirect to the landing page
      this.authService.exitSecureArea();
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private authService: SocialAuthService, private router: Router) { }

  ngOnInit(): void {
    // wait until the service is loaded
    this.authService.initState.subscribe(value => {
      // then request a Google sign-in
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
        console.log('user login flow:', user)

        // then redirect to the start page
        this.router.navigate(['/home']);
      });
    })
  }
}

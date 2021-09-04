import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { SessionManagerService } from '../utils/session-manager.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private authService: SocialAuthService, private sessionManager: SessionManagerService, private router: Router) { }

  ngOnInit(): void {
    // wait until the service is loaded
    this.authService.initState.subscribe(value => {
      // then request a Google sign-in
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
        console.log('GoogleContainerComponent.ngOnInit user:', user)
        // save the authentication to local storage
        this.sessionManager.saveLoginDetails(user);
        console.log(this.sessionManager.loadCredentials());

        // then redirect to the start page
        this.router.navigate(['/home']);
      });
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private authService: SocialAuthService) { }

  ngOnInit(): void {this.authService.initState.subscribe(value => {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
      console.log('GoogleContainerComponent.ngOnInit user:', user)
    });
  })
  }
}

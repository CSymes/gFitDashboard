import { OnDestroy } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { EMPTY, Observable, Observer, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private user?: SocialUser;
  private authSub?: Subscription;

  constructor(private authService: SocialAuthService, private router: Router) {
    this.launch();
  }

  getUser(): Observable<SocialUser> {

    // not currently logged in, redirect to the login page
    if (this.user === null) {
      this.pleaseLogin();
      return EMPTY;
    }

    // validate that the session has loaded
    else if (this.user === undefined) {
      // wait for the authService to notify us that it's available
      return this.authService.authState.pipe(take(1));
      // TODO this doesn't catch if we get a null back here
    }

    // all systems nominal
    else {
      return new Observable((observer: Observer<SocialUser>) => {
        // push the user object out and close the observer
        observer.next(this.user!);
        observer.complete();

        return { unsubscribe() { } };
      });
    }
  }

  launch(): void {
    this.authSub = this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  pleaseLogin(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }
}

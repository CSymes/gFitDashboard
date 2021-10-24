import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { from, Observable, Subject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private _user: SocialUser | null;
  private authSub?: Subscription;

  constructor(private authService: SocialAuthService, private router: Router) {
    this._user = null;
    this.launch();
  }

  signIn(): Observable<SocialUser> {
    const sub = new Subject<SocialUser>();
    // wait until the service is loaded
    this.authService.initState.pipe(take(1)).subscribe(_ => {
      // then request a Google sign-in
      void this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
        this._user = user;

        sub.next(user);
        sub.complete();
      });
    })

    return sub;
  }

  signOut(): Observable<void> {
    return from(this.authService.signOut());
  }

  get observe(): Observable<SocialUser | null> { return this.authService.authState; }
  get user(): SocialUser | null { return this._user; }

  launch(): void {
    this.authSub = this.observe.subscribe((user) => {
      this._user = user;
    });
  }

  exitSecureArea(): void {
    void this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }
}

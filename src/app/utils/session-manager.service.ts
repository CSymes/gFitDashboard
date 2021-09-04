import { Injectable } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import { AccountStore, AuthStore, SessionStoreConstants } from './session-store';

@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {

  constructor() { }

  /**
   * Stores the necessary data for the application to function in local storage
   * @param user Authenticated user from angularx-social-login
   */
  saveLoginDetails(user: SocialUser): void {
    // Save details about the OAUTH authentication
    let store: AuthStore = {
      accessToken: user.response.access_token,
      idToken: user.response.id_token,
      expires: user.response.expires_at
    }
    localStorage.setItem(SessionStoreConstants.StoreAuth, JSON.stringify(store));

    // about the user's profile
    let acc: AccountStore = {
      firstName: user.firstName,
      profilePic: user.photoUrl
    }
    localStorage.setItem(SessionStoreConstants.StoreAccount, JSON.stringify(acc));
  }

  /**
   * Attempts to load the OAUTH credentials from local storage
   * @returns Loaded credentials, or null if they haven't been set yet
   */
  loadCredentials(): AuthStore | null {
    let detailString = localStorage.getItem(SessionStoreConstants.StoreAuth);
    if (detailString === null) return null;

    let details: AuthStore = JSON.parse(detailString);

    return details;
  }

  /**
   * Attempts to load the account's profile details from local storage
   * @returns Loaded profile details, or null if they haven't been set yet
   */
  loadAccountDetails(): AccountStore | null {
    let detailString = localStorage.getItem(SessionStoreConstants.StoreAccount);
    if (detailString === null) return null;

    let details: AccountStore = JSON.parse(detailString);

    return details;
  }
}

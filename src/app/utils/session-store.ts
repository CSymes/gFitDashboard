export const SessionStoreConstants: any = {
  StoreAuth: "authToken",
  StoreAccount: "accountDetails"
}

export interface AuthStore {
  accessToken: string;
  idToken: string;
  expires: number;
}

export interface AccountStore {
  firstName: string;
  profilePic: string;
}

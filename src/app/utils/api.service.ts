import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { BASE_URI } from './endpoints';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  apiGet<T>(endpoint: string, user: SocialUser, params: any = null): Observable<T> {
    let fullEndpoint = BASE_URI + endpoint;
    let options = {
      headers: this.makeHeaders(user),
      params: params
    };

    return this.http.get<T>(fullEndpoint, options).pipe(take(1));
  }

  apiPost<T>(endpoint: string, user: SocialUser, body: any): Observable<T> {
    let fullEndpoint = BASE_URI + endpoint;
    let options = { headers: this.makeHeaders(user) };

    return this.http.post<T>(fullEndpoint, body, options).pipe(take(1));
  }

  private makeHeaders(user: SocialUser): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.response.access_token
    });
  }
}

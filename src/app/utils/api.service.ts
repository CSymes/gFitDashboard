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

  apiGet<T>(endpoint: string, user: SocialUser): Observable<T> {
    let fullEndpoint = BASE_URI + endpoint;
    let options = { headers: this.getHeaders(user) };

    console.log(fullEndpoint);
    console.log(options);

    return this.http.get<T>(fullEndpoint, options).pipe(take(1));
  }

  private getHeaders(user: SocialUser): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.response.access_token
    });
  }
}

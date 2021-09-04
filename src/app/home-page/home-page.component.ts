import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManagerService } from '../utils/session-manager.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private sessionManager: SessionManagerService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    let auth = this.sessionManager.loadCredentials();
    if (auth === null) this.router.navigate(['/login']);
    else {

    }
  }
}

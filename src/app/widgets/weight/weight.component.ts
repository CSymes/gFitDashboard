import { Component, Input, OnInit } from '@angular/core';
import { SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.css']
})
export class WeightComponent implements OnInit {

  @Input() user!: SocialUser;

  constructor() { }

  ngOnInit(): void {
    if (!this.user) { throw (new Error("The required input [user] was not provided")); }
  }

}

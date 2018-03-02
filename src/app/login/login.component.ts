import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { JiraService } from '../service/jira.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string = '' ;
  password:string = '' ;
  constructor( private jira:JiraService) { }

  ngOnInit() {
  }

  login( event ){
    this.jira.login(
      this.username,
      btoa(  this.username + ':' + this.password ),
      this.username.split('@')[1]
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { JiraService } from '../service/jira.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  constructor( private jira: JiraService ) {

  }

  ngOnInit() {

  }

}

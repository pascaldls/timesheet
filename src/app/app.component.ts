import { Component, OnInit } from '@angular/core';
import { JiraService } from './service/jira.service';


import { userRes,  worklogRes,  worklogsRes,  fieldsRes,  issuesRes,  searchRes } from './interfaces/response' ;
import { ActivatedRoute, Router, NavigationStart, ActivationEnd, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  user :Object = {} ;
  avatarUrls:string ;
  accountId:string ;
  emailAddress:string ;
  constructor(private router:Router, private jira:JiraService ){
    jira.get ( '2/myself' ).subscribe( ( res:userRes ) =>{
      this.user = res ;
      this.avatarUrls = <any> res.avatarUrls['48x48'] ;
      this.accountId = res.accountId ;
      this.emailAddress = res.emailAddress ;
    } ) ;
  }
  ngOnInit (){

    this.router.events.subscribe(
      ( e ) => {
    // NavigationEnd
    // NavigationCancel
    // NavigationError
    // RoutesRecognized
        if ( e instanceof ActivationEnd ){
          // console.log ( e.snapshot.data )
        }
        if ( e instanceof ActivationEnd ){
          // // console.log ( e.snapshot.data )
        }
      }
    ) ;
  }
}

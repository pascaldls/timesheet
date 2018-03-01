import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import {Router} from '@angular/router';

@Component({
  selector: 'app-jira',
  templateUrl: './jira.component.html',
  styleUrls: ['./jira.component.css']
})
export class JiraComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private localStore: LocalStorageService,
    private router : Router
  ) {

    this.activatedRoute.queryParams
      .subscribe( ( values:Object )=>{

      for( let property in values ){
        console.log ( property + ' ' + values[property]  ) ;
        localStore.set( property, values[property] )
      }

      router.navigate( ["/user"] ) ;
    } ) ;
  }
  ngOnInit() {
  }

}

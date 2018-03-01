import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { JiraService } from './service/jira.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { LocalStorageModule } from 'angular-2-local-storage';

import { DatePipe } from '@angular/common';

import { JiraComponent } from './jira/jira.component';
import { UserComponent } from './user/user.component';
import { TimesheetComponent } from './timesheet/timesheet.component' ;


//jira/callback?oauth_token=41dWZHvTe1nM4pei7uz3kleR6HBVOjVC&oauth_verifier=CCdkOK

const appRoutes: Routes = [
  {
    path : 'jira/callback',
    component :  JiraComponent
  },
  {
    path : 'user',
    component : UserComponent
  },
  {
    path : 'timesheet',
    component : TimesheetComponent,
    data : {
      'bla' : 1 ,
      'sdfss' : 'sdfdfs',
      'toto' : '3'
    }
  }
  // {
  //   path : 'jira/callback/:param',
  //   component :  GetToken
  // }
] ;

@NgModule({
  declarations: [
    AppComponent,
    JiraComponent,
    UserComponent,
    TimesheetComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot( appRoutes ) ,
    LocalStorageModule.withConfig({
      prefix : 'jiraNG',
      storageType : 'localStorage',
    }),
    // JiraService
  ],
  providers: [
    // HttpClient,
    JiraService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

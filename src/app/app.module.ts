import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy, DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

// import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';

// Routing Module
import { AppRoutingModule } from './app.routing';


import { FormsModule } from '@angular/forms';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { JiraService } from './service/jira.service';
import { HttpClient, HttpClientModule } from '@angular/common/http' ;
import { LocalStorageModule } from 'angular-2-local-storage';
import { LoginComponent } from './login/login.component';
import { TodoComponent } from './todo/todo.component';
import { PouchDbService } from './service/pouch-db.service';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    AngularFontAwesomeModule,
    FormsModule,
    // ChartsModule,
    HttpClientModule,
    LocalStorageModule.withConfig({
      prefix : 'jiraNG',
      storageType : 'localStorage',
    }),
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    TimesheetComponent,
    LoginComponent,
    TodoComponent
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    DatePipe,
    JiraService,
    PouchDbService
],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

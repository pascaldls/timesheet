import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import "rxjs/add/observable/of";
import { JiraService } from './service/jira.service';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component : LoginComponent,
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'timesheet',
        component : TimesheetComponent,
        canActivate: [JiraService],
      },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

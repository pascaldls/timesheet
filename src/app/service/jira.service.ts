import { Injectable }     from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import * as _ from 'underscore/underscore' ;

import { UserRes } from '../interfaces/response';

@Injectable()
export class JiraService implements CanActivate  {
  isLoggedIn = false;
  token:string = '' ;
  users:UserRes[] ;
  activedUser:UserRes ;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor( private http: HttpClient,
    private localStore: LocalStorageService,
    private router: Router
    ) {
  }
  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
    console.log('AuthGuard#canActivate called');
    let url: string = state.url;

    return this.checkLogin(url);
  }
  checkLogin(url: string): boolean {
    if (this.isLoggedIn) { return true; }

    // Store the attempted URL for redirecting
    this.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['login']);
    return false;
  }
  login( username, token, domain ) {
    this.token = token ;
    this.get( '2/user/search?username=%' + domain )
      .subscribe(
        ( users:UserRes[] ) => {
          if ( users.length === 0 )
            return this.logout() ;
          this.users = users ;
          this.isLoggedIn = true ;
          _.each( this.users, (user)=>{
            if ( user.emailAddress === username ){
              this.activedUser = user ;
              // console.log( this.activedUser ) ;
            }
          });
          this.router.navigate([ ( ! this.redirectUrl || this.redirectUrl === 'login' ? '' : this.redirectUrl ) ]);
        },
        ( err ) => {
          this.logout() ;
        }
      ) ;
    // return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
  }
  logout(): void {
    this.isLoggedIn = false;
    this.router.navigate(['login']);
  }
  getHeaders () {
    const headers = new HttpHeaders(
      {
        'Authorization': 'Basic ' + this.token ,
        'Content-Type' : 'application/json' ,
        'Accept' : 'application/json',
      }
    ) ;
    return headers ;
  }
  get( path, params? ) {
    if ( ! params ) params = {} ;
    return this.http.get( "proxy/rest/api/" + path ,
      {
        headers : this.getHeaders (),
        params : params ,
      },
    ) ;
  }
}

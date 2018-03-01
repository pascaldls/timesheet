import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class JiraService {

  constructor( private http:HttpClient,
    private localStore: LocalStorageService, ) {
  }
  getHeaders (){
    let headers = new HttpHeaders(
      {
        'Authorization': 'Basic cGFzY2FsQGluc3luaXVtLmNvbTpJRXl4eEdtQzA3YVF5ckJhN2tiMjg2NkE=',
        'Content-Type' : 'application/json' ,
        'Accept' : 'application/json',
      }
    ) ;
    return headers ;
  }
  get( path, params? ){
    if ( ! params ) params = {} ;
    return this.http.get( "proxy/rest/api/" + path ,
      {
        headers : this.getHeaders (),
        params : params ,
      },
    ) ;
  }
}

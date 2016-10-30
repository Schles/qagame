import {Injectable} from '@angular/core';
import {Http, Headers , RequestOptions} from '@angular/http';

import 'rxjs/Rx';

@Injectable()
export class AuthService {

  private redirectUrl:string = "";
  private http:Http;

  constructor(http:Http) {
      this.http = http;
  }



  public getUserId():number{
      let uId:number = <number><any>localStorage.getItem("uId");

      if(uId != null)
          return uId;

      return 0;
  }

  public setUserId(id:number){
      localStorage.setItem("uId", <string><any>id);
  }

  public isLoggedIn():boolean{
      let uId = this.getUserId();

      if(uId > 0)
        return true;

      return false;
  }

  public setRedirectUrl(url: string){
      this.redirectUrl = url;
  }

  public getRedirectUrl(){
      return this.redirectUrl;
  }

}

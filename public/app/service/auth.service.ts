import {Injectable} from '@angular/core';
import {Http, Headers , RequestOptions} from '@angular/http';

import 'rxjs/Rx';

@Injectable()
export class AuthService {

  private redirectUrl = "";

  constructor(http:Http) {
      this.http = http;
  }



  public getUserId(){
      let uId = localStorage.getItem("uId");

      if(uId != null)
          return uId;

      return 0;
  }

  public setUserId(id:any){
      localStorage.setItem("uId", id);
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
